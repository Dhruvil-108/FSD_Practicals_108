import { useState } from "react";
import "../assets/calculator.css";

export default function Calculator() {
    const [input, setInput] = useState("");
    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };
    const handleClear = () => {
        setInput("");
    };
    const handleDelete = () => {
        setInput(input.slice(0, -1));
    };
    const handleCalculate = () => {
        try {
            // eslint-disable-next-line no-eval
            setInput(String(eval(input)));
        } catch {
            setInput("Error");
        }
    };
    return (
        <div className="calculator-container">
            <div className="calculator">
                <div className="display">{input || "0"}</div>
                <div className="row ops-row">
                    <button onClick={() => handleClick("/")}>÷</button>
                    <button onClick={() => handleClick("*")}>×</button>
                    <button onClick={() => handleClick("+")}>+</button>
                    <button onClick={() => handleClick("-")}>−</button>
                    <button onClick={handleDelete} className="del">DEL</button>
                </div>
                <div className="row">
                    {[7, 8, 9].map((num) => (
                        <button key={num} onClick={() => handleClick(num.toString())}>{num}</button>
                    ))}
                </div>
                <div className="row">
                    {[4, 5, 6].map((num) => (
                        <button key={num} onClick={() => handleClick(num.toString())}>{num}</button>
                    ))}
                </div>
                <div className="row">
                    {[1, 2, 3].map((num) => (
                        <button key={num} onClick={() => handleClick(num.toString())}>{num}</button>
                    ))}
                </div>
                <div className="row">
                    <button onClick={() => handleClick("0")} className="zero">0</button>
                    <button onClick={() => handleClick(".")}>.</button>
                    <button onClick={handleClear} className="clear">C</button>
                </div>
                <div className="row">
                    <button onClick={handleCalculate} className="equals">=</button>
                </div>
            </div>
        </div>
    )
}