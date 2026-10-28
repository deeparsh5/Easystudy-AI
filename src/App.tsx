
import './App.css'

const studySets = [
  {
    category: 'DATABASE SYSTEMS · WEEK 6',
    title: 'Normalization (1NF–3NF)',
    tags: ['10 questions', '20 cards', 'Summary'],
    source: 'From D2L · studied today',
  },
  {
    category: 'WEB DEVELOPMENT · WEEK 4',
    title: 'HTTP methods & REST',
    tags: ['8 questions', '15 cards'],
    source: 'From web page · 2 days ago',
  },
  {
    category: 'PROJECT MANAGEMENT · WEEK 3',
    title: 'Scrum roles & ceremonies',
    tags: ['12 cards', 'Summary'],
    source: 'From PDF · last week',
  },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">ES</div>

        <button className="nav-button active" aria-label="Home">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
          </svg>
        </button>

        <button className="nav-button" aria-label="Add notes">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        <button className="nav-button" aria-label="Study sets">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="6" height="16" rx="1" />
            <rect x="14" y="4" width="6" height="16" rx="1" />
          </svg>
        </button>

        <div className="sidebar-bottom">
          <button className="profile-button" aria-label="Profile">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="welcome">
          <h1>Welcome back</h1>
          <p>Pick up where you left off, or turn new notes into practice.</p>
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
            <button className="source-card selected" onClick={() => alert('D2L import will be added later.')}>
              <span className="source-icon">♧</span>
              <span>From D2L</span>
            </button>

            <button className="source-card" onClick={() => alert('Web page import will be added later.')}>
              <span className="source-icon">↗</span>
              <span>Web page</span>
            </button>

            <button className="source-card" onClick={() => alert('File upload will be added later.')}>
              <span className="source-icon">↑</span>
              <span>Upload file</span>
            </button>
          </div>
        </section>

        <section className="recent-section">
          <div className="section-heading">
            <h2>Recent study sets</h2>
            <button className="see-all" onClick={() => alert('All study sets will be added later.')}>
              See all
            </button>
          </div>

          <div className="study-grid">
            {studySets.map((set) => (
              <article className="study-card" key={set.title}>
                <p className="category">{set.category}</p>
                <h3>{set.title}</h3>

                <div className="tags">
                  {set.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>

                <p className="source">{set.source}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
