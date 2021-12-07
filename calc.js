class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand ='';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand= this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    selectOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation=operation; 
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let result; 
        const prev = parseInt(this.previousOperand);
        const current = parseInt(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return; //if prev or current is empty we dont compute
        switch(this.operation){
            case '+': 
                result = prev + current;
                break;
            case '-': 
                result = prev - current;
                break;
            case '*': 
                result = prev * current;
                break;
            case '÷': 
                result = prev / current;
                break;
            default:
                return;
        }  
        
        this.currentOperand = result;
        this.previousOperand = ''; 
        this.operation = undefined;
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;

        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand}  ${this.operation}` ;
        }else {this.previousOperandTextElement.innerText = this.previousOperand;}

    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButtons = document.querySelector('[data-equals]');
const clearButtons = document.querySelector('[data-allclear]');
const deleteButtons = document.querySelector('[data-delete]');
const currentOperandTextElement = document.querySelector('[data-current]');
const previousOperandTextElement = document.querySelector('[data-prev]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
       calculator.selectOperation(button.innerText);
       calculator.updateDisplay(); 
       calculator.compute();
    })
})

deleteButtons.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})

clearButtons.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

equalButtons.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})