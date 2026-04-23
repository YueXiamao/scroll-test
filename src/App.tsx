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

function Home() {
  return (
    <div className="page home-page">
      <div className="hero-section">
        <div className="floating-icons">
          <div className="fi fi-1">📱</div>
          <div className="fi fi-2">🕳️</div>
          <div className="fi fi-3">🔍</div>
          <div className="fi fi-4">✨</div>
          <div className="fi fi-5">🛒</div>
        </div>
        <h1 className="title">
          <span className="title-icon">🫣</span>
          Scroll Master
          <span className="title-sub">内容刷手鉴定</span>
        </h1>
        <p className="subtitle">
          18道题 · 揭开你灵魂深处的癖好<br />
          测测你到底是什么级别的刷手机选手
        </p>
        <button className="start-btn" onClick={() => setPage('test')}>
          <span className="btn-icon">👆</span>
          开始测试
          <span className="btn-icon">👆</span>
        </button>
        <div className="stats-row">
          <div className="stat"><span className="stat-num">8</span><span className="stat-label">种内容</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">18</span><span className="stat-label">道题目</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">3</span><span className="stat-label">分钟</span></div>
        </div>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>精准分析</h3>
          <p>基于8大内容维度，深度解析你的刷手机偏好</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🕳️</div>
          <h3>趣味测评</h3>
          <p>专业又不严肃，看看你是什么级别的刷手</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>雷达图谱</h3>
          <p>多维度可视化展示，直观了解你的内容偏好</p>
        </div>
      </div>
    </div>
  );
}

function Test() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<ScoreType>({ beauty: 0, ootd: 0, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 });
  const [animating, setAnimating] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const selectOption = (scores_delta: ScoreType) => {
    if (animating) return;
    setAnimating(true);
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
      if (current < questions.length - 1) {
        setScores(newScores);
        setCurrent(prev => prev + 1);
      } else {
        sessionStorage.setItem('scroll_scores', JSON.stringify(newScores));
        setPage('result');
      }
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="page test-page">
      <div className="test-header">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">
          <span>第 {current + 1} / {questions.length} 题</span>
          <span className="progress-dim">正在分析你的刷手机人格...</span>
        </div>
      </div>
      <div className="question-area">
        <div className="question-icon">{current % 3 === 0 ? '🤔' : current % 3 === 1 ? '🫣' : '💭'}</div>
        <h2 className="question-text">{q.text}</h2>
        <div className="options-list">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${animating ? 'disabled' : ''}`}
              onClick={() => selectOption(opt.scores)}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span className="option-text">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="floating-mini">
        <div className="mini-icon">📱</div>
        <div className="mini-icon">🕳️</div>
        <div className="mini-icon">✨</div>
      </div>
    </div>
  );
}

function RadarChart({ percentages }: { percentages: Record<string, number> }) {
  const categories = ['beauty', 'ootd', 'news', 'cute', 'food', 'tech', 'funny', 'travel'];
  const labels: Record<string, string> = {
    beauty: '颜值',
    ootd: '穿搭',
    news: '时政',
    cute: '萌宠',
    food: '美食',
    tech: '科技',
    funny: '搞笑',
    travel: '旅行',
  };
  const colors: Record<string, string> = {
    beauty: '#FF6B9D',
    ootd: '#C44DFF',
    news: '#4D9DFF',
    cute: '#FF9D4D',
    food: '#FFDD4D',
    tech: '#4DFF9D',
    funny: '#FF4D6B',
    travel: '#4DD4FF',
  };

  const cx = 200, cy = 200, r = 150;
  const step = (2 * Math.PI) / categories.length;

  // 8边形顶点
  const points = categories.map((cat, i) => {
    const angle = -Math.PI / 2 + i * step;
    const pct = percentages[cat] || 0;
    const pr = (pct / 100) * r;
    return {
      x: cx + pr * Math.cos(angle),
      y: cy + pr * Math.sin(angle),
      cat,
      pct,
    };
  });

  // 外边框点（100%）
  const borderPoints = categories.map((_, i) => {
    const angle = -Math.PI / 2 + i * step;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  });

  // 内部网格（30%, 60%）
  const gridPaths = [0.3, 0.6, 0.9].map(level => {
    const pts = categories.map((_, i) => {
      const angle = -Math.PI / 2 + i * step;
      return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
    });
    return pts.join(' ');
  });

  const dataPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 400 400" className="radar-svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* 网格 */}
      {gridPaths.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      ))}
      {/* 边框 */}
      <polygon points={borderPoints.join(' ')} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* 轴线 */}
      {categories.map((_, i) => {
        const angle = -Math.PI / 2 + i * step;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}
      {/* 数据区域 */}
      <path d={dataPath} fill="rgba(129, 140, 248, 0.25)" stroke="#818CF8" strokeWidth="2" filter="url(#glow)" />
      {/* 数据点 */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="5"
          fill={colors[p.cat]}
          stroke="#fff"
          strokeWidth="1.5"
        />
      ))}
      {/* 标签 */}
      {points.map((p, i) => {
        const angle = -Math.PI / 2 + i * step;
        const labelR = r + 24;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        const anchor = Math.abs(lx - cx) < 20 ? 'middle' : lx > cx ? 'start' : 'end';
        return (
          <text
            key={i}
            x={lx}
            y={ly + 5}
            textAnchor={anchor}
            fill={colors[p.cat]}
            fontSize="12"
            fontWeight="bold"
          >
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
    beauty: '颜值',
    ootd: '穿搭',
    news: '时政',
    cute: '萌宠',
    food: '美食',
    tech: '科技',
    funny: '搞笑',
    travel: '旅行',
  };

  const colors: Record<string, string> = {
    beauty: '#FF6B9D',
    ootd: '#C44DFF',
    news: '#4D9DFF',
    cute: '#FF9D4D',
    food: '#FFDD4D',
    tech: '#4DFF9D',
    funny: '#FF4D6B',
    travel: '#4DD4FF',
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
    return <div className="page result-page"><div className="loading">正在分析你的刷手人格...</div></div>;
  }

  const sortedCategories = Object.entries(percentages).sort((a, b) => b[1] - a[1]) as [string, number][];

  return (
    <div className={`page result-page ${visible ? 'visible' : ''}`}>
      <div className="result-hero">
        <div className="result-emoji">{catType.emoji}</div>
        <h1 className="result-title">你是 <span className="type-name">{catType.name}</span></h1>
        <p className="result-desc">{catType.description}</p>
      </div>

      <div className="radar-section">
        <h3 className="section-title">📊 内容偏好雷达</h3>
        <div className="radar-container">
          <RadarChart percentages={percentages} />
        </div>
      </div>

      <div className="category-section">
        <h3 className="section-title">🎯 细分维度分析</h3>
        <div className="category-list">
          {sortedCategories.map(([cat, pct]) => (
            <div key={cat} className="category-item">
              <div className="category-header">
                <div className="category-info">
                  <span className="category-dot" style={{ background: colors[cat] }} />
                  <span className="category-label">{labels[cat]}</span>
                  <span className="category-title">「{getTitleForCategory(cat, pct)}」</span>
                </div>
                <span className="category-pct">{pct}%</span>
              </div>
              <div className="category-bar">
                <div
                  className="category-fill"
                  style={{ width: `${pct}%`, background: colors[cat] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="result-actions">
        <button className="restart-btn" onClick={() => { sessionStorage.removeItem('scroll_scores'); setPage('home'); }}>
          🔄 重新测试
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
          🫣 Scroll Master
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
        <p>🫣 Scroll Master 内容刷手鉴定 · 仅供娱乐 · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
