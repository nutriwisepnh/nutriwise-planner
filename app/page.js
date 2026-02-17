"use client";

import { useState } from "react";

export default function Home() {
  const [week, setWeek] = useState({
    monday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack1: [],
      snack2: []
    }
  });

  const recipes = [
    { id: 1, name: "Zalm salade 🐟" },
    { id: 2, name: "Havermout bowl 🌾" },
    { id: 3, name: "Groente omelet 🍳" }
  ];

  function addToMeal(day, meal, recipe) {
    setWeek((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: [...prev[day][meal], recipe]
      }
    }));
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
        <div style={cardStyle("#FCE8A8")}>
          <h2>🍽 Recepten</h2>

          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => {
                addToMeal("monday", "lunch", recipe);
              }}
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
        </div>

        <div style={cardStyle("#FFFFFF")}>
          <h2>📅 Maandag</h2>

          <MealBlock title="Ontbijt" items={week.monday.breakfast} />
          <MealBlock title="Lunch" items={week.monday.lunch} />
          <MealBlock title="Diner" items={week.monday.dinner} />
          <MealBlock title="Snack 1" items={week.monday.snack1} />
          <MealBlock title="Snack 2" items={week.monday.snack2} />
        </div>
      </div>
    </main>
  );
}

function MealBlock({ title, items }) {
  return (
    <div style={{
      marginBottom: "20px",
      padding: "15px",
      background: "#E7F3EC",
      borderRadius: "12px"
    }}>
      <strong>{title}</strong>

      {items.length === 0 && (
        <p style={{ color:
