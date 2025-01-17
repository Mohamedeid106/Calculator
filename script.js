function add(num1, num2) {
    return Math.round((Number(num1) + Number(num2)) * 1000) / 1000;
}

function subtract(num1, num2) {
    return Math.round((Number(num1) - Number(num2)) * 1000) / 1000;
}

function multiply(num1, num2) {
    return Math.round((Number(num1) * Number(num2)) * 1000) / 1000;
}

function divide(num1, num2) {
    return Math.round((Number(num1) / Number(num2)) * 1000) / 1000;
}

document.addEventListener("DOMContentLoaded", () => {
    let num1;
    let operator;

    function operate(curr, ope, num1) {
        if (num1 === undefined) {
            operator = ope;
            return curr;
        }

        switch (operator) {
            case '+':
                operator = ope;
                return add(num1, curr);

            case '-':
                operator = ope;
                return subtract(num1, curr);

            case '*':
                operator = ope;
                return multiply(num1, curr);

            case '/':
                operator = ope;
                return divide(num1, curr);
        }
    }    

    let current = document.querySelector(".container .display .current");
    let result = document.querySelector(".container .display .result");

    let Clear = document.querySelector(".container .remove .clear");
    Clear.addEventListener("click", () => {
        current.innerHTML = 0;
        result.innerHTML = '';
        num1 = undefined;
        operator = undefined;
        equal_btn.setAttribute("disapled","");
    });
    
    let Delete = document.querySelector(".container .remove .delete");
    Delete.addEventListener("click", () => {current.innerHTML = current.innerHTML.slice(0, current.innerHTML.length - 1);});

    let dot_btn = document.querySelector(".container .num_operators .num.dot");
    dot_btn.addEventListener("click", () => {
        if (current.innerHTML.includes('.')) {dot_btn.innerHTML = '';}
        else {dot_btn.innerHTML = '.';}
    });

    let num_btns = document.querySelectorAll(".container .num_operators .num");
    num_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            current.innerHTML = current.innerHTML === '0'? current.innerHTML = btn.innerHTML: current.innerHTML += btn.innerHTML;
        });
    });
    
    let equal_btn = document.querySelector(".container .num_operators .operator.equal");
    equal_btn.setAttribute("disapled","");

    let operator_btns = document.querySelectorAll(".container .num_operators .operator");
    operator_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.innerHTML === '=' && equal_btn.attributes.length === 1) {
                if (operator === '/' && (divide(num1, current.innerHTML) === (Infinity || -Infinity) || isNaN(divide(num1, current.innerHTML)))) {
                    alert("You can't divide by 0!");
                } else {
                    result.innerHTML = `${num1} ${operator} ${current.innerHTML === ''? 0: current.innerHTML} =`;
                    num1 = operate(current.innerHTML, btn.innerHTML, num1);
                    current.innerHTML = num1;
                    num1 = undefined;
                    equal_btn.setAttribute("disapled","");
                }
                
            } else if(btn.innerHTML != '=') {
                if ( operator === '/' && (divide(num1, current.innerHTML) === (Infinity || -Infinity) || isNaN(divide(num1, current.innerHTML)))) {
                    alert("You can't divide by 0!");
                } else {
                    equal_btn.removeAttribute("disapled");
                    num1 = operate(current.innerHTML, btn.innerHTML, num1);
                    result.innerHTML = `${num1} ${btn.innerHTML}`;
                    current.innerHTML = 0;
                }
            }
        });
    });
});