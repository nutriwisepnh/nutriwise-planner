"use client";

import { useState, useMemo } from "react";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

export default function Home() {
  const [viewMode, setViewMode] = useState("planner");
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedMeal, setSelectedMeal] = useState("lunch");

  const [rules, setRules] = useState([
    { id: 1, tag: "vis", type: "min", target: 2 },
    { id: 2, tag: "vezelrijk", type: "min", target: 3 }
  ]);

  const [newTag, setNewTag] = useState("");
  const [newType, setNewType] = useState("min");
  const [newTarget, setNewTarget] = useState(1);

  const [week, setWeek] = useState(() => {
    const initialWeek = {};
    days.forEach((day) => {
      initialWeek[day] = {};
      mealTypes.forEach((meal) => {
        initialWeek[day][meal] = [];
      });
    });
    return initialWeek;
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
      name: "Griekse yoghurt",
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

  function removeFromMeal(day, meal, indexToRemove) {
    setWeek((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: prev[day][meal].filter(
          (_, index) => index !== indexToRemove
        )
      }
    }));
  }

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === selectedMeal
  );

  const allMeals = Object.values(week)
    .flatMap((day) => Object.values(day))
    .flat();

  function countTag(tag) {
    return allMeals.filter((item) =>
      item.tags.includes(tag)
    ).length;
  }

  function addRule() {
    if (!newTag) return;

    setRules([
      ...rules,
      {
        id: Date.now(),
        tag: newTag.toLowerCase(),
        type: newType,
        target: Number(newTarget)
      }
    ]);

    setNewTag("");
    setNewTarget(1);
  }

  function removeRule(id) {
    setRules(rules.filter((rule) => rule.id !== id));
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Nutriwise Planner 🌿</h1>

      <div style={gridStyle}>
        {/* Recepten */}
        <div style={cardStyle("#FCE8A8")}>
          <h2>🍽 Recepten</h2>

          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() =>
                addToMeal(selectedDay, selectedMeal, recipe)
              }
              style={recipeCard}
            >
              {recipe.name}
            </div>
          ))}
        </div>

        {/* Weekplanner */}
        <div style={cardStyle("#FFFFFF")}>
          <h2>📅 {selectedDay}</h2>

          {mealTypes.map((meal) => (
            <MealBlock
              key={meal}
              title={meal}
              items={week[selectedDay][meal]}
              onRemove={(index) =>
                removeFromMeal(selectedDay, meal, index)
              }
            />
          ))}
        </div>

        {/* Regels */}
        <div style={cardStyle("#E7F3EC")}>
          <h2>✅ Regels</h2>

          {rules.map((rule) => {
            const count = countTag(rule.tag);
            const met =
              rule.type === "min"
                ? count >= rule.target
                : count <= rule.target;

            return (
              <div
                key={rule.id}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  background: met ? "#D4EDDA" : "#F8D7DA"
                }}
              >
                <strong>
                  {rule.type === "min" ? "Min" : "Max"}{" "}
                  {rule.tag}
                </strong>
                <div>
                  {count} / {rule.target}
                </div>

                <button
                  onClick={() => removeRule(rule.id)}
                  style={{
                    marginTop: "5px",
                    fontSize: "12px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer"
                  }}
                >
                  Verwijderen
                </button>
              </div>
            );
          })}

          <hr />

          <h3>➕ Nieuwe regel</h3>

          <input
            placeholder="tag (bijv vis)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            style={inputStyle}
          />

          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            style={inputStyle}
          >
            <option value="min">Minimaal</option>
            <option value="max">Maximaal</option>
          </select>

          <input
            type="number"
            value={newTarget}
            min="0"
            onChange={(e) =>
              setNewTarget(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={addRule}
            style={addButtonStyle}
          >
            Regel toevoegen
          </button>
        </div>
      </div>
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function MealBlock({ title, items, onRemove }) {
  return (
    <div style={mealBlockStyle}>
      <strong>{title}</strong>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            ...mealItemStyle,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {item.name}
          <button
            onClick={() => onRemove(index)}
            style={{ border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------- STYLES ---------- */

const mainStyle = {
  fontFamily: "system-ui",
  padding: "40px"
};

const titleStyle = {
  color: "#4F7D5C",
  fontSize: "40px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 1fr",
  gap: "30px"
};

const cardStyle = (bg) => ({
  backgroundColor: bg,
  padding: "20px",
  borderRadius: "16px"
});

const recipeCard = {
  background: "#fff",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "8px",
  cursor: "pointer"
};

const mealBlockStyle = {
  marginBottom: "15px",
  padding: "10px",
  background: "#E7F3EC",
  borderRadius: "12px"
};

const mealItemStyle = {
  background: "#fff",
  padding: "6px",
  borderRadius: "8px",
  marginTop: "6px"
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "8px",
  padding: "6px"
};

const addButtonStyle = {
  padding: "8px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#4F7D5C",
  color: "white"
};
