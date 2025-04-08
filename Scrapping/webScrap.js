const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const URL = 'https://www.justdial.com/Ahmedabad/NGOS/nct-10337253';
const OUTPUT_PATH = path.join(__dirname, 'scrapping', 'ngo.json');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced address cleaner with local knowledge
function cleanAddress(address) {
    const replacements = {
        'chowki': 'police station',
        'gali': 'lane',
        'vistar': 'area',
        'opp': 'opposite',
        'near': '',
        'beside': '',
        'behind': ''
    };

    return address
        .replace(/"/g, '')
        .replace(new RegExp(Object.keys(replacements).join('|'), 'gi'), match => replacements[match.toLowerCase()])
        .replace(/,+/g, ',')
        .replace(/\s+/g, ' ')
        .replace(/(ahmedabad),?\s*(ahmedabad)?/gi, 'Ahmedabad')
        .trim();
}

// Neighborhood coordinates fallback
const NEIGHBORHOODS = {
    'navrangpura': { latitude: 23.0356, longitude: 72.5634 },
    'vejalpur': { latitude: 22.9981, longitude: 72.5602 },
    'memnagar': { latitude: 23.0530, longitude: 72.5329 },
    'naranpura': { latitude: 23.0500, longitude: 72.5700 },
    'vatva': { latitude: 22.9900, longitude: 72.5900 },
    'new vadaj': { latitude: 23.0667, longitude: 72.5667 },
    'bodakdev': { latitude: 23.0446, longitude: 72.5173 },
    'ranip': { latitude: 23.0837, longitude: 72.5895 },
    'lal bunglow': { latitude: 23.0255, longitude: 72.5712 }
};

function getNeighborhoodFromAddress(address) {
    const neighborhoods = Object.keys(NEIGHBORHOODS);
    return neighborhoods.find(area => 
        address.toLowerCase().includes(area.toLowerCase())
    );
}

// Smart geocoding with multiple fallback strategies
async function geocodeAddress(address, organizationName) {
    // First clean the address
    const cleaned = cleanAddress(address);
    
    // Try different query variations
    const attempts = [
        // Full cleaned address with city/state/country
        `${cleaned}, Ahmedabad, Gujarat, India`,
        
        // Just the first part before comma + city
        `${cleaned.split(',')[0].trim()}, Ahmedabad`,
        
        // Try common road abbreviations
        cleaned.replace('Road', 'Rd').replace('Street', 'St'),
        
        // Try without special characters
        cleaned.replace(/[^a-zA-Z0-9\s,]/g, ''),
        
        // Try neighborhood name only if address contains known areas
        ...(getNeighborhoodFromAddress(cleaned) ? 
            [`${getNeighborhoodFromAddress(cleaned)}, Ahmedabad`] : []),
        
        // Final fallback - just the organization name + city
        `${organizationName.split('(')[0].trim()}, Ahmedabad`
    ];

    // Try each query variation
    for (const query of attempts) {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
                { headers: { 'User-Agent': 'NGO-Mapper/1.0' } }
            );

            if (response.data.length > 0) {
                return {
                    latitude: parseFloat(response.data[0].lat),
                    longitude: parseFloat(response.data[0].lon),
                    accuracy: response.data[0].type || 'approximate'
                };
            }
        } catch (error) {
            console.error(`Geocoding attempt failed for "${query}"`);
            await delay(1500);
        }
    }

    // Final fallback to known neighborhood coordinates
    const neighborhood = getNeighborhoodFromAddress(address);
    if (neighborhood && NEIGHBORHOODS[neighborhood.toLowerCase()]) {
        return {
            ...NEIGHBORHOODS[neighborhood.toLowerCase()],
            accuracy: "neighborhood"
        };
    }

    return null;
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 300;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}

async function scrapeJustDial() {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1366,768'
        ],
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();

    try {
        await page.setViewport({ width: 1366, height: 768 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        console.log(`Navigating to ${URL}...`);
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

        await delay(5000);
        await autoScroll(page);
        await delay(3000);

        // Extract NGO data
        const ngoData = await page.evaluate(() => {
            const results = [];
            const listings = document.querySelectorAll('.cntanr, .resultbox, .jdlist');

            listings.forEach(item => {
                try {
                    const nameEl = item.querySelector('h4, .lng_cont_name, .resultbox_title');
                    const name = nameEl ? nameEl.textContent.trim() : 'N/A';

                    const addressEl = item.querySelector('.cont_fl_addr, .resultbox_address');
                    let address = addressEl ? addressEl.textContent.trim() : 'N/A';

                    address = address.replace(/\s+/g, ' ').replace(/"/g, '').trim();

                    if (name !== 'N/A') {
                        results.push({ 
                            organizationName: name, 
                            address: address 
                        });
                    }
                } catch (e) {
                    console.error('Error processing listing:', e);
                }
            });

            return results;
        });

        // Geocode addresses with improved handling
        const ngoDataWithCoords = [];
        for (const ngo of ngoData) {
            let coords = await geocodeAddress(ngo.address, ngo.organizationName);
            
            ngoDataWithCoords.push({
                ...ngo,
                coordinates: coords || { latitude: null, longitude: null, accuracy: "unknown" }
            });
            console.log(`Processed: ${ngo.organizationName} - ${coords ? '✅' : '❌'}`);
            await delay(1500);
        }

        // Save data as JSON file
        const dir = path.dirname(OUTPUT_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(ngoDataWithCoords, null, 2), 'utf-8');
        console.log(`✅ Saved ${ngoDataWithCoords.length} records to ${OUTPUT_PATH}`);

        return ngoDataWithCoords;
    } catch (error) {
        console.error('Scraping error:', error);
        await page.screenshot({ path: 'error.png' });
        throw error;
    } finally {
        await browser.close();
    }
}

async function runWithRetries(maxRetries = 3) {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            return await scrapeJustDial();
        } catch (error) {
            retries++;
            console.log(`Attempt ${retries} failed. Retrying...`);
            if (retries >= maxRetries) throw error;
            await delay(10000);
        }
    }
}

runWithRetries()
    .then(data => {
        const successCount = data.filter(item => item.coordinates.latitude).length;
        console.log(`✅ Successfully processed ${data.length} NGOs (${successCount} with coordinates)`);
    })
    .catch(err => console.error('❌ Final error:', err));