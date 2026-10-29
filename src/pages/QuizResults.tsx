
import '../styles/QuizResults.css';

type QuizResultsProps = {
  score: number;
  total: number;
  onTryAgain: () => void;
  onBack: () => void;
};

export default function QuizResults({
  score,
  total,
  onTryAgain,
  onBack,
}: QuizResultsProps) {
  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  const feedback =
    percentage >= 80
      ? 'Excellent work!'
      : percentage >= 60
        ? 'Good effort!'
        : 'Keep practising!';

  return (
    <section className="quiz-results-page">
      <button className="results-back" onClick={onBack}>
        ← Back to study set
      </button>

      <header className="results-header">
        <p className="results-eyebrow">QUIZ COMPLETED</p>
        <h1>Your quiz results</h1>
        <p>Here is how you did on Database Normalization.</p>
      </header>

      <section className="results-panel">
        <div className="results-score-circle">
          <span className="results-percentage">{percentage}%</span>
          <span className="results-score-label">Your score</span>
        </div>

        <h2>{feedback}</h2>

        <p className="results-description">
          You answered {score} out of {total} questions correctly.
        </p>

        <div className="results-stats">
          <article className="results-stat">
            <span className="results-stat-number">{score}</span>
            <span className="results-stat-label">Correct answers</span>
          </article>

          <article className="results-stat">
            <span className="results-stat-number">
              {Math.max(0, total - score)}
            </span>
            <span className="results-stat-label">Incorrect answers</span>
          </article>

          <article className="results-stat">
            <span className="results-stat-number">{total}</span>
            <span className="results-stat-label">Total questions</span>
          </article>
        </div>

        <div className="results-actions">
          <button className="results-primary" onClick={onTryAgain}>
            Try again
          </button>

          <button className="results-secondary" onClick={onBack}>
            Back to study set
          </button>
        </div>

        <p className="results-note">
          These results are calculated from the sample quiz in this frontend
          prototype.
        </p>
      </section>
    </section>
  );
}
