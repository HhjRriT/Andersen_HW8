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
        return
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
                fin = true
                return operation("=")
            }
        }
        if (event.target.innerText === ".") return dot()
        operation(event.target.innerText)
    }
})

function numbers(num) {
    if (operator === "=") fin = true
    if (fin) {
        fin = false
        res = ""
        lastValue = ""
        operator = ""
        lastOper = ""
    }
    if (fin || !operator) {
        updateScreen((res === "0" && num ==="0") ? num : res ==="0" ? res = num : res = res + num)
    } else if (value.length < maxInput) updateScreen((value === "0" && num ==="0") ? num : value ==="0" ? value = num : value = value + num)
}

function operation(oper) {
    fin = false
    if (!res) {
        if (oper === "-") {
            res += "-"
            return updateScreen("-")
        }
    }
    if (!value) {
        return operator = oper
    }
    if (operator === "+") {
        res = +res + +value
        res = (Math.floor(res * 1_000_000_00) / 1_000_000_00) + ""
        updateScreen(res)
        lastOper = operator

    }
    if (operator === "-") {
        res = +res - +value
        res = (Math.floor(res * 1_000_000_00) / 1_000_000_00) + ""
        updateScreen(res)
        lastOper = operator
    }
    if (operator === "x") {
        res = +res * +value
        res = (Math.floor(res * 1_000_000_00) / 1_000_000_00) + ""
        updateScreen(res)
        lastOper = operator
    }
    if (operator === "/") {
        if (value === "0") return updateScreen("error")
        res = +res / +value
        res = (Math.floor(res * 1_000_000_00) / 1_000_000_00) + ""
        updateScreen(res)
        lastOper = operator
    }
    operator = oper
    lastValue = value
    value = ""
}

function dot() {
    if (!operator) {
        updateScreen((res.includes(".")) ? res : res += ".")
    } else if (value.length < maxInput) updateScreen((value.includes(".")) ? value : value += ".")
}

updateScreen("")
renderBtns(allButons)