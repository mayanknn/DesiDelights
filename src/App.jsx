import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Category_form from "./Components/Category_form";
import Item_form from "./Components/Item_form";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Centered Buttons for Navigation */}
      <div className="flex space-x-6">
        <Link to="/add-item">
          <button className="py-4 px-8 text-lg font-bold rounded bg-[#C2410C] text-white hover:bg-orange-700">
            Add Item
          </button>
        </Link>
        <Link to="/add-category">
          <button className="py-4 px-8 text-lg font-bold rounded bg-[#C2410C] text-white hover:bg-orange-700">
            Add Category
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<Item_form />} />
        <Route path="/add-category" element={<Category_form />} />
      </Routes>
    </Router>
  );
}

export default App;
