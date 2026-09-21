// Common CSS styles for browser chrome & SaaS layout
const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background: #090B10;
    color: #F1F5F9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    width: 1600px;
    height: 1000px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .browser-frame {
    background: #0E131F;
    border-bottom: 1px solid #1E293B;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    height: 44px;
    flex-shrink: 0;
  }
  .traffic-lights {
    display: flex;
    gap: 7px;
  }
  .dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }
  .dot-red { background: #EF4444; }
  .dot-yellow { background: #F59E0B; }
  .dot-green { background: #10B981; }
  .address-bar {
    background: #182032;
    border: 1px solid #2B374E;
    border-radius: 6px;
    padding: 4px 14px;
    font-family: 'SF Mono', Menlo, Consolas, monospace;
    font-size: 12px;
    color: #94A3B8;
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 520px;
  }
  .address-bar .lock { color: #10B981; font-size: 11px; }
  .top-status {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 12px;
    color: #64748B;
  }
  .live-pill {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34D399;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .live-dot {
    width: 6px;
    height: 6px;
    background: #34D399;
    border-radius: 50%;
    box-shadow: 0 0 6px #34D399;
  }
  .app-layout {
    display: flex;
    flex: 1;
    height: calc(1000px - 44px);
    background: #0A0D14;
    overflow: hidden;
  }
  .sidebar {
    width: 240px;
    background: #0D111A;
    border-right: 1px solid #1E2638;
    display: flex;
    flex-direction: column;
    padding: 20px 14px;
    flex-shrink: 0;
  }
  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 8px 20px 8px;
    border-bottom: 1px solid #1A2234;
    margin-bottom: 18px;
  }
  .logo-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 16px;
    color: #fff;
  }
  .logo-text {
    font-weight: 700;
    font-size: 15px;
    letter-spacing: -0.01em;
    color: #F8FAFC;
  }
  .logo-badge {
    font-size: 9px;
    padding: 2px 5px;
    border-radius: 4px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-left: auto;
  }
  .nav-group-title {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #475569;
    font-weight: 700;
    padding: 10px 10px 6px 10px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 9px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #94A3B8;
    margin-bottom: 2px;
  }
  .nav-item.active {
    background: #182236;
    color: #F8FAFC;
    font-weight: 600;
    border: 1px solid #283652;
  }
  .nav-item .icon { font-size: 15px; }
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #0B0E17;
  }
  .top-navbar {
    height: 60px;
    border-bottom: 1px solid #1A2234;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(13, 17, 26, 0.6);
    flex-shrink: 0;
  }
  .breadcrumb-area {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #64748B;
  }
  .breadcrumb-active {
    color: #F1F5F9;
    font-weight: 600;
    font-size: 15px;
  }
  .top-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .btn-primary {
    background: linear-gradient(135deg, #00D2B4 0%, #0284C7 100%);
    color: #04101A;
    font-weight: 700;
    font-size: 12px;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  .btn-secondary {
    background: #151D2C;
    border: 1px solid #243046;
    color: #CBD5E1;
    font-size: 12px;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  .avatar-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #141A26;
    border: 1px solid #212A3D;
    padding: 4px 10px 4px 4px;
    border-radius: 20px;
    font-size: 12px;
    color: #CBD5E1;
  }
  .avatar-img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #3B82F6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 10px;
    color: #fff;
  }
  .page-body {
    flex: 1;
    padding: 24px 28px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .glass-panel {
    background: rgba(16, 21, 33, 0.7);
    border: 1px solid #1E283D;
    border-radius: 8px;
    backdrop-filter: blur(12px);
  }
`;

module.exports = { BASE_CSS };
