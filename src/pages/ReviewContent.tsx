import '../styles/ReviewContent.css';

import { useState } from 'react';

type ReviewContentProps = {
  onBack: () => void;
  onContinue: (content: string) => void;
};

const sampleContent = `Database Normalization

Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.

First Normal Form (1NF)
- Each column contains atomic values.
- Each record is unique.
- There are no repeating groups.

Second Normal Form (2NF)
- The table must already satisfy 1NF.
- Every non-key attribute must depend on the whole candidate key.

Third Normal Form (3NF)
- The table must already satisfy 2NF.
- Non-key attributes must not depend transitively on a candidate key.

Key takeaway:
Normalization helps maintain consistent data and reduces unnecessary duplication.`;

export default function ReviewContent({
  onBack,
  onContinue,
}: ReviewContentProps) {
  const [content, setContent] = useState(sampleContent);

  return (
    <section className="review-page">
      <button className="back-link" onClick={onBack}>
        ‹ &nbsp; Back to Add notes
      </button>

      <header className="page-header">
        <h1>Review extracted content</h1>
        <p>
          Review the content before using it to create your study materials.
        </p>
      </header>

      <section className="notes-panel">
        <div className="review-panel-heading">
          <div>
            <h2>Extracted text</h2>
            <p>Edit the text below if anything needs correcting.</p>
          </div>
          <span className="connection-badge">Sample content</span>
        </div>

        <label className="review-label" htmlFor="review-content">
          Content
        </label>

        <textarea
          id="review-content"
          className="review-textarea"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={18}
        />

        <p className="helper-text">
          This is example content. Real document and web-page extraction
          will be connected later.
        </p>
      </section>

      <div className="page-actions">
        <button className="cancel-button" onClick={onBack}>
          Back
        </button>
        <button
          className="primary-button"
          onClick={() => onContinue(content)}
          disabled={!content.trim()}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
