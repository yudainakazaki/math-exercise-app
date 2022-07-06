import React from "react";
// import ReactDOM from "react-dom";
import { useState } from "react";
import "./Main.css";
import Execution from "../../Execution.js";
import ProduceProblem from "../../produceProblem";


function Main(){

    const [state, setState] = useState("init");
    const [inputText, setInputText] = useState("");
    const [problem, setProblem] = useState(["", ""]);
    const [isCorrect, setIsCorrect] = useState(true);

    const getNewProblem = () => {
        const exec = new Execution();
        const createProblem = new ProduceProblem()
        let newProblem = createProblem.produceProblem();
        let newSolution = exec.exec(newProblem)
        console.log(newProblem);
        console.log(newSolution);
        setProblem([newProblem, newSolution]);
    }

    const handleGetNew = () => {
        setState("solve");
        setInputText("");
        getNewProblem();
    };

    const handleChange = event => {
        setInputText(event.target.value);
    };

    const Message = () => {
        if (state === "solve"){
            return(
                <div>
                    <span className="solve-message">Solve the problem ✏️</span><br></br>
                    <span>Round your answer to two decimal places.</span>
                </div>
            );
        } else if (state === "result"){
            if(isCorrect){
                return(
                    <div>
                        <span className="correct-message">Your solution is correct :D</span>
                    </div>
                )
            }else{
                return(
                    <div>
                        <span className="incorrect-message">Your solution is incorrect.</span>
                    </div>
                )
            }
        }
    }

    const handleGetAnswer = () => {
        setState("result");
        console.log("Input: " + inputText);
        console.log("Solution: " + problem[1]);
        if (inputText.toString() === problem[1]) {
            setIsCorrect(true);
        }else{
            setIsCorrect(false);
        }
    }


    return (
        <div className="main-container">
            <Message />
            <div className="problem-area">
                <div className="problem-container">
                    <label id="problem">Click "GET NEW PROBLEM"</label>
                </div>
                <div className="outer-answerbox-container">
                    {state !== "init" && (
                        <div className="answerbox-container">
                            <div className="equal"> = </div>
                            <input id="input-box" value={inputText} type="text" onChange={handleChange}></input>
                        </div>
                    )}
                </div>
            </div>
            <div className="button-container">
                <button className="button" id="get-new-button" onClick={handleGetNew}>GET NEW PROBLEM</button>
                <button className="button" id="check-button" onClick={handleGetAnswer}>CHECK YOUR ANSWER</button>
            </div>
        </div>
    )
}

export default Main;