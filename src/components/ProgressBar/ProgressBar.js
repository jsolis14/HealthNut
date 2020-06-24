import React, { useEffect, useState, useRef } from 'react';
import './ProgressBar.css';

const ProgressBar = props => {
    const [offset, setOffset] = useState(0);
    const circleRef = useRef(null);
    const {
        size,
        progress,
        strokeWidth,
        circleOneStroke,
        circleTwoStroke,
        numerator,
        divisor
    } = props;

    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);

        circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out';

    }, [setOffset, progress, circumference, offset]);

    return (
        <>
            <svg
                className="svg circular-chart"
                width={size}
                height={size}
            >
                <circle
                    className="svg-circle-bg circular-bg"
                    stroke={circleOneStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="svg-circle circle"
                    ref={circleRef}
                    stroke={circleTwoStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                <text
                    x={`${center}`}
                    y={`${center}`}
                    className="svg-circle-text percentage">
                    {numerator && divisor ? `${numerator}/${divisor}` : 'Please fill out all info'}{}
                </text>
            </svg>
        </>
    );
}

export default ProgressBar;
