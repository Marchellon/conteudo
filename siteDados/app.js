function createDice(sides) {
    const dice = document.createElement('div');
    dice.classList.add('dice', `d${sides}`);
    return dice;
}

function rollDiceValue(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollDice() {
    const diceType = parseInt(document.getElementById('dice-type').value);
    const diceCount = parseInt(document.getElementById('dice-count').value);
    const bonus = parseInt(document.getElementById('bonus').value);
    const container = document.getElementById('dice-container');

    container.innerHTML = '';

    for (let i = 0; i < diceCount; i++) {
        const dice = createDice(diceType);
        const value = rollDiceValue(diceType);

        dice.textContent = value;
        dice.style.animation = `roll 0.5s ease-in-out`;
        
        container.appendChild(dice);
    }

    const total = Array.from(container.children).reduce((sum, die) => sum + parseInt(die.textContent), 0) + bonus;
    const result = document.createElement('div');
    result.textContent = `Total: ${total} (com bônus de ${bonus})`;
    container.appendChild(result);
}

document.getElementById('roll-button').addEventListener('click', rollDice);