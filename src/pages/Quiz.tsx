
import { useState } from 'react';
import '../styles/Quiz.css';

type QuizProps = {
  onBack: () => void;
  onFinish: (score: number, total: number) => void;
};

const questions = [
  {
    question: 'What is the main purpose of database normalization?',
    options: [
      'To increase duplicate data',
      'To reduce redundancy and improve consistency',
      'To remove all database tables',
      'To make every column a primary key',
    ],
    answer: 1,
    explanation:
      'Normalization organizes data to reduce duplication and avoid data anomalies.',
  },
  {
    question: 'What does a primary key do?',
    options: [
      'Stores duplicate rows',
      'Connects every database to the internet',
      'Uniquely identifies each row in a table',
      'Deletes records automatically',
    ],
    answer: 2,
    explanation:
      'A primary key uniquely identifies each row in its table.',
  },
  {
    question: 'What is a foreign key used for?',
    options: [
      'To link related tables',
      'To rename a database',
      'To duplicate every record',
      'To format a column',
    ],
    answer: 0,
    explanation:
      'A foreign key references a key in another table to connect related records.',
  },
  {
    question: 'Which normal form requires atomic values in each field?',
    options: ['3NF', '2NF', 'BCNF', '1NF'],
    answer: 3,
    explanation:
      'First Normal Form (1NF) requires each field to contain a single value.',
  },
  {
    question: 'What is a functional dependency?',
    options: [
      'A type of database backup',
      'A relationship where one attribute determines another',
      'A command to delete a table',
      'A way to sort rows alphabetically',
    ],
    answer: 1,
    explanation:
      'A functional dependency means one attribute or attribute set determines another.',
  },
];

export default function Quiz({ onBack, onFinish }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [checkedQuestions, setCheckedQuestions] = useState<number[]>([]);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = selectedAnswers[currentIndex];
  const isChecked = checkedQuestions.includes(currentIndex);
  const isLastQuestion = currentIndex === questions.length - 1;

  const score = questions.reduce(
    (total, question, index) =>
      total + (selectedAnswers[index] === question.answer ? 1 : 0),
    0,
  );

  function chooseAnswer(optionIndex: number) {
    if (isChecked) return;

    setSelectedAnswers((current) => ({
      ...current,
      [currentIndex]: optionIndex,
    }));
  }

  function handleNext() {
    if (selectedAnswer === undefined) return;

    if (!isChecked) {
      setCheckedQuestions((current) => [...current, currentIndex]);
      return;
    }

    if (isLastQuestion) {
      onFinish(score, questions.length);
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
  }

  function getOptionClass(optionIndex: number) {
    const isSelected = selectedAnswer === optionIndex;
    const isCorrect = currentQuestion.answer === optionIndex;

    if (isChecked && isCorrect) return 'quiz-option correct';
    if (isChecked && isSelected && !isCorrect) {
      return 'quiz-option incorrect';
    }
    if (isSelected) return 'quiz-option selected';

    return 'quiz-option';
  }

  return (
    <section className="quiz-page">
      <button className="quiz-back" onClick={onBack}>
        ← Back to study set
      </button>

      <header className="quiz-header">
        <p className="quiz-eyebrow">DATABASE NORMALIZATION</p>
        <h1>Practice quiz</h1>
        <p>Check your understanding with these practice questions.</p>
      </header>

      <div className="quiz-progress-info">
        <span>
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span>
          {Object.keys(selectedAnswers).length} answered
        </span>
      </div>

      <div className="quiz-progress-track">
        <div
          className="quiz-progress-fill"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="quiz-panel">
        <h2>{currentQuestion.question}</h2>

        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option}
              type="button"
              className={getOptionClass(index)}
              onClick={() => chooseAnswer(index)}
              disabled={isChecked}
            >
              <span className="quiz-option-letter">
                {String.fromCharCode(65 + index)}
              </span>

              <span>{option}</span>

              {isChecked && currentQuestion.answer === index && (
                <span className="quiz-option-result">✓</span>
              )}

              {isChecked &&
                selectedAnswer === index &&
                currentQuestion.answer !== index && (
                  <span className="quiz-option-result">✕</span>
                )}
            </button>
          ))}
        </div>

        {isChecked && (
          <div
            className={`quiz-feedback ${
              selectedAnswer === currentQuestion.answer
                ? 'feedback-correct'
                : 'feedback-incorrect'
            }`}
            role="status"
          >
            <strong>
              {selectedAnswer === currentQuestion.answer
                ? '✓ Correct!'
                : '✕ Incorrect'}
            </strong>

            {selectedAnswer !== currentQuestion.answer && (
              <p className="quiz-correct-answer">
                Correct answer: {currentQuestion.options[currentQuestion.answer]}
              </p>
            )}

            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="quiz-actions">
          <button
            className="quiz-secondary"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>

          <button
            className="quiz-primary"
            onClick={handleNext}
            disabled={selectedAnswer === undefined}
          >
            {!isChecked
              ? 'Check answer'
              : isLastQuestion
                ? 'View results'
                : 'Next question →'}
          </button>
        </div>

        <p className="quiz-note">
          Sample practice questions for the frontend prototype.
        </p>
      </div>
    </section>
  );
}
