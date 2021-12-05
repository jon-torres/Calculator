'use strict';

class Calculator {
  constructor(upperOutputTextEle, mainOutputTextEle) {
    this.upperOutputTextEle = upperOutputTextEle;
    this.mainOutputTextEle = mainOutputTextEle;
    this.clear();
  }

  clear() {
    this.mainOutput = '';
    this.upperOutput = '';
    this.operation = undefined;
  }

  del() {
    this.mainOutput = this.mainOutput.toString().slice(0, -1);
  }

  appendNum(number) {
    if (number === '.' && this.mainOutput.includes('.')) return;
    this.mainOutput = this.mainOutput.toString() + number.toString();
  }

  pickAnOperation(operation) {
    if (this.mainOutput === '') return;
    if (this.upperOutput !== '') {
      this.compute();
    }
    this.operation = operation;
    this.upperOutput = this.mainOutput;
    this.mainOutput = '';
  }

  compute() {
    let computation;
    const upper = parseFloat(this.upperOutput);
    const main = parseFloat(this.mainOutput);
    if (isNaN(upper) || isNaN(main)) return;
    if (
      this.operation === '÷' &&
      (this.mainOutput === `0` ||
        this.mainOutput === `0.` ||
        this.mainOutput === `0.0`)
    ) {
      alert(`Can't divide by zero`);
      return;
    }
    switch (this.operation) {
      case '+':
        computation = upper + main;
        break;
      case '×':
        computation = upper * main;
        break;
      case '-':
        computation = upper - main;
        break;
      case '÷':
        computation = upper / main;
        break;
      default:
        return `ERROR`;
    }
    this.mainOutput = computation;
    this.operation = undefined;
    this.upperOutput = '';
  }

  getDisplayNum(number) {
    const stringNum = number.toString();
    const integerNum = parseFloat(stringNum.split('.')[0]);
    const decimalNum = stringNum.split('.')[1];
    let integerDisp;
    if (isNaN(integerNum)) {
      integerDisp = '';
    } else {
      integerDisp = integerNum.toLocaleString('en', {
        maxFractionDigits: 0,
      });
    }
    if (decimalNum != null) {
      return `${integerNum}.${decimalNum}`;
    } else {
      return integerDisp;
    }
  }

  updateCalcDisplay() {
    this.mainOutputTextEle.innerText = this.getDisplayNum(this.mainOutput);
    if (this.operation != null) {
      this.upperOutputTextEle.innerText = `${this.getDisplayNum(
        this.upperOutput
      )} ${this.operation}`;
    } else {
      this.upperOutputTextEle.innerText = '';
    }
  }
}

// DOM
const btnNum = document.querySelectorAll('[data-number]');
const btnOperation = document.querySelectorAll('[data-operation]');
const btnEquals = document.querySelector('[data-equals]');
const btnDel = document.querySelector('[data-del]');
const btnAc = document.querySelector('[data-ac]');
const upperOutputTextEle = document.querySelector('[data-upper-output]');
const mainOutputTextEle = document.querySelector('[data-main-output]');
const keys = document.querySelectorAll('.key');

const calculator = new Calculator(upperOutputTextEle, mainOutputTextEle);

const listenToKeyboard = function (e) {
  let key = document.querySelector(`.key[data-key="${e.key}"]`);
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    console.log(e.key);
    calculator.appendNum(key.innerText);
    calculator.updateCalcDisplay();
  }
  if (e.key === '=' || e.key === 'Enter') {
    calculator.compute();
    calculator.updateCalcDisplay();
  }
  if (e.key === 'Backspace') {
    calculator.del();
    calculator.updateCalcDisplay();
  }
  if (e.key === 'Escape') {
    console.log(e.key);
    calculator.clear();
    calculator.updateCalcDisplay();
  }
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    console.log(e.key);
    calculator.pickAnOperation(key.innerText);
    calculator.updateCalcDisplay();
  }
};

btnNum.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText);
    calculator.updateCalcDisplay();
  });
});

btnOperation.forEach(button => {
  button.addEventListener('click', () => {
    calculator.pickAnOperation(button.innerText);
    calculator.updateCalcDisplay();
  });
});

btnAc.addEventListener('click', button => {
  calculator.clear();
  calculator.updateCalcDisplay();
});

btnEquals.addEventListener('click', button => {
  calculator.compute();
  calculator.updateCalcDisplay();
});

btnDel.addEventListener('click', button => {
  calculator.del();
  calculator.updateCalcDisplay();
});

window.addEventListener('keydown', listenToKeyboard);
