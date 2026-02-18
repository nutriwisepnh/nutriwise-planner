export default function RulesPanel({
  rules,
  countTag,
  removeRule,
  newTag,
  setNewTag,
  newType,
  setNewType,
  newTarget,
  setNewTarget,
  addRule
}) {
  return (
    <div style={cardStyle("#E7F3EC")}>
      <h2>Regels</h2>

      {rules.map(rule=>{
        const count = countTag(rule.tag);

        const met = rule.type==="min"
          ? count>=rule.target
          : count<=rule.target;

        return(
          <div
            key={rule.id}
            style={{
              padding:"8px",
              marginBottom:"8px",
              borderRadius:"8px",
              background:met?"#D4EDDA":"#F8D7DA"
            }}
          >
            {rule.type==="min"?"Min":"Max"} {rule.tag}
            <div>{count}/{rule.target}</div>
            <button onClick={()=>removeRule(rule.id)}>
              Verwijderen
            </button>
          </div>
        );
      })}

      <hr/>

      <input
        placeholder="tag"
        value={newTag}
        onChange={e=>setNewTag(e.target.value)}
        style={inputStyle}
      />

      <select
        value={newType}
        onChange={e=>setNewType(e.target.value)}
        style={inputStyle}
      >
        <option value="min">Minimaal</option>
        <option value="max">Maximaal</option>
      </select>

      <input
        type="number"
        value={newTarget}
        onChange={e=>setNewTarget(e.target.value)}
        style={inputStyle}
      />

      <button onClick={addRule} style={addButtonStyle}>
        Regel toevoegen
      </button>
    </div>
  );
}

/* styles */

const cardStyle=(bg)=>({
  background:bg,
  padding:"20px",
  borderRadius:"16px"
});

const inputStyle={
  width:"100%",
  marginBottom:"6px",
  padding:"4px"
};

const addButtonStyle={
  padding:"6px",
  borderRadius:"6px",
  border:"none",
  background:"#4F7D5C",
  color:"#fff"
};
