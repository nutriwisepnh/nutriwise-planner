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
    setWeek(prev => ({
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

        {/* Recepten */}
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
                pa
