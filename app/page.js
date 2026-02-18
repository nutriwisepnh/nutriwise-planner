"use client";

import { useState } from "react";
import RecipePanel from "./components/RecipePanel";
import PlannerPanel from "./components/PlannerPanel";
import RulesPanel from "./components/RulesPanel";
import { initialTags } from "./data/tags";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

const mealTypes = ["breakfast","lunch","dinner","snack"];

export default function Home() {

  const [viewMode,setViewMode] = useState("planner");
  const [selectedDay,setSelectedDay] = useState("monday");
  const [selectedMeal,setSelectedMeal] = useState("lunch");

  // 👇 tags zijn nu objecten
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
        [meal]:[...prev[day][meal]()]()
