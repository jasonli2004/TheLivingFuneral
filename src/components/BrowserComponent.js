import React, { useEffect } from 'react';

function BrowserComponent({ onReady }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onReady();
        }, 5000); // Simulate a 5-second delay for demonstration

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [onReady]);

    return (
        <div>
            <h3>Simulated Browsing...</h3>
            <p>Please wait while we prepare the next step.</p>
        </div>
    );
}

export default BrowserComponent;
