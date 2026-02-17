"use client";

import { useState } from "react";

export default function Home() {
  const [selectedMeal, setSelectedMeal] = useState("lunch");

  const [week, setWeek] = useState({
    monday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    }
  });

  const recipes = [
    {
      id: 1,
      name: "Zalm salade",
      category: "lunch",
      tags: ["vis", "eiwitrijk"]
    },
    {
      id: 2,
      name: "Havermout bowl",
      category: "breakfast",
      tags: ["vezelrijk", "vegetarisch"]
    },
    {
      id: 3,
      name: "Groente omelet",
      category: "dinner",
      tags: ["vegetarisch", "eiwitrijk"]
    },
    {
      id: 4,
      name: "Griekse yoghurt met noten",
      category: "snack",
      tags: ["eiwitrijk"]
    }
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

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === selectedMeal
  );

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Nutriwise Planner 🌿</h1>

      <div style={gridStyle}>
        {/* Recepten */}
        <div style={cardStyle("#FCE8A8")}>
          <h2>🍽 Recepten</h2>

          <MealSelector
            selected={selectedMeal}
            onSelect={setSelectedMeal}
          />

          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() =>
                addToMeal("monday", selectedMeal, recipe)
              }
              style={recipeCard}
            >
              <strong>{recipe.name}</strong>

              <div style={{ marginTop: "6px" }}>
                {recipe.tags.map((tag, i) => (
                  <span key={i} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Weekplanner */}
        <div style={cardStyle("#FFFFFF")}>
          <h2>📅 Maandag</h2>

          {Object.keys(week.monday).map((meal) => (
            <MealBlock
              key={meal}
              title={meal}
              items={week.monday[meal]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function MealSelector({ selected, onSelect }) {
  const meals = ["breakfast", "lunch", "dinner", "snack"];

  return (
    <div style={{ marginBottom: "15px" }}>
      {meals.map((meal) => (
        <button
          key={meal}
          onClick={() => onSelect(meal)}
          style={{
            marginRight: "8px",
            padding: "6px 10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background:
              selected === meal ? "#4F7D5C" : "#ddd",
            color:
              selected === meal ? "#fff" : "#333"
          }}
        >
          {meal}
        </button>
      ))}
    </div>
  );
}

function MealBlock({ title, items }) {
  return (
    <div style={mealBlockStyle}>
      <strong style={{ textTransform: "capitalize" }}>
        {title}
      </strong>

      {items.length === 0 ? (
        <p style={{ color: "#999", fontSize: "14px" }}>
          Nog niets toegevoegd.
        </p>
      ) : (
        items.map((item, index) => (
          <div key={index} style={mealItemStyle}>
            {item.name}
          </div>
        ))
      )}
    </div>
  );
}

const mainStyle = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  backgroundColor: "#F4F8F5",
  minHeight: "100vh",
  padding: "40px"
};

const titleStyle = {
  color: "#4F7D5C",
  fontSize: "40px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: "30px",
  marginTop: "40px"
};

const cardStyle = (bg) => ({
  backgroundColor: bg,
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
});

const recipeCard = {
  background: "#fff",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const tagStyle = {
  background: "#E7F3EC",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  marginRight: "6px"
};

const mealBlockStyle = {
  marginBottom: "20px",
  padding: "15px",
  background: "#E7F3EC",
  borderRadius: "12px"
};

const mealItemStyle = {
  background: "#fff",
  padding: "8px",
  borderRadius: "8px",
  marginTop: "6px"
};
