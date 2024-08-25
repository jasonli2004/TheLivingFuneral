import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timerStyle = {
        position: 'fixed',
        top: '5px',
        right: '5px',
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: '0.8rem', // Default smaller size
        color: '#f8f8f2',
        backgroundColor: 'rgba(40, 42, 54, 0.3)',
        padding: '5px 10px', // Reduced padding
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.70)',
        zIndex: 1000,
    };

    const responsiveTimerStyle = {
        ...timerStyle,
        '@media (min-width: 768px)': {
            fontSize: '0.6rem', // Larger font for tablets and up
            padding: '8px 12px', // Slightly larger padding
            top: '10px',
            right: '10px',
        },
        '@media (min-width: 1024px)': {
            fontSize: '0.9rem', // Larger font for desktops
            padding: '10px 15px',
            top: '10px',
            right: '10px',
        },
    };

    return (
        <div style={responsiveTimerStyle}>
            <div>{currentTime.toLocaleDateString()}</div>
            <div>{currentTime.toLocaleTimeString()}</div>
        </div>
    );
};

export default Timer;
