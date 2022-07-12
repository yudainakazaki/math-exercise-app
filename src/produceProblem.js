export default class ProduceProblem{

    getPrefOp(num){
        const prefOps = ["-", ""];
        if(num === 0){
            return "";
        }else{
            return prefOps[Math.floor(Math.random() * 2)];
        }
    }

    produceProblem(){

        const problemLenVals = [3, 5, 7, 9]; 
        const operatorVals = ["+", "-", "×", "÷"];

        var curOp = "";

        var problemLen = problemLenVals[Math.floor(Math.random() * 4)];

        var problemString = "";
        for (let i = 0; i < problemLen; i++){
            if (i%2 === 0){
                var num = (curOp === "÷") ? 
                    Math.floor(Math.random() * 10) + 1:
                    Math.floor(Math.random() * 10);
                problemString += this.getPrefOp(num) + num.toString() + " ";
            } else {
                curOp = operatorVals[Math.floor(Math.random() * 4)];
                problemString += curOp + " ";
            }
        }

        problemString = problemString.slice(0,problemString.length-1);
        document.getElementById("problem").innerHTML = problemString;
        
        //Return a problem in an infix notation in string
        return problemString;
    }
}