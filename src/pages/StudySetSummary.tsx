
import { useState } from 'react';
import '../styles/StudySetSummary.css';

type StudySetSummaryProps = {
  onBack: () => void;
  onOpenFlashcards: () => void;
  onStartQuiz: () => void;
};

export default function StudySetSummary({
  onBack,
  onOpenFlashcards,
  onStartQuiz,
}: StudySetSummaryProps) {
  const [title, setTitle] = useState('Database Normalization');
  const [description, setDescription] = useState(
    'Review database normalization concepts, functional dependencies, and normal forms.',
  );

  return (
    <section className="summary-page">
      <button className="summary-back" onClick={onBack}>
        ← Back to content review
      </button>

      <header className="summary-header">
        <p className="summary-eyebrow">YOUR STUDY SET</p>
        <h1>Study set summary</h1>
        <p>Review your study set details before you start studying.</p>
      </header>

      <section className="summary-panel">
        <label className="summary-field">
          <span>Study set title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
            placeholder="Enter a study set title"
          />
        </label>

        <label className="summary-field">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Describe what this study set covers"
          />
        </label>

        <div className="summary-stats">
          <article className="summary-stat">
            <span className="summary-stat-icon">▤</span>
            <strong>10</strong>
            <span>Flashcards</span>
          </article>

          <article className="summary-stat">
            <span className="summary-stat-icon">✓</span>
            <strong>5</strong>
            <span>Quiz questions</span>
          </article>

          <article className="summary-stat">
            <span className="summary-stat-icon">≡</span>
            <strong>1</strong>
            <span>Study summary</span>
          </article>
        </div>

        <p className="summary-note">
          These counts are sample values for the frontend prototype.
        </p>

        <div className="summary-actions">
          <button className="summary-secondary" onClick={onBack}>
            Back
          </button>
          <button
            className="summary-primary"
            onClick={onOpenFlashcards}
            disabled={!title.trim()}
          >
            Study flashcards
          </button>
          <button
            className="summary-primary summary-quiz-button"
            onClick={onStartQuiz}
            disabled={!title.trim()}
          >
            Start quiz
          </button>
        </div>
      </section>
    </section>
  );
}
