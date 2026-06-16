import { useState } from 'react'

export default function Flashcard({ questions }) {
    const [flipped, setFlipped] = useState(false);
    const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * questions.length));

    function handleNextClick() {
        setFlipped(false);
        setTimeout(() => {
            setRandomIndex(Math.floor(Math.random() * questions.length));
        }, 200);
    }

    return (
        <div>
            <div className='flashCard' onClick={() => setFlipped(!flipped)}>
                <div className={`flashCard-inner ${flipped ? 'flipped' : ''}`}>
                    <div className="flashCard-front">
                        <span className="cardHint">Question</span>
                        <p>{questions[randomIndex].question}</p>
                    </div>
                    <div className="flashCard-back">
                        <span className="cardHint">Answer</span>
                        <p>{questions[randomIndex].answer}</p>
                    </div>
                </div>
            </div>
            <div className="cardControls">
                <button className="nextBttn" type="button" onClick={handleNextClick}>
                    Next Card →
                </button>
            </div>
        </div>
    );
}
