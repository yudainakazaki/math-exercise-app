export default class Execution {

    isOperand(c){
        if (c === "+" || c === "-" || c === "×" || c === "÷"){
            return false;
        }else{
            return true;
        }
    }

    getPrecedence(c){
        if (c === "+" || c === "-"){
            return 1;
        } else {
            return 2;
        }
    }

    infixToRPN(exp){
        let stack = [];
        let resExp = [];
        const expArr = exp.split(" ");

        for (let i = 0; i < expArr.length; i++){

            let c = expArr[i];

            if (this.isOperand(c)){
                resExp.push(c);
            } else {
                while(stack.length !== 0 &&
                        this.getPrecedence(c) <= this.getPrecedence(stack[stack.length-1])){
                    resExp.push(stack.pop());
                }
                stack.push(c);
            }
        }

        while(stack.length !== 0){
            resExp.push(stack.pop());
        }

        return resExp;
    }

    isNum(val){
        return !isNaN(val);
    }

    exec(exp){

        exp = this.infixToRPN(exp);

        let stack = [];
        for (let i = 0; i < exp.length; i++){
            if(this.isNum(exp[i])){
                stack.push(parseInt(exp[i]));
            }else{
                if(exp[i] === "+"){
                    let second = stack.pop();
                    let first = stack.pop();
                    stack.push(first+second);
                }else if (exp[i] === "-"){
                    let second = stack.pop();
                    let first = stack.pop();
                    stack.push(first-second);
                }else if(exp[i] === "×"){
                    let second = stack.pop();
                    let first = stack.pop();
                    stack.push(first*second);
                }
                else if(exp[i] === "÷"){
                    let second = stack.pop();
                    let first = stack.pop();
                    stack.push(first/second);
                }
            }
        }
        
        let res = Math.round(stack.pop() * 100) / 100;
        if(res === -0) res = 0; 
        return res.toString();
    }
}