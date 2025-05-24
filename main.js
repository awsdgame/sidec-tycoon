let gold = 0; 
let goldPerSecond = 0;
let clickPower = 1;

const goldDisplay = document.querySelector("#gold");
const clicker = document.querySelector("#clicker");
const clickUpgradesShop = document.querySelector("#click-upgrades-shop");
const modal = document.querySelector('#modal');
const modalMessage = document.querySelector('#modal-message');
const closeModalButton = document.querySelector('#close-modal-button');

const upgradeList = [
    { name: "Sparkly Stick", cost: 10, power: 1, passive: 1 },
    { name: "Shiny Gloves", cost: 30, power: 2, passive: 2 }, 
    { name: "Golden Ring", cost: 100, power: 5, passive: 3 }, 
    { name: "Diamond Necklace", cost: 500, power: 10, passive: 5 }
];

function showModal(message) {
    modalMessage.innerText = message;
    modal.classList.remove("hidden");
    closeModalButton.addEventListener("click", closeModal);

}

function closeModal() {
    modal.classList.add("hidden");
}

// Update gold display
function updateDisplay() {
    goldDisplay.innerText = `${gold}`;
}

// Clicker logic
clicker.addEventListener("click", () => {
    gold += clickPower;
    updateDisplay();
});

// Render upgrades
upgradeList.forEach((upgrade, index) => {
    const upgradeDiv = document.createElement("div");
    upgradeDiv.classList.add("upgrade");
    upgradeDiv.innerHTML = `
        <div><strong>${upgrade.name}</strong><br>+${upgrade.power} Gold per click</div>
        <button id="click-upgrade-${index}">Buy (${upgrade.cost} Gold)</button>
    `;
    clickUpgradesShop.appendChild(upgradeDiv);

    document.getElementById(`click-upgrade-${index}`).addEventListener("click", () => {
        if (gold >= upgrade.cost) {
            gold -= upgrade.cost;
            clickPower += upgrade.power;
            goldPerSecond += upgrade.passive
            updateDisplay();

            // Disable button so it can only be bought once
            const button = document.getElementById(`click-upgrade-${index}`);
            button.disabled = true;
            button.innerText = "Purchased";
            button.style.backgroundColor = "#f00";
            button.style.color = "#fff";
        } else {
            showModal("Not enough gold to purchase " + upgrade.name + "!");
        }
    });
});

// Passive income
setInterval(() => {
    gold += goldPerSecond;
    updateDisplay();
}, 1000);
