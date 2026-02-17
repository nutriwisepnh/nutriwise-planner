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

  const [fishTarget, setFishTarget] = useState(2);
  const [fiberTarget, setFiberTarget] = useState(3);

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

  const fishCount = useMemo(() => {
    return allMeals.filter((item) =>
      item.tags.includes("vis")
    ).length;
  }, [allMeals]);

  const fiberCount = useMemo(() => {
    return allMeals.filter((item) =>
      item.tags.includes("vezelrijk")
    ).length;
  }, [allMeals]);

  const rules = [
    {
      label: "Min vis",
      current: fishCount,
      target: fishTarget,
      setter: setFishTarget
    },
    {
      label: "Min vezelrijk",
      current: fiberCount,
      target: fiberTarget,
      setter: setFiberTarget
    }
  ];

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Nutriwise Planner 🌿</h1>

      <div style={gridStyle}>
        {/* Recepten */}
        <div style={cardStyle("#FCE8A8")}>
          <h2>🍽 Recepten</h2>

          <DaySelector
            selected={selectedDay}
            onSelect={setSelectedDay}
          />

          <MealSelector
            selected={selectedMeal}
            onSelect={setSelectedMeal}
          />

          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() =>
                addToMeal(selectedDay, selectedMeal, recipe)
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
          <h2>📅 Weekplanner</h2>

          {/* View Toggle */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={() => setViewMode("planner")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                background:
                  viewMode === "planner" ? "#4F7D5C" : "#E0E0E0",
                color:
                  viewMode === "planner" ? "#fff" : "#333"
              }}
            >
              Planner
            </button>

            <button
              onClick={() => setViewMode("overview")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                background:
                  viewMode === "overview" ? "#4F7D5C" : "#E0E0E0",
                color:
                  viewMode === "overview" ? "#fff" : "#333"
              }}
            >
              Weekoverzicht
            </button>
          </div>

          {viewMode === "planner" ? (
            <>
              <h3 style={{ textTransform: "capitalize" }}>
                {selectedDay}
              </h3>

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
            </>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={thStyle}></th>
                    {mealTypes.map((meal) => (
                      <th key={meal} style={thStyle}>
                        {meal}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td style={tdStyle}>{day.slice(0,2)}</td>
                      {mealTypes.map((meal) => (
                        <td key={meal} style={tdStyle}>
                          {week[day][meal].map((item, i) => (
                            <div key={i}>{item.name}</div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Regels */}
        <div style={cardStyle("#E7F3EC")}>
          <h2>✅ Regels (hele week)</h2>

          {rules.map((rule, index) => {
            const met = rule.current >= rule.target;

            return (
              <div
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: met ? "#D4EDDA" : "#F8D7DA"
                }}
              >
                <strong>{rule.label}</strong>
                <div style={{ marginTop: "6px" }}>
                  {rule.current} /{" "}
                  <input
                    type="number"
                    value={rule.target}
                    min="0"
                    onChange={(e) =>
                      rule.setter(Number(e.target.value))
                    }
                    style={{
                      width: "50px",
                      marginLeft: "5px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      padding: "2px"
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function DaySelector({ selected, onSelect }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onSelect(day)}
          style={{
            marginRight: "6px",
            marginBottom: "6px",
            padding: "6px 8px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background:
              selected === day ? "#4F7D5C" : "#ddd",
            color:
              selected === day ? "#fff" : "#333"
          }}
        >
          {day.slice(0,2)}
        </button>
      ))}
    </div>
  );
}

function MealSelector({ selected, onSelect }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      {mealTypes.map((meal) => (
        <button
          key={meal}
          onClick={() => onSelect(meal)}
          style={{
            marginRight: "6px",
            padding: "6px 8px",
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

function MealBlock({ title, items, onRemove }) {
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
          <div
            key={index}
            style={{
              ...mealItemStyle,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>{item.name}</span>
            <button
              onClick={() => onRemove(index)}
              style={{
                background: "#f8d7da",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                padding: "4px 8px"
              }}
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

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
  gridTemplateColumns: "1fr 2fr 1fr",
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
  marginBottom: "15px",
  padding: "12px",
  background: "#E7F3EC",
  borderRadius: "12px"
};

const mealItemStyle = {
  background: "#fff",
  padding: "8px",
  borderRadius: "8px",
  marginTop: "6px"
};

const thStyle = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "left"
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px",
  verticalAlign: "top"
};
