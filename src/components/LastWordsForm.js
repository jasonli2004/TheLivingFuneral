import React, { useState } from 'react';
import './LastWordsForm.css';
import axios from 'axios'; // Import axios for making requests

// LastWordsForm.js
const LastWordsForm = ({ onSubmit }) => {
    const [lastWords, setLastWords] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        // Move to the next step by calling the onSubmit function
        onSubmit({ lastWords }); // Pass last words as part of the data
    };

    return (
        <form className="last-words-form" onSubmit={handleSubmit}>
            <label className="last-words-label" htmlFor="lastWords">
                Your Last Words
            </label>
            <textarea
                id="lastWords"
                className="last-words-input"
                value={lastWords}
                onChange={(e) => setLastWords(e.target.value)}
                placeholder="Write your last words here..."
            />
            {!isSubmitted && (
                <button
                    className="submit-button"
                    type="submit"
                >
                    Submit
                </button>
            )}
            {isSubmitted && <p>Thank you for submitting your last words.</p>}
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default LastWordsForm;
