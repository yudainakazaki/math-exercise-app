import React from "react";
import { useState } from "react";
import "./Main.css";
import Execution from "../../Execution.js";
import ProduceProblem from "../../ProduceProblem";


function Main(){

    const [state, setState] = useState("init");
    const [inputText, setInputText] = useState("");
    const [problem, setProblem] = useState({
        problem: "",
        solution: ""
    });
    const [isCorrect, setIsCorrect] = useState(true);

    const getNewProblem = () => {
        const exec = new Execution();
        const createProblem = new ProduceProblem()
        let newProblem = createProblem.produceProblem();
        let newSolution = exec.exec(newProblem)
        setProblem({
            problem: newProblem, 
            solution: newSolution
        });
    }

    const handleGetNew = () => {
        setState("solve");
        setInputText("");
        getNewProblem();
    };

    const handleChange = event => {
        setInputText(event.target.value);
    };

    const handleGetAnswer = () => {
        setState("result");
        console.log("Input: " + inputText);
        console.log("Solution: " + problem.problem);
        if (inputText.toString() === problem.solution) {
            setIsCorrect(true);
        }else{
            setIsCorrect(false);
        }
    }

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
                        <span className="correct-message">Your solution is correct 🥳</span>
                    </div>
                )
            }else{
                return(
                    <div>
                        <span className="incorrect-message">Your solution is incorrect 😢</span>
                    </div>
                )
            }
        }
    }

    const renderAnswerSection = () => {
        if(state !== "init"){
            return(
                <div className="answerbox-container">
                    <div className="equal"> = </div>
                    <input id="input-box" value={inputText} type="text" onChange={handleChange}></input>
                </div>
            );
        }
    }

    return (
        <div className="main-container">
            <div className="message-container">
                <Message />
            </div>
            <div className="problem-area">
                <div className="problem-container">
                    <label id="problem">Click "START"</label>
                </div>
                <div className="outer-answerbox-container">
                    {renderAnswerSection()}
                </div>
            </div>
            <div className="button-container"> 
                {state === "init" ? <button className="button" id="get-new-button" onClick={handleGetNew}>START</button> : <button className="button" id="get-new-button" onClick={handleGetNew}>GET NEW PROBLEM</button>}
                {state !== "init" && <button className="button" id="check-button" onClick={handleGetAnswer}>CHECK YOUR ANSWER</button>}
            </div>
        </div>
    )
}

export default Main;