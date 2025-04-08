import React from "react";
import { useNavigate } from "react-router-dom";

const tables = Array.from({ length: 6 }, (_, i) => ({
  id: `table-${i + 1}`,
  number: i + 1,
  isOccupied: Math.random() > 0.5,
}));

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tables Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`p-6 rounded-lg shadow-md cursor-pointer transform transition-all hover:scale-105 ${
              table.isOccupied ? "bg-red-100" : "bg-green-100"
            }`}
            onClick={() => navigate("/manager/menu")}
          >
            <h2 className="text-xl font-semibold mb-2">Table {table.number}</h2>
            <p className={table.isOccupied ? "text-red-600" : "text-green-600"}>
              {table.isOccupied ? "Occupied" : "Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
