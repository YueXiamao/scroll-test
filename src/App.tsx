import { useState, useEffect } from 'react';
import { questions, type ScoreType } from './data/questions';
import { calculateDimensionPercentages, getTitleForCategory, getOverallType } from './data/catTypes';
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

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Home() {
  return (
    <div className="home-page">
      <div className="hero-left">
        <p className="hero-eyebrow">性格测试</p>
        <h1 className="hero-title">
          <span>你到底</span>
          <span>爱刷</span>
          <span>什么</span>
        </h1>
        <p className="hero-subtitle">
          18道题，揭开你灵魂深处的数字内容偏好。
        </p>
        <button className="hero-cta" onClick={() => setPage('test')}>
          开始测试
          <ArrowRight />
        </button>
      </div>
      <div className="hero-right">
        <div className="hero-bg-canvas">
          <div className="bg-canvas-blob bg-canvas-blob-1" />
          <div className="bg-canvas-blob bg-canvas-blob-2" />
          <div className="bg-canvas-blob bg-canvas-blob-3" />
          <div className="bg-canvas-blob bg-canvas-blob-4" />
        </div>
        <div className="hero-grain" />
        <div className="hero-scroll-hint">
          <span>滚动</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </div>
  );
}

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
    }, 400);
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
    if (isLast || animating || selectedIndex === null) return;
    const q = questions[current];
    handleSelect(q.options[selectedIndex].scores, selectedIndex);
  };

  return (
    <div className="test-page">
      <div className="test-left">
        <div className="test-left-bg">
          <div className="test-left-blob test-left-blob-1" />
          <div className="test-left-blob test-left-blob-2" />
        </div>
        <p className="test-progress-label">进度</p>
        <div className="test-progress-bar">
          <div className="test-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="test-counter">{String(current + 1).padStart(2, '0')}</div>
        <p className="test-counter-live">第 {current + 1} 题，共 {questions.length} 题</p>
        <div className="test-dots">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`test-dot ${i < current ? 'answered' : ''} ${i === current ? 'current' : ''}`}
            />
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
            <ArrowLeft />
            上一题
          </button>
          <button
            className={`test-nav-btn primary ${selectedIndex !== null ? 'enabled' : ''}`}
            onClick={handleNext}
            disabled={selectedIndex === null || isLast}
          >
            {isLast ? '查看结果' : '下一题'}
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function RadarChart({ percentages }: { percentages: Record<string, number> }) {
  const categories = ['beauty', 'ootd', 'news', 'cute', 'food', 'tech', 'funny', 'travel'];
  const labels: Record<string, string> = {
    beauty: '颜值', ootd: '穿搭', news: '时政', cute: '萌宠',
    food: '美食', tech: '科技', funny: '搞笑', travel: '旅行',
  };
  const colors: Record<string, string> = {
    beauty: '#C84B31', ootd: '#8B7355', news: '#4A5568', cute: '#9F7AEA',
    food: '#D69E2E', tech: '#38A169', funny: '#ED8936', travel: '#4299E1',
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
    beauty: '颜值', ootd: '穿搭', news: '时政', cute: '萌宠',
    food: '美食', tech: '科技', funny: '搞笑', travel: '旅行',
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
    return <div className="result-loading">正在分析你的内容偏好...</div>;
  }

  const sortedCategories = Object.entries(percentages).sort((a, b) => b[1] - a[1]) as [string, number][];

  return (
    <div className={`result-page ${visible ? 'visible' : ''}`}>
      <div className="result-hero">
        <div>
          <p className="result-label">你的内容人格</p>
          <h1 className="result-type-name">{catType.name}</h1>
          <div className="result-emoji-large">{catType.emoji}</div>
          <p className="result-desc">{catType.description}</p>
        </div>
        <div className="result-radar-wrapper">
          <RadarChart percentages={percentages} />
        </div>
      </div>

      <div className="result-categories">
        <p className="result-categories-title">维度细分</p>
        <div className="result-categories-list">
          {sortedCategories.map(([cat, pct]) => (
            <div key={cat} className="result-category-item">
              <div className="result-cat-label">
                <span className="result-cat-dot" style={{ background: colors[cat] }} />
                <span className="result-cat-name">{labels[cat]}</span>
                <span className="result-cat-title-text">「{getTitleForCategory(cat, pct)}」</span>
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
          重新测试
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
          <button onClick={() => setPage('home')} className={page === 'home' ? 'active' : ''}>首页</button>
          <button onClick={() => setPage('test')} className={page === 'test' ? 'active' : ''}>测试</button>
          <button onClick={() => setPage('result')} className={page === 'result' ? 'active' : ''}>结果</button>
        </nav>
      </header>
      <main className="app-main">
        {page === 'home' && <Home />}
        {page === 'test' && <Test />}
        {page === 'result' && <Result />}
      </main>
      <footer className="app-footer">
        <p>Scroll Master 内容刷手鉴定</p>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
