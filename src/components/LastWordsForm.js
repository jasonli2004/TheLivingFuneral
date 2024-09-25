import React, { useState } from 'react';
import './LastWordsForm.css';
import axios from 'axios'; // Import axios for making requests

const LastWordsForm = () => {
    const [lastWords, setLastWords] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility
    const [error, setError] = useState(null); // For error handling

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        try {
            // Send the last words to the backend (replace with appropriate endpoint)
            const response = await axios.post('https://livingfuneralnext.vercel.app/api/add-answers', {
                line: lastWords,
            });

            if (response.status === 200) {
                console.log('Last words submitted successfully');
            } else {
                console.error('Failed to submit last words');
                setError('Failed to submit last words');
            }
        } catch (error) {
            console.error('Error submitting last words:', error);
            setError('Error submitting last words');
        }
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
