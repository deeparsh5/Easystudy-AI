
import { useState } from 'react';
import '../styles/Flashcards.css';

type FlashcardsProps = {
  onBack: () => void;
  onStartQuiz: () => void;
};

const cards = [
  {
    question: 'What is database normalization?',
    answer:
      'Organizing data into related tables to reduce duplication and improve consistency.',
  },
  {
    question: 'What is a functional dependency?',
    answer:
      'A relationship where one attribute or group of attributes determines another.',
  },
  {
    question: 'What is First Normal Form (1NF)?',
    answer:
      'Each field contains a single value, with no repeating groups.',
  },
  {
    question: 'What is Second Normal Form (2NF)?',
    answer:
      'The table is in 1NF and every non-key attribute depends on the whole candidate key.',
  },
  {
    question: 'What is Third Normal Form (3NF)?',
    answer:
      'The table is in 2NF and has no transitive dependency of non-key attributes on a key.',
  },
  {
    question: 'What is a primary key?',
    answer:
      'An attribute or set of attributes that uniquely identifies each row.',
  },
  {
    question: 'What is a foreign key?',
    answer:
      'An attribute that references a key in another table to link related records.',
  },
  {
    question: 'Why reduce data redundancy?',
    answer:
      'To avoid unnecessary duplication and reduce update, insert, and delete anomalies.',
  },
  {
    question: 'What is a candidate key?',
    answer:
      'A minimal set of attributes that uniquely identifies a row.',
  },
  {
    question: 'What is a partial dependency?',
    answer:
      'When a non-key attribute depends on only part of a composite candidate key.',
  },
];

export default function Flashcards({
  onBack,
  onStartQuiz,
}: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);

  const currentCard = cards[currentIndex];

  function goToCard(index: number) {
    setCurrentIndex(index);
    setShowAnswer(false);
  }

  function markKnown() {
    setKnownCards((current) =>
      current.includes(currentIndex)
        ? current
        : [...current, currentIndex],
    );

    if (currentIndex < cards.length - 1) {
      goToCard(currentIndex + 1);
    }
  }

  return (
    <section className="flashcards-page">
      <button className="flashcards-back" onClick={onBack}>
        ← Back to study set
      </button>

      <header className="flashcards-header">
        <p className="flashcards-eyebrow">DATABASE NORMALIZATION</p>
        <h1>Flashcards</h1>
        <p>Test your memory one card at a time.</p>
      </header>

      <div className="flashcards-progress">
        <span>
          Card {currentIndex + 1} of {cards.length}
        </span>
        <span>{knownCards.length} known</span>
      </div>

      <div className="flashcards-progress-track">
        <div
          className="flashcards-progress-fill"
          style={{
            width: `${((currentIndex + 1) / cards.length) * 100}%`,
          }}
        />
      </div>

      <button
        type="button"
        className={`flashcard ${showAnswer ? 'is-flipped' : ''}`}
        onClick={() => setShowAnswer((current) => !current)}
        aria-label="Flip flashcard to reveal the other side"
      >
        <span className="flashcard-side-label">
          {showAnswer ? 'ANSWER' : 'QUESTION'}
        </span>

        <span className="flashcard-text">
          {showAnswer ? currentCard.answer : currentCard.question}
        </span>

        <span className="flashcard-hint">
          Click the card to {showAnswer ? 'see the question' : 'reveal the answer'}
        </span>
      </button>

      <div className="flashcards-controls">
        <button
          className="flashcards-secondary"
          onClick={() => goToCard(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <button
          className="flashcards-secondary"
          onClick={() => setShowAnswer((current) => !current)}
        >
          Flip card
        </button>

        <button
          className="flashcards-primary"
          onClick={() => goToCard(Math.min(cards.length - 1, currentIndex + 1))}
          disabled={currentIndex === cards.length - 1}
        >
          Next
        </button>
      </div>

      {showAnswer && (
        <button className="flashcards-known" onClick={markKnown}>
          ✓ I know this
        </button>
      )}

      {currentIndex === cards.length - 1 && (
        <div className="flashcards-finish">
          <h2>You've reached the last card!</h2>
          <p>
            You marked {knownCards.length} of {cards.length} cards as known.
          </p>
          <button className="flashcards-primary" onClick={onStartQuiz}>
            Start quiz
          </button>
          <button
            className="flashcards-secondary"
            onClick={() => {
              setKnownCards([]);
              goToCard(0);
            }}
          >
            Start again
          </button>
        </div>
      )}
    </section>
  );
}
