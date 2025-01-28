import React, { useEffect, useState } from "react";

const App = () => {
  const [data,setData] = useState("Mayank Nihalchandani");
  const [qr,setQr] = useState("");
  useEffect(()=>{
    setQr(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`);
  },[data])
  return (
    <div>
      <h1>QR CODE</h1>
      <input type="text" value={data} onChange={(e)=>{
        setData(e.target.value);
      }}/>
      <div>
        <img src={qr} alt="" />
      </div>
    </div>

  );
};

export default App;