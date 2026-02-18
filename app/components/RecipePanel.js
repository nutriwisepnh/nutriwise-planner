export default function RecipePanel({
  days,
  mealTypes,
  selectedDay,
  setSelectedDay,
  selectedMeal,
  setSelectedMeal,
  filteredRecipes,
  addToMeal
}) {
  return (
    <div style={cardStyle("#FCE8A8")}>
      <h2>Recepten</h2>

      <div style={{ marginBottom: "10px" }}>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            style={tabStyle(selectedDay === d)}
          >
            {d.slice(0, 2)}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "10px" }}>
        {mealTypes.map(m => (
          <button
            key={m}
            onClick={() => setSelectedMeal(m)}
            style={tabStyle(selectedMeal === m)}
          >
            {m}
          </button>
        ))}
      </div>

      {filteredRecipes.map(r => (
        <div
          key={r.id}
          onClick={() => addToMeal(selectedDay, selectedMeal, r)}
          style={recipeCard}
        >
          {r.name}
        </div>
      ))}
    </div>
  );
}

/* styles (tijdelijk hier laten staan) */

const cardStyle = bg => ({
  background: bg,
  padding: "20px",
  borderRadius: "16px"
});

const recipeCard = {
  background: "#fff",
  padding: "8px",
  marginBottom: "6px",
  cursor: "pointer"
};

const tabStyle = active => ({
  marginRight: "6px",
  padding: "6px 8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: active ? "#4F7D5C" : "#ddd",
  color: active ? "#fff" : "#000"
});
