/* ==========================================
   Mine King : inventory.js
   인벤토리 시스템
========================================== */

const inventory = [];

let bagLevel = 0;
let maxSlots = BAGS[bagLevel].slots;
const MAX_STACK = 50;

/* ===========================
   빈 슬롯 생성
=========================== */

function createInventory(){

    inventory.length = 0;

    for(let i=0;i<maxSlots;i++){

        inventory.push(null);

    }

}

/* ===========================
   인벤토리 출력
=========================== */

function drawInventory(){

    const grid =
    document.getElementById("inventoryGrid");

    if(!grid) return;

    grid.innerHTML = "";

    for(let i=0;i<maxSlots;i++){

        const slot =
        document.createElement("div");

        slot.className =
        "inventorySlot";

        if(inventory[i]==null){

            slot.innerHTML=`

            <div style="font-size:35px;">
            📦
            </div>

            <div>
            빈칸
            </div>

            `;

        }

        else{

            const mineral =
            MINERALS[inventory[i].id];

            slot.innerHTML=`

            <div style="font-size:34px;">
            ${mineral.icon}
            </div>

            <div>
            ${mineral.name}
            </div>

            <div class="count">

            ${inventory[i].count}
            /50

            </div>

            `;

        }

        grid.appendChild(slot);

    }

}

/* ===========================
   아이템 획득
=========================== */

function addItem(itemId,amount=1){

    // 기존 스택 찾기

    for(let i=0;i<inventory.length;i++){

        const slot=inventory[i];

        if(slot==null) continue;

        if(slot.id!==itemId) continue;

        if(slot.count>=MAX_STACK) continue;

        const remain =
        MAX_STACK-slot.count;

        const add =
        Math.min(remain,amount);

        slot.count+=add;

        amount-=add;

        if(amount<=0){

            drawInventory();

            return true;

        }

    }

    // 빈칸 찾기

    while(amount>0){

        const empty =
        inventory.findIndex(
        s=>s==null
        );

        if(empty==-1){

            showMessage(
            "🎒 인벤토리가 가득 찼습니다!"
            );

            drawInventory();

            return false;

        }

        const add =
        Math.min(MAX_STACK,amount);

        inventory[empty]={

            id:itemId,

            count:add

        };

        amount-=add;

    }

    drawInventory();

    return true;

}

/* ===========================
   아이템 제거
=========================== */

function removeItem(itemId,amount){

    let remain=amount;

    for(let i=0;i<inventory.length;i++){

        const slot=
        inventory[i];

        if(slot==null) continue;

        if(slot.id!==itemId) continue;

        if(slot.count<=remain){

            remain-=slot.count;

            inventory[i]=null;

        }

        else{

            slot.count-=remain;

            remain=0;

        }

        if(remain<=0){

            break;

        }

    }

    drawInventory();

}

/* ===========================
   아이템 개수
=========================== */

function getItemCount(itemId){

    let total=0;

    for(const slot of inventory){

        if(slot==null) continue;

        if(slot.id===itemId){

            total+=slot.count;

        }

    }

    return total;

}

/* ===========================
   가방 업그레이드
=========================== */

function upgradeBag(){

    if(bagLevel>=BAGS.length-1){

        showMessage(
        "🎒 최고 등급 가방입니다."
        );

        return;

    }

    const next=
    BAGS[bagLevel+1];

    if(player.money<next.price){

        showMessage(
        "💰 돈이 부족합니다."
        );

        return;

    }

    player.money-=next.price;

    bagLevel++;

    maxSlots=
    BAGS[bagLevel].slots;

    while(inventory.length<maxSlots){

        inventory.push(null);

    }

    drawInventory();

    updateMoney();

    showMessage(

    "🎉 "+next.name+
    " 구매 완료!"

    );

}

/* ===========================
   전체 판매 가격
=========================== */

function getInventoryValue(){

    let value=0;

    for(const slot of inventory){

        if(slot==null) continue;

        value+=

        MINERALS[slot.id].price
        *slot.count;

    }

    return value;

}

/* ===========================
   전체 판매
=========================== */

function sellAllItems(){

    let money=0;

    for(let i=0;i<inventory.length;i++){

        const slot=
        inventory[i];

        if(slot==null) continue;

        money+=

        MINERALS[slot.id].price
        *slot.count;

        inventory[i]=null;

    }

    player.money+=money;

    drawInventory();

    updateMoney();

    showMessage(

    "💰 "+
    money.toLocaleString("ko-KR")+
    "원 획득!"

    );

}

/* ===========================
   시작
=========================== */

createInventory();

drawInventory();

console.log("inventory.js loaded");
