// Symbols
const ADDITION_SIGN = "+";
const DIVISION_SIGN = "÷";
const SUBTRACTION_SIGN = "−";
const MULTIPLICATION_SIGN = "×";

const EQUAL_SIGN = "=";
const DELETE_BTN = "del";
const PREFIX_SIGN = "+/-";
const PERCENTAGE_SIGN = "%";

let result = 0;
let firstNum = "";
let secondNum = "";
let suffixSign = "";
let showPrefix1 = "";
let showPrefix2 = "";
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
  else if (userInput === PREFIX_SIGN) return (result = setPrefix());
  else if (userInput === PERCENTAGE_SIGN) {
    result = getPercentage();
    firstNum = result;
    resultOnScreen.innerText = showPrefix1 + firstNum;
    operationLog.innerText = `${
      showPrefix1 + firstNum - secondNum
    } ${currentOperator} ${showPrefix2 + secondNum}`;
    return;
  }
  if (userInput === EQUAL_SIGN) {
    if (!secondNumHasValue()) return;
    result = decideOperation();
    operationLog.innerText = `${showPrefix1 + firstNum} ${currentOperator} ${
      showPrefix2 + secondNum
    } =`;
    firstNum = result;
    currentOperator = suffixSign;
    secondNum = "";
    return (resultOnScreen.innerText = result);
  }
  if (userInput === DELETE_BTN) {
    removeChar();
    return updateResultOnScreen();
  }

  if (
    isOperator(userInput) &&
    userInput !== PREFIX_SIGN &&
    userInput !== PERCENTAGE_SIGN
  ) {
    if (
      firstNumHasValue() &&
      currentOperatorHasValue() &&
      secondNumHasValue()
    ) {
      suffixSign = userInput;
      result = decideOperation();
      operationLog.innerText = `${firstNum} ${currentOperator} ${secondNum} = ${result} ${suffixSign}`;
      firstNum = result;
      currentOperator = suffixSign;
      secondNum = "";
      return (resultOnScreen.innerText = result);
    } else if (firstNumHasValue()) currentOperator = userInput;
    else if (!firstNumHasValue() && userInput !== SUBTRACTION_SIGN) return "0";
    else if (!firstNumHasValue() && userInput === SUBTRACTION_SIGN) {
      firstNumPrefix *= -1;
    }
  } else if (!isOperator(userInput)) {
    if (userInput === ".") return dotControler();
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
  updateResultOnScreen();
  operations.a = firstNum;
  operations.b = secondNum;
  operations.prefixNum1 = firstNumPrefix;
  operations.prefixNum2 = secondNumPrefix;
  if (firstNumPrefix === -1) showPrefix1 = "-";
  if (secondNumPrefix === -1) showPrefix2 = "-";
  operationLog.innerText = `${showPrefix1 + firstNum} ${currentOperator} ${
    showPrefix2 + secondNum
  }`;
}

// --
function updateResultOnScreen() {
  if (firstNumHasValue() && currentOperatorHasValue() && secondNumHasValue()) {
    resultOnScreen.innerText = `${showPrefix2 + secondNum}`;
  } else if (firstNumHasValue()) {
    resultOnScreen.innerText = `${showPrefix1 + firstNum}`;
  }
  operationLog.innerText = `${showPrefix1 + firstNum} ${currentOperator} ${
    showPrefix2 + secondNum
  }`;
}
// -- upon click of "del" button, remove the latest input (num/operator)
function removeChar() {
  if (secondNumHasValue()) {
    secondNum = secondNum.slice(0, secondNum.length - 1);
  } else if (currentOperatorHasValue()) currentOperator = "";
  else if (firstNumHasValue()) {
    firstNum = firstNum.slice(0, firstNum.length - 1);
  }
  operations.a = firstNum;
  operations.b = secondNum;
}

// check if input is an arithmetic operator or not
function isOperator(input) {
  if (
    input === ADDITION_SIGN ||
    input === SUBTRACTION_SIGN ||
    input === MULTIPLICATION_SIGN ||
    input === DIVISION_SIGN ||
    input === PREFIX_SIGN ||
    input == PERCENTAGE_SIGN
  )
    return true;
}
// --- not allowing user to input more than one dot (decimal point)
function dotControler() {
  if (!firstNumHasValue() && firstNum.includes(".") === false) {
    firstNum += "0" + userInput;
  } else if (
    firstNumHasValue() &&
    !currentOperatorHasValue() &&
    firstNum.includes(".") === false
  ) {
    firstNum += userInput;
  } else if (
    firstNumHasValue() &&
    currentOperatorHasValue() &&
    secondNum.includes(".") === false
  ) {
    if (!secondNumHasValue()) {
      secondNum += "0";
    }
    if (secondNumHasValue()) {
      secondNum += userInput;
    }
  }
}
// --- upon click of "+/-" button, user can change a number from positive to a negative number, and vice versa
function setPrefix() {
  if (!firstNumHasValue() || (firstNumHasValue() && !currentOperatorHasValue()))
    firstNumPrefix *= -1;
  if (secondNumHasValue() || (firstNumHasValue() && currentOperatorHasValue()))
    secondNumPrefix *= -1;
}

// "%" take percentage of a given number(s),
function getPercentage() {
  let percentResult;
  if (!firstNumHasValue()) return "0";
  if (firstNumHasValue() && !currentOperatorHasValue()) {
    percentResult = firstNum / 100;
    // result = percentResult;
  } else if (firstNumHasValue() && currentOperatorHasValue()) {
    if (
      currentOperator === ADDITION_SIGN ||
      currentOperator === SUBTRACTION_SIGN
    ) {
      if (!secondNumHasValue()) {
        secondNum = (firstNum * firstNum) / 100;
      } else if (secondNumHasValue()) {
        secondNum = (firstNum * secondNum) / 100;
      }
    } else if (
      currentOperator === MULTIPLICATION_SIGN ||
      currentOperator === DIVISION_SIGN
    ) {
      if (!secondNumHasValue()) {
        secondNum = firstNum / 100;
      } else if (secondNumHasValue()) {
        secondNum = secondNum / 100;
      }
    }
    operations.a = firstNum;
    operations.b = secondNum;
    percentResult = decideOperation();
  }
  return percentResult;
}
// check if firstNum, secondNum and operator has value
let firstNumHasValue = () => firstNum !== "";
let secondNumHasValue = () => secondNum !== "";
let currentOperatorHasValue = () => currentOperator !== "";

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
    if (parseFloat(this.b) === 0) return displayErrorMsg();
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

// display error msg, so user knows why can't divide by zero
const errorScreen = document.querySelector("#result");
function displayErrorMsg() {
  errorMsg = "Error: division by zero!\nPress 'AC'";
  errorScreen.classList.add("screen-error-msg");
  return errorMsg;
}

function resetAll() {
  result = 0;
  firstNum = "";
  secondNum = "";
  suffixSign = "";
  showPrefix1 = "";
  showPrefix2 = "";
  firstNumPrefix = 1;
  secondNumPrefix = 1;
  currentOperator = "";
  currentNumOnDisplay = "";
  operationLog.innerText = "0";
  resultOnScreen.innerText = 0;
  errorScreen.classList.remove("screen-error-msg");
}
