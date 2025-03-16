import React, { useState } from "react";
import { Container } from "react-bootstrap";

function ThreeWishesForm({ onSubmit }) {
  const [wishes, setWishes] = useState({ wish1: "", wish2: "", wish3: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Hide the button after it's clicked
    onSubmit(wishes);
  };

  return (
    <Container className="container">
      <h4>Three Most Important Things in Your Life</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Thing:</label>
          <input
            type="text"
            placeholder=""
            value={wishes.wish1}
            onChange={(e) => setWishes({ ...wishes, wish1: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Second Thing:</label>
          <input
            type="text"
            placeholder=""
            value={wishes.wish2}
            onChange={(e) => setWishes({ ...wishes, wish2: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Third Thing:</label>
          <input
            type="text"
            placeholder=""
            value={wishes.wish3}
            onChange={(e) => setWishes({ ...wishes, wish3: e.target.value })}
            className="input-field"
          />
        </div>

        {!isSubmitted && (
          <button className="submit-button" type="submit">
            Submit
          </button>
        )}
        {isSubmitted && (
          <div className="flex items-center gap-0.5">
            <p>Loading...</p>
          </div>
        )}
      </form>
    </Container>
  );
}

export default ThreeWishesForm;
