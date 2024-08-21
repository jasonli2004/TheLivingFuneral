import { Container } from 'react-bootstrap';

function ThankYouComponent({ onRestart }) {
    return (
        <Container className="container">
            <h3>Thank You for Participating</h3>
            <p>
                Thank you for taking the time to deeply reflect on the fleeting nature of life and for joining us on this meaningful journey. Your willingness to engage in this experience speaks to your courage and thoughtfulness.
            </p>
            <p>
                Life is brief, yet within this brevity lies the profound opportunity to live with intention, to love fully, and to create a legacy that endures. We hope this experience has inspired you to cherish each moment and to live with purpose.
            </p>
            <p>
                We’re always here for you. For questions or comments, please email us at lil4@carleton.edu.
            </p>
            {/* <button
                className="submit-button"
                onClick={onRestart}
            >
                Restart
            </button> */}
        </Container>
    );
}

export default ThankYouComponent;
