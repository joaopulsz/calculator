
let currentNumber;
let total = 0;
let mathOp;

const screen = document.querySelector('#screen');
const miniScreen = document.querySelector('#mini-screen');

const acBtn = document.querySelector('#ac');
const revSignBtn = document.querySelector('#revsign');
const percentBtn = document.querySelector('#percent');
const divisionBtn = document.querySelector('#division');
const multiplyBtn = document.querySelector('#multiply');
const minusBtn = document.querySelector('#minus');
const addBtn = document.querySelector('#add');
const equalsBtn = document.querySelector('#equals');
const pointBtn = document.querySelector('#point');

const zeroBtn = document.querySelector('#zero');
const oneBtn = document.querySelector('#one');
const twoBtn = document.querySelector('#two');
const threeBtn = document.querySelector('#three');
const fourBtn = document.querySelector('#four');
const fiveBtn = document.querySelector('#five');
const sixBtn = document.querySelector('#six');
const sevenBtn = document.querySelector('#seven');
const eightBtn = document.querySelector('#eight');
const nineBtn = document.querySelector('#nine');

const operators = document.querySelectorAll('.operator');

const disableBtns = () => {
    operators.forEach((elm) => {
        elm.disabled = true;
        elm.style.color = 'gray';
    })
}

const enableBtns = () => {
    operators.forEach((elm) => {
        elm.disabled = false;
        elm.style.backgroundColor = 'orange';
        elm.style.color = 'black';
    })
}

//AC BUTTON
acBtn.addEventListener('click', () => {
    screenContent = '';
    currentNumber = '';
    total = 0;
    miniScreen.innerText = '';
    screen.innerText = '';
    enableBtns();
});


//NUMBER BUTTONS
const numberClick = (n) => {
    if (!total && !mathOp) {
        total = 0;
    }

    if (!currentNumber) {
        currentNumber = n;
    } else if (currentNumber) {
        currentNumber = currentNumber + n;
    }

    screen.innerText = currentNumber;
}

const numberSelectors = document.querySelectorAll('.number');
numberSelectors.forEach((num) => {
    num.addEventListener('click', (e) => {
        numberClick(e.target.innerText);
    })
});

//POINT (.)
pointBtn.addEventListener('click', () => {
    if (Number(currentNumber) === Math.floor(Number(currentNumber)) && currentNumber[currentNumber.length - 1] !== '.') {
        currentNumber += '.';
        screen.innerText = currentNumber;
    }
})

//MATHEMATICAL OPERATIONS
const mathOpFunc = (op, btn) => {
    mathOp = op;
    btn.style.color = 'white';
    btn.style.backgroundColor = 'red';
    disableBtns();

    total += Number(currentNumber);
    currentNumber = 0;

    miniScreen.innerText = total;
    screen.innerText = currentNumber;
}

const setOperatorListener = () => {
    addBtn.addEventListener('click', () => {
        mathOpFunc('add', addBtn);
    })
    minusBtn.addEventListener('click', () => {
        mathOpFunc('subtract', minusBtn);
    })
    multiplyBtn.addEventListener('click', () => {
        mathOpFunc('multiply', multiplyBtn);
    })
    divisionBtn.addEventListener('click', () => {
        mathOpFunc('division', divisionBtn);
    })
    revSignBtn.addEventListener('click', () => {
        currentNumber *= -1;
        screen.innerText = currentNumber;
    })

    percentBtn.addEventListener('click', () => {
        let num = Number(currentNumber);

        !total ? num /= 100 : num = total * num / 100;

        currentNumber = num;
        screen.innerText = currentNumber;
    })

    equalsBtn.addEventListener('click', () => {
        let num = Number(currentNumber);

        if (mathOp === 'add') {
            currentNumber = num + Number(total);
            screen.innerText = currentNumber;
        } else if (mathOp === 'subtract') {
            currentNumber = Number(total) - num;
            screen.innerText = currentNumber;
        } else if (mathOp === 'multiply') {
            currentNumber = Number(total) * num;
            screen.innerText = currentNumber;
        } else if (mathOp === 'division') {
            currentNumber = Number(total) / num;
            screen.innerText = currentNumber;
        }

        total = 0;
        miniScreen.innerText = total;
        enableBtns();
    })
}

setOperatorListener();
