"use client";

import { useState } from "react";
import RecipePanel from "./components/RecipePanel";
import PlannerPanel from "./components/PlannerPanel";
import RulesPanel from "./components/RulesPanel";
import { initialTags } from "./data/tags";

const days = ["monday","tuesday","thursday","wednesday","friday","saturday","sunday"];
const mealTypes = ["breakfast","lunch","dinner","snack"];

export default function Home() {

  const [viewMode,setViewMode] = useState("planner");
  const [selectedDay,setSelectedDay] = useState("monday");
  const [selectedMeal,setSelectedMeal] = useState("lunch");

  const [availableTags,setAvailableTags] = useState(initialTags);

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

    const tagLower = newTag.toLowerCase();

    const tagExists = availableTags.some(
      t => t.name === tagLower
      );

      if(!tagExists){
        setAvailableTags(prev => [
          ...prev,
          { name: tagLower, type: "custom" }
        ]);
      }

    setRules(prev=>[
      ...prev,
      {
        id:Date.now(),
        tag:tagLower,
        type:newType,
        target:Number(newTarget)
      }
    ]);

    setNewTag("");
    setNewTarget(1);
  }

  function removeRule(id){
    setRules(prev=>prev.filter(r=>r.id!==id));
  }

  return(
    <main style={mainStyle}>
      <h1 style={titleStyle}>Nutriwise Planner 🌿</h1>

      <div style={gridStyle}>

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

        <RulesPanel
          rules={rules}
          countTag={countTag}
          removeRule={removeRule}
          newTag={newTag}
          setNewTag={setNewTag}
          newType={newType}
          setNewType={setNewType}
          newTarget={newTarget}
          setNewTarget={setNewTarget}
          addRule={addRule}
          availableTags={availableTags}
        />

      </div>
    </main>
  );
}

/* styles */

const mainStyle={padding:"40px",fontFamily:"system-ui"};
const titleStyle={fontSize:"40px",color:"#4F7D5C"};
const gridStyle={display:"grid",gridTemplateColumns:"1fr 2fr 1fr",gap:"30px"};
