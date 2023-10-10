// Symbols
const EQUAL_SIGN = "=";
const ADDITION_SIGN = "+";
const DIVISION_SIGN = "÷";
const SUBTRACTION_SIGN = "−";
const MULTIPLICATION_SIGN = "×";
const PREFIX_SIGN = "+/-";
const PI_SIGN = "π";
const PI_VALUE = 3.1415;

let result = 0;
let firstNum = "";
let secondNum = "";
let suffixSign = "";
let showResult = false;
let firstNumPrefix = 1;
let secondNumPrefix = 1;
let currentOperator = "";
let currentNumOnDisplay = "";

const resultOnScreen = document.querySelector(".current-input-result");
const operationLog = document.querySelector("#operation-log");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", clickHandler));

function clickHandler(e) {
  userInput = e.target.innerText;
  if (userInput === "AC") return resetAll();
  if (userInput === PREFIX_SIGN) setPrefix();
  if (isOperator(userInput) && userInput !== PREFIX_SIGN) {
    if (
      firstNumHasValue() &&
      currentOperatorHasValue() &&
      secondNumHasValue()
    ) {
      suffixSign = userInput;
      result = decideOperation();
      operationLog.innerText = `${firstNum} ${currentOperator} ${secondNum} =`;
      firstNum = result;
      currentOperator = suffixSign;
      secondNum = "";
      return (resultOnScreen.innerText = result);
    } else if (firstNumHasValue()) currentOperator = userInput;
    else if (!firstNumHasValue() && userInput === SUBTRACTION_SIGN) {
      firstNumPrefix *= -1;
    }
  } else if (!isOperator(userInput)) {
    if (firstNumHasValue()) {
      if (currentOperatorHasValue()) {
        secondNum += userInput;
        currentNumOnDisplay = secondNum;
      } else if (!currentOperatorHasValue()) {
        firstNum += userInput;
        currentNumOnDisplay = firstNum;
      }
    } else if (!firstNumHasValue()) {
      firstNum += userInput;
      currentNumOnDisplay = firstNum;
    }
  }

  operations.prefixNum1 = firstNumPrefix;
  operations.prefixNum2 = secondNumPrefix;
  operations.a = firstNum;
  operations.b = secondNum;
  resultOnScreen.innerText = currentNumOnDisplay;
  operationLog.innerText = `${firstNum} ${currentOperator} ${secondNum}`;
}

// check if input is an arithmetic operator or not
function isOperator(input) {
  if (
    input === ADDITION_SIGN ||
    input === SUBTRACTION_SIGN ||
    input === MULTIPLICATION_SIGN ||
    input === DIVISION_SIGN ||
    input === PREFIX_SIGN
  )
    return true;
}

// ---

function setPrefix() {
  if (!firstNumHasValue() || (firstNumHasValue() && !currentOperatorHasValue()))
    firstNumPrefix *= -1;
  if (secondNumHasValue() || (firstNumHasValue() && currentOperatorHasValue()))
    secondNumPrefix *= -1;
}

// check if firstNum, secondNum and operator has (input) value
function firstNumHasValue() {
  if (firstNum === "") return false;
  else return true;
}

function secondNumHasValue() {
  if (secondNum === "") return false;
  else return true;
}

function currentOperatorHasValue() {
  if (currentOperator === "") return false;
  else return true;
}

// -----
let operations = {
  add() {
    return (
      this.prefixNum1 * parseFloat(this.a) +
      this.prefixNum2 * parseFloat(this.b)
    );
  },
  subtract() {
    return (
      this.prefixNum1 * parseFloat(this.a) -
      this.prefixNum2 * parseFloat(this.b)
    );
  },
  product() {
    return (
      this.prefixNum1 *
      parseFloat(this.a) *
      parseFloat(this.b) *
      this.prefixNum2
    );
  },
  divide() {
    if (parseFloat(this.b) === 0) return "Error";
    else if (parseFloat(this.b) !== 0) {
      return (
        (parseFloat(this.a * this.prefixNum1) / parseFloat(this.b)) *
        this.prefixNum2
      );
    }
  },
};

// when called, decideOperation() functions decides which operator to perform
// then calls for that function
function decideOperation() {
  if (currentOperator === ADDITION_SIGN) return operations.add();
  else if (currentOperator === SUBTRACTION_SIGN) return operations.subtract();
  else if (currentOperator === MULTIPLICATION_SIGN) return operations.product();
  else if (currentOperator === DIVISION_SIGN) return operations.divide();
  else if (currentOperator === EQUAL_SIGN) alert("equal clicked");
}

function resetAll() {
  result = 0;
  firstNum = "";
  secondNum = "";
  allInputs = [];
  suffixSign = "";
  showResult = false;
  firstNumPrefix = 1;
  secondNumPrefix = 1;
  currentOperator = "";
  currentNumOnDisplay = "";
  operationLog.innerText = "";
  resultOnScreen.innerText = 0;
}
