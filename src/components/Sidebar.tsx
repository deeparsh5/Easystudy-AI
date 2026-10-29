import '../styles/Sidebar.css';

type SidebarProps = {
  page: 'home' | 'add-notes';
  onNavigate: (page: 'home' | 'add-notes') => void;
  onOpenStudySets: () => void;
  onOpenProfile: () => void;
};

export default function Sidebar({
  page,
  onNavigate,
  onOpenStudySets,
  onOpenProfile,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <button
        className="logo"
        onClick={() => onNavigate('home')}
        aria-label="EasyStudyAI home"
        title="EasyStudyAI"
      >
        ES
      </button>

      <button
        className={`nav-button ${page === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
        aria-label="Home"
        title="Home"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        </svg>
      </button>

      <button
        className={`nav-button ${page === 'add-notes' ? 'active' : ''}`}
        onClick={() => onNavigate('add-notes')}
        aria-label="Add notes"
        title="Add notes"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <button
        className="nav-button"
        onClick={onOpenStudySets}
        aria-label="Study sets"
        title="Study sets"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="6" height="16" rx="1" />
          <rect x="14" y="4" width="6" height="16" rx="1" />
        </svg>
      </button>

      <div className="sidebar-bottom">
        <button
          className="profile-button"
          onClick={onOpenProfile}
          aria-label="Profile"
          title="Profile"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
