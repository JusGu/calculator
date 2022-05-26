

let n1 = 0;
let n2 = null;
let op = null;
let display = null;
const answer = document.querySelector('.answer')
const n1Display = document.querySelector('.n1')
const n2Display = document.querySelector('.n2')
const opDisplay = document.querySelector('.op')
const equalsDisplay = document.querySelector('.equal-sign')

// handleClick handles when a user clicks a button
function handleClick(e){
    if(e.target.className == "button"){
        let id = e.target.id
        if(!isNaN(id)){
            setNumWrapper(id);
        } else if(id == '*' || id == '/' || id == '+' || id == '-'){
            handleOP(id);
        } else if (id == 'equal'){
            handleEqual();
        } else if (id == 'clear'){
            clear();
        } else if (id == 'back'){
            handleBack();
        }
        console.log(n1, op, n2)

    };
}

// handleBack handles deleting one element when the user clicks back
function handleBack(){
    if (n1 == null){
        return;
    }
    if(!op){
        let n1Array = n1.toString().split('');
        n1Array.pop();
        n1 = n1Array.length ? Number(n1Array.join('')) : null;
        n1Display.innerHTML = n1;
    } else if (!n2){
        op = null;
        opDisplay.innerHTML = op;
    } else {
        let n2Array = n2.toString().split('');
        n2Array.pop();
        n2 = n2Array.length ? Number(n2Array.join('')) : null;
        n2Display.innerHTML = n2;
    }
}

// handleOP handles the calculation and displaying when a user presses an operation button
function handleOP(id) {
    n2 !== null ? handleEqual() : null; // if n2 already has a value calculate this value first, otherwise do nothing
    n1 == 'ERROR' ? handleError() : null; // handleError if there is an error
    op = id;
    opDisplay.innerHTML = '';
    opDisplay.innerHTML = id;
}

// handleError sets n1 to 0 and displays it
function handleError() {
    n1 = 0;
    n1Display.innerHTML = n1;
}

// setNumWrapper is a wrapper function for when a user clicks a number button
function setNumWrapper(id) {
    op ? n2 = setNum(id, n2) : n1 = setNum(id, n1);
    op ? n2Display.innerHTML = n2 : n1Display.innerHTML = n1;
}

// setNum uses the current number n and appends id to the end of that number
function setNum(id, n) {
    let num = Number(id);
    if (num == -1) {
        n *= 100;
    } else {
        n *= 10;
        n += num;
    }
    return n;
}

// handleEqual handles when a user clicks the equal button
function handleEqual() {
    display = calc();
    n1Display.innerHTML = n1Display.innerHTML = Math.round(display * 1000) / 1000;;
    n1 = display;
    n2Display.innerHTML = '';
    opDisplay.innerHTML = '';
}

// clear clears the calculators display
function clear() {
    n1Display.innerHTML = '';
    n2Display.innerHTML = '';
    opDisplay.innerHTML = '';
    display = null;
    n1 = null;
    n2 = null;
    op = null;
}

// calc returns the value of n1 op n2
// if n2 or op is null, then n1 is returned
function calc() {
    let retval = null;
    if (!op || !n2){
        retval = n1;
    } else {
        retval = operate(op, n1, n2)
    }
    n2 = null;
    op = null;
    return retval;
}

function operate(operator, n1, n2){
    if(operator == '+'){
        return add(n1, n2);
    } else if (operator == '-'){
        return subtract(n1 ,n2);
    } else if (operator == '*'){
        return multiply(n1 ,n2);
    } else if (operator == '/'){
        return divide(n1 ,n2);
    }
}

function add(n1, n2){
    return n1 + n2;
}

function subtract(n1, n2){
    return n1 - n2;
}
function multiply(n1, n2){
    return n1 * n2;
}

function divide(n1, n2){
    return n2 ? n1 / n2 : "ERROR";
}




window.addEventListener('click', handleClick);

