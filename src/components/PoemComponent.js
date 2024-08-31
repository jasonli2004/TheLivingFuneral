import React, { useState } from 'react';
import './PoemComponent.css'; // Ensure you create this CSS file for styling

const PoemComponent = ({ onClick }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClick();
    };

    if (!isVisible) return null;

    return (
        <div className="poem-container"> {/* Changed from Container to div */}
            <h2>Facing the Sea With Spring Blossoms</h2>
            <p>- Hai Zi</p>
            <p>From tomorrow on, I will be a happy man.<br />
                Grooming, chopping, and traveling all over the world.<br />
                From tomorrow on, I will care foodstuff and vegetable.<br />
                Living in a house towards the sea, with spring blossoms.</p>
            <p>From tomorrow on, write to each of my dear ones.<br />
                Telling them of my happiness.<br />
                What the lightening of happiness has told me.<br />
                I will spread it to each of them.</p>
            <p>Give a warm name for every river and every mountain.<br />
                Strangers, I will also wish you happy.<br />
                May you have a brilliant future!<br />
                May you lovers eventually become spouses!<br />
                May you enjoy happiness in this earthly world!<br />
                I only wish to face the sea, with spring blossoms.</p>
            <button className="submit-button" onClick={handleClose}>Next</button>
        </div>
    );
};

export default PoemComponent;