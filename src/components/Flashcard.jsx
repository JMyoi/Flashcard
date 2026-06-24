import { useState } from 'react'

// Normalize text for lenient matching: lowercase, strip punctuation, collapse whitespace.
function normalize(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, ' ')   // drop punctuation (keep word chars, spaces, hyphens)
        .replace(/\s+/g, ' ')         // collapse whitespace
        .trim();
}

// A guess is correct if any accepted keyword appears within the normalized guess,
// or the guess appears within a keyword (handles partial/keyword-based answers).
function isCorrectGuess(guess, accepted) {
    const g = normalize(guess);
    if (!g) return false;
    return accepted.some((kw) => {
        const k = normalize(kw);
        return g.includes(k) || k.includes(g);
    });
}

// Fisher–Yates shuffle returning a new array.
function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export default function Flashcard({ questions }) {
    const [cards, setCards] = useState(questions);
    const [mastered, setMastered] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState(null); // null | 'correct' | 'incorrect'
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    const card = cards[currentIndex];

    // Reset per-card interaction state when moving to a different card.
    function resetCardState() {
        setFlipped(false);
        setGuess('');
        setFeedback(null);
    }

    function handlePrev() {
        if (currentIndex === 0) return;
        resetCardState();
        setCurrentIndex(currentIndex - 1);
    }

    function handleNext() {
        if (currentIndex >= cards.length - 1) return;
        resetCardState();
        setCurrentIndex(currentIndex + 1);
    }

    function handleShuffle() {
        setCards(shuffleArray(cards));
        setCurrentIndex(0);
        resetCardState();
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!card || !guess.trim()) return;

        if (isCorrectGuess(guess, card.accepted)) {
            setFeedback('correct');
            const next = currentStreak + 1;
            setCurrentStreak(next);
            setLongestStreak((prev) => Math.max(prev, next));
            setFlipped(true); // reveal the answer on a correct guess
        } else {
            setFeedback('incorrect');
            setCurrentStreak(0);
        }
    }

    function handleMaster() {
        if (!card) return;
        const remaining = cards.filter((_, i) => i !== currentIndex);
        setMastered([...mastered, card]);
        setCards(remaining);
        // Keep the index valid for the smaller pool.
        setCurrentIndex(Math.min(currentIndex, Math.max(0, remaining.length - 1)));
        resetCardState();
    }

    return (
        <div>
            <div className="streaks">
                <span className="streakItem">Current streak: <strong>{currentStreak}</strong></span>
                <span className="streakItem">Longest streak: <strong>{longestStreak}</strong></span>
            </div>

            {card ? (
                <>
                    <p className="cardProgress">
                        Card {currentIndex + 1} of {cards.length}
                    </p>

                    <div className="flashCard" onClick={() => setFlipped(!flipped)}>
                        <div className={`flashCard-inner ${flipped ? 'flipped' : ''}`}>
                            <div className="flashCard-front">
                                <span className="cardHint">Question</span>
                                <p>{card.question}</p>
                            </div>
                            <div className="flashCard-back">
                                <span className="cardHint">Answer</span>
                                <p>{card.answer}</p>
                            </div>
                        </div>
                    </div>

                    <form className="guessForm" onSubmit={handleSubmit}>
                        <label htmlFor="guessInput">Your guess</label>
                        <div className="guessRow">
                            <input
                                id="guessInput"
                                className={`guessInput ${feedback ? feedback : ''}`}
                                type="text"
                                value={guess}
                                placeholder="Type a keyword from the answer…"
                                onChange={(e) => {
                                    setGuess(e.target.value);
                                    if (feedback) setFeedback(null);
                                }}
                            />
                            <button className="submitBttn" type="submit">Submit</button>
                        </div>
                        {feedback === 'correct' && (
                            <p className="feedback correct">✓ Correct!</p>
                        )}
                        {feedback === 'incorrect' && (
                            <p className="feedback incorrect">✗ Not quite — try again or flip the card.</p>
                        )}
                    </form>

                    <div className="cardControls">
                        <button
                            className="navBttn"
                            type="button"
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                        >
                            ← Previous
                        </button>
                        <button className="shuffleBttn" type="button" onClick={handleShuffle}>
                            🔀 Shuffle
                        </button>
                        <button className="masterBttn" type="button" onClick={handleMaster}>
                            ✓ Mark Mastered
                        </button>
                        <button
                            className="navBttn"
                            type="button"
                            onClick={handleNext}
                            disabled={currentIndex >= cards.length - 1}
                        >
                            Next →
                        </button>
                    </div>
                </>
            ) : (
                <div className="allDone">
                    <p>All cards mastered! 🎉</p>
                </div>
            )}

            {mastered.length > 0 && (
                <div className="masteredList">
                    <h2>Mastered Cards ({mastered.length})</h2>
                    <ul>
                        {mastered.map((m) => (
                            <li key={m.id}>{m.question}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
