import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    // Define state variables
    const [windowPrevState, setWindowPrevState] = useState([]);
    const [windowCurrState, setWindowCurrState] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [avg, setAvg] = useState(0);
    const [numid, setNumid] = useState('e'); // Default numid is 'e' for even
    const [index, setIndex] = useState(0); // Track the index for the current batch of numbers

    const WINDOW_SIZE = 10;
    const API_URL = 'http://localhost:8000/numbers/';

    // Function to fetch numbers from the server
    const fetchNumbers = async (numid) => {
        try {
            const response = await axios.get(`${API_URL}${numid}`);
            const numbersData = response.data.numbers;
            if (numbersData.length === 0) {
                console.error('No numbers found in the response.');
                return [];
            }
            // Extract numbers from the `elem` field
            return numbersData[0].elem; // Assuming only one entry for the numid
        } catch (error) {
            console.error('Error fetching numbers:', error);
            return [];
        }
    };

    // Function to calculate average
    const calculateAverage = (nums) => {
        if (nums.length === 0) {
            return 0;
        }
        const sum = nums.reduce((acc, num) => acc + num, 0);
        return sum / nums.length;
    };

    // Function to update the window of numbers and calculate average
    const updateWindow = async () => {
        // Fetch numbers based on the numid
        const fetchedNumbers = await fetchNumbers(numid);
        console.log('Fetched numbers:', fetchedNumbers);

        // Capture the previous state before modifying
        setWindowPrevState([...windowCurrState]);

        // Calculate start and end indices for slicing
        const startIndex = index;
        const endIndex = index + WINDOW_SIZE;

        // Extract the next WINDOW_SIZE numbers from the fetched numbers
        const newBatch = fetchedNumbers.slice(startIndex, endIndex);

        // Ensure uniqueness in the window by combining existing and new batch of numbers
        const newNumbersSet = new Set([...windowCurrState, ...newBatch]);
        const newNumbersArray = Array.from(newNumbersSet).slice(-WINDOW_SIZE);

        // Update index to manage different batches of numbers
        setIndex((prevIndex) => (prevIndex + WINDOW_SIZE) % fetchedNumbers.length);

        // Update state
        setWindowCurrState(newNumbersArray);
        setNumbers(newNumbersArray);
        setAvg(calculateAverage(newNumbersArray));
    };

    // Initial data fetch and state update on mount
    useEffect(() => {
        updateWindow();
    }, [numid]);

    return (
        <div>
            <h1>Number Average Calculator</h1>
            <div>
                <label htmlFor="numid">Choose a numid (e: even, p: prime, f: fibo):</label>
                <select id="numid" value={numid} onChange={(e) => setNumid(e.target.value)}>
                    <option value="e">Even</option>
                    <option value="p">Prime</option>
                    <option value="f">Fibonacci</option>
                </select>
            </div>
            <button onClick={updateWindow}>Fetch & Update Numbers</button>
            <div>
                <h2>Current State</h2>
                <p>Previous State: {JSON.stringify(windowPrevState)}</p>
                <p>Current State: {JSON.stringify(windowCurrState)}</p>
                <p>Numbers: {JSON.stringify(numbers)}</p>
                <p>Average: {avg.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default App;
