function add(a, b){
    return (a + b).toFixed(3) == a + b? (a + b) : (a + b).toFixed(3);
}

function subtract(a, b){
    return (a - b).toFixed(3) == a - b? (a - b) : (a - b).toFixed(3);
}

function multiply(a, b){
    return (a * b).toFixed(3) == a * b? (a * b) : (a * b).toFixed(3);
}

function divide(a, b){
    return (a / b).toFixed(3) == a / b? (a / b) : (a / b).toFixed(3);
}

function operate(a, b, op){
    if (op == '+'){
        return add(a, b);
    }
    else if (op == '-'){
        return subtract(a, b);
    }
    else if (op == '×'){
        return multiply(a, b);
    }
    else{
        return divide(a, b);
    }
}

let buttons = document.querySelectorAll('.button');
let current = document.querySelector('.current');
let previous = document.querySelector('.previous');
let x = 0;
let operation = '';
let y = 0;
let operatorIndex = 0;
operator = false;

buttons.forEach(
    button => (button.addEventListener('click', (e) => {
        let text = e.target.textContent;
        console.log(e.target.classList);

        if (e.target.classList.contains('clear')){
            x = 0;
            y = 0;
            current.textContent = '';
            previous.textContent = '';
            operator = false;
            operatorIndex = 0;
            operation = ''
        }

        else if (e.target.classList.contains('operator')){
            if (!operator) {
                operator = true;
                x = +current.textContent;
                operation = e.target.textContent;
                console.log(x, operation);
                operatorIndex = current.textContent.length + 1;
                current.textContent += text;
            }

            else if (current.textContent.length > operatorIndex) {
                y = +current.textContent.substring(operatorIndex);
                
                if (y == 0 & operation == '÷'){
                    alert('Dividing by 0 not allowed')
                }
                else {
                    previous.textContent = current.textContent;
                    current.textContent = operate(x, y, operation);
                    x = +current.textContent;
                    operation = text;
                    operatorIndex = current.textContent.length + 1;
                    current.textContent += text;
                }
            }
        }

        else if (e.target.classList.contains('equal')){
            if (operator){
                y = +current.textContent.substring(operatorIndex);
                if (y == 0 & operation == '÷'){
                    alert('Dividing by 0 not allowed')
                }
                else {
                    previous.textContent = current.textContent;
                    current.textContent = operate(x, y, operation);
                    operator = false;
                }
            }
        }

        else {
            current.textContent += text;
        }
        console.log(current.textContent);
    }))
)