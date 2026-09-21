const { BASE_CSS } = require('./base_css');

function getJobPilotDashboardHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>JobPilot AI - Career Copilot Dashboard</title>
<style>
${BASE_CSS}
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}
.kpi-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.copilot-card {
  background: #0E1424;
  border: 1px solid #1E2B45;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.copilot-card .title { font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; }
.copilot-card .val { font-size: 26px; font-weight: 800; color: #F8FAFC; letter-spacing: -0.02em; }
.copilot-card .sub { font-size: 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; }
.table-section {
  flex: 1;
  background: #0E1424;
  border: 1px solid #1E2B45;
  border-radius: 8px;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}
.job-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}
.job-table th {
  text-align: left;
  padding: 8px 12px;
  font-size: 11px;
  text-transform: uppercase;
  color: #64748B;
  border-bottom: 1px solid #1E2B45;
  font-weight: 700;
}
.job-table td {
  padding: 11px 12px;
  border-bottom: 1px solid #162035;
  color: #CBD5E1;
}
.company-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.comp-avatar {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 12px;
  color: #fff;
}
.match-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.match-tier1 { background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3); }
.match-tier2 { background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3); }
.stage-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
}
.event-log-bar {
  background: #0A0F1D;
  border: 1px solid #192338;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 12px;
  color: #94A3B8;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      <span>https://app.jobpilot.ai/pipeline/active-applications</span>
    </div>
    <div class="top-status">
      <span>Anti-Hallucination Guard: <strong style="color: #34D399;">Active (Strict AST Verification)</strong></span>
      <div class="live-pill"><span class="live-dot"></span> 2-PASS AI PIPELINE</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar" style="background: #0B101E; border-right-color: #1A243B;">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #38BDF8, #818CF8);">⚡</div>
        <div class="logo-text">JobPilot AI</div>
        <div class="logo-badge" style="background: rgba(56, 189, 248, 0.15); color: #38BDF8;">COPILOT</div>
      </div>
      <div class="nav-group-title">Career Pipeline</div>
      <div class="nav-item active"><span class="icon">📋</span> Active Applications</div>
      <div class="nav-item"><span class="icon">📊</span> Kanban Board</div>
      <div class="nav-item"><span class="icon">🎯</span> 2-Pass AI Matcher</div>
      <div class="nav-item"><span class="icon">📄</span> Resume Tailoring</div>
      <div class="nav-item"><span class="icon">✉️</span> Cover Letter Studio</div>
      <div class="nav-group-title" style="margin-top: 16px;">Automations</div>
      <div class="nav-item"><span class="icon">⚡</span> Chrome Extension</div>
      <div class="nav-item"><span class="icon">⏰</span> Inngest Crons & Digest</div>
      <div class="nav-item"><span class="icon">👤</span> Candidate Profile</div>
    </div>

    <div class="main-content">
      <div class="top-navbar" style="border-bottom-color: #1A243B;">
        <div class="breadcrumb-area">
          <span>Application Pipeline</span>
          <span>/</span>
          <span class="breadcrumb-active">Active Tracked Vacancies</span>
        </div>
        <div class="top-actions">
          <button class="btn-primary" style="background: linear-gradient(135deg, #38BDF8, #6366F1); color: #07101E;">
            <span>+</span> Track New Opportunity
          </button>
        </div>
      </div>

      <div class="page-body">
        <div class="dashboard-grid">
          <!-- KPI ROW -->
          <div class="kpi-strip">
            <div class="copilot-card">
              <span class="title">Total Tracked Vacancies</span>
              <span class="val">142</span>
              <span class="sub" style="color: #38BDF8;">↑ +18 this week <span style="color: #64748B;">from LinkedIn & Boards</span></span>
            </div>
            <div class="copilot-card">
              <span class="title">2-Pass Evaluated</span>
              <span class="val">86</span>
              <span class="sub" style="color: #34D399;">● 98.4% Match Precision</span>
            </div>
            <div class="copilot-card">
              <span class="title">Active Interview Rounds</span>
              <span class="val" style="color: #38BDF8;">14</span>
              <span class="sub" style="color: #F59E0B;">Linear, Stripe, Vercel, Supabase</span>
            </div>
            <div class="copilot-card">
              <span class="title">Offers Received</span>
              <span class="val" style="color: #34D399;">3</span>
              <span class="sub" style="color: #C084FC;">Highest: $210,000 / yr</span>
            </div>
          </div>

          <!-- TABLE OF ACTIVE OPPORTUNITIES -->
          <div class="table-section">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 15px; font-weight: 700; color: #F8FAFC;">Active Candidate Opportunities</div>
                <div style="font-size: 12px; color: #64748B;">Ranked by 2-pass GPT-4o evaluation with zero-hallucination guarantee</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn-secondary" style="padding: 5px 12px; font-size: 11px;">Filter: Match >90%</button>
                <button class="btn-secondary" style="padding: 5px 12px; font-size: 11px;">Export ATS Log</button>
              </div>
            </div>

            <table class="job-table">
              <thead>
                <tr>
                  <th>Company & Position</th>
                  <th>Location / Salary</th>
                  <th>2-Pass Match Fit</th>
                  <th>Pipeline Stage</th>
                  <th>Tailored Resume</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="company-cell">
                      <div class="comp-avatar" style="background: #5E6AD2;">L</div>
                      <div>
                        <div style="font-weight: 700; color: #F8FAFC;">Linear</div>
                        <div style="font-size: 11px; color: #64748B;">Staff Frontend Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td>Remote • $190k – $240k</td>
                  <td><span class="match-pill match-tier1">★ 98.4% Match</span></td>
                  <td><span class="stage-pill" style="background: rgba(16,185,129,0.15); color: #34D399;">● Round 3 Interview</span></td>
                  <td><span style="color: #38BDF8; font-family: monospace; font-size: 11px;">linear_staff_v3.pdf</span></td>
                  <td><button class="btn-secondary" style="padding: 4px 10px; font-size: 11px;">Review Copilot</button></td>
                </tr>

                <tr>
                  <td>
                    <div class="company-cell">
                      <div class="comp-avatar" style="background: #635BFF;">S</div>
                      <div>
                        <div style="font-weight: 700; color: #F8FAFC;">Stripe</div>
                        <div style="font-size: 11px; color: #64748B;">Senior Full-Stack Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td>San Francisco / Remote • $185k – $225k</td>
                  <td><span class="match-pill match-tier1">★ 94.2% Match</span></td>
                  <td><span class="stage-pill" style="background: rgba(56,189,248,0.15); color: #38BDF8;">● Technical Screen</span></td>
                  <td><span style="color: #38BDF8; font-family: monospace; font-size: 11px;">stripe_fullstack_v2.pdf</span></td>
                  <td><button class="btn-secondary" style="padding: 4px 10px; font-size: 11px;">Review Copilot</button></td>
                </tr>

                <tr>
                  <td>
                    <div class="company-cell">
                      <div class="comp-avatar" style="background: #000000; border: 1px solid #334155;">▲</div>
                      <div>
                        <div style="font-weight: 700; color: #F8FAFC;">Vercel</div>
                        <div style="font-size: 11px; color: #64748B;">Design Systems Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td>Remote • $175k – $215k</td>
                  <td><span class="match-pill match-tier2">91.0% Match</span></td>
                  <td><span class="stage-pill" style="background: rgba(245,158,11,0.15); color: #F59E0B;">● Hiring Manager Screen</span></td>
                  <td><span style="color: #38BDF8; font-family: monospace; font-size: 11px;">vercel_design_v1.pdf</span></td>
                  <td><button class="btn-secondary" style="padding: 4px 10px; font-size: 11px;">Review Copilot</button></td>
                </tr>

                <tr>
                  <td>
                    <div class="company-cell">
                      <div class="comp-avatar" style="background: #3ECF8E; color: #052E16;">⚡</div>
                      <div>
                        <div style="font-weight: 700; color: #F8FAFC;">Supabase</div>
                        <div style="font-size: 11px; color: #64748B;">Systems Infrastructure Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td>Remote • $180k – $220k</td>
                  <td><span class="match-pill match-tier2">89.5% Match</span></td>
                  <td><span class="stage-pill" style="background: rgba(148,163,184,0.15); color: #94A3B8;">● Ready to Apply</span></td>
                  <td><span style="color: #94A3B8; font-family: monospace; font-size: 11px;">master_resume.pdf</span></td>
                  <td><button class="btn-secondary" style="padding: 4px 10px; font-size: 11px;">Generate Tailored</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- INNGEST EVENT LOG BAR -->
          <div class="event-log-bar">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: #38BDF8; font-weight: 700;">● INNGEST CRON ENGINE</span>
              <span>Daily 8:00 AM Digest: Evaluated 18 new vacancies · SHA-256 deduplication saved 74% token cost.</span>
            </div>
            <span style="color: #34D399; font-family: monospace; font-size: 11px;">Cron Status: HEALTHY</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function getJobPilotKanbanHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>JobPilot AI - Applications Kanban</title>
<style>
${BASE_CSS}
.kanban-board {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  flex: 1;
  overflow: hidden;
}
.kanban-col {
  background: #0E1424;
  border: 1px solid #1E2B45;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.col-header {
  padding: 12px 14px;
  border-bottom: 1px solid #1A253C;
  background: #11182A;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.col-title {
  font-size: 12px;
  font-weight: 700;
  color: #F8FAFC;
  display: flex;
  align-items: center;
  gap: 6px;
}
.col-count {
  font-size: 10px;
  background: #1A243A;
  color: #94A3B8;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 700;
}
.cards-scroll {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  flex: 1;
}
.k-card {
  background: #131B2D;
  border: 1px solid #202D47;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}
.k-card-active {
  border-color: #38BDF8;
  background: #152238;
}
.k-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.k-comp-name { font-size: 13px; font-weight: 700; color: #F8FAFC; }
.k-role { font-size: 11.5px; color: #94A3B8; }
.k-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10.5px;
  color: #64748B;
  padding-top: 6px;
  border-top: 1px solid #1B263C;
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
      <span>https://app.jobpilot.ai/pipeline/kanban</span>
    </div>
    <div class="top-status">
      <span>Applications Pipeline: <strong>5 Stages Active</strong></span>
      <div class="live-pill"><span class="live-dot"></span> SYNCHRONIZED</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar" style="background: #0B101E; border-right-color: #1A243B;">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #38BDF8, #818CF8);">⚡</div>
        <div class="logo-text">JobPilot AI</div>
        <div class="logo-badge" style="background: rgba(56, 189, 248, 0.15); color: #38BDF8;">COPILOT</div>
      </div>
      <div class="nav-group-title">Career Pipeline</div>
      <div class="nav-item"><span class="icon">📋</span> Active Applications</div>
      <div class="nav-item active"><span class="icon">📊</span> Kanban Board</div>
      <div class="nav-item"><span class="icon">🎯</span> 2-Pass AI Matcher</div>
      <div class="nav-item"><span class="icon">📄</span> Resume Tailoring</div>
      <div class="nav-item"><span class="icon">✉️</span> Cover Letter Studio</div>
      <div class="nav-group-title" style="margin-top: 16px;">Automations</div>
      <div class="nav-item"><span class="icon">⚡</span> Chrome Extension</div>
      <div class="nav-item"><span class="icon">⏰</span> Inngest Crons & Digest</div>
      <div class="nav-item"><span class="icon">👤</span> Candidate Profile</div>
    </div>

    <div class="main-content">
      <div class="top-navbar" style="border-bottom-color: #1A243B;">
        <div class="breadcrumb-area">
          <span>Application Pipeline</span>
          <span>/</span>
          <span class="breadcrumb-active">Interactive 5-Stage Kanban Board</span>
        </div>
        <div class="top-actions">
          <button class="btn-primary" style="background: linear-gradient(135deg, #38BDF8, #6366F1); color: #07101E;">
            <span>+</span> Add Opportunity
          </button>
        </div>
      </div>

      <div class="page-body">
        <div class="kanban-board">
          <!-- COL 1: DISCOVERED -->
          <div class="kanban-col">
            <div class="col-header">
              <span class="col-title"><span style="color: #94A3B8;">●</span> Discovered</span>
              <span class="col-count">18</span>
            </div>
            <div class="cards-scroll">
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Datadog</div><div class="k-role">UI Systems Engineer</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 700;">88%</span>
                </div>
                <div class="k-meta"><span>$175k • Remote</span><span>2d ago</span></div>
              </div>
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Figma</div><div class="k-role">Frontend Specialist</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 700;">87%</span>
                </div>
                <div class="k-meta"><span>$190k • San Francisco</span><span>3d ago</span></div>
              </div>
            </div>
          </div>

          <!-- COL 2: READY TO APPLY -->
          <div class="kanban-col">
            <div class="col-header">
              <span class="col-title"><span style="color: #38BDF8;">●</span> Ready to Apply</span>
              <span class="col-count">7</span>
            </div>
            <div class="cards-scroll">
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Supabase</div><div class="k-role">Systems Infrastructure</div></div>
                  <span style="font-size: 10px; color: #34D399; font-weight: 700;">89.5%</span>
                </div>
                <div style="font-size: 10px; color: #34D399; background: rgba(16,185,129,0.1); padding: 2px 6px; border-radius: 4px;">✓ Resume Tailored</div>
                <div class="k-meta"><span>$180k • Remote</span><span>Ready</span></div>
              </div>
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Retool</div><div class="k-role">Full-Stack Architect</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 700;">89.0%</span>
                </div>
                <div class="k-meta"><span>$175k • SF</span><span>1d ago</span></div>
              </div>
            </div>
          </div>

          <!-- COL 3: APPLIED -->
          <div class="kanban-col">
            <div class="col-header">
              <span class="col-title"><span style="color: #818CF8;">●</span> Applied</span>
              <span class="col-count">24</span>
            </div>
            <div class="cards-scroll">
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">GitHub</div><div class="k-role">Principal Engineer</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 700;">90.4%</span>
                </div>
                <div class="k-meta"><span>Applied Dec 14</span><span>Awaiting response</span></div>
              </div>
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Airbnb</div><div class="k-role">Senior Staff UI Lead</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 700;">91.2%</span>
                </div>
                <div class="k-meta"><span>Applied Dec 12</span><span>Portal Sync OK</span></div>
              </div>
            </div>
          </div>

          <!-- COL 4: INTERVIEWING -->
          <div class="kanban-col">
            <div class="col-header">
              <span class="col-title"><span style="color: #34D399;">●</span> Interviewing</span>
              <span class="col-count">5</span>
            </div>
            <div class="cards-scroll">
              <!-- Active Highlight Card Linear -->
              <div class="k-card k-card-active">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Linear 🔥</div><div class="k-role">Staff Frontend Engineer</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 800; background: rgba(56,189,248,0.2); padding: 2px 6px; border-radius: 4px;">★ 98.4%</span>
                </div>
                <div style="font-size: 11px; color: #34D399; font-weight: 600;">● Round 3: Architecture Deep Dive</div>
                <div class="k-meta"><span>$190k – $240k</span><span>Tomorrow 2:00 PM</span></div>
              </div>
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Stripe</div><div class="k-role">Full-Stack Engineer</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 700;">94.2%</span>
                </div>
                <div style="font-size: 11px; color: #38BDF8;">● Technical Screen Passed</div>
                <div class="k-meta"><span>$185k – $225k</span><span>Friday</span></div>
              </div>
              <div class="k-card">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Vercel</div><div class="k-role">Design Systems Lead</div></div>
                  <span style="font-size: 10px; color: #38BDF8; font-weight: 700;">91.0%</span>
                </div>
                <div style="font-size: 11px; color: #F59E0B;">● Hiring Manager Sync</div>
                <div class="k-meta"><span>$175k – $215k</span><span>Next Week</span></div>
              </div>
            </div>
          </div>

          <!-- COL 5: OFFERS -->
          <div class="kanban-col">
            <div class="col-header">
              <span class="col-title"><span style="color: #F59E0B;">●</span> Offers</span>
              <span class="col-count">3</span>
            </div>
            <div class="cards-scroll">
              <div class="k-card" style="border-color: #10B981; background: #0F231D;">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Neon Database</div><div class="k-role">Senior Cloud Engineer</div></div>
                  <span style="font-size: 10px; color: #34D399; font-weight: 800;">OFFER</span>
                </div>
                <div style="font-size: 12px; font-weight: 700; color: #34D399;">$195,000 + Equity</div>
                <div class="k-meta"><span style="color: #34D399;">Accepted</span><span>Starts Nov 1</span></div>
              </div>
              <div class="k-card" style="border-color: #F59E0B; background: #231E12;">
                <div class="k-card-header">
                  <div><div class="k-comp-name">Resend</div><div class="k-role">Platform Lead</div></div>
                  <span style="font-size: 10px; color: #F59E0B; font-weight: 800;">OFFER</span>
                </div>
                <div style="font-size: 12px; font-weight: 700; color: #F59E0B;">$205,000 Base</div>
                <div class="k-meta"><span style="color: #F59E0B;">Decision Pending</span><span>Expires in 5d</span></div>
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

function getJobTrackerRadarHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>JobPilot AI - 2-Pass AI Fit Evaluation</title>
<style>
${BASE_CSS}
.tracker-modal-layout {
  display: grid;
  grid-template-columns: 440px 1fr;
  gap: 20px;
  flex: 1;
  overflow: hidden;
}
.score-panel {
  background: #0E1424;
  border: 1px solid #1E2B45;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.fit-gauge {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 7px solid #38BDF8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
}
.fit-gauge .val { font-size: 32px; font-weight: 800; color: #F8FAFC; }
.fit-gauge .label { font-size: 10px; font-weight: 700; color: #38BDF8; letter-spacing: 0.08em; }
.detail-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
.strength-card {
  background: #0E1424;
  border: 1px solid #1E2B45;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.strength-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12.5px;
  line-height: 1.5;
  color: #CBD5E1;
}
.check-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
  margin-top: 1px;
}
.gap-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  line-height: 1.5;
  color: #CBD5E1;
}
.gap-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.15);
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
  margin-top: 1px;
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
      <span>https://app.jobpilot.ai/match-evaluation/linear-staff-frontend</span>
    </div>
    <div class="top-status">
      <span>Evaluation Target: <strong>Linear (Staff Frontend Engineer)</strong></span>
      <div class="live-pill"><span class="live-dot"></span> STRICT AST VERIFIED</div>
    </div>
  </div>

  <div class="app-layout">
    <div class="sidebar" style="background: #0B101E; border-right-color: #1A243B;">
      <div class="sidebar-logo">
        <div class="logo-icon" style="background: linear-gradient(135deg, #38BDF8, #818CF8);">⚡</div>
        <div class="logo-text">JobPilot AI</div>
        <div class="logo-badge" style="background: rgba(56, 189, 248, 0.15); color: #38BDF8;">COPILOT</div>
      </div>
      <div class="nav-group-title">Career Pipeline</div>
      <div class="nav-item"><span class="icon">📋</span> Active Applications</div>
      <div class="nav-item"><span class="icon">📊</span> Kanban Board</div>
      <div class="nav-item active"><span class="icon">🎯</span> 2-Pass AI Matcher</div>
      <div class="nav-item"><span class="icon">📄</span> Resume Tailoring</div>
      <div class="nav-item"><span class="icon">✉️</span> Cover Letter Studio</div>
      <div class="nav-group-title" style="margin-top: 16px;">Automations</div>
      <div class="nav-item"><span class="icon">⚡</span> Chrome Extension</div>
      <div class="nav-item"><span class="icon">⏰</span> Inngest Crons & Digest</div>
      <div class="nav-item"><span class="icon">👤</span> Candidate Profile</div>
    </div>

    <div class="main-content">
      <div class="top-navbar" style="border-bottom-color: #1A243B;">
        <div class="breadcrumb-area">
          <span>Match Evaluation</span>
          <span>/</span>
          <span class="breadcrumb-active">Linear · Staff Frontend Engineer (ID: lin-7821)</span>
        </div>
        <div class="top-actions">
          <button class="btn-primary" style="background: linear-gradient(135deg, #38BDF8, #6366F1); color: #07101E;">
            <span>⚡</span> 1-Click Tailor Resume
          </button>
        </div>
      </div>

      <div class="page-body">
        <div class="tracker-modal-layout">
          <!-- LEFT SCORE CARD -->
          <div class="score-panel">
            <div style="text-align: center;">
              <div style="font-size: 16px; font-weight: 700; color: #F8FAFC;">Linear Fit Evaluation</div>
              <div style="font-size: 12px; color: #64748B;">Staff Frontend Engineer · Remote · $190k–$240k</div>
            </div>

            <div class="fit-gauge">
              <span class="val">98.4%</span>
              <span class="label">TIER 1 FIT</span>
            </div>

            <div style="background: #090E1A; border: 1px solid #1C273C; border-radius: 6px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: #64748B;">Pass 1: Schema Extraction</span>
                <span style="color: #34D399; font-weight: 700;">100% Passed</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: #64748B;">Pass 2: Deep Grounding</span>
                <span style="color: #38BDF8; font-weight: 700;">98.4% Weighted</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: #64748B;">Anti-Hallucination Rejection</span>
                <span style="color: #C084FC; font-weight: 700;">0 Fabrications</span>
              </div>
            </div>

            <div style="border-left: 3px solid #34D399; padding: 10px 14px; background: rgba(16,185,129,0.06); border-radius: 4px; font-size: 11.5px; color: #CBD5E1; line-height: 1.5;">
              <strong style="color: #34D399;">Safety Contract Enforced:</strong> All resume claim enhancements are strictly validated against canonical verified portfolio work. No synthetic experience was injected.
            </div>

            <button class="btn-secondary" style="justify-content: center; height: 38px; font-size: 12px; margin-top: auto;">
              <span>✉️</span> Generate Dynamic Cover Letter
            </button>
          </div>

          <!-- RIGHT DETAIL BREAKDOWN -->
          <div class="detail-panel">
            <!-- VERIFIED STRENGTHS -->
            <div class="strength-card">
              <div style="font-size: 13px; font-weight: 700; color: #F8FAFC; display: flex; justify-content: space-between; align-items: center;">
                <span>Verified Candidate Strengths (Grounded in Profile)</span>
                <span style="color: #34D399; font-size: 11px; font-weight: 700;">4 / 4 Core Competencies Verified</span>
              </div>

              <div class="strength-item">
                <div class="check-icon">✓</div>
                <div>
                  <strong style="color: #F8FAFC;">Next.js 15 App Router & React 19 Architecture:</strong>
                  Candidate has proven production delivery of low-latency server action workflows, streaming layouts, and zero-bundle server components matching Linear's stack.
                </div>
              </div>

              <div class="strength-item">
                <div class="check-icon">✓</div>
                <div>
                  <strong style="color: #F8FAFC;">High-Performance WebGL & Canvas Visualization:</strong>
                  Demonstrated in portfolio 3D room, custom kinematic simulations, and high-DPI rendering pipelines directly applicable to Linear's canvas issue board.
                </div>
              </div>

              <div class="strength-item">
                <div class="check-icon">✓</div>
                <div>
                  <strong style="color: #F8FAFC;">TypeScript Strict Typing & Large Codebase Refactoring:</strong>
                  Over 100+ typed modular components engineered cleanly across modern SaaS architectures with zero type errors.
                </div>
              </div>

              <div class="strength-item">
                <div class="check-icon">✓</div>
                <div>
                  <strong style="color: #F8FAFC;">Real-Time WebSocket State Synchronization:</strong>
                  Hands-on experience implementing optimistic UI mutation buffers and conflict resolution models.
                </div>
              </div>
            </div>

            <!-- SKILL GAPS -->
            <div class="strength-card" style="border-color: #382A1C;">
              <div style="font-size: 13px; font-weight: 700; color: #F59E0B;">Identified Gap (Low Severity)</div>
              <div class="gap-item">
                <div class="gap-icon">!</div>
                <div>
                  <strong style="color: #F8FAFC;">GraphQL Subscriptions:</strong> Mentioned in job listing for notification feeds. Candidate's extensive background in Server-Sent Events (SSE) and native WebSockets bridges this effortlessly within 1 sprint.
                </div>
              </div>
            </div>

            <!-- AI WHY APPLY RATIONALE -->
            <div class="strength-card" style="background: #090E1A; border-color: #23314A;">
              <div style="font-size: 13px; font-weight: 700; color: #38BDF8;">AI Career Copilot Recommendation</div>
              <div style="font-size: 12.5px; color: #94A3B8; line-height: 1.6;">
                "Linear values craft, extreme interface responsiveness, and deep systems empathy. Your background engineering custom React 19 canvas engines, GPU scale transforms, and strict TypeScript patterns makes you an ideal top-1% applicant for this role. Recommend proceeding immediately with tailored resume variant #lin-v3."
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

module.exports = {
  getJobPilotDashboardHTML,
  getJobPilotKanbanHTML,
  getJobTrackerRadarHTML
};
