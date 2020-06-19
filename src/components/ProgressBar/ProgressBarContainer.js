import React, { useState } from 'react';

import ProgressBar from './ProgressBar';

function ProgressBarContainer() {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('');
    const colorArray = ['#7ea9e1', "#ed004f", "#00fcf0", "#d2fc00", "#7bff00", "#fa6900"];

    const randomColor = () => {
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    const randomProgressValue = () => {
        const progressValue = Math.floor(Math.random() * 101);
        setProgress(progressValue);
        const randomProgressColor = randomColor();
        setColor(randomProgressColor);
    }

    const onChange = e => {
        if (e.target.value) {
            if (e.target.value > 100) {
                progress = 100;
            }
            if (e.target.value < 0) {
                progress = 0;
            }
            setProgress(progress);
            const randomProgressColor = randomColor();
            setColor(randomProgressColor);
        } else {
            setProgress(0);
        }
    }

    return (
        <>
            <ProgressBar progress={progress}
                size={250}
                strokeWidth={15}
                circleOneStroke='#d9edfe'
                circleTwoStroke={color} />
            <input
                type="number"
                name="percent"
                placeholder="Add Progress Value"
                onChange={onChange}
            />
            <button onClick={randomProgressValue}>
                Random
            </button>
        </>
    )
}

export default ProgressBarContainer;
