import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function Last24Form({ onSubmit }) {
    const [firstThing, setFirstThing] = useState('');
    const [secondThing, setSecondThing] = useState('');
    const [thirdThing, setThirdThing] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        onSubmit({ firstThing, secondThing, thirdThing });
    };

    return (
        <Container className="container">
            <h3>What are the three things you'd want to do in your last 24 hours?</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Thing:</label>
                    <input
                        type="text"
                        placeholder="Enter the first thing"
                        value={firstThing}
                        onChange={(e) => setFirstThing(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Second Thing:</label>
                    <input
                        type="text"
                        placeholder="Enter the second thing"
                        value={secondThing}
                        onChange={(e) => setSecondThing(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Third Thing:</label>
                    <input
                        type="text"
                        placeholder="Enter the third thing"
                        value={thirdThing}
                        onChange={(e) => setThirdThing(e.target.value)}
                        className="input-field"
                    />
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

export default Last24Form;
