import React, { useState } from 'react';


const HookCount = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState({ firstName: '', lastName: '' });

    const incrementFive = () => {
        setCount(prevCount => prevCount + 5);
    };

    return (
        <div className="main-container">
            <div className="hookcount-container">
                <h1 className="hookcount-title">Count - {count}</h1>
                <button className="hookcount-btn" onClick={() => setCount(count + 1)}>Increment</button>
                <button className="hookcount-btn" onClick={() => setCount(count - 1)}>Decrement</button>
                <button className="hookcount-btn" onClick={incrementFive}>Increment Five</button>
                <button className="hookcount-btn" onClick={() => setCount(0)}>Reset</button>
            </div>
            <div className="hookcount-container">
                <h1 className="hookcount-title">Input</h1>
                <div className="hookcount-input-group">
                    <label>First Name :</label>
                    <input value={name.firstName} onChange={e => setName({ ...name, firstName: e.target.value })} />
                </div>
                <div className="hookcount-input-group">
                    <label>Last Name :</label>
                    <input value={name.lastName} onChange={e => setName({ ...name, lastName: e.target.value })} />
                </div>
                <div className="hookcount-output-group">
                    <h3>First Name : {name.firstName}</h3>
                    <h3>Last Name : {name.lastName}</h3>
                </div>
            </div>
        </div>
    );
};

export default HookCount;