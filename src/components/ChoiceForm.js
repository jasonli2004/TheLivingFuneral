import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function ChoiceForm({ onSubmit }) {
    const [choice, setChoice] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        onSubmit({ choice });
    };

    return (
        <Container className="container">
            <h3>Would you rather die tomorrow or live forever?</h3>
            <form onSubmit={handleSubmit}>
                <div className="choice-options">
                    <span
                        className={`choice-option ${choice === 'die' ? 'selected' : ''}`}
                        onClick={() => setChoice('die')}
                    >
                        Die Tomorrow
                    </span>
                    <span
                        className={`choice-option ${choice === 'live' ? 'selected' : ''}`}
                        onClick={() => setChoice('live')}
                    >
                        Live Forever
                    </span>
                </div>

                {!isSubmitted && (
                    <button
                        className="submit-button"
                        type="submit"
                    >
                        Submit
                    </button>
                )}
            </form>
        </Container>
    );
}

export default ChoiceForm;
