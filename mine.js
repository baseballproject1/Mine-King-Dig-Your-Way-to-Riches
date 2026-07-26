/* ==========================================
   Mine King : mine.js
   채굴 시스템
========================================== */

const player = {

    money:0,

    hp:100,

    power:10,

    stamina:100,

    fatigue:0,

    level:1,

    exp:0,

    floor:1,

    gloveLevel:0,

    pickaxeLevel:0

};

/* ===========================
   화면 갱신
=========================== */

function updateStatus(){

    document.getElementById("hp").textContent=player.hp;
    document.getElementById("power").textContent=player.power;
    document.getElementById("stamina").textContent=player.stamina;
    document.getElementById("fatigue").textContent=player.fatigue;

    document.getElementById("statusHp").textContent=player.hp;
    document.getElementById("statusPower").textContent=player.power;
    document.getElementById("statusStamina").textContent=player.stamina;
    document.getElementById("statusFatigue").textContent=player.fatigue;

    document.getElementById("playerLevel").textContent=player.level;
    document.getElementById("playerExp").textContent=
    player.exp+" / "+(player.level*100);

    document.getElementById("floorDisplay").textContent=
    player.floor+"층";

}

/* ===========================
   돈 표시
=========================== */

function updateMoney(){

    document.getElementById("money").textContent=
    player.money.toLocaleString("ko-KR");

}

/* ===========================
   알림
=========================== */

function showMessage(text){

    const popup=
    document.getElementById("messagePopup");

    const message=
    document.getElementById("messageText");

    message.textContent=text;

    popup.style.display="block";

    clearTimeout(window.popupTimer);

    window.popupTimer=setTimeout(()=>{

        popup.style.display="none";

    },1800);

}

/* ===========================
   층별 광물
=========================== */

function getFloorMinerals(){

    const f=player.floor;

    if(f<=1) return FLOOR_TABLE[1];
    if(f<=10) return FLOOR_TABLE[10];
    if(f<=20) return FLOOR_TABLE[20];
    if(f<=30) return FLOOR_TABLE[30];
    if(f<=40) return FLOOR_TABLE[40];
    if(f<=50) return FLOOR_TABLE[50];
    if(f<=60) return FLOOR_TABLE[60];
    if(f<=70) return FLOOR_TABLE[70];
    if(f<=80) return FLOOR_TABLE[80];
    if(f<=90) return FLOOR_TABLE[90];
    if(f<=99) return FLOOR_TABLE[99];

    return FLOOR_TABLE[100];

}

/* ===========================
   랜덤 광물
=========================== */

function randomMineral(){

    const list=getFloorMinerals();

    const index=
    Math.floor(Math.random()*list.length);

    return list[index];

}

/* ===========================
   경험치
=========================== */

function addExp(value){

    player.exp+=value;

    const need=
    player.level*100;

    if(player.exp>=need){

        player.exp-=need;

        player.level++;

        player.hp+=10;

        player.power+=2;

        player.stamina+=10;

        showMessage(
        "🎉 레벨 "+player.level+
        " 달성!"
        );

    }

}

/* ===========================
   채굴
=========================== */

function mine(){

    if(player.hp<=0){

        showMessage("❤️ 체력이 없습니다.");

        return;

    }

    if(player.fatigue>=100){

        showMessage("😫 너무 피곤합니다.");

        return;

    }

    const mineralId=
    randomMineral();

    const amount=

    1+

    Math.floor(player.power/30);

    const success=
    addItem(mineralId,amount);

    if(!success){

        return;

    }

    const mineral=
    MINERALS[mineralId];

    player.hp-=1;

    player.fatigue+=2;

    if(player.fatigue>100)
        player.fatigue=100;

    addExp(5);

    document.getElementById("mineMessage").textContent=

    mineral.icon+" "+mineral.name+
    " x"+amount+" 획득!";

    showMessage(

    mineral.name+
    " x"+amount+
    " 획득!"

    );

    updateStatus();

}

/* ===========================
   층 이동
=========================== */

function nextFloor(){

    if(player.floor>=100){

        showMessage("🏆 마지막 층입니다.");

        return;

    }

    player.floor++;

    updateStatus();

    showMessage(

    "🏔️ "+
    player.floor+
    "층 도착"

    );

}

function prevFloor(){

    if(player.floor<=1){

        return;

    }

    player.floor--;

    updateStatus();

}

/* ===========================
   휴식
=========================== */

function rest(){

    player.hp=100+
    (player.level-1)*10;

    player.fatigue=0;

    showMessage("🛌 휴식을 완료했습니다.");

    updateStatus();

}

/* ===========================
   버튼 연결
=========================== */

window.addEventListener("load",()=>{

    updateMoney();

    updateStatus();

    document
    .getElementById("mineButton")
    .addEventListener("click",mine);

});

console.log("mine.js loaded");
