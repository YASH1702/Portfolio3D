const { BASE_CSS } = require('./base_css');

function getAIContentHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TaskForge - Content Studio</title>
<style>
${BASE_CSS}
.studio-grid {
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 20px;
  flex: 1;
  overflow: hidden;
}
.form-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  overflow-y: auto;
}
.form-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94A3B8;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.textarea-prompt {
  width: 100%;
  height: 120px;
  background: #0B0F19;
  border: 1px solid #222F46;
  border-radius: 6px;
  padding: 12px;
  color: #F8FAFC;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.5;
  resize: none;
  outline: none;
}
.pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tone-pill {
  background: #131B2B;
  border: 1px solid #233049;
  color: #94A3B8;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.tone-pill.active {
  background: rgba(0, 210, 180, 0.12);
  border: 1px solid #00D2B4;
  color: #00D2B4;
  font-weight: 600;
}
.platform-pill {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  background: #111726;
  border: 1px solid #212C42;
  border-radius: 6px;
  font-size: 12px;
  color: #CBD5E1;
}
.platform-pill.checked {
  border-color: #38BDF8;
  background: rgba(56, 189, 248, 0.08);
  color: #F0F9FF;
}
.check-box {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: #38BDF8;
  color: #082F49;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
}
.metrics-strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 12px;
  background: #0C101B;
  border: 1px solid #1C263A;
  border-radius: 6px;
}
.metric-subitem {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.metric-title { font-size: 10px; color: #64748B; text-transform: uppercase; letter-spacing: 0.06em; }
.metric-val { font-size: 14px; font-weight: 700; color: #F1F5F9; }
.preview-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  overflow-y: auto;
}
.tabs-header {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #1E283D;
  padding-bottom: 10px;
}
.tab-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #94A3B8;
  background: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 6px;
}
.tab-btn.active {
  background: #182236;
  color: #38BDF8;
  border-color: #283754;
}
.post-card {
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.post-author {
  display: flex;
  align-items: center;
  gap: 10px;
}
.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0284C7, #00D2B4);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}
.author-name { font-size: 13px; font-weight: 600; color: #F8FAFC; }
.author-sub { font-size: 11px; color: #64748B; }
.post-body {
  font-size: 13px;
  line-height: 1.6;
  color: #CBD5E1;
  white-space: pre-line;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag-chip {
  color: #38BDF8;
  font-size: 12px;
  font-family: monospace;
}
.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #192236;
}
.char-gauge {
  font-size: 11px;
  font-family: monospace;
  color: #10B981;
  background: rgba(16, 185, 129, 0.1);
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}
</style>
</head>
<body>
  <div class="browser-frame">
    <div class="traffic-lights">
      <div class="dot dot-red"></div>
      <div class="dot dot-yellow"></div>
      <div class="dot dot-green"></div>
    </div>
    <div class="address-bar">
      <span class="lock">🔒</span>
      <span>https://app.taskforge.ai/studio/content-generator</span>
    </div>
    <div class="top-status">
      <span>Workspace: <strong>Acme Cloud SaaS</strong></span>
      <div class="live-pill"><span class="live-dot"></span> GPT-4o ENGINE ONLINE</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #00D2B4, #0284C7);">⚡</div>
        <div class="logo-text">TaskForge</div>
        <div class="logo-badge" style="background: rgba(0, 210, 180, 0.15); color: #00D2B4;">v2.4</div>
      </div>
      <div class="nav-group-title">Studio Features</div>
      <div class="nav-item active"><span class="icon">✨</span> AI Content Studio</div>
      <div class="nav-item"><span class="icon">📅</span> Calendar Scheduler</div>
      <div class="nav-item"><span class="icon">📊</span> Predictive Analytics</div>
      <div class="nav-item"><span class="icon">🌍</span> Audience Reach</div>
      <div class="nav-item"><span class="icon">🔥</span> Activity & Streaks</div>
      <div class="nav-item"><span class="icon">🔄</span> Omni Repurposer</div>
      <div class="nav-group-title" style="margin-top: 16px;">Management</div>
      <div class="nav-item"><span class="icon">📁</span> Content Library</div>
      <div class="nav-item"><span class="icon">👥</span> Team Workspace</div>
      <div class="nav-item"><span class="icon">⚙️</span> Settings & API</div>
    </div>

    <div class="main-content">
      <div class="top-navbar">
        <div class="breadcrumb-area">
          <span>AI Studio</span>
          <span>/</span>
          <span class="breadcrumb-active">Multi-Platform Copywriter</span>
        </div>
        <div class="top-actions">
          <div class="avatar-pill">
            <div class="avatar-img">AR</div>
            <span>Alex Rivera (Admin)</span>
          </div>
        </div>
      </div>

      <div class="page-body">
        <div class="studio-grid">
          <!-- LEFT FORM PANEL -->
          <div class="glass-panel form-panel">
            <div>
              <div class="form-label">
                <span>Core Topic or Product Update</span>
                <span style="color: #38BDF8; font-weight: normal;">Streaming active</span>
              </div>
              <textarea class="textarea-prompt">We just launched our new distributed vector indexing engine with sub-millisecond query latency and zero cold starts. 10x throughput compared to baseline Milvus on 10M embeddings. Built in Rust with Wasm query pre-filtering.</textarea>
            </div>

            <div>
              <div class="form-label">Target Networks</div>
              <div class="pill-group">
                <div class="platform-pill checked"><div class="check-box">✓</div> <span>LinkedIn</span></div>
                <div class="platform-pill checked"><div class="check-box">✓</div> <span>Twitter / X</span></div>
                <div class="platform-pill checked"><div class="check-box">✓</div> <span>Instagram</span></div>
                <div class="platform-pill checked"><div class="check-box">✓</div> <span>TikTok Script</span></div>
              </div>
            </div>

            <div>
              <div class="form-label">Calibrated Brand Tone</div>
              <div class="pill-group">
                <div class="tone-pill active">👔 Professional / Tech Lead</div>
                <div class="tone-pill">🚀 High Energy</div>
                <div class="tone-pill">💡 Thought Leadership</div>
                <div class="tone-pill">🎯 Direct & Minimal</div>
              </div>
            </div>

            <div class="metrics-strip">
              <div class="metric-subitem">
                <span class="metric-title">Predicted Hook Score</span>
                <span class="metric-val" style="color: #34D399;">94 / 100 (Tier 1)</span>
              </div>
              <div class="metric-subitem">
                <span class="metric-title">Readability Index</span>
                <span class="metric-val" style="color: #38BDF8;">Grade 10.4 (Clean Tech)</span>
              </div>
              <div class="metric-subitem" style="margin-top: 6px;">
                <span class="metric-title">Estimated Reach</span>
                <span class="metric-val" style="color: #F59E0B;">24.5k – 42.0k views</span>
              </div>
              <div class="metric-subitem" style="margin-top: 6px;">
                <span class="metric-title">Algorithmic Fit</span>
                <span class="metric-val" style="color: #C084FC;">98% Compliant</span>
              </div>
            </div>

            <button class="btn-primary" style="justify-content: center; height: 42px; font-size: 13px; margin-top: auto;">
              <span>✨</span> Generate Tailored Post Variants
            </button>
          </div>

          <!-- RIGHT PREVIEW PANEL -->
          <div class="glass-panel preview-panel">
            <div class="tabs-header">
              <button class="tab-btn active"><span>💼</span> LinkedIn Post (Active)</button>
              <button class="tab-btn"><span>🐦</span> Twitter / X Thread</button>
              <button class="tab-btn"><span>📸</span> Instagram Carousel</button>
              <button class="tab-btn"><span>🎵</span> TikTok Teleprompter</button>
            </div>

            <div class="post-card">
              <div class="post-author">
                <div class="author-avatar">AR</div>
                <div>
                  <div class="author-name">Alex Rivera <span style="font-weight: normal; color: #64748B;">• 1st</span></div>
                  <div class="author-sub">Principal Systems Architect @ Acme Labs • 14m • 🌐</div>
                </div>
                <div style="margin-left: auto;">
                  <span class="char-gauge">1,348 / 3,000 Chars</span>
                </div>
              </div>

              <div class="post-body">Sub-millisecond vector search isn't just about faster HNSW graphs—it's about eliminating memory fragmentation under concurrent production bursts. ⚡

Over the past 6 months, our engineering team re-architected our core vector indexing pipeline from scratch. Here is what we learned after stress-testing across 10,000,000 embeddings:

1. Memory-Mapped Files vs Pure In-Memory: By memory-mapping compacted leaf segments, we reduced P99 latency from 14.2ms to 0.8ms while slashing RAM footprints by 62%.
2. Zero Cold Starts: Pre-warmed index checkpoints allow instant container restarts without expensive graph re-computations.
3. Wasm Query Pre-filtering: Deterministic metadata filters eliminate 80% of brute-force similarity calculations before index traversal.

The full benchmark harness and reproducible scripts are open-source today. Check out the link below and let me know your thoughts! 👇</div>

              <div class="post-tags">
                <span class="tag-chip">#VectorDB</span>
                <span class="tag-chip">#DistributedSystems</span>
                <span class="tag-chip">#RustLang</span>
                <span class="tag-chip">#DatabaseEngineering</span>
                <span class="tag-chip">#CloudNative</span>
              </div>

              <div class="card-actions">
                <div style="display: flex; gap: 8px;">
                  <button class="btn-primary" style="padding: 6px 14px; font-size: 11px;"><span>📅</span> Schedule Post</button>
                  <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px;"><span>📋</span> Copy Text</button>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: #64748B;">
                  <span>Audience Target: <strong>Tech Founders & Engineers</strong></span>
                </div>
              </div>
            </div>

            <!-- SECONDARY TWITTER PREVIEW -->
            <div class="post-card" style="padding: 14px; background: #0B0F19; border-style: dashed;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: #38BDF8; font-weight: 700; font-size: 13px;">Twitter / X Post Variant</span>
                  <span style="font-size: 11px; color: #64748B;">(Optimized for 280-char hook)</span>
                </div>
                <span class="char-gauge" style="color: #38BDF8; background: rgba(56,189,248,0.1); border-color: rgba(56,189,248,0.2);">246 / 280 Chars</span>
              </div>
              <div style="font-size: 12.5px; line-height: 1.5; color: #CBD5E1;">
                We just open-sourced our Rust-powered vector indexing engine ⚡<br><br>
                Benchmark results across 10M embeddings:<br>
                • 10x query throughput vs baseline<br>
                • 0.8ms P99 latency<br>
                • 0 cold-start overhead<br><br>
                Full architectural breakdown in thread 🧵👇
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function getSchedulingHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TaskForge - Scheduler</title>
<style>
${BASE_CSS}
.calendar-container {
  display: flex;
  gap: 20px;
  flex: 1;
  overflow: hidden;
}
.calendar-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  overflow: hidden;
}
.cal-toolbar {
  padding: 14px 20px;
  border-bottom: 1px solid #1E283D;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.month-title {
  font-size: 17px;
  font-weight: 700;
  color: #F8FAFC;
  display: flex;
  align-items: center;
  gap: 12px;
}
.cal-grid-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #111726;
  border-bottom: 1px solid #1E283D;
}
.cal-grid-header-col {
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
}
.cal-grid-body {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(4, 1fr);
  overflow: hidden;
}
.cal-cell {
  border-right: 1px solid #192234;
  border-bottom: 1px solid #192234;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  background: #0C101A;
}
.cal-cell.today {
  background: #0E1524;
}
.day-num {
  font-size: 11px;
  font-weight: 600;
  color: #64748B;
  display: flex;
  justify-content: space-between;
}
.post-chip {
  padding: 6px 8px;
  border-radius: 5px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: grab;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.chip-linkedin { background: #0A2540; border: 1px solid #0A66C2; color: #93C5FD; }
.chip-twitter { background: #0F2027; border: 1px solid #0284C7; color: #7DD3FC; }
.chip-instagram { background: #240E1B; border: 1px solid #E1306C; color: #F9A8D4; }
.chip-tiktok { background: #1C1018; border: 1px solid #FF0050; color: #FDA4AF; }
.chip-dragging {
  transform: rotate(-2deg) scale(1.04);
  box-shadow: 0 12px 24px -6px rgba(0, 210, 180, 0.4);
  border: 1.5px solid #00D2B4 !important;
  z-index: 10;
  background: #0D2830 !important;
}
.drop-target {
  border: 1.5px dashed #00D2B4 !important;
  background: rgba(0, 210, 180, 0.06) !important;
}
.drop-indicator {
  border: 1px dashed #00D2B4;
  background: rgba(0, 210, 180, 0.1);
  color: #00D2B4;
  padding: 6px;
  border-radius: 4px;
  font-size: 10px;
  text-align: center;
  font-weight: 600;
}
.sidebar-queue {
  width: 320px;
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 14px;
}
.queue-item {
  background: #111726;
  border: 1px solid #1E283D;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.status-pill {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 3px;
  text-transform: uppercase;
}
.status-published { background: rgba(16, 185, 129, 0.15); color: #34D399; }
.status-scheduled { background: rgba(56, 189, 248, 0.15); color: #38BDF8; }
</style>
</head>
<body>
  <div class="browser-frame">
    <div class="traffic-lights">
      <div class="dot dot-red"></div>
      <div class="dot dot-yellow"></div>
      <div class="dot dot-green"></div>
    </div>
    <div class="address-bar">
      <span class="lock">🔒</span>
      <span>https://app.taskforge.ai/scheduler/drag-and-drop-calendar</span>
    </div>
    <div class="top-status">
      <span>Auto-Dispatch: <strong>Vercel Serverless Cron (1m tick)</strong></span>
      <div class="live-pill"><span class="live-dot"></span> DISPATCH CRON ACTIVE</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #00D2B4, #0284C7);">⚡</div>
        <div class="logo-text">TaskForge</div>
        <div class="logo-badge" style="background: rgba(0, 210, 180, 0.15); color: #00D2B4;">v2.4</div>
      </div>
      <div class="nav-group-title">Studio Features</div>
      <div class="nav-item"><span class="icon">✨</span> AI Content Studio</div>
      <div class="nav-item active"><span class="icon">📅</span> Calendar Scheduler</div>
      <div class="nav-item"><span class="icon">📊</span> Predictive Analytics</div>
      <div class="nav-item"><span class="icon">🌍</span> Audience Reach</div>
      <div class="nav-item"><span class="icon">🔥</span> Activity & Streaks</div>
      <div class="nav-item"><span class="icon">🔄</span> Omni Repurposer</div>
      <div class="nav-group-title" style="margin-top: 16px;">Management</div>
      <div class="nav-item"><span class="icon">📁</span> Content Library</div>
      <div class="nav-item"><span class="icon">👥</span> Team Workspace</div>
      <div class="nav-item"><span class="icon">⚙️</span> Settings & API</div>
    </div>

    <div class="main-content">
      <div class="top-navbar">
        <div class="breadcrumb-area">
          <span>Publishing</span>
          <span>/</span>
          <span class="breadcrumb-active">Drag-and-Drop Schedule Matrix</span>
        </div>
        <div class="top-actions">
          <button class="btn-primary"><span>+</span> Schedule New Post</button>
        </div>
      </div>

      <div class="page-body">
        <div class="calendar-container">
          <!-- MAIN CALENDAR -->
          <div class="calendar-main">
            <div class="cal-toolbar">
              <div class="month-title">
                <span>October 2024</span>
                <span style="font-size: 12px; font-weight: normal; color: #64748B;">• Timezone: UTC-5 (EST)</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn-secondary" style="padding: 4px 10px;">‹ Previous</button>
                <button class="btn-secondary" style="padding: 4px 10px;">Today</button>
                <button class="btn-secondary" style="padding: 4px 10px;">Next ›</button>
              </div>
            </div>

            <div class="cal-grid-header">
              <div class="cal-grid-header-col">Mon</div>
              <div class="cal-grid-header-col">Tue</div>
              <div class="cal-grid-header-col">Wed</div>
              <div class="cal-grid-header-col">Thu</div>
              <div class="cal-grid-header-col">Fri</div>
              <div class="cal-grid-header-col">Sat</div>
              <div class="cal-grid-header-col">Sun</div>
            </div>

            <div class="cal-grid-body">
              <!-- Week 1 -->
              <div class="cal-cell"><span class="day-num">7</span></div>
              <div class="cal-cell"><span class="day-num">8</span></div>
              <div class="cal-cell"><span class="day-num">9</span></div>
              <div class="cal-cell"><span class="day-num">10</span></div>
              <div class="cal-cell"><span class="day-num">11</span></div>
              <div class="cal-cell"><span class="day-num">12</span></div>
              <div class="cal-cell"><span class="day-num">13</span></div>

              <!-- Week 2 -->
              <div class="cal-cell">
                <span class="day-num">14</span>
                <div class="post-chip chip-linkedin">
                  <div style="display: flex; justify-content: space-between;"><strong>09:00 AM</strong> <span class="status-pill status-published">Published</span></div>
                  <span>Vector Indexing Launch</span>
                </div>
              </div>
              <div class="cal-cell">
                <span class="day-num">15</span>
                <div class="post-chip chip-twitter">
                  <div style="display: flex; justify-content: space-between;"><strong>01:30 PM</strong> <span class="status-pill status-published">Published</span></div>
                  <span>Benchmarks Thread 🧵</span>
                </div>
              </div>
              <div class="cal-cell today">
                <span class="day-num">16 <span style="color: #38BDF8; font-size: 10px;">● Today</span></span>
                <!-- Active drag ghost -->
                <div class="post-chip chip-instagram chip-dragging">
                  <div style="display: flex; justify-content: space-between;"><strong>04:00 PM</strong> <span class="status-pill status-scheduled">Dragging...</span></div>
                  <span>Architecture Infographic</span>
                </div>
              </div>
              <div class="cal-cell drop-target">
                <span class="day-num">17</span>
                <div class="drop-indicator">Drop to Reschedule (Thu 3:00 PM)</div>
                <div class="post-chip chip-tiktok" style="margin-top: 4px;">
                  <div style="display: flex; justify-content: space-between;"><strong>06:00 PM</strong> <span class="status-pill status-scheduled">Queued</span></div>
                  <span>15s Search Demystified</span>
                </div>
              </div>
              <div class="cal-cell">
                <span class="day-num">18</span>
                <div class="post-chip chip-linkedin">
                  <div style="display: flex; justify-content: space-between;"><strong>10:00 AM</strong> <span class="status-pill status-scheduled">Queued</span></div>
                  <span>Weekly Engineering Digest</span>
                </div>
              </div>
              <div class="cal-cell"><span class="day-num">19</span></div>
              <div class="cal-cell"><span class="day-num">20</span></div>

              <!-- Week 3 -->
              <div class="cal-cell">
                <span class="day-num">21</span>
                <div class="post-chip chip-twitter">
                  <div style="display: flex; justify-content: space-between;"><strong>09:00 AM</strong> <span class="status-pill status-scheduled">Scheduled</span></div>
                  <span>GitHub Repo Release</span>
                </div>
              </div>
              <div class="cal-cell">
                <span class="day-num">22</span>
                <div class="post-chip chip-linkedin">
                  <div style="display: flex; justify-content: space-between;"><strong>11:30 AM</strong> <span class="status-pill status-scheduled">Scheduled</span></div>
                  <span>Scaling to 1B Embeddings</span>
                </div>
              </div>
              <div class="cal-cell"><span class="day-num">23</span></div>
              <div class="cal-cell"><span class="day-num">24</span></div>
              <div class="cal-cell"><span class="day-num">25</span></div>
              <div class="cal-cell"><span class="day-num">26</span></div>
              <div class="cal-cell"><span class="day-num">27</span></div>
            </div>
          </div>

          <!-- SIDEBAR QUEUE -->
          <div class="sidebar-queue">
            <div style="font-size: 13px; font-weight: 700; color: #F8FAFC; display: flex; justify-content: space-between; align-items: center;">
              <span>Upcoming Dispatch</span>
              <span style="font-size: 11px; color: #38BDF8;">3 Queued</span>
            </div>

            <div class="queue-item" style="border-left: 3px solid #FF0050;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: #FDA4AF;">TikTok Video Script</span>
                <span style="font-size: 10px; color: #F59E0B; font-weight: 600;">In 2h 15m</span>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #F1F5F9;">15s Vector Search Demystified</div>
              <div style="font-size: 11px; color: #64748B;">Scheduled for today at 6:00 PM EST</div>
            </div>

            <div class="queue-item" style="border-left: 3px solid #0A66C2;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: #93C5FD;">LinkedIn Thought Post</span>
                <span style="font-size: 10px; color: #94A3B8;">Tomorrow 10:00 AM</span>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #F1F5F9;">Weekly Systems Engineering Digest</div>
              <div style="font-size: 11px; color: #64748B;">Auto-publish via node-cron worker</div>
            </div>

            <div class="queue-item" style="border-left: 3px solid #0284C7;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: #7DD3FC;">Twitter / X Thread</span>
                <span style="font-size: 10px; color: #94A3B8;">Oct 21, 9:00 AM</span>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #F1F5F9;">GitHub Repo Release & FAQ</div>
              <div style="font-size: 11px; color: #64748B;">3-tweet thread with code snippet preview</div>
            </div>

            <div style="margin-top: auto; padding: 12px; background: #0A0D15; border: 1px solid #1E293B; border-radius: 6px;">
              <div style="font-size: 11px; font-weight: 700; color: #34D399; margin-bottom: 4px;">● CRON WORKER HEALTHY</div>
              <div style="font-size: 11px; color: #64748B; line-height: 1.4;">Last sync: 18 seconds ago. Database locks active to prevent duplicate dispatches.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function getPredictiveHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TaskForge - Predictive Analytics</title>
<style>
${BASE_CSS}
.analytics-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.kpi-card {
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.kpi-title { font-size: 11px; color: #64748B; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
.kpi-value { font-size: 26px; font-weight: 800; color: #F8FAFC; letter-spacing: -0.02em; }
.kpi-sub { font-size: 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; }
.chart-section {
  flex: 1;
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart-body {
  flex: 1;
  position: relative;
  width: 100%;
}
.svg-chart {
  width: 100%;
  height: 100%;
}
.bottom-widgets {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 14px;
  height: 200px;
}
</style>
</head>
<body>
  <div class="browser-frame">
    <div class="traffic-lights">
      <div class="dot dot-red"></div>
      <div class="dot dot-yellow"></div>
      <div class="dot dot-green"></div>
    </div>
    <div class="address-bar">
      <span class="lock">🔒</span>
      <span>https://app.taskforge.ai/analytics/predictive-performance</span>
    </div>
    <div class="top-status">
      <span>Recharts Suite: <strong>30-Day Aggregation Window</strong></span>
      <div class="live-pill"><span class="live-dot"></span> LIVE DATA INGESTION</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #00D2B4, #0284C7);">⚡</div>
        <div class="logo-text">TaskForge</div>
        <div class="logo-badge" style="background: rgba(0, 210, 180, 0.15); color: #00D2B4;">v2.4</div>
      </div>
      <div class="nav-group-title">Studio Features</div>
      <div class="nav-item"><span class="icon">✨</span> AI Content Studio</div>
      <div class="nav-item"><span class="icon">📅</span> Calendar Scheduler</div>
      <div class="nav-item active"><span class="icon">📊</span> Predictive Analytics</div>
      <div class="nav-item"><span class="icon">🌍</span> Audience Reach</div>
      <div class="nav-item"><span class="icon">🔥</span> Activity & Streaks</div>
      <div class="nav-item"><span class="icon">🔄</span> Omni Repurposer</div>
      <div class="nav-group-title" style="margin-top: 16px;">Management</div>
      <div class="nav-item"><span class="icon">📁</span> Content Library</div>
      <div class="nav-item"><span class="icon">👥</span> Team Workspace</div>
      <div class="nav-item"><span class="icon">⚙️</span> Settings & API</div>
    </div>

    <div class="main-content">
      <div class="top-navbar">
        <div class="breadcrumb-area">
          <span>Analytics</span>
          <span>/</span>
          <span class="breadcrumb-active">Predictive Metrics & Reach Trends</span>
        </div>
        <div class="top-actions">
          <div style="display: flex; background: #131A28; border: 1px solid #202B3F; border-radius: 6px; padding: 2px;">
            <button style="background: transparent; border: none; color: #64748B; font-size: 11px; padding: 4px 10px; cursor: pointer;">7 Days</button>
            <button style="background: #1E293B; border: 1px solid #334155; color: #38BDF8; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 4px;">30 Days</button>
            <button style="background: transparent; border: none; color: #64748B; font-size: 11px; padding: 4px 10px; cursor: pointer;">90 Days</button>
          </div>
        </div>
      </div>

      <div class="page-body">
        <div class="analytics-grid">
          <!-- 4 KPI CARDS -->
          <div class="kpi-row">
            <div class="kpi-card">
              <span class="kpi-title">Total Impressions</span>
              <span class="kpi-value">128,450</span>
              <span class="kpi-sub" style="color: #34D399;">↑ +24.8% <span style="color: #64748B;">vs previous month</span></span>
            </div>
            <div class="kpi-card">
              <span class="kpi-title">Avg Engagement Rate</span>
              <span class="kpi-value">8.42%</span>
              <span class="kpi-sub" style="color: #34D399;">↑ +3.1% <span style="color: #64748B;">vs 5.3% benchmark</span></span>
            </div>
            <div class="kpi-card">
              <span class="kpi-title">Posts Dispatched</span>
              <span class="kpi-value">184</span>
              <span class="kpi-sub" style="color: #38BDF8;">● 100% On-Time <span style="color: #64748B;">(0 failed crons)</span></span>
            </div>
            <div class="kpi-card">
              <span class="kpi-title">Avg Content Score</span>
              <span class="kpi-value" style="color: #C084FC;">88 / 100</span>
              <span class="kpi-sub" style="color: #F59E0B;">★ High Virality Potential</span>
            </div>
          </div>

          <!-- MAIN RECHARTS AREA CHART -->
          <div class="chart-section">
            <div class="chart-header">
              <div>
                <div style="font-size: 15px; font-weight: 700; color: #F8FAFC;">Multi-Channel Reach Velocity (Area Chart)</div>
                <div style="font-size: 12px; color: #64748B;">Impressions (Teal Area) vs Engagements (Lime Line) over last 30 days</div>
              </div>
              <div style="display: flex; align-items: center; gap: 16px; font-size: 12px;">
                <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #00D2B4; border-radius: 2px;"></span> Impressions</div>
                <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #A3E635; border-radius: 2px;"></span> Engagements</div>
              </div>
            </div>

            <div class="chart-body">
              <svg class="svg-chart" viewBox="0 0 1000 240" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tealArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#00D2B4" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#00D2B4" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>

                <!-- Grid lines -->
                <line x1="40" y1="30" x2="980" y2="30" stroke="#1C273C" stroke-dasharray="4"/>
                <line x1="40" y1="80" x2="980" y2="80" stroke="#1C273C" stroke-dasharray="4"/>
                <line x1="40" y1="130" x2="980" y2="130" stroke="#1C273C" stroke-dasharray="4"/>
                <line x1="40" y1="180" x2="980" y2="180" stroke="#1C273C" stroke-dasharray="4"/>
                <line x1="40" y1="210" x2="980" y2="210" stroke="#25334D"/>

                <!-- Y Axis Labels -->
                <text x="30" y="34" fill="#64748B" font-size="10" text-anchor="end">150k</text>
                <text x="30" y="84" fill="#64748B" font-size="10" text-anchor="end">100k</text>
                <text x="30" y="134" fill="#64748B" font-size="10" text-anchor="end">50k</text>
                <text x="30" y="184" fill="#64748B" font-size="10" text-anchor="end">25k</text>

                <!-- Impressions Filled Area -->
                <path d="M 50 180 Q 150 160, 220 140 T 380 110 T 520 80 T 680 50 T 820 40 T 960 30 L 960 210 L 50 210 Z" fill="url(#tealArea)" />
                <path d="M 50 180 Q 150 160, 220 140 T 380 110 T 520 80 T 680 50 T 820 40 T 960 30" fill="none" stroke="#00D2B4" stroke-width="2.5" />

                <!-- Engagement Line -->
                <path d="M 50 195 Q 150 185, 220 170 T 380 150 T 520 120 T 680 95 T 820 75 T 960 65" fill="none" stroke="#A3E635" stroke-width="2" stroke-dasharray="2,0" />

                <!-- Tooltip Overlay Marker at Oct 18 -->
                <line x1="680" y1="20" x2="680" y2="210" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3,3" />
                <circle cx="680" cy="50" r="5" fill="#00D2B4" stroke="#fff" stroke-width="2"/>
                <circle cx="680" cy="95" r="4" fill="#A3E635" stroke="#fff" stroke-width="1.5"/>

                <!-- Tooltip Card Box -->
                <rect x="695" y="40" width="180" height="70" rx="6" fill="#0B101D" stroke="#25354F" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))"/>
                <text x="708" y="58" fill="#F8FAFC" font-size="11" font-weight="700">Oct 18, 2024</text>
                <text x="708" y="76" fill="#00D2B4" font-size="11">● Impressions: 14,820</text>
                <text x="708" y="94" fill="#A3E635" font-size="11">● Engagements: 1,248 (8.4%)</text>
              </svg>
            </div>
          </div>

          <!-- BOTTOM WIDGETS -->
          <div class="bottom-widgets">
            <div class="glass-panel" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 10px;">
              <div style="font-size: 13px; font-weight: 700; color: #F8FAFC;">Platform Share Breakdown</div>
              <div style="display: flex; align-items: center; justify-content: space-around; flex: 1;">
                <div style="width: 100px; height: 100px; border-radius: 50%; background: conic-gradient(#0A66C2 0% 42%, #0284C7 42% 70%, #E1306C 70% 90%, #FF0050 90% 100%); display: flex; align-items: center; justify-content: center;">
                  <div style="width: 60px; height: 60px; border-radius: 50%; background: #0E1320; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #94A3B8;">4 Net</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px;">
                  <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; background: #0A66C2; border-radius: 2px;"></span> LinkedIn (42%)</div>
                  <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; background: #0284C7; border-radius: 2px;"></span> Twitter/X (28%)</div>
                  <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; background: #E1306C; border-radius: 2px;"></span> Instagram (20%)</div>
                  <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; background: #FF0050; border-radius: 2px;"></span> TikTok (10%)</div>
                </div>
              </div>
            </div>

            <div class="glass-panel" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 10px;">
              <div style="font-size: 13px; font-weight: 700; color: #F8FAFC;">Optimal Posting Window Heatmap</div>
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; flex: 1; align-items: center;">
                <div style="background: #121A2A; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: #64748B;">Mon<br><strong style="color: #94A3B8;">6.4%</strong></div>
                <div style="background: rgba(0, 210, 180, 0.2); border: 1px solid #00D2B4; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: #00D2B4;">Tue<br><strong>9.8% ★</strong></div>
                <div style="background: #141E30; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: #64748B;">Wed<br><strong style="color: #94A3B8;">7.9%</strong></div>
                <div style="background: rgba(0, 210, 180, 0.2); border: 1px solid #00D2B4; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: #00D2B4;">Thu<br><strong>10.2% ★</strong></div>
                <div style="background: #141E30; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: #64748B;">Fri<br><strong style="color: #94A3B8;">8.1%</strong></div>
                <div style="background: #0E1422; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: #475569;">Sat<br><strong>4.2%</strong></div>
                <div style="background: #0E1422; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: #475569;">Sun<br><strong>5.0%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function getAudienceHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TaskForge - Audience World Map</title>
<style>
${BASE_CSS}
.audience-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 20px;
  flex: 1;
  overflow: hidden;
}
.map-card {
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.map-svg-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-svg {
  width: 100%;
  height: 100%;
}
.pulse-node {
  animation: pulseGlow 2s infinite ease-in-out;
}
.stats-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
.country-bar-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.country-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #CBD5E1;
}
.progress-bg {
  height: 7px;
  background: #141C2B;
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 4px;
}
</style>
</head>
<body>
  <div class="browser-frame">
    <div class="traffic-lights">
      <div class="dot dot-red"></div>
      <div class="dot dot-yellow"></div>
      <div class="dot dot-green"></div>
    </div>
    <div class="address-bar">
      <span class="lock">🔒</span>
      <span>https://app.taskforge.ai/analytics/audience-demographics</span>
    </div>
    <div class="top-status">
      <span>Reach: <strong>452,000 Unique Viewers</strong></span>
      <div class="live-pill"><span class="live-dot"></span> 48 COUNTRIES ACTIVE</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #00D2B4, #0284C7);">⚡</div>
        <div class="logo-text">TaskForge</div>
        <div class="logo-badge" style="background: rgba(0, 210, 180, 0.15); color: #00D2B4;">v2.4</div>
      </div>
      <div class="nav-group-title">Studio Features</div>
      <div class="nav-item"><span class="icon">✨</span> AI Content Studio</div>
      <div class="nav-item"><span class="icon">📅</span> Calendar Scheduler</div>
      <div class="nav-item"><span class="icon">📊</span> Predictive Analytics</div>
      <div class="nav-item active"><span class="icon">🌍</span> Audience Reach</div>
      <div class="nav-item"><span class="icon">🔥</span> Activity & Streaks</div>
      <div class="nav-item"><span class="icon">🔄</span> Omni Repurposer</div>
      <div class="nav-group-title" style="margin-top: 16px;">Management</div>
      <div class="nav-item"><span class="icon">📁</span> Content Library</div>
      <div class="nav-item"><span class="icon">👥</span> Team Workspace</div>
      <div class="nav-item"><span class="icon">⚙️</span> Settings & API</div>
    </div>

    <div class="main-content">
      <div class="top-navbar">
        <div class="breadcrumb-area">
          <span>Audience Intelligence</span>
          <span>/</span>
          <span class="breadcrumb-active">Global Reach & Role Demographics</span>
        </div>
      </div>

      <div class="page-body">
        <div class="audience-layout">
          <!-- LEFT WORLD MAP -->
          <div class="map-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #F8FAFC;">Global Reach Map (Active Hubs)</div>
                <div style="font-size: 12px; color: #64748B;">Audience connection clusters across Americas, EMEA, and APAC</div>
              </div>
              <div style="background: #141D2D; border: 1px solid #23314B; padding: 4px 10px; border-radius: 6px; font-size: 11px; color: #38BDF8;">
                Real-Time Node Density
              </div>
            </div>

            <div class="map-svg-container">
              <svg class="map-svg" viewBox="0 0 800 450">
                <!-- Continents Stylized Outlines -->
                <path d="M 120 100 Q 180 80, 240 110 T 260 200 T 200 240 T 130 190 Z" fill="#141C2B" stroke="#222F47" />
                <path d="M 210 260 Q 250 280, 260 340 T 210 420 T 170 330 Z" fill="#141C2B" stroke="#222F47" />
                <path d="M 380 90 Q 460 70, 480 140 T 430 190 T 370 140 Z" fill="#141C2B" stroke="#222F47" />
                <path d="M 390 200 Q 460 220, 450 330 T 380 340 Z" fill="#141C2B" stroke="#222F47" />
                <path d="M 500 90 Q 640 70, 710 130 T 680 230 T 560 220 T 500 150 Z" fill="#141C2B" stroke="#222F47" />
                <path d="M 640 290 Q 720 280, 710 370 T 630 350 Z" fill="#141C2B" stroke="#222F47" />

                <!-- Glow Nodes & Hubs -->
                <!-- San Francisco / Silicon Valley -->
                <circle cx="160" cy="140" r="14" fill="none" stroke="#00D2B4" stroke-width="1" opacity="0.4" />
                <circle cx="160" cy="140" r="5" fill="#00D2B4" />
                <text x="160" y="125" fill="#38BDF8" font-size="10" font-weight="700" text-anchor="middle">Silicon Valley (28%)</text>

                <!-- New York -->
                <circle cx="230" cy="145" r="9" fill="none" stroke="#00D2B4" stroke-width="1" opacity="0.4" />
                <circle cx="230" cy="145" r="4.5" fill="#00D2B4" />
                <text x="230" y="165" fill="#94A3B8" font-size="9" text-anchor="middle">New York (16%)</text>

                <!-- London -->
                <circle cx="410" cy="115" r="10" fill="none" stroke="#00D2B4" stroke-width="1" opacity="0.4" />
                <circle cx="410" cy="115" r="4.5" fill="#00D2B4" />
                <text x="410" y="105" fill="#38BDF8" font-size="9" font-weight="700" text-anchor="middle">London (12%)</text>

                <!-- Berlin -->
                <circle cx="445" cy="118" r="8" fill="none" stroke="#38BDF8" stroke-width="1" opacity="0.4" />
                <circle cx="445" cy="118" r="4" fill="#38BDF8" />

                <!-- Bengaluru -->
                <circle cx="575" cy="210" r="10" fill="none" stroke="#A855F7" stroke-width="1" opacity="0.4" />
                <circle cx="575" cy="210" r="4.5" fill="#A855F7" />
                <text x="575" y="228" fill="#C084FC" font-size="9" text-anchor="middle">Bengaluru (9%)</text>

                <!-- Tokyo -->
                <circle cx="680" cy="155" r="9" fill="none" stroke="#00D2B4" stroke-width="1" opacity="0.4" />
                <circle cx="680" cy="155" r="4" fill="#00D2B4" />
                <text x="680" y="145" fill="#94A3B8" font-size="9" text-anchor="middle">Tokyo (8%)</text>

                <!-- Sydney -->
                <circle cx="680" cy="330" r="8" fill="none" stroke="#38BDF8" stroke-width="1" opacity="0.4" />
                <circle cx="680" cy="330" r="4" fill="#38BDF8" />

                <!-- Translucent Data Arcs -->
                <path d="M 160 140 Q 280 80, 410 115" fill="none" stroke="#00D2B4" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6"/>
                <path d="M 410 115 Q 500 130, 575 210" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.5"/>
                <path d="M 575 210 Q 630 170, 680 155" fill="none" stroke="#A855F7" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.5"/>
              </svg>
            </div>
          </div>

          <!-- RIGHT STATS PANEL -->
          <div class="stats-panel">
            <div class="glass-panel" style="padding: 18px;">
              <div style="font-size: 13px; font-weight: 700; color: #F8FAFC; margin-bottom: 14px;">Country Demographics</div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div class="country-bar-item">
                  <div class="country-meta"><span>🇺🇸 United States</span> <strong>44.2%</strong></div>
                  <div class="progress-bg"><div class="progress-fill" style="width: 44.2%; background: #00D2B4;"></div></div>
                </div>
                <div class="country-bar-item">
                  <div class="country-meta"><span>🇬🇧 United Kingdom</span> <strong>18.5%</strong></div>
                  <div class="progress-bg"><div class="progress-fill" style="width: 18.5%; background: #38BDF8;"></div></div>
                </div>
                <div class="country-bar-item">
                  <div class="country-meta"><span>🇩🇪 Germany</span> <strong>14.1%</strong></div>
                  <div class="progress-bg"><div class="progress-fill" style="width: 14.1%; background: #60A5FA;"></div></div>
                </div>
                <div class="country-bar-item">
                  <div class="country-meta"><span>🇯🇵 Japan</span> <strong>11.4%</strong></div>
                  <div class="progress-bg"><div class="progress-fill" style="width: 11.4%; background: #818CF8;"></div></div>
                </div>
                <div class="country-bar-item">
                  <div class="country-meta"><span>🇨🇦 Canada</span> <strong>7.8%</strong></div>
                  <div class="progress-bg"><div class="progress-fill" style="width: 7.8%; background: #C084FC;"></div></div>
                </div>
              </div>
            </div>

            <div class="glass-panel" style="padding: 18px;">
              <div style="font-size: 13px; font-weight: 700; color: #F8FAFC; margin-bottom: 14px;">Audience Seniority & Roles</div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #CBD5E1;">
                  <span>Staff & Lead Software Engineers</span> <strong style="color: #38BDF8;">38%</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #CBD5E1;">
                  <span>Tech Founders & CTOs</span> <strong style="color: #00D2B4;">27%</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #CBD5E1;">
                  <span>Product & Engineering Managers</span> <strong style="color: #F59E0B;">21%</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #CBD5E1;">
                  <span>AI & Distributed Systems Researchers</span> <strong style="color: #C084FC;">14%</strong>
                </div>
              </div>
            </div>

            <div class="glass-panel" style="padding: 16px; border-left: 3px solid #00D2B4;">
              <div style="font-size: 11px; font-weight: 700; color: #00D2B4; text-transform: uppercase;">Peak Engagement Window</div>
              <div style="font-size: 13px; font-weight: 600; color: #F8FAFC; margin-top: 3px;">08:30 AM – 11:15 AM EST (13:30 – 16:15 UTC)</div>
              <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Overlaps US East Coast work start & EMEA afternoon catch-up.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function getOptimizationHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TaskForge - Optimization & Heatmap</title>
<style>
${BASE_CSS}
.opt-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}
.heatmap-card {
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  grid-template-rows: repeat(7, 12px);
  gap: 3px;
}
.heat-cell {
  border-radius: 2px;
  background: #141C2B;
}
.h0 { background: #131A28; }
.h1 { background: #064E3B; }
.h2 { background: #047857; }
.h3 { background: #10B981; }
.h4 { background: #34D399; box-shadow: 0 0 4px #34D399; }
.score-and-table {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}
.health-card {
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.gauge-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 6px solid #10B981;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.25);
}
.table-card {
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}
.lead-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.lead-table th {
  text-align: left;
  padding: 8px 10px;
  color: #64748B;
  font-weight: 700;
  border-bottom: 1px solid #1E293B;
  font-size: 11px;
  text-transform: uppercase;
}
.lead-table td {
  padding: 10px;
  border-bottom: 1px solid #162032;
  color: #CBD5E1;
}
</style>
</head>
<body>
  <div class="browser-frame">
    <div class="traffic-lights">
      <div class="dot dot-red"></div>
      <div class="dot dot-yellow"></div>
      <div class="dot dot-green"></div>
    </div>
    <div class="address-bar">
      <span class="lock">🔒</span>
      <span>https://app.taskforge.ai/analytics/activity-health-score</span>
    </div>
    <div class="top-status">
      <span>Consistency: <strong>48-Day Publishing Streak</strong></span>
      <div class="live-pill"><span class="live-dot"></span> 342 POSTS LOGGED</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #00D2B4, #0284C7);">⚡</div>
        <div class="logo-text">TaskForge</div>
        <div class="logo-badge" style="background: rgba(0, 210, 180, 0.15); color: #00D2B4;">v2.4</div>
      </div>
      <div class="nav-group-title">Studio Features</div>
      <div class="nav-item"><span class="icon">✨</span> AI Content Studio</div>
      <div class="nav-item"><span class="icon">📅</span> Calendar Scheduler</div>
      <div class="nav-item"><span class="icon">📊</span> Predictive Analytics</div>
      <div class="nav-item"><span class="icon">🌍</span> Audience Reach</div>
      <div class="nav-item active"><span class="icon">🔥</span> Activity & Streaks</div>
      <div class="nav-item"><span class="icon">🔄</span> Omni Repurposer</div>
      <div class="nav-group-title" style="margin-top: 16px;">Management</div>
      <div class="nav-item"><span class="icon">📁</span> Content Library</div>
      <div class="nav-item"><span class="icon">👥</span> Team Workspace</div>
      <div class="nav-item"><span class="icon">⚙️</span> Settings & API</div>
    </div>

    <div class="main-content">
      <div class="top-navbar">
        <div class="breadcrumb-area">
          <span>Optimization</span>
          <span>/</span>
          <span class="breadcrumb-active">52-Week Activity Heatmap & Post Quality Audit</span>
        </div>
      </div>

      <div class="page-body">
        <div class="opt-layout">
          <!-- 52 WEEK ACTIVITY HEATMAP -->
          <div class="heatmap-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 15px; font-weight: 700; color: #F8FAFC;">Annual Publishing Density (365 Days)</div>
                <div style="font-size: 12px; color: #64748B;">342 total social posts scheduled and published across 52 weeks</div>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; font-size: 11px; color: #94A3B8;">
                <span>Less</span>
                <span style="display: flex; gap: 3px;">
                  <span style="width: 10px; height: 10px; background: #131A28; border-radius: 2px;"></span>
                  <span style="width: 10px; height: 10px; background: #064E3B; border-radius: 2px;"></span>
                  <span style="width: 10px; height: 10px; background: #047857; border-radius: 2px;"></span>
                  <span style="width: 10px; height: 10px; background: #10B981; border-radius: 2px;"></span>
                  <span style="width: 10px; height: 10px; background: #34D399; border-radius: 2px;"></span>
                </span>
                <span>More</span>
              </div>
            </div>

            <!-- Programmatic Heatmap Grid Mock -->
            <div class="heatmap-grid" id="heatmapGrid">
              ${Array.from({ length: 364 }).map((_, i) => {
                let cls = "h0";
                if (i > 120) cls = i % 7 === 0 ? "h1" : (i % 3 === 0 ? "h3" : (i % 5 === 0 ? "h4" : "h2"));
                if (i > 300) cls = i % 2 === 0 ? "h4" : "h3";
                return `<div class="heat-cell ${cls}"></div>`;
              }).join('')}
            </div>

            <div style="display: flex; gap: 24px; font-size: 12px; padding-top: 6px; border-top: 1px solid #192236;">
              <div>Current Streak: <strong style="color: #34D399;">48 Days 🔥</strong></div>
              <div>Longest Streak: <strong style="color: #38BDF8;">76 Days</strong></div>
              <div>Peak Day: <strong style="color: #F59E0B;">Oct 18 (4 Posts Dispatched)</strong></div>
            </div>
          </div>

          <!-- BOTTOM SECTION: HEALTH CARD + TOP POSTS LEADERBOARD -->
          <div class="score-and-table">
            <div class="health-card">
              <div style="font-size: 13px; font-weight: 700; color: #F8FAFC;">Post Health Audit Rating</div>
              <div class="gauge-circle">
                <span style="font-size: 28px; font-weight: 800; color: #F8FAFC;">88</span>
                <span style="font-size: 10px; color: #34D399; font-weight: 700;">/ 100 EXCELLENT</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
                <div style="display: flex; justify-content: space-between;"><span>Hook Strength</span> <strong style="color: #34D399;">92%</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>Readability Index</span> <strong style="color: #38BDF8;">89%</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>CTA Conversion Directive</span> <strong style="color: #F59E0B;">84%</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>Hashtag Velocity</span> <strong style="color: #C084FC;">86%</strong></div>
              </div>
            </div>

            <div class="table-card">
              <div style="font-size: 13px; font-weight: 700; color: #F8FAFC;">Top Performing Posts Leaderboard</div>
              <table class="lead-table">
                <thead>
                  <tr>
                    <th>Post Headline</th>
                    <th>Platform</th>
                    <th>Impressions</th>
                    <th>Engagements</th>
                    <th>Virality Tier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="font-weight: 600; color: #F8FAFC;">Vector Indexing Launch & Benchmarks</td>
                    <td><span style="color: #0A66C2; font-weight: 600;">LinkedIn</span></td>
                    <td>38,420</td>
                    <td style="color: #34D399; font-weight: 600;">3,610 (9.4%)</td>
                    <td><span style="background: rgba(16,185,129,0.15); color: #34D399; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">Tier 1 Viral</span></td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #F8FAFC;">Why Memory-Mapped Files Beat RAM</td>
                    <td><span style="color: #0284C7; font-weight: 600;">Twitter/X</span></td>
                    <td>24,190</td>
                    <td style="color: #34D399; font-weight: 600;">2,080 (8.6%)</td>
                    <td><span style="background: rgba(56,189,248,0.15); color: #38BDF8; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">High Reach</span></td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #F8FAFC;">15s Vector Search Demystified</td>
                    <td><span style="color: #FF0050; font-weight: 600;">TikTok</span></td>
                    <td>19,500</td>
                    <td style="color: #34D399; font-weight: 600;">1,520 (7.8%)</td>
                    <td><span style="background: rgba(192,132,252,0.15); color: #C084FC; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">Top Video</span></td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #F8FAFC;">Architecture Deep-Dive Infographic</td>
                    <td><span style="color: #E1306C; font-weight: 600;">Instagram</span></td>
                    <td>16,240</td>
                    <td style="color: #34D399; font-weight: 600;">1,180 (7.2%)</td>
                    <td><span style="background: rgba(245,158,11,0.15); color: #F59E0B; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">Solid Growth</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function getCrossPlatformHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TaskForge - Cross Platform Matrix</title>
<style>
${BASE_CSS}
.matrix-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  flex: 1;
  overflow: hidden;
}
.channel-card {
  background: #0E1320;
  border: 1px solid #1E283D;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
.channel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #1A2438;
}
.channel-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
}
.channel-snippet {
  background: #0B0F19;
  border: 1px solid #1C263A;
  border-radius: 6px;
  padding: 12px;
  font-size: 12px;
  line-height: 1.5;
  color: #CBD5E1;
  flex: 1;
  white-space: pre-line;
}
</style>
</head>
<body>
  <div class="browser-frame">
    <div class="traffic-lights">
      <div class="dot dot-red"></div>
      <div class="dot dot-yellow"></div>
      <div class="dot dot-green"></div>
    </div>
    <div class="address-bar">
      <span class="lock">🔒</span>
      <span>https://app.taskforge.ai/studio/cross-platform-repurposer</span>
    </div>
    <div class="top-status">
      <span>Omni Engine: <strong>Single Source → 4 Auto-Tuned Variants</strong></span>
      <div class="live-pill"><span class="live-dot"></span> CONSTRAINTS PASSING</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #00D2B4, #0284C7);">⚡</div>
        <div class="logo-text">TaskForge</div>
        <div class="logo-badge" style="background: rgba(0, 210, 180, 0.15); color: #00D2B4;">v2.4</div>
      </div>
      <div class="nav-group-title">Studio Features</div>
      <div class="nav-item"><span class="icon">✨</span> AI Content Studio</div>
      <div class="nav-item"><span class="icon">📅</span> Calendar Scheduler</div>
      <div class="nav-item"><span class="icon">📊</span> Predictive Analytics</div>
      <div class="nav-item"><span class="icon">🌍</span> Audience Reach</div>
      <div class="nav-item"><span class="icon">🔥</span> Activity & Streaks</div>
      <div class="nav-item active"><span class="icon">🔄</span> Omni Repurposer</div>
      <div class="nav-group-title" style="margin-top: 16px;">Management</div>
      <div class="nav-item"><span class="icon">📁</span> Content Library</div>
      <div class="nav-item"><span class="icon">👥</span> Team Workspace</div>
      <div class="nav-item"><span class="icon">⚙️</span> Settings & API</div>
    </div>

    <div class="main-content">
      <div class="top-navbar">
        <div class="breadcrumb-area">
          <span>Omni Repurposer</span>
          <span>/</span>
          <span class="breadcrumb-active">Cross-Platform Distribution Matrix</span>
        </div>
        <div class="top-actions">
          <button class="btn-primary"><span>🚀</span> 1-Click Multi-Publish</button>
        </div>
      </div>

      <div class="page-body">
        <div style="background: #0D121F; border: 1px solid #1E283D; border-radius: 6px; padding: 12px 16px; font-size: 12px; color: #94A3B8; display: flex; justify-content: space-between; align-items: center;">
          <div>Source Seed: <strong style="color: #F8FAFC;">"Launch of open-source Rust vector indexing engine with 10x throughput & sub-millisecond p99 latency."</strong></div>
          <span style="color: #34D399; font-weight: 600;">✓ 4 Formats Calibrated</span>
        </div>

        <div class="matrix-grid">
          <!-- TWITTER / X -->
          <div class="channel-card">
            <div class="channel-header">
              <span class="channel-pill" style="background: rgba(2,132,199,0.15); color: #38BDF8;">Twitter / X</span>
              <span style="font-size: 11px; font-family: monospace; color: #34D399;">246 / 280 chars</span>
            </div>
            <div class="channel-snippet">We just open-sourced our Rust-powered vector indexing engine ⚡

Benchmark results vs industry standard:
• 10x query throughput
• 0.8ms P99 latency (10M vectors)
• 0 cold-start overhead

Full architectural breakdown in thread 🧵👇

#RustLang #VectorDB</div>
            <div style="font-size: 11px; color: #64748B;">Constraint: Punchy hook + thread teaser</div>
          </div>

          <!-- LINKEDIN -->
          <div class="channel-card">
            <div class="channel-header">
              <span class="channel-pill" style="background: rgba(10,102,194,0.15); color: #60A5FA;">LinkedIn</span>
              <span style="font-size: 11px; font-family: monospace; color: #34D399;">1,348 / 3,000 chars</span>
            </div>
            <div class="channel-snippet">Sub-millisecond vector search isn't just about faster HNSW graphs—it's about memory-mapping leaf nodes under load.

Here is what our team learned after stress-testing 10M embeddings:

1. Memory-Mapped Files: Slashed P99 from 14.2ms to 0.8ms.
2. Zero Cold Starts: Container restarts instantly without re-indexing.
3. Wasm Pre-filtering: 80% fewer brute-force vector distances.

Full open-source benchmarks on GitHub. Link in comments! 👇</div>
            <div style="font-size: 11px; color: #64748B;">Constraint: Thought leadership spacing</div>
          </div>

          <!-- INSTAGRAM -->
          <div class="channel-card">
            <div class="channel-header">
              <span class="channel-pill" style="background: rgba(225,48,108,0.15); color: #F472B6;">Instagram</span>
              <span style="font-size: 11px; font-family: monospace; color: #34D399;">Slide 1/5 Carousel</span>
            </div>
            <div class="channel-snippet">Swipe to see how we engineered sub-millisecond vector search ⚡👉

Slide 1: The Problem with Traditional Graph Indexing
Slide 2: Memory-Mapped Files Explained
Slide 3: Real Benchmark Charts (10x Speedup)
Slide 4: Rust vs C++ Code Comparison
Slide 5: GitHub Repo & Quickstart

🔗 Link in bio to test the demo live!

#DatabaseArchitecture #SoftwareEngineer #Rust</div>
            <div style="font-size: 11px; color: #64748B;">Constraint: Carousel progression tags</div>
          </div>

          <!-- TIKTOK SCRIPT -->
          <div class="channel-card">
            <div class="channel-header">
              <span class="channel-pill" style="background: rgba(255,0,80,0.15); color: #FDA4AF;">TikTok Script</span>
              <span style="font-size: 11px; font-family: monospace; color: #34D399;">30s Teleprompter</span>
            </div>
            <div class="channel-snippet">[0:00 - 0:03 HOOK]
"Most developers think vector search is slow because of embedding dimensions. That's actually completely wrong."

[0:04 - 0:18 TECH DEMO]
"Watch this benchmark. We query 10 million vectors in under 1 millisecond. We wrote the engine in Rust, using memory-mapped zero-copy files."

[0:19 - 0:30 CTA]
"The entire code is open-source. Repo name in the comments!"</div>
            <div style="font-size: 11px; color: #64748B;">Constraint: Timestamped spoken cues</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

module.exports = {
  getAIContentHTML,
  getSchedulingHTML,
  getPredictiveHTML,
  getAudienceHTML,
  getOptimizationHTML,
  getCrossPlatformHTML
};
