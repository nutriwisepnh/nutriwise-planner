"use client";

import { useState } from "react";
import RecipePanel from "./components/RecipePanel";
import PlannerPanel from "./components/PlannerPanel";

const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
const mealTypes = ["breakfast","lunch","dinner","snack"];

export default function Home() {

  const [viewMode,setViewMode] = useState("planner");
  const [selectedDay,setSelectedDay] = useState("monday");
  const [selectedMeal,setSelectedMeal] = useState("lunch");

  const [rules,setRules] = useState([
    { id:1, tag:"vis", type:"min", target:2 },
    { id:2, tag:"vezelrijk", type:"min", target:3 }
  ]);

  const [newTag,setNewTag] = useState("");
  const [newType,setNewType] = useState("min");
  const [newTarget,setNewTarget] = useState(1);

  const [week,setWeek] = useState(()=>{
    const w = {};
    days.forEach(d=>{
      w[d]={};
      mealTypes.forEach(m=>{
        w[d][m]=[];
      });
    });
    return w;
  });

  const recipes = [
    { id:1,name:"Zalm salade",category:"lunch",tags:["vis","eiwitrijk"]},
    { id:2,name:"Havermout bowl",category:"breakfast",tags:["vezelrijk"]},
    { id:3,name:"Groente omelet",category:"dinner",tags:["vegetarisch"]},
    { id:4,name:"Griekse yoghurt",category:"snack",tags:["eiwitrijk"]}
  ];

  function addToMeal(day,meal,recipe){
    setWeek(prev=>({
      ...prev,
      [day]:{
        ...prev[day],
        [meal]:[...prev[day][meal],recipe]
      }
    }));
  }

  function removeFromMeal(day,meal,index){
    setWeek(prev=>({
      ...prev,
      [day]:{
        ...prev[day],
        [meal]:prev[day][meal].filter((_,i)=>i!==index)
      }
    }));
  }

  const filteredRecipes = recipes.filter(r=>r.category===selectedMeal);

  const allMeals = Object.values(week)
    .flatMap(day=>Object.values(day))
    .flat();

  function countTag(tag){
    return allMeals.filter(item=>item.tags.includes(tag)).length;
  }

  function addRule(){
    if(!newTag) return;

    setRules([...rules,{
      id:Date.now(),
      tag:newTag.toLowerCase(),
      type:newType,
      target:Number(newTarget)
    }]);

    setNewTag("");
    setNewTarget(1);
  }

  function removeRule(id){
    setRules(rules.filter(r=>r.id!==id));
  }

  return(
    <main style={mainStyle}>
      <h1 style={titleStyle}>Nutriwise Planner 🌿</h1>

      <div style={gridStyle}>

        {/* Recipe Panel */}
        <RecipePanel
          days={days}
          mealTypes={mealTypes}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedMeal={selectedMeal}
          setSelectedMeal={setSelectedMeal}
          filteredRecipes={filteredRecipes}
          addToMeal={addToMeal}
        />

        {/* Planner Panel */}
        <PlannerPanel
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedDay={selectedDay}
          days={days}
          mealTypes={mealTypes}
          week={week}
          removeFromMeal={removeFromMeal}
          setSelectedDay={setSelectedDay}
        />

        {/* Regels */}
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

      </div>
    </main>
  );
}

/* styles */

const mainStyle={padding:"40px",fontFamily:"system-ui"};
const titleStyle={fontSize:"40px",color:"#4F7D5C"};
const gridStyle={display:"grid",gridTemplateColumns:"1fr 2fr 1fr",gap:"30px"};
const cardStyle=(bg)=>({background:bg,padding:"20px",borderRadius:"16px"});
const inputStyle={width:"100%",marginBottom:"6px",padding:"4px"};
const addButtonStyle={padding:"6px",borderRadius:"6px",border:"none",background:"#4F7D5C",color:"#fff"};
