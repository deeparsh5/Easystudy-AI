
import { useMemo, useState } from 'react';
import '../styles/StudySets.css';

export type StudySet = {
  id: string;
  title: string;
  description: string;
  flashcards: number;
  questions: number;
  createdAt: string;
};

type StudySetsProps = {
  onOpenStudySet: (id: string) => void;
  studySets: StudySet[];
};

export default function StudySets({
  onOpenStudySet,
  studySets,
}: StudySetsProps) {
  const [search, setSearch] = useState('');

  const filteredSets = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return studySets;

    return studySets.filter(
      (set) =>
        set.title.toLowerCase().includes(term) ||
        set.description.toLowerCase().includes(term),
    );
  }, [search, studySets]);

  return (
    <section className="study-sets-page">
      <header className="study-sets-header">
        <p className="study-sets-eyebrow">YOUR LEARNING LIBRARY</p>
        <h1>My Study Sets</h1>
        <p>Find and continue studying your saved materials.</p>
      </header>

      <div className="study-sets-toolbar">
        <label className="study-sets-search">
          <span className="study-sets-search-icon">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search study sets..."
            aria-label="Search study sets"
          />
        </label>

        <span className="study-sets-count">
          {filteredSets.length}{' '}
          {filteredSets.length === 1 ? 'study set' : 'study sets'}
        </span>
      </div>

      {filteredSets.length > 0 ? (
        <div className="study-sets-grid">
          {filteredSets.map((set) => (
            <article className="study-set-card" key={set.id}>
              <div className="study-set-card-top">
                <div className="study-set-icon">▤</div>
                <span className="study-set-date">{set.createdAt}</span>
              </div>

              <h2>{set.title}</h2>
              <p className="study-set-description">{set.description}</p>

              <div className="study-set-stats">
                <span>
                  <strong>{set.flashcards}</strong> flashcards
                </span>
                <span>
                  <strong>{set.questions}</strong> quiz questions
                </span>
              </div>

              <button
                className="study-set-open"
                onClick={() => onOpenStudySet(set.id)}
              >
                Open study set <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="study-sets-empty">
          <div className="study-sets-empty-icon">▤</div>
          <h2>{search ? 'No matching study sets' : 'No study sets yet'}</h2>
          <p>
            {search
              ? 'Try a different title or keyword.'
              : 'Create a study set from your notes to see it here.'}
          </p>
        </div>
      )}
    </section>
  );
}
