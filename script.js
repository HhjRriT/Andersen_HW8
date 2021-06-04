let screen  = (document.body.querySelector(".screen"))
const btns  = document.body.querySelector(".buttons")
let res = ""
let value = ""
let operator = ""
const maxInput = 10

function updateScreen(num) {
    if (!num) return  screen.innerText = res
    screen.innerText = num
}

const allButons = [[7,8,9,"/"],[4,5,6,"-"], [1,2,3,"+"],[".",0,"=", "x"]]

function renderBtns (arr) {
    for (row of arr) {
        const line = document.createElement("div")
        line.className = "row"
        for (btn of row) {
            const button = document.createElement("button")
            button.innerText = btn
            line.appendChild(button)
        }
        btns.appendChild(line)
    }
}

btns.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        if (+event.target.innerText >= 0 && +event.target.innerText <= 9) return  numbers(event.target.innerText)
        operation(event.target.innerText)
    }

})

btns.addEventListener("click", (event) => {
    console.log(res)
    console.log(operator)
    console.log(value)
})




function numbers(num) {
    if (!operator) {
        res.length < maxInput && updateScreen(res = res + num)
    }else if (value.length < maxInput) updateScreen(value = value +num)
}

function operation(oper) {
    if (!operator) {
        return operator = oper
    }
    if (!value) {
        return operator = oper
    }
    if (operator === "+") {
        updateScreen(res = +res + +value)
        value = ""
    }
    if (operator === "-") {
        updateScreen(res = +res - +value)
        value = ""
    }
    if (operator === "x") {
        updateScreen(res = +res * +value)
        value = "" }

    if (operator === "/") {
        updateScreen(res = +res / +value)
        value = "" }

    if (operator === "=") {
        updateScreen(operation(operator))
        value = ""
        operator = ""
    }

}


updateScreen()
renderBtns(allButons)