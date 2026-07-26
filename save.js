/* ==========================================
   Mine King : save.js
   저장 시스템 (슬롯 2개)
========================================== */

const SAVE_PREFIX = "mineKingSave";

/* ===========================
   저장 데이터 생성
=========================== */

function makeSaveData(){

    return {

        player: JSON.parse(JSON.stringify(player)),

        inventory: JSON.parse(JSON.stringify(inventory)),

        bagLevel,

        maxSlots,

        saveTime: Date.now()

    };

}

/* ===========================
   저장
=========================== */

function saveGame(slot){

    const data = makeSaveData();

    localStorage.setItem(

        SAVE_PREFIX + slot,

        JSON.stringify(data)

    );

    updateSlotInfo();

    showMessage(
        "💾 저장되었습니다."
    );

}

/* ===========================
   불러오기
=========================== */

function loadSlot(slot){

    const text = localStorage.getItem(

        SAVE_PREFIX + slot

    );

    // 저장 없음 → 새 게임

    if(text == null){

        startNewGame(slot);

        return;

    }

    const data = JSON.parse(text);

    Object.assign(player,data.player);

    bagLevel = data.bagLevel;

    maxSlots = data.maxSlots;

    inventory.length = 0;

    data.inventory.forEach(item=>{

        inventory.push(item);

    });

    document
    .getElementById("startScreen")
    .style.display="none";

    document
    .getElementById("gameScreen")
    .style.display="flex";

    drawInventory();

    updateMoney();

    updateStatus();

    showMessage("📂 불러오기 완료");

}

/* ===========================
   새 게임
=========================== */

function startNewGame(slot){

    player.money=0;

    player.hp=100;

    player.power=10;

    player.stamina=100;

    player.fatigue=0;

    player.level=1;

    player.exp=0;

    player.floor=1;

    player.gloveLevel=0;

    player.pickaxeLevel=0;

    bagLevel=0;

    maxSlots=BAGS[0].slots;

    createInventory();

    drawInventory();

    updateMoney();

    updateStatus();

    document
    .getElementById("startScreen")
    .style.display="none";

    document
    .getElementById("gameScreen")
    .style.display="flex";

    saveGame(slot);

}

/* ===========================
   삭제
=========================== */

function deleteSlot(slot){

    if(!confirm("저장 데이터를 삭제하시겠습니까?")){

        return;

    }

    localStorage.removeItem(

        SAVE_PREFIX + slot

    );

    updateSlotInfo();

}

/* ===========================
   슬롯 정보 표시
=========================== */

function updateSlotInfo(){

    for(let i=1;i<=2;i++){

        const target = document.getElementById(

            "slot"+i+"Info"

        );

        const text = localStorage.getItem(

            SAVE_PREFIX+i

        );

        if(text==null){

            target.innerHTML="비어 있음";

            continue;

        }

        const save = JSON.parse(text);

        const date = new Date(save.saveTime);

        target.innerHTML =

        `
        레벨 : ${save.player.level}<br>
        층 : ${save.player.floor}층<br>
        돈 : ${save.player.money.toLocaleString("ko-KR")}원<br>
        ${date.toLocaleString("ko-KR")}
        `;

    }

}

/* ===========================
   자동 저장
=========================== */

let currentSlot = 1;

setInterval(()=>{

    if(document
        .getElementById("gameScreen")
        .style.display==="flex"){

        saveGame(currentSlot);

    }

},30000);

/* ===========================
   저장 버튼
=========================== */

document
.getElementById("saveButton")
.addEventListener("click",()=>{

    saveGame(currentSlot);

});

/* ===========================
   슬롯 버튼 연결
=========================== */

document
.getElementById("slot1Start")
.addEventListener("click",()=>{

    currentSlot=1;

    loadSlot(1);

});

document
.getElementById("slot2Start")
.addEventListener("click",()=>{

    currentSlot=2;

    loadSlot(2);

});

document
.getElementById("slot1Delete")
.addEventListener("click",()=>{

    deleteSlot(1);

});

document
.getElementById("slot2Delete")
.addEventListener("click",()=>{

    deleteSlot(2);

});

/* ===========================
   시작
=========================== */

updateSlotInfo();

console.log("save.js loaded");
