const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const TEMP_DIR = path.join(__dirname, 'temp_html');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const AI_AUTO_DIR = path.join(__dirname, '..', 'public', 'images', 'projects', 'ai-automation');
const JOBPILOT_DIR = path.join(__dirname, '..', 'public', 'images', 'projects', 'jobpilot');

if (!fs.existsSync(AI_AUTO_DIR)) fs.mkdirSync(AI_AUTO_DIR, { recursive: true });
if (!fs.existsSync(JOBPILOT_DIR)) fs.mkdirSync(JOBPILOT_DIR, { recursive: true });

const {
  getAIContentHTML,
  getSchedulingHTML,
  getPredictiveHTML,
  getAudienceHTML,
  getOptimizationHTML,
  getCrossPlatformHTML
} = require('./templates_ai_automation');

const {
  getJobPilotDashboardHTML,
  getJobPilotKanbanHTML,
  getJobTrackerRadarHTML
} = require('./templates_jobpilot');

const tasks = [
  // AI Automation Platform
  { name: 'ai_content.png', dir: AI_AUTO_DIR, getHtml: getAIContentHTML },
  { name: 'scheduling.png', dir: AI_AUTO_DIR, getHtml: getSchedulingHTML },
  { name: 'predictive.png', dir: AI_AUTO_DIR, getHtml: getPredictiveHTML },
  { name: 'audience.png', dir: AI_AUTO_DIR, getHtml: getAudienceHTML },
  { name: 'optimization.png', dir: AI_AUTO_DIR, getHtml: getOptimizationHTML },
  { name: 'cross_platform.png', dir: AI_AUTO_DIR, getHtml: getCrossPlatformHTML },

  // JobPilot AI
  { name: 'dashboard.png', dir: JOBPILOT_DIR, getHtml: getJobPilotDashboardHTML },
  { name: 'jobsync-dashboard-screenshot.png', dir: JOBPILOT_DIR, getHtml: getJobPilotDashboardHTML },
  { name: 'myjobs.png', dir: JOBPILOT_DIR, getHtml: getJobPilotKanbanHTML },
  { name: 'jobsync-myjobs.png', dir: JOBPILOT_DIR, getHtml: getJobPilotKanbanHTML },
  { name: 'jobtracker.png', dir: JOBPILOT_DIR, getHtml: getJobTrackerRadarHTML },
];

console.log(`Starting headless Chrome capture of ${tasks.length} authentic screenshots...`);

for (const task of tasks) {
  const htmlContent = task.getHtml();
  const htmlFile = path.join(TEMP_DIR, task.name.replace('.png', '.html'));
  fs.writeFileSync(htmlFile, htmlContent, 'utf-8');

  const destPng = path.join(task.dir, task.name);
  const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');

  const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --force-device-scale-factor=1.5 --window-size=1600,1000 --screenshot="${destPng}" "${fileUrl}"`;
  
  try {
    execSync(cmd, { stdio: 'pipe' });
    const stats = fs.statSync(destPng);
    console.log(`✓ [SUCCESS] Rendered ${task.name} (${Math.round(stats.size / 1024)} KB)`);
  } catch (err) {
    console.error(`✗ [ERROR] Failed to render ${task.name}:`, err.message);
  }
}

console.log("All screenshots generated successfully!");
