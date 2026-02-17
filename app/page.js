"use client";
import { useState } from "react";

export default function Home() {
  const [mondayLunch, setMondayLunch] = useState([]);

  const recipes = [
    { id: 1, name: "Zalm salade 🐟" },
    { id: 2, name: "Havermout bowl 🌾" },
    { id: 3, name: "Groente omelet 🍳" }
  ];

  function addToMonday(recipe) {
    setMondayLunch([...mondayLunch, recipe]);
  }

  return (
    <main style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      backgroundColor: "#F4F8F5",
      minHeight: "100vh",
      padding: "40px"
    }}>

      <h1 style={{ color: "#4F7D5C", fontSize: "40px" }}>
        Nutriwise Planner 🌿
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "30px",
        marginTop: "40px"
      }}>

        {/* Recepten */}
        <div style={cardStyle("#FCE8A8")}>
          <h2>🍽 Recepten</h2>

          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => addToMonday(recipe)}
              style={{
                background: "#fff",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
              }}
            >
              {recipe.name}
            </div>
          ))}

          <p style={{ fontSize: "12px", marginTop: "15px" }}>
            Klik om toe te voegen aan maandag lunch.
          </p>
        </div>

        {/* Weekplanner */}
        <div style={cardStyle("#FFFFFF")}>
          <h2>📅 Maandag – Lunch</h2>

          {mondayLunch.length === 0 && (
            <p style={{ color: "#999" }}>
              Nog niets toegevoegd.
            </p>
          )}

          {mondayLunch.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#E7F3EC",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "8px"
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

      </div>

    </main>
  );
}

function cardStyle(bg) {
  return {
    backgroundColor: bg,
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
  };
}
