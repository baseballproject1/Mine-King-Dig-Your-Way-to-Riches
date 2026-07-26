/* ==========================================
   Mine King : shop.js
   상점 시스템
========================================== */

/* ===========================
   상점 열기 / 닫기
=========================== */

const shopWindow =
document.getElementById("shopWindow");

const shopContent =
document.getElementById("shopContent");

document
.getElementById("shopButton")
.addEventListener("click",()=>{

    shopWindow.style.display="flex";

    openSellShop();

});

document
.getElementById("closeShop")
.addEventListener("click",()=>{

    shopWindow.style.display="none";

});

/* ===========================
   탭 버튼
=========================== */

document
.querySelectorAll(".shopTab")
.forEach(button=>{

    button.addEventListener("click",()=>{

        const tab =
        button.dataset.tab;

        switch(tab){

            case "sell":
                openSellShop();
                break;

            case "gloves":
                openGloveShop();
                break;

            case "pickaxe":
                openPickaxeShop();
                break;

            case "bag":
                openBagShop();
                break;

            case "items":
                openItemShop();
                break;

        }

    });

});

/* ===========================
   판매
=========================== */

function openSellShop(){

    shopContent.innerHTML=`

    <h3>광물 판매</h3>

    <p>
    현재 판매 가능 금액
    </p>

    <h2>

    ${getInventoryValue().toLocaleString("ko-KR")}원

    </h2>

    <button
    id="sellAllButton">

    전부 판매

    </button>

    `;

    document
    .getElementById("sellAllButton")
    .onclick=()=>{

        sellAllItems();

        openSellShop();

    };

}

/* ===========================
   장갑
=========================== */

function openGloveShop(){

    let html="<h3>장갑 구매</h3>";

    GLOVES.forEach((g,index)=>{

        html+=`

        <div class="shopItem">

        <b>${g.name}</b>

        <br>

        힘 +${g.power}

        <br>

        가격 :
        ${g.price.toLocaleString("ko-KR")}원

        <br>

        <button
        onclick="buyGlove(${index})">

        구매

        </button>

        </div>

        <hr>

        `;

    });

    shopContent.innerHTML=html;

}

function buyGlove(index){

    if(index<=player.gloveLevel){

        showMessage("이미 구매했습니다.");

        return;

    }

    const glove=
    GLOVES[index];

    if(player.money<glove.price){

        showMessage("돈이 부족합니다.");

        return;

    }

    player.money-=glove.price;

    player.gloveLevel=index;

    player.power+=glove.power;

    updateMoney();

    updateStatus();

    showMessage(glove.name+" 구매 완료");

}

/* ===========================
   곡괭이
=========================== */

function openPickaxeShop(){

    let html="<h3>곡괭이 구매</h3>";

    PICKAXES.forEach((p,index)=>{

        html+=`

        <div class="shopItem">

        <b>${p.name}</b>

        <br>

        힘 +${p.power}

        <br>

        가격 :
        ${p.price.toLocaleString("ko-KR")}원

        <br>

        <button
        onclick="buyPickaxe(${index})">

        구매

        </button>

        </div>

        <hr>

        `;

    });

    shopContent.innerHTML=html;

}

function buyPickaxe(index){

    if(index<=player.pickaxeLevel){

        showMessage("이미 구매했습니다.");

        return;

    }

    const pickaxe=
    PICKAXES[index];

    if(player.money<pickaxe.price){

        showMessage("돈이 부족합니다.");

        return;

    }

    player.money-=pickaxe.price;

    player.pickaxeLevel=index;

    player.power+=pickaxe.power;

    updateMoney();

    updateStatus();

    showMessage(pickaxe.name+" 구매 완료");

}

/* ===========================
   가방
=========================== */

function openBagShop(){

    let html=`

    <h3>가방 확장</h3>

    <p>

    현재 :
    ${maxSlots}칸

    </p>

    <button
    id="upgradeBagButton">

    다음 가방 구매

    </button>

    `;

    shopContent.innerHTML=html;

    document
    .getElementById("upgradeBagButton")
    .onclick=()=>{

        upgradeBag();

        openBagShop();

    };

}

/* ===========================
   아이템
=========================== */

function openItemShop(){

    shopContent.innerHTML=`

    <h3>회복 아이템</h3>

    <div class="shopItem">

    ❤️ 응급처치 키트

    <br>

    가격 : 1,000원

    <br>

    체력 +50

    <br>

    <button id="healButton">

    구매

    </button>

    </div>

    <hr>

    <div class="shopItem">

    ☕ 에너지 음료

    <br>

    가격 : 2,000원

    <br>

    피로 -30

    <br>

    <button id="energyButton">

    구매

    </button>

    </div>

    `;

    document
    .getElementById("healButton")
    .onclick=()=>{

        if(player.money<1000){

            showMessage("돈이 부족합니다.");

            return;

        }

        player.money-=1000;

        player.hp=Math.min(player.hp+50,100);

        updateMoney();

        updateStatus();

        showMessage("체력이 회복되었습니다.");

    };

    document
    .getElementById("energyButton")
    .onclick=()=>{

        if(player.money<2000){

            showMessage("돈이 부족합니다.");

            return;

        }

        player.money-=2000;

        player.fatigue=Math.max(player.fatigue-30,0);

        updateMoney();

        updateStatus();

        showMessage("피로가 감소했습니다.");

    };

}

console.log("shop.js loaded");
