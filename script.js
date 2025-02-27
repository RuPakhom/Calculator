let numA = "0"
let numB = null
let op = null

const digits = Array.from(document.querySelectorAll(".buttons .digit"))
const signs = Array.from(document.querySelectorAll(".buttons .sign"))
const currentCalc = document.querySelector(".current-calc")
const clear = document.querySelector("#clear")
const backspace = document.querySelector("#backspace")
const equal = document.querySelector("#equal")
const plusminus = document.querySelector("#plusminus")
const dot = document.querySelector(".dot")
const history = document.querySelector(".history")

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
    if (!isFinite(result)){
        result = "ERROR"
        showNum(result)
        numA = "0"
        numB = null
        op = null
        return
    }
    result = _.round(result, 6)
    showNum(result)
    numA = result.toString()
    numB = null
}

function clearScreen(){
    currentCalc.textContent = 0
    history.textContent = ""
}

function showNum(result){
    currentCalc.textContent = result
}

const clearHandler = function(){
    clearScreen()
    numA = "0"
    numB = null
    op = null
    showNum(numA)
}

const digitHandler = function(evt){
    if(op === null){
        if(numA === "0" && evt.target.textContent === "0") return
        else if(numA === "0"){
            numA = evt.target.textContent
            showNum(numA)
        }
        else{
            numA += evt.target.textContent
            showNum(numA)
        }
    }
    else{
        if(op === "=") history.textContent = ""
        if(numB === null){
            numB = evt.target.textContent
            showNum(numB)
        } else {
            if(numB === "0" && evt.target.textContent === "0") return
            else if(numB === "0"){
                numB = evt.target.textContent
                showNum(numB)
            }
            else{
                numB += evt.target.textContent
                showNum(numB)
            }
        }
    }
}

const signHandler = function(evt){

    if(numB === null){
        op = evt.target.textContent
        history.textContent = `${numA} ${op}`
        
    }
    else{
        operate(op, +numA, +numB)
        op = evt.target.textContent
        history.textContent = `${numA} ${op}`
    }
    
    
}

const equalHandler = function(){
    if(numA!==null && numB!==null){
        history.textContent = `${numA} ${op} ${numB} =`
        operate(op, +numA, +numB)
        op = "="
        console.log(numA)
        console.log(op)
        console.log(numB)
    }
}

const backspaceHandler = function(){
    if(numB === null){
        if (numA[numA.length-1] === ".") {
            numA = parseInt(numA).toString()
            showNum(numA)
            return
        }
        if(op !== null) return
        if(Number.isInteger(+numA)){
            numA = (Math.trunc(+numA / 10)).toString()
            showNum(numA)
        }
        else{
            let str = numA
            let strArray = str.split("")
            strArray.pop()
            numA = strArray.join("")
            showNum(numA)
        }

    }
    else{
        if (numB[numB.length-1] === ".") {
            numB = parseInt(numB).toString()
            showNum(numB)
            return
        }
        if(Number.isInteger(+numB)){
            numB = (Math.trunc(+numB / 10)).toString()
            showNum(numB)
        }
        else{
            let str = numB
            let strArray = str.split("")
            strArray.pop()
            numB = strArray.join("")
            showNum(numB)
        }
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
    if(numB === null){
        numA = (+numA * (-1)).toString()
        showNum(numA)
    }
    else{
        numB = (+numB * (-1)).toString()
        showNum(numB)
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

