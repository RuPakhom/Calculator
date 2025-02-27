window.numA = "0"
window.numB = null
window.op = null
window.errorState = false;

const digits = Array.from(document.querySelectorAll(".buttons .digit"))
const signs = Array.from(document.querySelectorAll(".buttons .sign"))
const currentCalc = document.querySelector(".current-calc")
const clear = document.querySelector("#clear")
const backspace = document.querySelector("#backspace")
const equal = document.querySelector("#equal")
const plusminus = document.querySelector("#plusminus")
const dot = document.querySelector(".dot")
const history = document.querySelector(".history")

function simulateClick(div){
    console.log(div)
    if(div){
        div.click()
    }
}

function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a / b
}

function operate(operator, a, b){
    a = parseFloat(a)
    b = parseFloat(b)

    if(operator === "÷" && b === 0){
        showNum("ERROR")
        resetCalculator()
        errorState = true
        return
    }

    let result
    switch(operator){
        case "+":
            result = add(a, b)
            break
        case "−":
            result = subtract(a, b)
            break
        case "×":
            result = multiply(a , b)
            break
        case "÷":
            result = divide(a, b)
            break
        case "=":
            numA = numB
            numB = null
            history.textContent = ""
                return
    }

    result = Number(result.toFixed(6)); 
    showNum(result)
    numA = result.toString()
    numB = null
}

function clearScreen(){
    currentCalc.textContent = "0"
    history.textContent = ""
}

function resetCalculator(){
    numA = "0"
    numB = null
    op = null
    errorState = false;
}

function showNum(result){
    currentCalc.textContent = result
}

const clearHandler = function(){
    resetCalculator()
    clearScreen()
    showNum(numA)
}

const digitHandler = function(evt){
    if(errorState){
        history.textContent = ""
        numA = evt.target.textContent
        errorState = false
        showNum(numA)
    }

    let targetNum = op === null ? "numA" : "numB"

    if(op === null || op === "=") history.textContent = ""

    if(window[targetNum] === null || window[targetNum] === "0"){
        window[targetNum] = evt.target.textContent
    }
    else{
        window[targetNum] += evt.target.textContent
    }
    
    showNum(window[targetNum])
}

const signHandler = function(evt){

    if (errorState) return
    if(numB === null){
        op = evt.target.textContent
        history.textContent = `${numA} ${op}`
        
    }
    else{
        operate(op, numA, numB)
        op = evt.target.textContent
        history.textContent = `${numA} ${op}`
    }
}

const equalHandler = function(){
    if(numA!==null && numB!==null){
        history.textContent = `${numA} ${op} ${numB} =`
        operate(op, numA, numB)
        op = "="
    }
}

const backspaceHandler = function(){

    let targetNum = op === null ? "numA" : "numB"

    if(window[targetNum] !== null) {
        window[targetNum] = window[targetNum].slice(0, -1) || "0"
        showNum(window[targetNum])
    }
}

const dotHandler = function(){
    if(numB === null){
        if(op !== null) return
        if(numA.includes(".")) return
        numA += "."
        showNum(numA)
    }
    else{
        if(numB.includes(".")) return
        numB += "."
        showNum(numB)
    }
}

const plusminushandler = function(){
    if (errorState) return
    if(numB === null){
        if (op !== null && op!="=") return
        numA = (+numA * (-1)).toString()
        showNum(numA)
    }
    else{
        numB = (+numB * (-1)).toString()
        showNum(numB)
    }
}

const keyboardHandler = function(evt){
    const key = evt.key;

    if(!isNaN(key) && key !==" "){
        simulateClick(document.querySelector(`.buttons .digit[data-key="${key}"]`))
    }

    const operators = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
    };

    if(operators[key]){
        simulateClick(document.querySelector(`.buttons .sign[data-key="${operators[key]}"]`))
    }

    if(key === "Enter" || key === "="){
        simulateClick(document.querySelector(`.buttons .eq-sign`))
    }

    if(key.toLowerCase() === "c"){
        simulateClick(document.querySelector(`.buttons #clear`))
    }

    if(key === "Backspace"){
        simulateClick(document.querySelector(`.buttons #backspace`))
    }


    if(key === "_"){
        simulateClick(document.querySelector(`.buttons #plusminus`))
    }
    if(key === "."){
        simulateClick(document.querySelector(`.buttons .dot`))
    }


}

digits.forEach(digit => {
    digit.addEventListener("click", digitHandler)
})

clear.addEventListener("click", clearHandler)

signs.forEach(sign => {
    sign.addEventListener("click", signHandler)
})

equal.addEventListener("click", equalHandler)

backspace.addEventListener("click", backspaceHandler)

plusminus.addEventListener("click",plusminushandler)

dot.addEventListener("click", dotHandler)

window.addEventListener("keyup", keyboardHandler)