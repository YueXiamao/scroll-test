import { useState, useEffect } from 'react';
import { questions, type ScoreType } from './data/questions';
import { calculateDimensionPercentages, getOverallType } from './data/catTypes';
import './App.css';

type Page = 'home' | 'test' | 'result';

function getPage(): Page {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'test') return 'test';
  if (hash === 'result') return 'result';
  return 'home';
}

function setPage(page: Page) {
  window.location.hash = page;
}

// SVG Arrow icon
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Home() {
  return (
    <div className="home-page">
      <div className="hero-left">
        <p className="hero-eyebrow">Personality Test</p>
        <h1 className="hero-title">
          <span>What Do</span>
          <span>You</span>
          <span>Scroll</span>
        </h1>
        <p className="hero-subtitle">
          18 questions to reveal the content that truly defines your digital life.
        </p>
        <button className="hero-cta" onClick={() => setPage('test')}>
          Begin the test
          <ArrowIcon />
        </button>
      </div>
      <div className="hero-right">
        <img
          className="hero-video"
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80"
          alt="phone scrolling"
        />
        <div className="hero-video-overlay" />
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">8</span>
            <span className="hero-stat-label">Content Types</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">18</span>
            <span className="hero-stat-label">Questions</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">3</span>
            <span className="hero-stat-label">Minutes</span>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </div>
  );
}

const TOPIC_LABELS = ['Beauty', 'Fashion', 'News', 'Cute', 'Food', 'Tech', 'Funny', 'Travel'];

function Test() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<ScoreType>({ beauty: 0, ootd: 0, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 });
  const [history, setHistory] = useState<ScoreType[]>([]);
  const [animating, setAnimating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const q = questions[current];
  const progress = (current / questions.length) * 100;
  const isFirst = current === 0;
  const isLast = current === questions.length - 1;

  const handleSelect = (scores_delta: ScoreType, idx: number) => {
    if (animating) return;
    setAnimating(true);
    setSelectedIndex(idx);

    const newScores = {
      beauty: scores.beauty + scores_delta.beauty,
      ootd: scores.ootd + scores_delta.ootd,
      news: scores.news + scores_delta.news,
      cute: scores.cute + scores_delta.cute,
      food: scores.food + scores_delta.food,
      tech: scores.tech + scores_delta.tech,
      funny: scores.funny + scores_delta.funny,
      travel: scores.travel + scores_delta.travel,
    };

    setTimeout(() => {
      if (isLast) {
        sessionStorage.setItem('scroll_scores', JSON.stringify(newScores));
        setPage('result');
      } else {
        setHistory(prev => [...prev, scores]);
        setScores(newScores);
        setCurrent(prev => prev + 1);
        setSelectedIndex(null);
      }
      setAnimating(false);
    }, 350);
  };

  const handlePrev = () => {
    if (isFirst || animating) return;
    if (history.length > 0) {
      const prevScores = history[history.length - 1];
      setScores(prevScores);
      setHistory(prev => prev.slice(0, -1));
      setCurrent(prev => prev - 1);
      setSelectedIndex(null);
    }
  };

  const handleNext = () => {
    if (isLast || animating) return;
    const neutralDelta: ScoreType = { beauty: 0, ootd: 0, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 };
    handleSelect(neutralDelta, -1);
  };

  return (
    <div className="test-page">
      <div className="test-left">
        <p className="test-progress-label">Progress</p>
        <div className="test-progress-bar">
          <div className="test-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="test-counter">{String(current + 1).padStart(2, '0')}</div>
        <p className="test-counter-label">of {questions.length}</p>
        <p className="test-sidebar-title">Dimensions</p>
        <div className="test-topics">
          {TOPIC_LABELS.map((label, i) => (
            <div key={i} className={`test-topic ${i < current + 1 ? 'active' : ''}`}>
              <span className="test-topic-dot" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="test-right">
        <h2 className="test-question">{q.text}</h2>
        <div className="test-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`test-option ${selectedIndex === i ? 'selected' : ''} ${animating && selectedIndex !== i ? 'disabled' : ''}`}
              onClick={() => handleSelect(opt.scores, i)}
              disabled={animating && selectedIndex !== i}
            >
              <span className="test-option-letter">{String.fromCharCode(65 + i)}</span>
              <span className="test-option-text">{opt.text}</span>
            </button>
          ))}
        </div>
        <div className="test-nav">
          <button className="test-nav-btn" onClick={handlePrev} disabled={isFirst}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M3 7L7 3M3 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Previous
          </button>
          {!isLast && (
            <button className="test-nav-btn primary" onClick={handleNext}>
              Skip
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function RadarChart({ percentages }: { percentages: Record<string, number> }) {
  const categories = ['beauty', 'ootd', 'news', 'cute', 'food', 'tech', 'funny', 'travel'];
  const labels: Record<string, string> = {
    beauty: 'Beauty',
    ootd: 'Fashion',
    news: 'News',
    cute: 'Cute',
    food: 'Food',
    tech: 'Tech',
    funny: 'Funny',
    travel: 'Travel',
  };
  const colors: Record<string, string> = {
    beauty: '#C84B31',
    ootd: '#8B7355',
    news: '#4A5568',
    cute: '#9F7AEA',
    food: '#D69E2E',
    tech: '#38A169',
    funny: '#ED8936',
    travel: '#4299E1',
  };

  const cx = 200, cy = 200, r = 130;
  const step = (2 * Math.PI) / categories.length;

  const points = categories.map((cat, i) => {
    const angle = -Math.PI / 2 + i * step;
    const pct = percentages[cat] || 0;
    const pr = (pct / 100) * r;
    return { x: cx + pr * Math.cos(angle), y: cy + pr * Math.sin(angle), cat, pct };
  });

  const borderPoints = categories.map((_, i) => {
    const angle = -Math.PI / 2 + i * step;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  });

  const gridPaths = [0.33, 0.66, 1.0].map(level => {
    const pts = categories.map((_, i) => {
      const angle = -Math.PI / 2 + i * step;
      return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
    });
    return pts.join(' ');
  });

  const dataPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 400 400" className="result-radar">
      {gridPaths.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#E0DDD8" strokeWidth="1" />
      ))}
      <polygon points={borderPoints.join(' ')} fill="none" stroke="#E0DDD8" strokeWidth="1.5" />
      {categories.map((_, i) => {
        const angle = -Math.PI / 2 + i * step;
        return (
          <line key={i} x1={cx} y1={cy}
            x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)}
            stroke="#E0DDD8" strokeWidth="1" />
        );
      })}
      <path d={dataPath} fill="rgba(200, 75, 49, 0.08)" stroke="#C84B31" strokeWidth="1.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={colors[p.cat]} stroke="#fff" strokeWidth="1.5" />
      ))}
      {points.map((p, i) => {
        const angle = -Math.PI / 2 + i * step;
        const labelR = r + 24;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        const anchor = Math.abs(lx - cx) < 15 ? 'middle' : lx > cx ? 'start' : 'end';
        return (
          <text key={i} x={lx} y={ly + 4} textAnchor={anchor}
            fill={colors[p.cat]} fontSize="11" fontWeight="500">
            {labels[p.cat]}
          </text>
        );
      })}
    </svg>
  );
}

function Result() {
  const [catType, setCatType] = useState<{ name: string; emoji: string; description: string } | null>(null);
  const [percentages, setPercentages] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<ScoreType | null>(null);
  const [visible, setVisible] = useState(false);

  const labels: Record<string, string> = {
    beauty: 'Beauty', ootd: 'Fashion', news: 'News', cute: 'Cute',
    food: 'Food', tech: 'Tech', funny: 'Funny', travel: 'Travel',
  };
  const colors: Record<string, string> = {
    beauty: '#C84B31', ootd: '#8B7355', news: '#4A5568', cute: '#9F7AEA',
    food: '#D69E2E', tech: '#38A169', funny: '#ED8936', travel: '#4299E1',
  };

  useEffect(() => {
    const stored = sessionStorage.getItem('scroll_scores');
    if (stored) {
      const s: ScoreType = JSON.parse(stored);
      setScores(s);
      const pct = calculateDimensionPercentages(s);
      setPercentages(pct);
      setCatType(getOverallType(pct));
    }
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (!catType || !scores) {
    return <div className="result-loading">Analyzing your profile...</div>;
  }

  const sortedCategories = Object.entries(percentages).sort((a, b) => b[1] - a[1]) as [string, number][];

  return (
    <div className={`result-page ${visible ? 'visible' : ''}`}>
      <div className="result-hero">
        <div>
          <p className="result-label">Your Content Persona</p>
          <h1 className="result-type-name">{catType.name}</h1>
          <p className="result-desc">{catType.description}</p>
        </div>
        <div className="result-radar-wrapper">
          <RadarChart percentages={percentages} />
        </div>
      </div>

      <div className="result-categories">
        <div className="result-categories-header">
          <span className="result-categories-title">Dimension Breakdown</span>
        </div>
        <div className="result-categories-list">
          {sortedCategories.map(([cat, pct]) => (
            <div key={cat} className="result-category-item">
              <div className="result-cat-label">
                <span className="result-cat-dot" style={{ background: colors[cat] }} />
                <span className="result-cat-name">{labels[cat]}</span>
              </div>
              <div className="result-cat-bar-wrap">
                <div className="result-cat-bar" style={{ width: `${pct}%`, background: colors[cat] }} />
              </div>
              <span className="result-cat-pct">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="result-actions">
        <button className="result-restart" onClick={() => { sessionStorage.removeItem('scroll_scores'); setPage('home'); }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7C2 4.24 4.24 2 7 2C8.38 2 9.63 2.56 10.54 3.46L9 5H13V1L11.54 2.46C10.27 1.23 8.72 0.5 7 0.5C3.41 0.5 0.5 3.41 0.5 7C0.5 10.59 3.41 13.5 7 13.5C10.59 13.5 13.5 10.59 13.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Retake Test
        </button>
      </div>
    </div>
  );
}

function App() {
  const [page, setPageState] = useState<Page>('home');

  useEffect(() => {
    setPageState(getPage());
    const handler = () => setPageState(getPage());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <button className="header-logo" onClick={() => setPage('home')}>
          Scroll Master
        </button>
        <nav className="header-nav">
          <button onClick={() => setPage('home')} className={page === 'home' ? 'active' : ''}>Home</button>
          <button onClick={() => setPage('test')} className={page === 'test' ? 'active' : ''}>Test</button>
          <button onClick={() => setPage('result')} className={page === 'result' ? 'active' : ''}>Result</button>
        </nav>
      </header>
      <main className="app-main">
        {page === 'home' && <Home />}
        {page === 'test' && <Test />}
        {page === 'result' && <Result />}
      </main>
      <footer className="app-footer">
        <p>Scroll Master — Content Persona Test</p>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
