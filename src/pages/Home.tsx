import '../styles/Home.css';

import { studySets, type Source } from '../data/studyData';

type HomeProps = {
  onAddNotes: (source: Source) => void;
  onOpenStudySet: (title: string) => void;
};

export default function Home({
  onAddNotes,
  onOpenStudySet,
}: HomeProps) {
  return (
    <>
      <header className="welcome">
        <h1>Welcome back</h1>
        <p>
          Pick up where you left off, or turn new notes into practice.
        </p>
      </header>

      <section className="create-panel">
        <div className="create-copy">
          <h2>Turn your class notes into practice</h2>
          <p>
            Bring in notes from D2L, a web page or a file. EasyStudyAI
            builds a quiz, flashcards and a summary from them.
          </p>
        </div>

        <div className="source-options">
          <button
            className="source-card selected"
            onClick={() => onAddNotes('d2l')}
          >
            <span className="source-icon">♧</span>
            <span>From D2L</span>
          </button>

          <button
            className="source-card"
            onClick={() => onAddNotes('web')}
          >
            <span className="source-icon">↗</span>
            <span>Web page</span>
          </button>

          <button
            className="source-card"
            onClick={() => onAddNotes('file')}
          >
            <span className="source-icon">↑</span>
            <span>Upload file</span>
          </button>
        </div>
      </section>

      <section className="recent-section">
        <div className="section-heading">
          <h2>Recent study sets</h2>
          <button
            className="see-all"
            onClick={() => onOpenStudySet('All study sets')}
          >
            See all
          </button>
        </div>

        <div className="study-grid">
          {studySets.map((set) => (
            <button
              className="study-card"
              key={set.title}
              onClick={() => onOpenStudySet(set.title)}
            >
              <span className="category">{set.category}</span>
              <span className="study-title">{set.title}</span>

              <span className="tags">
                {set.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </span>

              <span className="source">{set.source}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
