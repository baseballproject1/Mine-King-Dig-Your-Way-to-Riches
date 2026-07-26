/* ==========================================
   Mine King : game.js
   메인 게임
========================================== */

console.log("game.js loaded");

/* ===========================
   초기화
=========================== */

window.addEventListener("load",()=>{

    // 시작 화면 표시
    document.getElementById("startScreen").style.display="flex";
    document.getElementById("gameScreen").style.display="none";

    // 상태 표시
    updateMoney();
    updateStatus();
    drawInventory();

});

/* ===========================
   능력치 창
=========================== */

const statusWindow =
document.getElementById("statusWindow");

document
.getElementById("statusButton")
.addEventListener("click",()=>{

    updateStatus();

    statusWindow.style.display="flex";

});

document
.getElementById("closeStatus")
.addEventListener("click",()=>{

    statusWindow.style.display="none";

});

/* ===========================
   단축키
=========================== */

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case " ":

            e.preventDefault();

            if(document.getElementById("gameScreen").style.display==="flex"){

                mine();

            }

            break;

        case "ArrowUp":

            nextFloor();

            break;

        case "ArrowDown":

            prevFloor();

            break;

    }

});

/* ===========================
   더블클릭 방지
=========================== */

let mining=false;

const mineButton=
document.getElementById("mineButton");

mineButton.addEventListener("click",()=>{

    if(mining) return;

    mining=true;

    mine();

    setTimeout(()=>{

        mining=false;

    },120);

});

/* ===========================
   피로 자동 회복
=========================== */

setInterval(()=>{

    if(player.fatigue>0){

        player.fatigue--;

        updateStatus();

    }

},5000);

/* ===========================
   체력 자동 회복
=========================== */

setInterval(()=>{

    if(player.hp<100){

        player.hp++;

        updateStatus();

    }

},4000);

/* ===========================
   플레이 시간
=========================== */

let playSeconds=0;

setInterval(()=>{

    if(document.getElementById("gameScreen").style.display==="flex"){

        playSeconds++;

    }

},1000);

/* ===========================
   저장
=========================== */

window.addEventListener("beforeunload",()=>{

    saveGame(currentSlot);

});

/* ===========================
   시작 메시지
=========================== */

setTimeout(()=>{

    showMessage(

    "⛏️ Mine King에 오신 것을 환영합니다!"

    );

},700);

/* ===========================
   개발용 함수
=========================== */

function addMoney(amount){

    player.money+=amount;

    updateMoney();

}

function healAll(){

    player.hp=100;

    player.fatigue=0;

    updateStatus();

}

function levelUp(){

    player.level++;

    player.power+=2;

    player.hp+=10;

    player.stamina+=10;

    updateStatus();

}

/* ===========================
   테스트용 콘솔 명령

addMoney(1000000)

healAll()

levelUp()

nextFloor()

=========================== */

console.log("Mine King v1.0 Ready");
