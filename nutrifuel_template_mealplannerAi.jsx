import { useState, useMemo } from "react";

const RECIPES = [
  { id:"oats_berry_protein",    nameEn:"Berry Protein Overnight Oats",           nameRo:"Ovaz proteic cu fructe de padure",         category:["mic dejun","gustare dulce"],  mealPrep:"da",      proteinMain:"pudra proteica whey",      carbMain:"fulgi de ovaz",             fatMain:"seminte de chia" },
  { id:"oats_apple_cinnamon",   nameEn:"Apple Cinnamon Protein Oats",            nameRo:"Terci proteic cu mar si scortisoara",      category:["mic dejun","gustare dulce"],  mealPrep:"partial", proteinMain:"pudra proteica",           carbMain:"fulgi de ovaz, mar",        fatMain:"unt de migdale" },
  { id:"oats_choco_pb",         nameEn:"Chocolate Peanut Butter Oats",           nameRo:"Ovaz cu cacao si unt de arahide",          category:["mic dejun","gustare dulce"],  mealPrep:"da",      proteinMain:"pudra proteica ciocolata", carbMain:"fulgi de ovaz",             fatMain:"unt de arahide" },
  { id:"chia_pudding_vanilla",  nameEn:"Vanilla Protein Chia Pudding",           nameRo:"Budinca de chia cu vanilie",               category:["mic dejun","gustare dulce"],  mealPrep:"da",      proteinMain:"pudra proteica",           carbMain:"seminte de chia, fructe",   fatMain:"seminte de chia" },
  { id:"cottage_berry_bowl",    nameEn:"Cottage Cheese Berry Bowl",              nameRo:"Bowl cu cottage cheese si fructe",         category:["mic dejun","gustare dulce"],  mealPrep:"da",      proteinMain:"cottage cheese",           carbMain:"fructe de padure",          fatMain:"seminte" },
  { id:"greek_yogurt_crunch",   nameEn:"Greek Yogurt Crunch Bowl",               nameRo:"Iaurt grecesc cu granola si fructe",       category:["mic dejun","gustare dulce"],  mealPrep:"partial", proteinMain:"iaurt grecesc",            carbMain:"granola, fructe",           fatMain:"granola, seminte" },
  { id:"smoked_salmon_toast",   nameEn:"Smoked Salmon Cream Cheese Toast",       nameRo:"Toast cu somon afumat si crema de branza", category:["mic dejun","gustare sarata"], mealPrep:"nu",      proteinMain:"somon afumat",             carbMain:"paine integrala",           fatMain:"crema de branza" },
  { id:"avocado_egg_toast",     nameEn:"Classic Avocado Egg Toast",              nameRo:"Toast cu avocado, ou si rosii",            category:["mic dejun","gustare sarata"], mealPrep:"nu",      proteinMain:"oua",                      carbMain:"paine integrala",           fatMain:"avocado" },
  { id:"cottage_avocado_toast", nameEn:"Creamy Cottage Avocado Toast",           nameRo:"Toast cu avocado pisat si cottage cheese", category:["mic dejun","gustare sarata"], mealPrep:"nu",      proteinMain:"cottage cheese",           carbMain:"paine integrala",           fatMain:"avocado" },
  { id:"med_egg_scramble",      nameEn:"Mediterranean Egg Scramble",             nameRo:"Omleta mediteraneana",                     category:["mic dejun"],                  mealPrep:"nu",      proteinMain:"oua",                      carbMain:"paine integrala",           fatMain:"ulei de masline, feta" },
  { id:"salmon_egg_muffins",    nameEn:"Smoked Salmon Egg Muffins",              nameRo:"Briosele sarate cu ou si somon",           category:["mic dejun","gustare sarata"], mealPrep:"da",      proteinMain:"oua, somon afumat",        carbMain:"zero",                      fatMain:"somon, parmezan" },
  { id:"telemea_plate",         nameEn:"Light Telemea Breakfast Plate",          nameRo:"Farfurie cu telemea light si ou",          category:["mic dejun"],                  mealPrep:"partial", proteinMain:"telemea, oua",             carbMain:"paine integrala",           fatMain:"telemea, ulei" },
  { id:"chicken_meatball_bowl", nameEn:"Mediterranean Chicken Meatball Bowl",    nameRo:"Bowl mediteranean cu chiftele de pui",     category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"carne tocata pui",         carbMain:"cartofi dulci, naut",       fatMain:"ulei de masline, tahini" },
  { id:"caesar_wrap",           nameEn:"Creamy Chicken Caesar Wrap",             nameRo:"Wrap Caesar cu pui",                       category:["pranz sau cina"],             mealPrep:"partial", proteinMain:"piept de pui",             carbMain:"tortilla integrala",        fatMain:"sos Caesar iaurt+parmezan" },
  { id:"chicken_souvlaki",      nameEn:"Greek Chicken Souvlaki Plate",           nameRo:"Farfurie greceasca cu pui souvlaki",       category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"pui marinat",              carbMain:"pita integrala sau cartofi",fatMain:"ulei de masline, feta" },
  { id:"honey_mustard_chicken", nameEn:"Honey Mustard Chicken Rice Bowl",        nameRo:"Bowl cu pui si sos honey mustard",         category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"piept de pui",             carbMain:"orez sau quinoa",           fatMain:"ulei de masline, miere" },
  { id:"chicken_taco_bowl",     nameEn:"Chicken Taco Bowl",                      nameRo:"Taco bowl cu pui",                         category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"piept sau tocat pui",      carbMain:"orez, fasole neagra",       fatMain:"avocado" },
  { id:"teriyaki_bowl",         nameEn:"Teriyaki Chicken Rice Bowl",             nameRo:"Bowl asiatic cu pui teriyaki",             category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"piept de pui",             carbMain:"orez integral sau negru",   fatMain:"ulei de susan, sesame" },
  { id:"shawarma_bowl",         nameEn:"Chicken Shawarma Power Bowl",            nameRo:"Bowl shawarma cu pui",                     category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"piept de pui",             carbMain:"cartofi dulci, quinoa",     fatMain:"tahini, ulei de masline" },
  { id:"salmon_hot_honey",      nameEn:"Hot Honey Garlic Salmon Bowl",           nameRo:"Bowl cu somon hot honey si orez negru",    category:["pranz sau cina"],             mealPrep:"partial", proteinMain:"file de somon",            carbMain:"orez negru sau quinoa",     fatMain:"omega-3 somon, avocado" },
  { id:"turkey_kofta",          nameEn:"Golden Turkey Kofta Bulgur Bowl",        nameRo:"Bowl cu kofte de curcan si bulgur",        category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"carne tocata curcan",      carbMain:"bulgur sau quinoa",         fatMain:"ulei de masline, tahini" },
  { id:"turkey_zucchini",       nameEn:"Turkey Zucchini Meatballs",              nameRo:"Chiftelute de curcan cu dovlecel",          category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"carne tocata curcan",      carbMain:"zucchini, pesmet integral", fatMain:"ulei de masline" },
  { id:"beef_quinoa_bowl",      nameEn:"Umami Beef Quinoa Bowl",                 nameRo:"Bowl umami cu vita si quinoa",             category:["pranz sau cina"],             mealPrep:"partial", proteinMain:"vita slaba",               carbMain:"quinoa",                    fatMain:"avocado, ulei de susan" },
  { id:"edamame_feta_bowl",     nameEn:"Edamame Feta Umami Bowl",                nameRo:"Bowl umami cu edamame si telemea",         category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"edamame, feta",            carbMain:"quinoa sau orez negru",     fatMain:"avocado, ulei de masline" },
  { id:"chickpea_hummus_bowl",  nameEn:"Crispy Chickpea Hummus Bowl",            nameRo:"Bowl cu naut crispy si hummus",            category:["pranz sau cina"],             mealPrep:"partial", proteinMain:"naut, hummus",             carbMain:"cartofi dulci, pita",       fatMain:"tahini, ulei de masline" },
  { id:"stir_fry_noodle",       nameEn:"Ginger Garlic Chicken Stir-Fry Noodles",nameRo:"Taitei wok cu pui si ghimbir",             category:["pranz sau cina"],             mealPrep:"partial", proteinMain:"piept de pui",             carbMain:"taitei de orez sau soba",   fatMain:"ulei de susan" },
  { id:"salmon_tray_bake",      nameEn:"One-Tray Lemon Herb Salmon & Veggies",   nameRo:"Somon la tava cu lamaie si legume",        category:["pranz sau cina"],             mealPrep:"nu",      proteinMain:"file de somon",            carbMain:"cartofi dulci sau noi",     fatMain:"omega-3, ulei de masline" },
  { id:"coconut_chicken_curry", nameEn:"Light Coconut Chicken Curry",            nameRo:"Curry usor de pui cu lapte de cocos",      category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"piept de pui",             carbMain:"cartofi dulci, orez integral",fatMain:"lapte de cocos light" },
  { id:"egg_fried_rice",        nameEn:"Protein Egg Fried Rice",                 nameRo:"Orez prajit cu ou si legume",              category:["mic dejun"],                  mealPrep:"partial", proteinMain:"oua, pui optional",        carbMain:"orez fiert de o zi",        fatMain:"ulei de susan" },
  { id:"loaded_sweet_potato",   nameEn:"Loaded Sweet Potato Bowl",               nameRo:"Cartof dulce umplut cu proteine",          category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"rotativ pui/curcan/naut",  carbMain:"cartof dulce",              fatMain:"avocado, ulei de masline" },
  { id:"frittata_veggie",       nameEn:"Weekly Veggie Frittata",                 nameRo:"Frittata saptamanala cu legume",           category:["mic dejun"],                  mealPrep:"da",      proteinMain:"oua, telemea",             carbMain:"legume",                    fatMain:"ulei de masline, galbenus" },
  { id:"power_salad",           nameEn:"Rotating Power Salad",                   nameRo:"Salata power cu baze rotative",            category:["pranz sau cina"],             mealPrep:"partial", proteinMain:"rotativ",                  carbMain:"quinoa sau orez sau naut",  fatMain:"avocado, seminte" },
  { id:"turkey_stuffed_peppers",nameEn:"Turkey Stuffed Bell Peppers",            nameRo:"Ardei umplut cu curcan si quinoa",         category:["pranz sau cina"],             mealPrep:"da",      proteinMain:"carne tocata curcan",      carbMain:"quinoa sau orez integral",  fatMain:"ulei de masline, parmezan" },
];

const ANTI_WASTE_GROUPS = [
  { ingredient:"Piept de pui (~600g)", icon:"🍗",
    recipes:[{id:"shawarma_bowl",note:"Marinat shawarma"},{id:"caesar_wrap",note:"Caesar wrap"},{id:"chicken_taco_bowl",note:"Taco bowl mexican"},{id:"stir_fry_noodle",note:"Wok cu ghimbir"}] },
  { ingredient:"Carne tocata curcan (~500g)", icon:"🦃",
    recipes:[{id:"turkey_kofta",note:"Kofte levantine"},{id:"turkey_zucchini",note:"Chiftelute cu zucchini"},{id:"turkey_stuffed_peppers",note:"Ardei umpluți"}] },
  { ingredient:"Somon (2 fileuri)", icon:"🐟",
    recipes:[{id:"salmon_hot_honey",note:"Hot honey bowl"},{id:"salmon_tray_bake",note:"La tava cu legume"}] },
  { ingredient:"Oua (10-12 buc)", icon:"🥚",
    recipes:[{id:"salmon_egg_muffins",note:"Egg muffins meal prep"},{id:"med_egg_scramble",note:"Scramble mediteranean"},{id:"frittata_veggie",note:"Frittata anti-waste"},{id:"egg_fried_rice",note:"Orez prajit"}] },
  { ingredient:"Edamame congelat (400g)", icon:"🫘",
    recipes:[{id:"salmon_hot_honey",note:"Bowl asiatic"},{id:"teriyaki_bowl",note:"Teriyaki bowl"},{id:"edamame_feta_bowl",note:"Bowl umami vegetarian"}] },
  { ingredient:"Naut conserva (2-3 borcane)", icon:"🫛",
    recipes:[{id:"chickpea_hummus_bowl",note:"Naut crispy"},{id:"chicken_meatball_bowl",note:"Bowl mediteranean"},{id:"loaded_sweet_potato",note:"Cartof dulce umplut"}] },
];

function calcBMR(weight,height,age,sex){
  const w=parseFloat(weight),h=parseFloat(height),a=parseFloat(age);
  if(!w||!h||!a||w<=0||h<=0||a<=0) return null;
  return Math.round((10*w+6.25*h-5*a+(sex==="M"?5:-161))*10)/10;
}

const OBJECTIVES=[
  {value:"deficit",label:"Deficit caloric",desc:"Slabire progresiva, deficit moderat"},
  {value:"recomp",label:"Recompozitie corporala",desc:"Pierdere grasime + mentinere/crestere masa musculara"},
  {value:"masa",label:"Crestere masa musculara",desc:"Surplus caloric controlat, aport proteic crescut"},
  {value:"mentinere",label:"Mentinere",desc:"Calorii la nivel de mentinere"},
  {value:"revitalizare",label:"Revitalizare metabolica",desc:"Resetare metabolism, diversificare alimentara"},
];

const DAY_EMOJIS=["🌱","🔥","🌊","⭐","🎯","✨","🌿"];

function getMealSlotNames(m){return m===2?["Pranz","Cina"]:["Mic dejun","Pranz","Cina"];}
function getSnackSlotNames(s){return s===0?[]:s===1?["Gustare"]:["Gustare 1","Gustare 2"];}
function buildTimeline(m,s){
  if(m===2&&s===0)return["M","M"];
  if(m===2&&s===1)return["M","S","M"];
  if(m===2&&s===2)return["M","S","M","S"];
  if(m===3&&s===0)return["M","M","M"];
  if(m===3&&s===1)return["M","M","S","M"];
  return["M","S","M","S","M"];
}
function structureSummary(m,s){
  const p=[];
  if(m>0) p.push(m===1?"1 masa":`${m} mese`);
  if(s>0) p.push(s===1?"1 gustare":`${s} gustari`);
  return p.length?p.join(" + "):"—";
}
function getMealPrepGroups(days){
  if(days===2) return[
    {prepDay:0,prepLabel:"Luni",eatDays:[0,1,2],eatLabels:"Luni · Marti · Miercuri"},
    {prepDay:3,prepLabel:"Joi",eatDays:[3,4,5],eatLabels:"Joi · Vineri · Sambata"},
    {prepDay:6,prepLabel:"Duminica",eatDays:[6],eatLabels:"Duminica (proaspat)"},
  ];
  return[
    {prepDay:0,prepLabel:"Luni",eatDays:[0,1],eatLabels:"Luni · Marti"},
    {prepDay:2,prepLabel:"Miercuri",eatDays:[2,3],eatLabels:"Miercuri · Joi"},
    {prepDay:4,prepLabel:"Vineri",eatDays:[4,5],eatLabels:"Vineri · Sambata"},
    {prepDay:6,prepLabel:"Duminica",eatDays:[6],eatLabels:"Duminica (proaspat)"},
  ];
}

const APP_CSS=`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#F7F4EE;color:#2C2A25;}
:root{
  --green:#3D6B4F;--green-light:#EAF2EC;
  --cream:#F7F4EE;--cream-dark:#EDE8DF;
  --warm:#C8A97A;--warm-light:#FDF6EC;
  --text:#2C2A25;--text-muted:#7A7567;
  --white:#FFFFFF;--border:#E2DDD5;
  --radius:16px;--radius-sm:10px;
}
.tog{display:inline-flex;align-items:center;gap:8px;background:var(--cream-dark);border-radius:99px;padding:4px;cursor:pointer;transition:background .2s;}
.tog.on{background:var(--green-light);}
.tog-knob{width:28px;height:28px;border-radius:50%;background:var(--white);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .2s;}
.tog.on .tog-knob{background:var(--green);border-color:var(--green);color:white;}
.tog-label{font-size:13px;padding-right:10px;color:var(--text-muted);font-weight:500;}
.tog.on .tog-label{color:var(--green);}
select{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A7567' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px !important;cursor:pointer;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.pulse{animation:pulse 1.5s ease-in-out infinite;}
`;

const SAVED_PROFILES = [
  {
  id: "vlad_valcea",
  label: "Vlad Valcea",
  client: {
    name: "Vlad Valcea",
    sex: "M",
    goal: "masa",
    age: "28",
    height: "181",
    weightCurrent: "78",
    weightTarget: "84",
    likes: "Mancare premium, street food reinterpretat, texturi variate, retete cu wow factor, bowl-uri",
    dislikes: "Mancare banala, pui simplu cu broccoli, mese monotone",
    integrate: "Proteine de calitate, carbohidrati complecsi, grasimi sanatoase, superfoods",
    cooking: "Mediu — air fryer disponibil, cuptor, tigaie. Poate gati 2-3 zile pe saptamana.",
    meals: 2,
    snacks: 1,
    mealPrepEnabled: true,
    mealPrepDays: 2,
  },
  nutri: {
    kcal: "2050",
    protein: "170",
    carbs: "210",
    fat: "75",
    fiber: "28",
    rules: "Fara oua seara. O singura masa cu carne rosie slaba pe saptamana. Edamame max 2x/saptamana.",
    distribution: "Pranz 50% · Cina 50%",
  }
},
];

const DEF_CLIENT={name:"",sex:"F",goal:"",age:"",height:"",weightCurrent:"",weightTarget:"",likes:"",dislikes:"",integrate:"",cooking:"",meals:3,snacks:1,mealPrepEnabled:false,mealPrepDays:2};
const DEF_NUTRI={kcal:"",protein:"",carbs:"",fat:"",fiber:"",rules:"",distribution:""};

export default function NutrifuelTemplate(){
  const[tab,setTab]=useState("client");
  const[nutri,setNutri]=useState(DEF_NUTRI);
  const[client,setClient]=useState(DEF_CLIENT);
  const[plan,setPlan]=useState(null);
  const[generating,setGenerating]=useState(false);
  const[genStatus,setGenStatus]=useState("");
  const[expandedDay,setExpandedDay]=useState(null);
  const[libFilter,setLibFilter]=useState("toate");
  const[libSearch,setLibSearch]=useState("");
  const[expandedRecipe,setExpandedRecipe]=useState(null);
  const[showProfiles,setShowProfiles]=useState(false);
  const[savedProfiles,setSavedProfiles]=useState(SAVED_PROFILES);
  const[activeProfileId,setActiveProfileId]=useState(null);
  const[showSaved,setShowSaved]=useState(false);
  const[storageReady,setStorageReady]=useState(false);

  const loadProfile=async(profile)=>{
    setClient({...DEF_CLIENT,...profile.client});
    setNutri({...DEF_NUTRI,...profile.nutri});
    setPlan(null);
    setGenStatus("");
    setShowProfiles(false);
    setActiveProfileId(profile.id);
    setTab("client");
    try{
      await window.storage.set('nutrifuel:activeId', profile.id);
    }catch(e){}
  };

  const saveCurrentProfile=async()=>{
    const newId = activeProfileId || ('profile_'+Date.now());
    let updated;
    if(activeProfileId){
      updated = savedProfiles.map(p=>
        p.id===activeProfileId
          ? {...p, client:{...client}, nutri:{...nutri}, label:client.name||p.label}
          : p
      );
    } else {
      const newProfile={id:newId,label:client.name||'Client nou',client:{...client},nutri:{...nutri}};
      updated=[...savedProfiles, newProfile];
      setActiveProfileId(newId);
    }
    setSavedProfiles(updated);
    try{
      await window.storage.set('nutrifuel:profiles', JSON.stringify(updated));
      await window.storage.set('nutrifuel:activeId', newId);
    }catch(e){ console.warn('Storage save failed', e); }
    setShowSaved(true);
    setTimeout(()=>setShowSaved(false), 2500);
  };

  // ── Load from persistent storage on mount ─────────────────────────────
  useState(()=>{
    (async()=>{
      try{
        const profilesRes = await window.storage.get('nutrifuel:profiles');
        if(profilesRes && profilesRes.value){
          const stored = JSON.parse(profilesRes.value);
          if(stored && stored.length>0) setSavedProfiles(stored);
        }
        const activeRes = await window.storage.get('nutrifuel:activeId');
        if(activeRes && activeRes.value){
          const aid = activeRes.value;
          setActiveProfileId(aid);
          const profilesData = profilesRes && profilesRes.value ? JSON.parse(profilesRes.value) : SAVED_PROFILES;
          const active = profilesData.find(p=>p.id===aid);
          if(active){
            setClient({...DEF_CLIENT,...active.client});
            setNutri({...DEF_NUTRI,...active.nutri});
          }
        }
        setStorageReady(true);
      }catch(e){
        setStorageReady(true);
      }
    })();
  });

  const bmr=useMemo(()=>calcBMR(client.weightCurrent,client.height,client.age,client.sex),[client.weightCurrent,client.height,client.age,client.sex]);
  const bmrReady=bmr!==null;
  const setC=(k,v)=>setClient(c=>({...c,[k]:v}));
  const setN=(k,v)=>setNutri(n=>({...n,[k]:v}));
  const kcalNum=parseFloat(nutri.kcal)||0;
  const protNum=parseFloat(nutri.protein)||0;
  const carbsNum=parseFloat(nutri.carbs)||0;
  const fatNum=parseFloat(nutri.fat)||0;
  const calcKcal=protNum*4+carbsNum*4+fatNum*9;
  const fiberNum=parseFloat(nutri.fiber)||0;
  const fiberMin=client.sex==="M"?22:15;
  const fiberMax=client.sex==="M"?35:25;
  const diff=calcKcal-kcalNum;
  const timeline=buildTimeline(client.meals,client.snacks);
  const mealSlotNames=getMealSlotNames(client.meals);
  const snackSlotNames=getSnackSlotNames(client.snacks);
  const prepGroups=getMealPrepGroups(client.mealPrepDays);
  const prepDayIdxs=prepGroups.filter(g=>g.eatDays.length>1).map(g=>g.prepDay);
  const dayPrepGroup=idx=>prepGroups.find(g=>g.eatDays.includes(idx));
  const selectedObj=OBJECTIVES.find(o=>o.value===client.goal);
  const mealPrepLabel=client.mealPrepDays===2?"Luni + Joi":"Luni + Miercuri + Vineri";
  const LIB_CATS=["toate","mic dejun","pranz sau cina","gustare dulce","gustare sarata"];
  const filteredRecipes=RECIPES.filter(r=>{
    const mc=libFilter==="toate"||r.category.includes(libFilter);
    const ms=libSearch===""||r.nameRo.toLowerCase().includes(libSearch.toLowerCase())||r.nameEn.toLowerCase().includes(libSearch.toLowerCase())||r.proteinMain.toLowerCase().includes(libSearch.toLowerCase());
    return mc&&ms;
  });

  const recipeCtx=()=>{
    const cats=client.meals===2?["pranz sau cina"]:["mic dejun","pranz sau cina"];
    if(client.snacks>0) cats.push("gustare dulce","gustare sarata");
    return RECIPES.filter(r=>r.category.some(c=>cats.includes(c))).map(r=>`- ${r.nameEn} / ${r.nameRo} | P:${r.proteinMain} | C:${r.carbMain} | MP:${r.mealPrep}`).join("\n");
  };

  const buildPrompt=()=>{
    const allSlots=[];let mi=0,si=0;
    timeline.forEach(type=>{
      if(type==="M"){allSlots.push(mealSlotNames[mi]||"Masa "+(mi+1));mi++;}
      else{allSlots.push(snackSlotNames[si]||"Gustare "+(si+1));si++;}
    });
    const distrib=nutri.distribution||(client.meals===2?"Pranz 50% / Cina 50%":"Mic dejun 25% / Pranz 40% / Cina 35%");
    const mpInstr=client.mealPrepEnabled?`\nMEAL PREP:\n${prepGroups.map(g=>`- Gatit ${g.prepLabel} => ${g.eatLabels}${g.eatDays.length>1?" ("+g.eatDays.length+" portii)":""}`).join("\n")}\nZilele din acelasi grup au ACELEASI retete, fiecare zi atinge exact tinta.`:"";
    return `Esti un nutritionist expert care genereaza planuri alimentare precise. TOATE instructiunile de mai jos sunt OBLIGATORII si NON-NEGOCIABILE.

═══════════════════════════════════════════
CLIENT: ${client.name} | ${client.sex==="F"?"F":"M"} | ${client.age} ani | ${client.height}cm | ${client.weightCurrent}kg${client.weightTarget?" | Tinta: "+client.weightTarget+"kg":""}
Obiectiv: ${selectedObj?.label||"—"}${selectedObj?" — "+selectedObj.desc:""}
BMR: ${bmrReady?Math.round(bmr)+" kcal/zi (ABSOLUT MINIM, nu se coboara sub aceasta valoare)":"—"}
═══════════════════════════════════════════

⚠️ TINTA CALORICA STRICTA — REGULA #1 ⚠️
Fiecare zi TREBUIE sa aiba intre ${Math.round(kcalNum*0.90)} si ${Math.round(kcalNum*1.10)} kcal.
TINTA: ${kcalNum} kcal/zi.
NU 1200, NU 1400, NU 1500. EXACT ${kcalNum} kcal (±10%).
Daca o masa are 400 kcal si alta 500 kcal = total 900 kcal = GRESIT pentru 2 mese la ${kcalNum} kcal.
Fiecare masa principala trebuie sa aiba ${client.meals===2?Math.round(kcalNum*0.50):Math.round(kcalNum*0.40)}–${client.meals===2?Math.round(kcalNum*0.55):Math.round(kcalNum*0.45)} kcal (pentru mese principale).
Gramajele ingredientelor trebuie calculate MATEMATIC pentru a atinge tinta.

⚠️ MACRO-URI ZILNICE OBLIGATORII — REGULA #2 ⚠️
Proteine: ${protNum}g (±10% = ${Math.round(protNum*0.9)}–${Math.round(protNum*1.1)}g)
Carbohidrati: ${carbsNum}g (±10% = ${Math.round(carbsNum*0.9)}–${Math.round(carbsNum*1.1)}g)
Grasimi: ${fatNum}g (±10% = ${Math.round(fatNum*0.9)}–${Math.round(fatNum*1.1)}g)
Fibre: ${fiberNum>0?fiberNum+"g":fiberMin+"–"+fiberMax+"g"} (strict intre ${fiberMin} si ${fiberMax}g)
Distributie pe mese: ${distrib}
${nutri.rules?"Reguli speciale: "+nutri.rules:""}

VERIFICARE MATEMATICA OBLIGATORIE inainte de a scrie JSON:
- Aduna kcal din FIECARE ingredient al FIECAREI mese
- Verifica ca totalul zilei e intre ${Math.round(kcalNum*0.90)}–${Math.round(kcalNum*1.10)} kcal
- Daca nu, ajusteaza gramajele, NU schimba reteta

═══════════════════════════════════════════
PREFERINTE CLIENT:
- Ii place: ${client.likes||"—"}
- Nu tolereaza: ${client.dislikes||"—"}
- De integrat: ${client.integrate||"—"}
- Gatit & echipament: ${client.cooking||"—"}
═══════════════════════════════════════════

REGULA OUALE (ABSOLUTA):
Ouale/omleta/frittata/scrambled eggs = DOAR mic dejun sau gustare. NICIODATA pranz/cina.

FIBRE (OBLIGATORIU):
Calculeaza fibrele per masa. Total zilnic: ${fiberMin}–${fiberMax}g strict.
Surse: legume, leguminoase, cereale integrale, fructe, seminte.

═══════════════════════════════════════════
STRUCTURA ZILEI: ${structureSummary(client.meals,client.snacks)}
Sloturi in ordine: ${allSlots.join(" → ")}
${client.meals===2?"Prima masa a zilei = PRANZ (nu exista mic dejun).":""}
${mpInstr}
═══════════════════════════════════════════

LOGICA MEAL PREP — REGULA #3:
${client.mealPrepEnabled?`Zilele din acelasi grup de prep POT folosi aceeasi proteina principala (ex: pui), DAR mesele trebuie sa fie DIFERITE ca prezentare, condimente, sos si garnitura. Exemple pentru aceeasi proteina (pui):
- Luni pranz: Chicken Shawarma Bowl (condimente levantine, cartofi dulci, sos tahini)
- Marti pranz: Honey Garlic Chicken Rice Bowl (sos asiatic, orez negru, edamame)
- Miercuri pranz: Greek Souvlaki Plate (condimente grecesti, tzatziki, legume la gratar)
Proteina e aceeasi, dar clientul simte ca mananca DIFERIT in fiecare zi.
Fiecare zi din grup atinge INDEPENDENT tinta de ${kcalNum} kcal prin gramaje calibrate per portie.`:"Fara meal prep — fiecare zi are retete independente."}

ANTI-FOOD-WASTE:
Daca alegi o proteina principala pentru saptamana, planifica 3-4 preparari diferite: schimba marinada, sosul, garnitura, tehnica de gatit (gratar/cuptor/air fryer/tigaie/wok).

BIBLIOTECA RETETE (adapteaza gramajele la tinta calorica):
${recipeCtx()}

═══════════════════════════════════════════
RASPUNDE EXCLUSIV CU JSON VALID, ZERO TEXT IN AFARA JSON:
{"days":[{"day":"Luni","tag":"tag scurt creativ","prepNote":"doar pt zilele de prep: ex Gateste 3 portii — acopera Luni Marti Miercuri, altfel string gol","meals":[{"slot":"Pranz","name":"Nume reteta premium","ingredients":"pui 200g, orez integral 80g, broccoli 150g, ulei masline 10g, usturoi 5g","method":"Gratar pui 7 min/parte, fierbe orez 18 min, soteza broccoli cu usturoi 5 min.","kcal":620,"protein":52,"carbs":58,"fat":18,"fiber":8,"time":"25 min"}],"totalKcal":2050,"totalProtein":170,"totalCarbs":210,"totalFat":75,"totalFiber":28}]}`;
  };

  const handleGenerate=async()=>{
    if(!client.name.trim()){alert("Completeaza numele clientului.");return;}
    if(!kcalNum){alert("Completeaza caloriile in Strategie.");return;}
    setGenerating(true);setPlan(null);setGenStatus("Construiesc profilul nutritional...");setTab("plan");
    try{
      setGenStatus("Generez retete din biblioteca...");
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:8000,messages:[{role:"user",content:buildPrompt()}]})});
      const data=await res.json();
      const text=(data.content||[]).map(b=>b.text||"").join("");
      setGenStatus("Validez planul...");
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      if(!parsed.days||!Array.isArray(parsed.days)) throw new Error("Format invalid");
      setPlan(parsed.days);setGenStatus("");
    }catch(err){console.error(err);setGenStatus("Eroare la generare. Incearca din nou.");}
    finally{setGenerating(false);}
  };

  const tabs=[
    {id:"client",label:"Client",icon:"👤"},
    {id:"strategie",label:"Strategie",icon:"🎯"},
    {id:"biblioteca",label:"Retete",icon:"📖"},
    {id:"plan",label:"Plan 7 Zile",icon:"📅",locked:!plan&&!generating},
  ];

  if(!storageReady){
    return(
      <div style={{minHeight:"100vh",background:"var(--cream)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <style>{APP_CSS}</style>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}} className="pulse">🌿</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--green)"}}>NutriFuel</div>
          <div style={{fontSize:13,color:"var(--text-muted)",marginTop:6}}>Se incarca profilurile...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"var(--cream)"}}>
      <style>{APP_CSS}</style>

      <div style={{background:"var(--white)",borderBottom:"1px solid var(--border)",padding:"0 2rem"}}>
        <div style={{maxWidth:1020,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,background:"var(--green)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🌿</div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:600,color:"var(--green)",lineHeight:1.1}}>NutriFuel</div>
              <div style={{fontSize:10,color:"var(--text-muted)",letterSpacing:"0.12em",textTransform:"uppercase"}}>by Corina</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,position:"relative"}}>
            <button onClick={()=>setShowProfiles(p=>!p)}
              style={{fontSize:12,color:"var(--green)",background:"var(--green-light)",padding:"5px 14px",borderRadius:99,border:"1px solid #C5DCC9",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6}}>
              Clienti salvati ›
            </button>
            <div style={{fontSize:12,color:"var(--text-muted)",background:"var(--cream-dark)",padding:"5px 14px",borderRadius:99,border:"1px solid var(--border)"}}>
              {client.name ? client.name : "Template nou"}
            </div>
            {client.name && (
              <button onClick={saveCurrentProfile}
                style={{fontSize:12,color:"white",background:"var(--green)",padding:"5px 14px",borderRadius:99,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5,transition:"all .2s"}}>
                {showSaved ? "✓ Salvat!" : "💾 Salvează modificările"}
              </button>
            )}
            {showSaved && (
              <div style={{position:"fixed",bottom:24,right:24,background:"var(--green)",color:"white",padding:"12px 20px",borderRadius:"var(--radius-sm)",fontSize:13,fontWeight:500,boxShadow:"0 4px 20px rgba(60,100,60,.3)",zIndex:999,display:"flex",alignItems:"center",gap:8}}>
                ✓ Profilul lui {client.name} a fost salvat
              </div>
            )}
            {showProfiles && (
              <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:"var(--white)",borderRadius:"var(--radius)",border:"1px solid var(--border)",boxShadow:"0 8px 32px rgba(60,55,45,.14)",zIndex:100,minWidth:260,overflow:"hidden"}}>
                <div style={{padding:"10px 16px",borderBottom:"1px solid var(--border)",fontSize:11,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500}}>Incarca profil client</div>
                {savedProfiles.map(p=>(
                  <div key={p.id} onClick={()=>loadProfile(p)}
                    style={{padding:"12px 16px",cursor:"pointer",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:500,color:"var(--text)"}}>{p.label}</div>
                      <div style={{fontSize:11,color:"var(--text-muted)",marginTop:2}}>{p.nutri.kcal} kcal · {p.client.sex==="M"?"Masculin":"Feminin"} · {p.client.goal}</div>
                    </div>
                    <span style={{fontSize:11,color:"var(--green)",background:"var(--green-light)",padding:"2px 8px",borderRadius:99,border:"1px solid #C5DCC9"}}>Incarca</span>
                  </div>
                ))}
                <div onClick={()=>{setClient({...DEF_CLIENT});setNutri({...DEF_NUTRI});setPlan(null);setShowProfiles(false);setTab("client");}}
                  style={{padding:"10px 16px",cursor:"pointer",fontSize:12,color:"var(--text-muted)",textAlign:"center",borderTop:"1px solid var(--border)"}}>
                  + Client nou / Template gol
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{maxWidth:1020,margin:"0 auto",display:"flex",gap:4}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>!t.locked&&setTab(t.id)}
              style={{padding:"10px 18px",border:"none",background:"none",cursor:t.locked?"not-allowed":"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",color:tab===t.id?"var(--green)":t.locked?"#C0BAB0":"var(--text-muted)",borderBottom:tab===t.id?"2px solid var(--green)":"2px solid transparent",fontWeight:tab===t.id?500:400,transition:"all .15s",display:"flex",alignItems:"center",gap:6}}>
              {t.icon} {t.label}{t.locked&&<span style={{fontSize:10}}>🔒</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1020,margin:"0 auto",padding:"2rem 1.5rem"}}>

        {tab==="client" && (
          <ClientTab client={client} setC={setC} bmr={bmr} bmrReady={bmrReady}
            selectedObj={selectedObj} timeline={timeline} mealSlotNames={mealSlotNames}
            snackSlotNames={snackSlotNames} prepGroups={prepGroups}
            generating={generating} hasPlan={!!plan} kcalNum={kcalNum}
            onGenerate={handleGenerate} />
        )}

        {tab==="strategie" && (
          <StrategieTab nutri={nutri} setN={setN} bmr={bmr} bmrReady={bmrReady}
            client={client} kcalNum={kcalNum} protNum={protNum} carbsNum={carbsNum}
            fatNum={fatNum} fiberNum={fiberNum} fiberMin={fiberMin} fiberMax={fiberMax}
            calcKcal={calcKcal} diff={diff}
            generating={generating} hasPlan={!!plan} onGenerate={handleGenerate} />
        )}

        {tab==="biblioteca" && (
          <BibliotecaTab LIB_CATS={LIB_CATS} libFilter={libFilter} setLibFilter={setLibFilter}
            libSearch={libSearch} setLibSearch={setLibSearch} filteredRecipes={filteredRecipes}
            expandedRecipe={expandedRecipe} setExpandedRecipe={setExpandedRecipe} />
        )}

        {tab==="plan" && (
          <PlanTab plan={plan} generating={generating} genStatus={genStatus}
            client={client} selectedObj={selectedObj} kcalNum={kcalNum}
            protNum={protNum} carbsNum={carbsNum} fatNum={fatNum}
            fiberNum={fiberNum} fiberMin={fiberMin} fiberMax={fiberMax}
            mealPrepLabel={mealPrepLabel} prepDayIdxs={prepDayIdxs} dayPrepGroup={dayPrepGroup}
            expandedDay={expandedDay} setExpandedDay={setExpandedDay}
            onGenerate={handleGenerate} />
        )}

      </div>
    </div>
  );
}

// ── CLIENT TAB ────────────────────────────────────────────────────────────────
function ClientTab({client,setC,bmr,bmrReady,selectedObj,timeline,mealSlotNames,snackSlotNames,prepGroups,generating,hasPlan,kcalNum,onGenerate}){
  return (
    <div>
      <SH title="Profilul Clientului" sub="Completeaza datele inainte de a genera planul" />

      <div style={{background:"var(--white)",borderRadius:"var(--radius)",padding:24,border:"1px solid var(--border)",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:20}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"var(--green-light)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,border:"2px solid #C5DCC9",flexShrink:0}}>👤</div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>
            <input value={client.name} onChange={e=>setC("name",e.target.value)} placeholder="Numele clientului"
              style={{border:"none",background:"none",fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:600,color:"var(--text)",outline:"none",width:"100%",borderBottom:"2px solid var(--border)",paddingBottom:4}} />
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:12,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.08em"}}>Sex</span>
              {[{v:"F",l:"Feminin"},{v:"M",l:"Masculin"}].map(opt=>(
                <button key={opt.v} onClick={()=>setC("sex",opt.v)}
                  style={{padding:"5px 16px",borderRadius:99,border:`1.5px solid ${client.sex===opt.v?"var(--green)":"var(--border)"}`,background:client.sex===opt.v?"var(--green)":"transparent",color:client.sex===opt.v?"white":"var(--text-muted)",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:client.sex===opt.v?500:400,transition:"all .15s"}}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
          {[{label:"Varsta (ani)",key:"age",ph:"ex: 35",type:"number"},{label:"Inaltime (cm)",key:"height",ph:"ex: 168",type:"number"},{label:"Greutate actuala (kg)",key:"weightCurrent",ph:"ex: 72",type:"number"},{label:"Greutate tinta (kg)",key:"weightTarget",ph:"ex: 65",type:"text"}].map(f=>(
            <div key={f.key}>
              <LB>{f.label}</LB>
              <input type={f.type} value={client[f.key]} onChange={e=>setC(f.key,e.target.value)} placeholder={f.ph}
                style={{border:"1px solid var(--border)",borderRadius:8,padding:"8px 10px",fontSize:14,fontFamily:"'DM Sans',sans-serif",background:"var(--cream)",color:"var(--text)",width:"100%"}} />
            </div>
          ))}
        </div>

        <div style={{borderRadius:"var(--radius-sm)",border:`1.5px solid ${bmrReady?"var(--green)":"var(--border)"}`,background:bmrReady?"var(--green-light)":"var(--cream-dark)",padding:"12px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:bmrReady?"var(--green)":"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3,fontWeight:500}}>BMR · Mifflin-St Jeor · {client.sex==="M"?"Masculin":"Feminin"}</div>
            <div style={{fontSize:12,color:"var(--text-muted)",fontFamily:"monospace"}}>{bmrReady?`(10x${client.weightCurrent}) + (6.25x${client.height}) - (5x${client.age}) ${client.sex==="M"?"+5":"-161"} = ${bmr}`:"Completeaza varsta, inaltimea, greutatea"}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:600,color:bmrReady?"var(--green)":"var(--text-muted)"}}>{bmrReady?`${Math.round(bmr)} kcal`:"—"}</div>
            <div style={{fontSize:11,color:bmrReady?"var(--green)":"var(--text-muted)"}}>minim absolut / zi</div>
          </div>
        </div>
      </div>

      <div style={{background:"var(--white)",borderRadius:"var(--radius)",padding:20,border:"1px solid var(--border)",marginBottom:20}}>
        <LB>Obiectiv</LB>
        <select value={client.goal} onChange={e=>setC("goal",e.target.value)}
          style={{width:"100%",border:"1px solid var(--border)",borderRadius:8,padding:"11px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",background:"var(--cream)",color:client.goal?"var(--text)":"var(--text-muted)"}}>
          <option value="" disabled>Alege obiectivul clientului...</option>
          {OBJECTIVES.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {selectedObj && (
          <div style={{marginTop:10,padding:"9px 14px",background:"var(--green-light)",borderRadius:"var(--radius-sm)",border:"1px solid #C5DCC9",fontSize:13,color:"var(--green)"}}>
            {selectedObj.desc}
          </div>
        )}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        {[
          {icon:"❤️",label:"Ii place",key:"likes",ph:"Street food, mancare picanta, texturi crocante..."},
          {icon:"🚫",label:"Nu vrea / Nu tolereaza",key:"dislikes",ph:"Alergii, intolerante, alimente de evitat..."},
          {icon:"✨",label:"Vrem sa integram",key:"integrate",ph:"Mai mult peste, leguminoase 2x/sapt, quinoa..."},
          {icon:"🍳",label:"Nivel gatit & echipament",key:"cooking",ph:"Incepator / mediu / avansat · Air fryer · Cuptor..."},
        ].map(f=>(
          <div key={f.key} style={{background:"var(--white)",borderRadius:"var(--radius)",padding:20,border:"1px solid var(--border)"}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:10}}>{f.icon} {f.label}</div>
            <textarea rows={4} value={client[f.key]} onChange={e=>setC(f.key,e.target.value)} placeholder={f.ph}
              style={{width:"100%",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px",fontSize:13,fontFamily:"'DM Sans',sans-serif",background:"var(--cream)",resize:"none",color:"var(--text)",lineHeight:1.6}} />
          </div>
        ))}
      </div>

      <div style={{background:"var(--white)",borderRadius:"var(--radius)",padding:24,border:"1px solid var(--border)",marginBottom:20}}>
        <LB>Structura zilei</LB>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
          <div>
            <div style={{fontSize:13,fontWeight:500,marginBottom:10}}>Mese principale</div>
            <div style={{display:"flex",gap:8}}>
              {[{n:2,label:"2 mese",sub:"Pranz + Cina"},{n:3,label:"3 mese",sub:"MD + Pranz + Cina"}].map(opt=>(
                <button key={opt.n} onClick={()=>setC("meals",opt.n)}
                  style={{flex:1,padding:"14px 8px",borderRadius:"var(--radius-sm)",border:`2px solid ${client.meals===opt.n?"var(--green)":"var(--border)"}`,background:client.meals===opt.n?"var(--green)":"var(--cream)",color:client.meals===opt.n?"white":"var(--text-muted)",cursor:"pointer",transition:"all .15s",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <span style={{fontSize:22}}>{opt.n===2?"🌤️🌙":"☀️🌤️🌙"}</span>
                  <span style={{fontSize:13,fontWeight:500}}>{opt.label}</span>
                  <span style={{fontSize:11,opacity:.8}}>{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:13,fontWeight:500,marginBottom:10}}>Gustari</div>
            <div style={{display:"flex",gap:8}}>
              {[{n:0,label:"Fara",emoji:"—"},{n:1,label:"1",emoji:"🍎"},{n:2,label:"2",emoji:"🍎🍊"}].map(opt=>(
                <button key={opt.n} onClick={()=>setC("snacks",opt.n)}
                  style={{flex:1,padding:"14px 8px",borderRadius:"var(--radius-sm)",border:`2px solid ${client.snacks===opt.n?"var(--green)":"var(--border)"}`,background:client.snacks===opt.n?"var(--green)":"var(--cream)",color:client.snacks===opt.n?"white":"var(--text-muted)",cursor:"pointer",transition:"all .15s",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <span style={{fontSize:22}}>{opt.emoji}</span>
                  <span style={{fontSize:13,fontWeight:500}}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DayTimeline meals={client.meals} snacks={client.snacks} timeline={timeline} mealSlotNames={mealSlotNames} snackSlotNames={snackSlotNames} />
      </div>

      <div style={{background:"var(--white)",borderRadius:"var(--radius)",padding:24,border:"1px solid var(--border)",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:client.mealPrepEnabled?20:0}}>
          <div>
            <div style={{fontSize:15,fontWeight:500,marginBottom:3}}>Meal Prep</div>
            <div style={{fontSize:13,color:"var(--text-muted)"}}>Gatesti o data, mananci mai multe zile</div>
          </div>
          <div className={`tog${client.mealPrepEnabled?" on":""}`} onClick={()=>setC("mealPrepEnabled",!client.mealPrepEnabled)}>
            <div className="tog-knob">{client.mealPrepEnabled?"✓":""}</div>
            <span className="tog-label">{client.mealPrepEnabled?"Activat":"Dezactivat"}</span>
          </div>
        </div>
        {client.mealPrepEnabled && (
          <div>
            <LB style={{marginBottom:12}}>Zile de meal prep / saptamana</LB>
            <div style={{display:"flex",gap:12,marginBottom:16}}>
              {[{days:2,title:"2 zile",sub:"Luni + Joi"},{days:3,title:"3 zile",sub:"Luni + Miercuri + Vineri"}].map(opt=>(
                <div key={opt.days} onClick={()=>setC("mealPrepDays",opt.days)}
                  style={{flex:1,padding:16,borderRadius:"var(--radius-sm)",border:`2px solid ${client.mealPrepDays===opt.days?"var(--green)":"var(--border)"}`,background:client.mealPrepDays===opt.days?"var(--green-light)":"var(--cream)",cursor:"pointer",transition:"all .15s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <RD checked={client.mealPrepDays===opt.days} />
                    <span style={{fontWeight:500,fontSize:14,color:client.mealPrepDays===opt.days?"var(--green)":"var(--text)"}}>{opt.title}</span>
                    <span style={{fontSize:12,color:"var(--text-muted)"}}>· {opt.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <MealPrepFlow groups={prepGroups} />
          </div>
        )}
      </div>

      <GenBtn generating={generating} hasPlan={hasPlan} onGenerate={onGenerate} clientName={client.name} hasKcal={kcalNum>0} />
    </div>
  );
}

// ── STRATEGIE TAB ─────────────────────────────────────────────────────────────
function StrategieTab({nutri,setN,bmr,bmrReady,client,kcalNum,protNum,carbsNum,fatNum,fiberNum,fiberMin,fiberMax,calcKcal,diff,generating,hasPlan,onGenerate}){
  return (
    <div>
      <SH title="Configurare Strategie" sub="Parametrii nutritionali stabiliti de nutritionist" />
      {bmrReady ? (
        <div style={{background:"var(--green-light)",borderRadius:"var(--radius-sm)",padding:"12px 20px",border:"1px solid #C5DCC9",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:13,color:"var(--green)"}}>BMR · {client.name||"client"} · {client.sex==="M"?"M":"F"} · {client.age} ani · {client.weightCurrent} kg · {client.height} cm</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600,color:"var(--green)"}}>{Math.round(bmr)} kcal/zi — minim absolut</div>
        </div>
      ) : (
        <div style={{background:"var(--cream-dark)",borderRadius:"var(--radius-sm)",padding:"12px 18px",border:"1px solid var(--border)",marginBottom:16,fontSize:13,color:"var(--text-muted)"}}>
          Completeaza datele biometrice in Client pentru BMR automat.
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {[{label:"Calorii tinta",key:"kcal",suffix:"kcal",color:"#C8A97A",ph:"ex: 1400"},{label:"Proteine",key:"protein",suffix:"g",color:"var(--green)",ph:"ex: 130"},{label:"Carbohidrati",key:"carbs",suffix:"g",color:"#7BA3C8",ph:"ex: 80"},{label:"Grasimi",key:"fat",suffix:"g",color:"#C87A8A",ph:"ex: 60"},{label:"Fibre",key:"fiber",suffix:"g",color:"#7BA38A",ph:`ex: ${client.sex==="M"?"22-35":"15-25"}`}].map(f=>(
          <div key={f.key} style={{background:"var(--white)",borderRadius:"var(--radius)",padding:20,border:"1px solid var(--border)"}}>
            <LB>{f.label}</LB>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <input type="number" value={nutri[f.key]} onChange={e=>setN(f.key,e.target.value)} placeholder={f.ph}
                style={{border:"1px solid var(--border)",borderRadius:8,padding:"8px 12px",fontSize:22,fontWeight:500,width:"100%",color:f.color,background:"var(--cream)",fontFamily:"'DM Sans',sans-serif"}} />
              <span style={{fontSize:13,color:"var(--text-muted)",whiteSpace:"nowrap"}}>{f.suffix}</span>
            </div>
            {f.key==="kcal" && bmrReady && kcalNum>0 && kcalNum<Math.round(bmr) && (
              <div style={{marginTop:8,fontSize:12,color:"#8A3020",background:"#FEF0EF",borderRadius:6,padding:"6px 10px",border:"1px solid #F5C4B3"}}>
                Sub BMR! Minim: {Math.round(bmr)} kcal/zi
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {[{label:"Reguli speciale",key:"rules",rows:4,ph:"Fara gratar, oua doar dimineata, zero orez alb..."},{label:"Distributie calorii / zi",key:"distribution",rows:2,ph:client.meals===2?"Pranz 50% · Cina 50%":"Mic dejun 25% · Pranz 40% · Cina 35%"}].map(f=>(
          <div key={f.key} style={{background:"var(--white)",borderRadius:"var(--radius)",padding:20,border:"1px solid var(--border)"}}>
            <LB>{f.label}</LB>
            <textarea rows={f.rows} value={nutri[f.key]} onChange={e=>setN(f.key,e.target.value)} placeholder={f.ph}
              style={{width:"100%",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px",fontSize:13,fontFamily:"'DM Sans',sans-serif",background:"var(--cream)",resize:"none",color:"var(--text)",lineHeight:1.6}} />
          </div>
        ))}
      </div>

      <div style={{background:"var(--white)",borderRadius:"var(--radius)",padding:24,border:"1px solid var(--border)",marginBottom:24}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,marginBottom:16}}>Distributie macro</div>
        {[{label:"Proteine",val:protNum,max:220,color:"var(--green)"},{label:"Carbohidrati",val:carbsNum,max:220,color:"#7BA3C8"},{label:"Grasimi",val:fatNum,max:150,color:"#C8A97A"},{label:"Fibre",val:fiberNum,max:client.sex==="M"?35:25,color:"#7BA38A"}].map(b=>(
          <div key={b.label} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--text-muted)",marginBottom:4}}>
              <span>{b.label}</span><span style={{fontWeight:500,color:"var(--text)"}}>{b.val}g</span>
            </div>
            <div style={{height:6,background:"var(--cream-dark)",borderRadius:99,overflow:"hidden"}}>
              <div style={{width:`${Math.min(100,(b.val/b.max)*100)}%`,height:"100%",background:b.color,borderRadius:99,transition:"width .8s"}} />
            </div>
          </div>
        ))}
        <div style={{marginTop:14,padding:"12px 16px",background:"var(--cream)",borderRadius:"var(--radius-sm)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:13,color:"var(--text-muted)"}}>({protNum}x4) + ({carbsNum}x4) + ({fatNum}x9) = <strong style={{color:"var(--text)"}}>{calcKcal} kcal</strong></div>
          {kcalNum>0 && calcKcal>0 && Math.abs(diff)>30 && <span style={{fontSize:12,color:"#8A3020",background:"#FEF0EF",padding:"4px 12px",borderRadius:99,border:"1px solid #F5C4B3"}}>⚠ {diff>0?"+":""}{diff} kcal ({Math.round(Math.abs(diff)/kcalNum*100)}%)</span>}
          {kcalNum>0 && calcKcal>0 && Math.abs(diff)<=30 && <span style={{fontSize:12,color:"var(--green)",background:"var(--green-light)",padding:"4px 12px",borderRadius:99,border:"1px solid #C5DCC9"}}>✓ Macro-uri aliniate</span>}
          {fiberNum>0 && fiberNum<fiberMin && <span style={{fontSize:12,color:"#8A3020",background:"#FEF0EF",padding:"4px 12px",borderRadius:99,border:"1px solid #F5C4B3"}}>⚠ Fibre sub minim ({fiberMin}g)</span>}
          {fiberNum>0 && fiberNum>fiberMax && <span style={{fontSize:12,color:"#8A3020",background:"#FEF0EF",padding:"4px 12px",borderRadius:99,border:"1px solid #F5C4B3"}}>⚠ Fibre peste maxim ({fiberMax}g)</span>}
          {fiberNum>=fiberMin && fiberNum<=fiberMax && <span style={{fontSize:12,color:"#3D7A5A",background:"#EAF4EE",padding:"4px 12px",borderRadius:99,border:"1px solid #A8D4B4"}}>🌾 Fibre OK · {fiberNum}g / {fiberMin}-{fiberMax}g</span>}
        </div>
      </div>

      <GenBtn generating={generating} hasPlan={hasPlan} onGenerate={onGenerate} clientName={client.name} hasKcal={kcalNum>0} />
    </div>
  );
}

// ── BIBLIOTECA TAB ────────────────────────────────────────────────────────────
function BibliotecaTab({LIB_CATS,libFilter,setLibFilter,libSearch,setLibSearch,filteredRecipes,expandedRecipe,setExpandedRecipe}){
  return (
    <div>
      <SH title="Biblioteca de Retete" sub={`${RECIPES.length} retete · Baze ajustabile · Anti-food-waste · Meal prep ready`} />

      <div style={{background:"var(--white)",borderRadius:"var(--radius)",padding:20,border:"1px solid var(--border)",marginBottom:20}}>
        <input value={libSearch} onChange={e=>setLibSearch(e.target.value)} placeholder="Cauta dupa nume, proteina..."
          style={{width:"100%",border:"1px solid var(--border)",borderRadius:8,padding:"10px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",background:"var(--cream)",color:"var(--text)",marginBottom:12,outline:"none"}} />
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {LIB_CATS.map(cat=>(
            <button key={cat} onClick={()=>setLibFilter(cat)}
              style={{padding:"6px 14px",borderRadius:99,border:`1.5px solid ${libFilter===cat?"var(--green)":"var(--border)"}`,background:libFilter===cat?"var(--green)":"transparent",color:libFilter===cat?"white":"var(--text-muted)",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",transition:"all .15s",fontWeight:libFilter===cat?500:400,textTransform:"capitalize"}}>
              {cat}
            </button>
          ))}
          <span style={{fontSize:12,color:"var(--text-muted)",alignSelf:"center",marginLeft:4}}>{filteredRecipes.length} retete</span>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:32}}>
        {filteredRecipes.map(r=>{
          const isExp=expandedRecipe===r.id;
          const mpColor=r.mealPrep==="da"?"var(--green)":r.mealPrep==="partial"?"var(--warm)":"var(--text-muted)";
          return (
            <div key={r.id} style={{background:"var(--white)",borderRadius:"var(--radius)",border:"1px solid var(--border)",overflow:"hidden",boxShadow:isExp?"0 4px 24px rgba(60,55,45,.1)":"none"}}>
              <div onClick={()=>setExpandedRecipe(isExp?null:r.id)} style={{padding:"16px 18px",cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:600,marginBottom:2}}>{r.nameEn}</div>
                    <div style={{fontSize:12,color:"var(--text-muted)"}}>{r.nameRo}</div>
                  </div>
                  <div style={{fontSize:16,marginLeft:8,flexShrink:0,transform:isExp?"rotate(180deg)":"none",transition:"transform .2s"}}>›</div>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
                  {r.category.map(c=><span key={c} style={{fontSize:10,background:"var(--cream-dark)",color:"var(--text-muted)",padding:"2px 8px",borderRadius:99,textTransform:"capitalize"}}>{c}</span>)}
                  <span style={{fontSize:10,background:`${mpColor}20`,color:mpColor,padding:"2px 8px",borderRadius:99,fontWeight:500}}>meal prep: {r.mealPrep}</span>
                </div>
              </div>
              {isExp && (
                <div style={{borderTop:"1px solid var(--border)",padding:"14px 18px",background:"var(--cream)",display:"grid",gap:8}}>
                  <RW label="Proteina" val={r.proteinMain} />
                  <RW label="Carbohidrat" val={r.carbMain} />
                  <RW label="Grasimi" val={r.fatMain} />
                  <div style={{fontSize:12,color:"var(--text-muted)",background:"var(--green-light)",borderRadius:8,padding:"8px 12px",border:"1px solid #C5DCC9",marginTop:4}}>
                    Gramajele se calibreaza automat la tinta calorica si macro a clientului la generarea planului.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{marginBottom:16}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600,marginBottom:4}}>Grupuri Anti-Food-Waste</div>
        <div style={{color:"var(--text-muted)",fontSize:14,marginBottom:20}}>Cumperi o data, gatesti diferit de 3-4 ori in saptamana</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {ANTI_WASTE_GROUPS.map((g,gi)=>(
          <div key={gi} style={{background:"var(--white)",borderRadius:"var(--radius)",padding:20,border:"1px solid var(--border)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:"var(--green-light)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{g.icon}</div>
              <div style={{fontWeight:500,fontSize:14}}>{g.ingredient}</div>
            </div>
            {g.recipes.map((r,ri)=>{
              const rec=RECIPES.find(x=>x.id===r.id);
              return (
                <div key={ri} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderBottom:ri<g.recipes.length-1?"1px solid var(--border)":"none"}}>
                  <div style={{width:22,height:22,borderRadius:6,background:"var(--cream-dark)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"var(--text-muted)",flexShrink:0,fontWeight:600}}>{ri+1}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:500}}>{rec?.nameEn||r.id}</div>
                    <div style={{fontSize:11,color:"var(--text-muted)"}}>{r.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PLAN TAB ──────────────────────────────────────────────────────────────────
function PlanTab({plan,generating,genStatus,client,selectedObj,kcalNum,protNum,carbsNum,fatNum,fiberNum,fiberMin,fiberMax,mealPrepLabel,prepDayIdxs,dayPrepGroup,expandedDay,setExpandedDay,onGenerate}){
  return (
    <div>
      <div style={{marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:600,marginBottom:8}}>Plan Alimentar — 7 Zile</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <BG color="green">{client.name}</BG>
            {selectedObj && <BG color="warm">{selectedObj.label}</BG>}
            {kcalNum>0 && <BG>{kcalNum} kcal/zi</BG>}
                  {fiberNum>0 && <BG>🌾 {fiberMin}-{fiberMax}g fibre</BG>}
            {client.mealPrepEnabled && <BG color="green">Meal prep {mealPrepLabel}</BG>}
          </div>
        </div>
        <button onClick={onGenerate} disabled={generating}
          style={{padding:"10px 20px",background:generating?"var(--cream-dark)":"var(--green-light)",color:"var(--green)",border:"1px solid #C5DCC9",borderRadius:"var(--radius-sm)",fontSize:13,fontFamily:"'DM Sans',sans-serif",cursor:generating?"not-allowed":"pointer",fontWeight:500}}>
          {generating?"⏳ Generare...":"🔄 Regenereaza"}
        </button>
      </div>

      {generating && (
        <div style={{background:"var(--green-light)",borderRadius:"var(--radius)",padding:40,border:"1px solid #C5DCC9",textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:44,marginBottom:12}} className="pulse">🌿</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"var(--green)",marginBottom:8}}>Se genereaza planul din biblioteca...</div>
          <div style={{fontSize:14,color:"var(--text-muted)"}}>{genStatus}</div>
        </div>
      )}

      {!generating && genStatus && (
        <div style={{background:"#FEF0EF",borderRadius:"var(--radius)",padding:24,border:"1px solid #F5C4B3",textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:14,color:"#8A3020",marginBottom:12}}>{genStatus}</div>
          <button onClick={onGenerate} style={{padding:"10px 24px",background:"var(--green)",color:"white",border:"none",borderRadius:"var(--radius-sm)",fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Incearca din nou</button>
        </div>
      )}

      {!generating && plan && (
        <>
          <div style={{background:"var(--white)",borderRadius:"var(--radius)",border:"1px solid var(--border)",marginBottom:24,overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid var(--border)",fontFamily:"'Playfair Display',serif",fontSize:15}}>Sumar Macro Saptamanal</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead>
                  <tr style={{background:"var(--cream)"}}>
                    {["Zi","","Kcal","Proteine","Carbs","Grasimi","Fibre","vs Tinta"].map(h=>(
                      <th key={h} style={{padding:"10px 14px",textAlign:h==="Zi"||h===""?"left":"center",fontWeight:500,color:"var(--text-muted)",borderBottom:"1px solid var(--border)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plan.map((d,i)=>{
                    const isPrep=client.mealPrepEnabled&&prepDayIdxs.includes(i);
                    const kcalDiff=d.totalKcal-kcalNum;
                    const kMargin=Math.round(kcalNum*0.10);
                    const pMargin=Math.round(protNum*0.10);
                    const cMargin=Math.round(carbsNum*0.10);
                    const gMargin=Math.round(fatNum*0.10);
                    const fMin=fiberMin; const fMax=fiberMax;
                    const okK=Math.abs(kcalDiff)<=kMargin;
                    const okP=protNum>0?Math.abs((d.totalProtein||0)-protNum)<=pMargin:true;
                    const okC=carbsNum>0?Math.abs((d.totalCarbs||0)-carbsNum)<=cMargin:true;
                    const okG=fatNum>0?Math.abs((d.totalFat||0)-fatNum)<=gMargin:true;
                    const okF=(d.totalFiber||0)>=fMin&&(d.totalFiber||0)<=fMax;
                    const allOk=okK&&okP&&okC&&okG;
                    const pDiff=(d.totalProtein||0)-protNum;
                    const cDiff=(d.totalCarbs||0)-carbsNum;
                    const gDiff=(d.totalFat||0)-fatNum;
                    const MacroCell=({val,target,ok,color})=>(
                      <td style={{padding:"11px 14px",textAlign:"center"}}>
                        <span style={{color:ok?color:"#8A3020",fontWeight:ok?400:600,fontSize:13}}>{val}g</span>
                        {!ok&&<div style={{fontSize:10,color:"#8A3020"}}>{val-target>0?"+":""}{val-target}g</div>}
                      </td>
                    );
                    return (
                      <tr key={d.day} style={{borderBottom:"1px solid var(--border)",background:isPrep?"#F5FBF7":i%2===0?"var(--white)":"#FDFCF8"}}>
                        <td style={{padding:"11px 14px",fontWeight:500}}>{d.day}</td>
                        <td style={{padding:"11px 14px"}}><span style={{background:"var(--warm-light)",color:"#8A6030",padding:"2px 8px",borderRadius:99,fontSize:11,whiteSpace:"nowrap"}}>{d.tag}</span></td>
                        <td style={{padding:"11px 14px",textAlign:"center"}}>
                          <span style={{fontWeight:600,fontSize:13,color:okK?"var(--text)":"#8A3020"}}>{d.totalKcal}</span>
                          {!okK&&<div style={{fontSize:10,color:"#8A3020"}}>{kcalDiff>0?"+":""}{kcalDiff} kcal</div>}
                        </td>
                        <MacroCell val={d.totalProtein||0} target={protNum} ok={okP} color="var(--green)"/>
                        <MacroCell val={d.totalCarbs||0} target={carbsNum} ok={okC} color="#7BA3C8"/>
                        <MacroCell val={d.totalFat||0} target={fatNum} ok={okG} color="#C8A97A"/>
                        <td style={{padding:"11px 14px",textAlign:"center"}}>
                          <span style={{color:okF?"#7BA38A":"#8A3020",fontWeight:okF?400:600,fontSize:13}}>{d.totalFiber||"—"}g</span>
                          {!okF&&<div style={{fontSize:10,color:"#8A3020"}}>{(d.totalFiber||0)<fMin?"sub min":"peste max"}</div>}
                        </td>
                        <td style={{padding:"11px 14px",textAlign:"center"}}>
                          {allOk
                            ? <span style={{fontSize:11,fontWeight:500,color:"var(--green)",background:"var(--green-light)",padding:"3px 10px",borderRadius:99,border:"1px solid #C5DCC9"}}>✓ Ok</span>
                            : <div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"center"}}>
                                <span style={{fontSize:11,fontWeight:600,color:"#8A3020",background:"#FEF0EF",padding:"3px 10px",borderRadius:99,border:"1px solid #F5C4B3",whiteSpace:"nowrap"}}>
                                  {!okK?`${kcalDiff>0?"+":""}${kcalDiff} kcal`:""}
                                  {!okP?` P:${pDiff>0?"+":""}${pDiff}g`:""}
                                  {!okC?` C:${cDiff>0?"+":""}${cDiff}g`:""}
                                  {!okG?` G:${gDiff>0?"+":""}${gDiff}g`:""}
                                </span>
                              </div>
                          }
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{background:"var(--green-light)",fontWeight:500}}>
                    <td colSpan={2} style={{padding:"10px 14px",color:"var(--green)"}}>Medie zilnica</td>
                    <td style={{padding:"10px 14px",textAlign:"center"}}>{Math.round(plan.reduce((a,d)=>a+(d.totalKcal||0),0)/plan.length)}</td>
                    <td style={{padding:"10px 14px",textAlign:"center",color:"var(--green)"}}>{Math.round(plan.reduce((a,d)=>a+(d.totalProtein||0),0)/plan.length)}g</td>
                    <td style={{padding:"10px 14px",textAlign:"center",color:"#7BA3C8"}}>{Math.round(plan.reduce((a,d)=>a+(d.totalCarbs||0),0)/plan.length)}g</td>
                    <td style={{padding:"10px 14px",textAlign:"center",color:"#C8A97A"}}>{Math.round(plan.reduce((a,d)=>a+(d.totalFat||0),0)/plan.length)}g</td>
                    <td style={{padding:"10px 14px",textAlign:"center",color:"#7BA38A"}}>{Math.round(plan.reduce((a,d)=>a+(d.totalFiber||0),0)/plan.length)}g</td>
                    <td style={{padding:"10px 14px",textAlign:"center",color:"var(--green)"}}>Tinta: {kcalNum}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{display:"grid",gap:12}}>
            {plan.map((d,i)=>{
              const isPrep=client.mealPrepEnabled&&prepDayIdxs.includes(i);
              const group=client.mealPrepEnabled?dayPrepGroup(i):null;
              const isExp=expandedDay===i;
              const cols=Math.min((d.meals||[]).length, client.meals===2?2:3);
              return (
                <div key={d.day} style={{background:"var(--white)",borderRadius:"var(--radius)",border:`1px solid ${isPrep?"#C5DCC9":"var(--border)"}`,overflow:"hidden",boxShadow:isExp?"0 6px 32px rgba(60,55,45,.1)":"none",transition:"box-shadow .2s"}}>
                  <div onClick={()=>setExpandedDay(isExp?null:i)} style={{padding:"16px 20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",background:isPrep?"#F0F9F3":"transparent"}}>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <div style={{width:44,height:44,borderRadius:12,background:isPrep?"var(--green)":"var(--cream-dark)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                        {isPrep?"🥡":DAY_EMOJIS[i]}
                      </div>
                      <div>
                        <div style={{fontWeight:500,fontSize:15}}>{d.day}</div>
                        <div style={{display:"flex",gap:6,marginTop:3,flexWrap:"wrap"}}>
                          <span style={{fontSize:11,color:"var(--warm)",background:"var(--warm-light)",padding:"2px 8px",borderRadius:99}}>{d.tag}</span>
                          {isPrep && group && <span style={{fontSize:11,color:"var(--green)",background:"var(--green-light)",padding:"2px 8px",borderRadius:99,border:"1px solid #C5DCC9"}}>{group.eatLabels}</span>}
                          {!isPrep && group && group.prepDay!==i && <span style={{fontSize:11,color:"var(--text-muted)",background:"var(--cream-dark)",padding:"2px 8px",borderRadius:99}}>Din prep {group.prepLabel}</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:20}}>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontWeight:500,fontSize:15}}>{d.totalKcal} kcal</div>
                        <div style={{fontSize:11,color:"var(--text-muted)"}}>{d.totalProtein}g P · {d.totalCarbs}g C · {d.totalFat}g G</div>
                      </div>
                      <div style={{fontSize:20,color:"var(--text-muted)",transform:isExp?"rotate(180deg)":"none",transition:"transform .2s"}}>›</div>
                    </div>
                  </div>
                  {isExp && d.meals && (
                    <div style={{borderTop:"1px solid var(--border)",padding:20}}>
                      {d.prepNote && <div style={{background:"var(--green-light)",border:"1px solid #C5DCC9",borderRadius:"var(--radius-sm)",padding:"10px 14px",marginBottom:14,fontSize:13,color:"var(--green)",fontWeight:500}}>{d.prepNote}</div>}
                      <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:12}}>
                        {d.meals.map((m,mi)=>{
                          const isSn=m.slot&&m.slot.toLowerCase().includes("gustare");
                          return (
                            <div key={mi} style={{background:isSn?"#F0F9F3":"var(--cream)",borderRadius:12,padding:16,border:isSn?"1px solid #C5DCC9":"none"}}>
                              <div style={{fontSize:11,color:isSn?"var(--green)":"var(--text-muted)",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:isSn?500:400}}>{m.slot}</div>
                              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:600,marginBottom:8,lineHeight:1.3}}>{m.name}</div>
                              {m.ingredients && <div style={{fontSize:12,color:"var(--text-muted)",marginBottom:6,lineHeight:1.5}}><strong style={{color:"var(--text)",fontSize:11}}>Ingrediente: </strong>{m.ingredients}</div>}
                              {m.method && <div style={{fontSize:12,color:"var(--text-muted)",marginBottom:10,lineHeight:1.5,fontStyle:"italic"}}>{m.method}</div>}
                              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                                {m.kcal && <TG color="var(--warm)">{m.kcal} kcal</TG>}
                                {m.protein && <TG color="var(--green)">{m.protein}g P</TG>}
                                {m.carbs && <TG color="#7BA3C8">{m.carbs}g C</TG>}
                                {m.fat && <TG color="#C87A8A">{m.fat}g G</TG>}
                                      {m.fiber && <TG color="#7BA38A">{m.fiber}g F🌾</TG>}
                                {m.time && <TG color="#888">{m.time}</TG>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ── SHARED MINI-COMPONENTS ────────────────────────────────────────────────────
function SH({title,sub}){
  return (
    <div style={{marginBottom:24}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:600,marginBottom:6}}>{title}</div>
      <div style={{color:"var(--text-muted)",fontSize:14}}>{sub}</div>
    </div>
  );
}
function LB({children,style={}}){
  return <div style={{fontSize:12,color:"var(--text-muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em",...style}}>{children}</div>;
}
function RD({checked}){
  return (
    <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${checked?"var(--green)":"var(--border)"}`,background:checked?"var(--green)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      {checked && <span style={{color:"white",fontSize:10}}>✓</span>}
    </div>
  );
}
function BG({children,color}){
  const s={green:{background:"var(--green-light)",color:"var(--green)",border:"1px solid #C5DCC9"},warm:{background:"var(--warm-light)",color:"#8A6030",border:"1px solid #E8D5B5"},default:{background:"var(--cream-dark)",color:"var(--text-muted)",border:"1px solid var(--border)"}};
  const st=s[color]||s.default;
  return <span style={{fontSize:12,padding:"3px 12px",borderRadius:99,...st}}>{children}</span>;
}
function TG({color,children}){
  return <span style={{background:`${color}18`,color,fontSize:11,padding:"3px 8px",borderRadius:99,fontWeight:500}}>{children}</span>;
}
function RW({label,val}){
  return (
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
      <span style={{color:"var(--text-muted)"}}>{label}</span>
      <span style={{fontWeight:500,color:"var(--text)",maxWidth:"60%",textAlign:"right"}}>{val}</span>
    </div>
  );
}

function DayTimeline({meals,snacks,timeline,mealSlotNames,snackSlotNames}){
  let mi=0,si=0;
  return (
    <div style={{background:"var(--cream)",borderRadius:"var(--radius-sm)",padding:"14px 16px",border:"1px solid var(--border)"}}>
      <div style={{fontSize:11,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>
        Structura · <strong style={{color:"var(--green)"}}>{meals===2?"Pranz + Cina":`${meals} mese`}{snacks>0?` + ${snacks} gustare${snacks>1?"":""}`:""}</strong>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:0}}>
        {timeline.map((type,idx)=>{
          const isMeal=type==="M";
          const label=isMeal?(mealSlotNames[mi]||`Masa ${mi+1}`):(snackSlotNames[si]||`Gustare ${si+1}`);
          const emoji=isMeal?(meals===2?["🌤️","🌙"][mi]||"🌙":["☀️","🌤️","🌙"][mi]||"🌙"):["🍎","🍊"][si]||"🍎";
          const bg=isMeal?"var(--green)":"var(--warm)";
          const isLast=idx===timeline.length-1;
          if(isMeal) mi++; else si++;
          return (
            <div key={idx} style={{display:"flex",alignItems:"center",flex:isMeal?2:1}}>
              <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:"100%",background:bg,borderRadius:8,padding:"10px 6px",textAlign:"center"}}>
                  <div style={{fontSize:16}}>{emoji}</div>
                  <div style={{fontSize:11,color:"white",fontWeight:500,marginTop:2}}>{label}</div>
                </div>
              </div>
              {!isLast && <div style={{width:16,height:2,background:"var(--border)",flexShrink:0}} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MealPrepFlow({groups}){
  return (
    <div style={{background:"var(--cream)",borderRadius:"var(--radius-sm)",padding:"14px 16px",border:"1px solid var(--border)"}}>
      <div style={{fontSize:11,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>Flux — ce se gateste cand si pentru cate zile</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {groups.map((g,i)=>{
          const isFresh=g.eatDays.length===1;
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:isFresh?"transparent":"var(--white)",borderRadius:"var(--radius-sm)",border:`1px solid ${isFresh?"var(--border)":"#C5DCC9"}`}}>
              <div style={{width:36,height:36,borderRadius:8,background:isFresh?"var(--cream-dark)":"var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                {isFresh?"🍳":"🥡"}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:isFresh?"var(--text-muted)":"var(--green)"}}>
                  {isFresh?`${g.prepLabel} — gatit proaspat`:`Gatit in ${g.prepLabel}`}
                </div>
                {!isFresh && <div style={{fontSize:12,color:"var(--text-muted)",marginTop:2}}>Mancat in: {g.eatLabels} · {g.eatDays.length} portii per reteta</div>}
              </div>
              {!isFresh && (
                <div style={{display:"flex",gap:4}}>
                  {g.eatDays.map((_,di)=>(
                    <div key={di} style={{width:28,height:28,borderRadius:6,background:"var(--green-light)",border:"1px solid #C5DCC9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--green)",fontWeight:500}}>
                      {["L","Ma","Mi","J","V","S","D"][g.eatDays[di]]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GenBtn({generating,hasPlan,onGenerate,clientName,hasKcal}){
  const disabled=generating||!clientName;
  return (
    <button onClick={onGenerate} disabled={disabled}
      style={{width:"100%",padding:"16px 24px",background:disabled?"var(--text-muted)":"var(--green)",color:"white",border:"none",borderRadius:"var(--radius)",fontSize:16,fontWeight:500,cursor:disabled?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"all .2s"}}>
      {generating?"Se genereaza planul...":!clientName?"Completeaza numele clientului":!hasKcal?"Completeaza caloriile in Strategie":hasPlan?"Regenereaza planul":"Genereaza planul alimentar"}
    </button>
  );
}
