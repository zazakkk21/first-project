let runningtotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(value === '×') value = 'x';
    if(value === '−') value = '-';
    if(value === '÷') value = '÷';
    if(value === '←') value = '←';
    if(value === '=') value = '=';

    if(value === '.'){
        handleDot();
        rerender();
        return;
    }
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleDot(){
    if(!buffer.includes('.')) {
        buffer += '.';
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningtotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningtotal;
            runningtotal = 0;
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            }else{
                buffer = buffer.slice(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }
    rerender();
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseFloat(buffer);

    if(runningtotal === 0){
        runningtotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningtotal += intBuffer;
    }else if(previousOperator === '-'){
        runningtotal -= intBuffer;
    }else if(previousOperator === 'x'){
        runningtotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningtotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
    rerender();
}

function rerender(){
    const screen = document.querySelector('.screen');
    if (buffer === ''){
        screen.innerText = runningtotal;
    }else{
        screen.innerText = buffer;
    }
}

function init(){
    document.querySelector('.calc-button-1').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();


