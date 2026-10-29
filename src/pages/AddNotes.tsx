import '../styles/AddNotes.css';

import {
  courses,
  materials,
  type Source,
} from '../data/studyData';

type AddNotesProps = {
  source: Source;
  setSource: (source: Source) => void;
  course: string;
  setCourse: (course: string) => void;
  selectedMaterials: string[];
  toggleMaterial: (id: string) => void;
  url: string;
  setUrl: (url: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  onCancel: () => void;
  onExtract: () => void;
  message: string;
};

export default function AddNotes({
  source,
  setSource,
  course,
  setCourse,
  selectedMaterials,
  toggleMaterial,
  url,
  setUrl,
  file,
  setFile,
  onCancel,
  onExtract,
  message,
}: AddNotesProps) {
  return (
    <>
      <button className="back-link" onClick={onCancel}>
        ‹ &nbsp; Home
      </button>

      <header className="page-header">
        <h1>Add notes</h1>
        <p>
          Choose where your notes come from. We'll pull out the text
          for you to review.
        </p>
      </header>

      <div className="source-tabs" role="tablist" aria-label="Notes source">
        <button
          role="tab"
          aria-selected={source === 'd2l'}
          className={source === 'd2l' ? 'source-tab active' : 'source-tab'}
          onClick={() => setSource('d2l')}
        >
          D2L course
        </button>

        <button
          role="tab"
          aria-selected={source === 'web'}
          className={source === 'web' ? 'source-tab active' : 'source-tab'}
          onClick={() => setSource('web')}
        >
          Web page
        </button>

        <button
          role="tab"
          aria-selected={source === 'file'}
          className={source === 'file' ? 'source-tab active' : 'source-tab'}
          onClick={() => setSource('file')}
        >
          Upload file
        </button>
      </div>

      <section className="notes-panel">
        {source === 'd2l' && (
          <>
            <div className="notes-panel-top">
              <div className="connection-info">
                <span className="connection-badge">
                  ✓ &nbsp; Demo connection
                </span>
                <span>{course}</span>
              </div>

              <label className="course-select">
                Course
                <select
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                >
                  {courses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <h2 className="field-heading">Pick the content to study</h2>

            <div className="material-list">
              {materials.map((item) => (
                <label
                  className={`material-row ${
                    selectedMaterials.includes(item.id) ? 'checked' : ''
                  }`}
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(item.id)}
                    onChange={() => toggleMaterial(item.id)}
                  />

                  <span className="material-copy">
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>
                </label>
              ))}
            </div>

            <p className="helper-text">
              Demo course content is sample data; D2L is not connected yet.
            </p>
          </>
        )}

        {source === 'web' && (
          <div className="source-form">
            <h2>Import from a web page</h2>
            <p>Enter the address of a page containing your study material.</p>

            <label htmlFor="page-url">Web page URL</label>
            <input
              id="page-url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/study-notes"
            />

            <p className="helper-text">
              The frontend validates the address. Fetching page content
              will require a backend.
            </p>
          </div>
        )}

        {source === 'file' && (
          <div className="source-form">
            <h2>Upload study material</h2>
            <p>Select a document from your computer.</p>

            <label className="file-picker">
              <span>{file ? file.name : 'Choose a file'}</span>
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx,.ppt,.pptx"
                onChange={(event) =>
                  setFile(event.target.files?.[0] ?? null)
                }
              />
            </label>

            {file && (
              <button
                className="text-button"
                onClick={() => setFile(null)}
              >
                Remove file
              </button>
            )}

            <p className="helper-text">
              Supported selections: PDF, text, Word, and PowerPoint files.
              Actual extraction comes later.
            </p>
          </div>
        )}
      </section>

      {message && (
        <div className="status-message" role="status">
          {message}
        </div>
      )}

      <div className="page-actions">
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>

        <button className="primary-button" onClick={onExtract}>
          Extract content
        </button>
      </div>
    </>
  );
}
