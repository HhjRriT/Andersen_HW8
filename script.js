let screen = (document.body.querySelector(".screen"))
const btns = document.body.querySelector(".buttons")
let res = ""
let value = ""
let lastValue = ""
let lastOper = ""
let operator = ""
let fin = false
const maxInput = 10

function updateScreen(num) {
    if (num === "error") {
        screen.innerText = "Error /0"
        res = ""
        value = ""
        operator = ""
    }
    if (num.length > maxInput) return screen.innerText = (+num).toExponential(maxInput - 5)
    screen.innerText = num
}

const allButons = [[7, 8, 9, "/"], [4, 5, 6, "-"], [1, 2, 3, "+"], [".", 0, "=", "x"]]

function renderBtns(arr) {
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
        if (+event.target.innerText >= 0 && +event.target.innerText <= 9) return numbers(event.target.innerText)
        if (event.target.innerText === "=") {
            if (!value && !lastValue) return res = ""
            if (!value && lastValue) {
                value = lastValue
                operator = lastOper
                return operation()
            }
        }
        operation(event.target.innerText)
    }
})

btns.addEventListener("click", (event) => {
    console.log("result     -", res)
    console.log("operator   -", operator)
    console.log("value      -", value)
    console.log("lastValue  -", lastValue)
    console.log("lastOper  -", lastOper)
    console.log(fin)
    console.log("---------------------")
})


function numbers(num) {
    if (fin) {
        fin = false
        res = ""
        lastValue = ""
        operator = ""
        lastOper = ""
    }
    if (!operator) {
        res.length < maxInput && updateScreen(res = res + num)
    } else if (value.length < maxInput) updateScreen(value = value + num)
}

function operation(oper) {
    if (!res) {
        if (oper === "-") {
            res += "-"
            return updateScreen("-")
        }
    }
    if (!operator) {
        return operator = oper
    }
    if (!value) {
        return operator = oper
    }
    if (operator === "+") {
        updateScreen(res = +res + +value + "")
        fin = true
        lastOper = operator
    }
    if (operator === "-") {
        updateScreen(res = +res - +value + "")
        fin = true
        lastOper = operator
    }
    if (operator === "x") {
        updateScreen(res = +res * +value + "")
        fin = true
        lastOper = operator
    }
    if (operator === "/") {
        if (value === "0") return updateScreen("error")
        updateScreen(res = +res / +value + "")
        fin = true
        lastOper = operator
    }
    lastValue = value
    value = ""
}

updateScreen("")
renderBtns(allButons)