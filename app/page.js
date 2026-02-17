export default function Home() {
  return (
    <main style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      backgroundColor: "#F4F8F5",
      minHeight: "100vh",
      padding: "40px"
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{
          color: "#4F7D5C",
          fontSize: "42px",
          marginBottom: "10px"
        }}>
          Nutriwise Planner 🌿
        </h1>
        <p style={{ color: "#4A4A4A", fontSize: "18px" }}>
          Samen bouwen aan een gezonde week.
        </p>
      </div>

      {/* Cards container */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "20px"
      }}>

        {/* Recepten */}
        <div style={cardStyle("#FCE8A8")}>
          <h2>🍽 Recepten</h2>
          <p>Hier komen straks je recepten.</p>
        </div>

        {/* Weekplanner */}
        <div style={cardStyle("#FFFFFF")}>
          <h2>📅 Weekplanner</h2>
          <p>Hier bouwen we je weekmenu.</p>
        </div>

        {/* Regels */}
        <div style={cardStyle("#E7F3EC")}>
          <h2>✅ Regels</h2>
          <p>Hier zie je of je doelen gehaald zijn.</p>
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
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    minHeight: "300px"
  };
}
