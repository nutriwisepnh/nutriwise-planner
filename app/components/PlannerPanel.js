export default function PlannerPanel({
  viewMode,
  setViewMode,
  selectedDay,
  days,
  mealTypes,
  week,
  removeFromMeal,
  setSelectedDay
}) {

  return (
    <div style={cardStyle("#fff")}>
      <h2>Weekplanner</h2>

      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => setViewMode("planner")}
          style={tabStyle(viewMode === "planner")}
        >
          Planner
        </button>

        <button
          onClick={() => setViewMode("overview")}
          style={tabStyle(viewMode === "overview")}
        >
          Overzicht
        </button>
      </div>

      {viewMode === "planner" ? (
        <>
          <h3>{selectedDay}</h3>

          {mealTypes.map(m => (
            <MealBlock
              key={m}
              title={m}
              items={week[selectedDay][m]}
              onRemove={(i) => removeFromMeal(selectedDay, m, i)}
            />
          ))}
        </>
      ) : (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th></th>
              {mealTypes.map(m => <th key={m}>{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {days.map(d => (
              <tr key={d}>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedDay(d);
                    setViewMode("planner");
                  }}
                >
                  {d.slice(0, 2)}
                </td>

                {mealTypes.map(m => (
                  <td key={m}>
                    {week[d][m].map((item, i) => (
                      <div key={i}>{item.name}</div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function MealBlock({ title, items, onRemove }) {
  return (
    <div style={mealBlockStyle}>
      <strong>{title}</strong>

      {items.length === 0 && (
        <div style={{ opacity: 0.5, fontSize: "12px" }}>
          Nog niets toegevoegd
        </div>
      )}

      {items.map((item, i) => (
        <div key={i} style={mealItemStyle}>
          {item.name}
          <button onClick={() => onRemove(i)}>✕</button>
        </div>
      ))}
    </div>
  );
}

/* styles */

const cardStyle = (bg) => ({
  background: bg,
  padding: "20px",
  borderRadius: "16px"
});

const mealBlockStyle = {
  background: "#E7F3EC",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "8px"
};

const mealItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  background: "#fff",
  marginTop: "4px",
  padding: "4px",
  borderRadius: "6px"
};

const tabStyle = (active) => ({
  marginRight: "6px",
  padding: "6px 8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: active ? "#4F7D5C" : "#ddd",
  color: active ? "#fff" : "#000"
});
