
import { useState } from 'react';
import './App.css';

import Home from './pages/Home';
import AddNotes from './pages/AddNotes';
import ReviewContent from './pages/ReviewContent';
import StudySetSummary from './pages/StudySetSummary';
import StudySets, { type StudySet } from './pages/StudySets';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import QuizResults from './pages/QuizResults';

import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import type { Source } from './data/studyData';

type Page =
  | 'home'
  | 'add-notes'
  | 'review-content'
  | 'study-set-summary'
  | 'study-sets'
  | 'flashcards'
  | 'quiz'
  | 'quiz-results';

const initialStudySets: StudySet[] = [
  {
    id: 'database-normalization',
    title: 'Database Normalization',
    description:
      'Review database normalization concepts, functional dependencies, and normal forms.',
    flashcards: 10,
    questions: 5,
    createdAt: 'Sample study set',
  },
];

function App() {
  const [page, setPage] = useState<Page>('home');
  const [source, setSource] = useState<Source>('d2l');
  const [course, setCourse] = useState('Database Systems');

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    'week6-slides',
    'week6-labs',
  ]);

  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [studySets] = useState<StudySet[]>(initialStudySets);
  const [activeStudySetId, setActiveStudySetId] = useState(
    'database-normalization',
  );
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(5);

  function openAddNotes(nextSource: Source = 'd2l') {
    setSource(nextSource);
    setMessage('');
    setPage('add-notes');
  }

  function toggleMaterial(id: string) {
    setSelectedMaterials((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setMessage('');
  }

  function handleExtract() {
    if (source === 'd2l' && selectedMaterials.length === 0) {
      setMessage('Select at least one course item to continue.');
      return;
    }

    if (source === 'web') {
      try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          throw new Error('Invalid protocol');
        }
      } catch {
        setMessage('Enter a valid web address, such as https://example.com.');
        return;
      }
    }

    if (source === 'file' && !file) {
      setMessage('Choose a file before continuing.');
      return;
    }

    setMessage('');
    setPage('review-content');
  }

  function handleQuizFinish(score: number, total: number) {
    setQuizScore(score);
    setQuizTotal(total);
    setMessage('');
    setPage('quiz-results');
  }

  function openStudySet(id: string) {
    setActiveStudySetId(id);
    setMessage('');
    setPage('study-set-summary');
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={
          page === 'home' || page === 'add-notes'
            ? page
            : 'home'
        }
        onNavigate={(nextPage) => {
          setPage(nextPage);
          setMessage('');
        }}
        onOpenStudySets={() => {
          setMessage('');
          setPage('study-sets');
        }}
        onOpenProfile={() =>
          setMessage('Profile settings will be added in a later step.')
        }
      />

      <Layout>
        {page === 'home' ? (
          <Home
            onAddNotes={openAddNotes}
            onOpenStudySet={openStudySet}
          />
        ) : page === 'add-notes' ? (
          <AddNotes
            source={source}
            setSource={(nextSource) => {
              setSource(nextSource);
              setMessage('');
            }}
            course={course}
            setCourse={setCourse}
            selectedMaterials={selectedMaterials}
            toggleMaterial={toggleMaterial}
            url={url}
            setUrl={setUrl}
            file={file}
            setFile={setFile}
            onCancel={() => {
              setPage('home');
              setMessage('');
            }}
            onExtract={handleExtract}
            message={message}
          />
        ) : page === 'review-content' ? (
          <ReviewContent
            onBack={() => {
              setPage('add-notes');
              setMessage('');
            }}
            onContinue={(content) => {
              console.log('Reviewed content length:', content.length);
              setMessage('');
              setPage('study-set-summary');
            }}
          />
        ) : page === 'study-set-summary' ? (
          <StudySetSummary
            onBack={() => {
              setPage('review-content');
              setMessage('');
            }}
            onOpenFlashcards={() => {
              setMessage('');
              setPage('flashcards');
            }}
            onStartQuiz={() => {
              setMessage('');
              setPage('quiz');
            }}
          />
        ) : page === 'study-sets' ? (
          <StudySets
            studySets={studySets}
            onOpenStudySet={openStudySet}
          />
        ) : page === 'flashcards' ? (
          <Flashcards
            onBack={() => {
              setPage('study-set-summary');
              setMessage('');
            }}
            onStartQuiz={() => {
              setMessage('');
              setPage('quiz');
            }}
          />
        ) : page === 'quiz' ? (
          <Quiz
            onBack={() => {
              setPage('study-set-summary');
              setMessage('');
            }}
            onFinish={handleQuizFinish}
          />
        ) : (
          <QuizResults
            score={quizScore}
            total={quizTotal}
            onTryAgain={() => {
              setMessage('');
              setPage('quiz');
            }}
            onBack={() => {
              setMessage('');
              setPage('study-set-summary');
            }}
          />
        )}

        {page === 'home' && message && (
          <div className="status-message" role="status">
            {message}
          </div>
        )}
      </Layout>
    </div>
  );
}

export default App;
