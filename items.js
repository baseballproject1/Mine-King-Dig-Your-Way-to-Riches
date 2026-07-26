/* ==========================================
   Mine King : items.js
   아이템 / 광물 데이터
========================================== */

// ---------- 광물 ----------

const MINERALS = {

    dirt: {
        id: "dirt",
        name: "흙",
        icon: "🟫",
        price: 1,
        stack: 50
    },

    stone: {
        id: "stone",
        name: "돌",
        icon: "🪨",
        price: 10,
        stack: 50
    },

    coal: {
        id: "coal",
        name: "석탄",
        icon: "⚫",
        price: 50,
        stack: 50
    },

    iron: {
        id: "iron",
        name: "철광석",
        icon: "⛓️",
        price: 200,
        stack: 50
    },

    copper: {
        id: "copper",
        name: "구리",
        icon: "🟤",
        price: 500,
        stack: 50
    },

    silver: {
        id: "silver",
        name: "은",
        icon: "⚪",
        price: 1000,
        stack: 50
    },

    gold: {
        id: "gold",
        name: "금",
        icon: "🟡",
        price: 5000,
        stack: 50
    },

    ruby: {
        id: "ruby",
        name: "루비",
        icon: "🔴",
        price: 15000,
        stack: 50
    },

    sapphire: {
        id: "sapphire",
        name: "사파이어",
        icon: "🔵",
        price: 30000,
        stack: 50
    },

    emerald: {
        id: "emerald",
        name: "에메랄드",
        icon: "🟢",
        price: 50000,
        stack: 50
    },

    diamond: {
        id: "diamond",
        name: "다이아",
        icon: "💎",
        price: 100000,
        stack: 50
    },

    blackDiamond: {
        id: "blackDiamond",
        name: "블랙 다이아",
        icon: "♦️",
        price: 500000,
        stack: 50
    },

    ancientGem: {
        id: "ancientGem",
        name: "고대 보석",
        icon: "🔮",
        price: 2000000,
        stack: 50
    },

    legendaryOre: {
        id: "legendaryOre",
        name: "전설 광석",
        icon: "🌟",
        price: 10000000,
        stack: 50
    },

    kingsTreasure: {
        id: "kingsTreasure",
        name: "왕의 보물",
        icon: "👑",
        price: 100000000,
        stack: 50
    }

};

// ---------- 장갑 ----------

const GLOVES = [

{
    name:"맨손",
    power:0,
    luck:0,
    price:0
},

{
    name:"천 장갑",
    power:1,
    luck:0,
    price:500
},

{
    name:"가죽 장갑",
    power:3,
    luck:1,
    price:3000
},

{
    name:"철 장갑",
    power:7,
    luck:2,
    price:15000
},

{
    name:"황금 장갑",
    power:15,
    luck:5,
    price:100000
},

{
    name:"다이아 장갑",
    power:30,
    luck:10,
    price:1000000
},

{
    name:"전설 장갑",
    power:60,
    luck:20,
    price:100000000
}

];

// ---------- 곡괭이 ----------

const PICKAXES = [

{
    name:"없음",
    power:0,
    price:0,
    unlockMoney:50000
},

{
    name:"돌 곡괭이",
    power:10,
    price:50000
},

{
    name:"철 곡괭이",
    power:25,
    price:200000
},

{
    name:"금 곡괭이",
    power:50,
    price:1000000
},

{
    name:"다이아 곡괭이",
    power:100,
    price:10000000
},

{
    name:"전설 곡괭이",
    power:250,
    price:1000000000
}

];

// ---------- 가방 ----------

const BAGS = [

{
    name:"기본 가방",
    slots:10,
    price:0
},

{
    name:"작은 가방",
    slots:20,
    price:5000
},

{
    name:"가죽 가방",
    slots:40,
    price:50000
},

{
    name:"철제 가방",
    slots:70,
    price:500000
},

{
    name:"황금 가방",
    slots:120,
    price:5000000
},

{
    name:"다이아 가방",
    slots:200,
    price:50000000
},

{
    name:"전설 가방",
    slots:300,
    price:500000000
}

];

// ---------- 층별 광물 ----------

const FLOOR_TABLE = {

1:["dirt","stone","coal"],

10:["stone","coal","iron"],

20:["coal","iron","copper"],

30:["iron","copper","silver","gold"],

40:["silver","gold","ruby"],

50:["gold","ruby","sapphire"],

60:["ruby","sapphire","emerald"],

70:["emerald","diamond"],

80:["diamond","blackDiamond"],

90:["blackDiamond","ancientGem"],

99:["ancientGem","legendaryOre"],

100:["legendaryOre","kingsTreasure"]

};

console.log("items.js loaded");
