import { useState } from "react";
import {
  AppstoreOutlined,
  BellOutlined,
  CheckCircleFilled,
  DownOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Avatar, Badge, Button, Input, Select, Tooltip } from "antd";
import { WidgetContainer } from "./WidgetContainer";
import { widgets } from "./widget-config";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      <aside className={`sidebar${sidebarOpen ? "" : " sidebar--closed"}`}>
        <div className="brand">
          <div className="brand__mark"><AppstoreOutlined /></div>
          {sidebarOpen && <span className="brand__name">northstar<span>.</span></span>}
        </div>
        <div className="sidebar__section-label">{sidebarOpen ? "WORKSPACE" : " "}</div>
        <nav className="sidebar__nav">
          <button className="nav-item nav-item--active"><AppstoreOutlined />{sidebarOpen && <span>Overview</span>}</button>
          <button className="nav-item"><GlobalOutlined />{sidebarOpen && <span>Customers</span>}</button>
          <button className="nav-item"><SettingOutlined />{sidebarOpen && <span>Settings</span>}</button>
        </nav>
        {sidebarOpen && (
          <div className="sidebar__bottom">
            <div className="help-card">
              <div className="help-card__icon">✦</div>
              <strong>Need a hand?</strong>
              <span>Our team is here to help you.</span>
              <Button size="small">Visit help center</Button>
            </div>
            <div className="sidebar__profile">
              <Avatar style={{ backgroundColor: "#e9d8c8", color: "#68472b" }}>JD</Avatar>
              <div><strong>Jamie Davis</strong><span>Workspace admin</span></div>
              <DownOutlined className="profile-chevron" />
            </div>
          </div>
        )}
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar__left">
            <Button type="text" icon={<MenuFoldOutlined />} onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle navigation" />
            <span className="breadcrumb-muted">Workspace</span><span className="breadcrumb-divider">/</span><strong>Overview</strong>
          </div>
          <div className="topbar__right">
            <Input className="topbar-search" placeholder="Search anything..." prefix={<SearchOutlined />} />
            <Tooltip title="Notifications"><Badge dot><Button type="text" icon={<BellOutlined />} aria-label="Notifications" /></Badge></Tooltip>
            <Avatar size={32} style={{ backgroundColor: "#e9d8c8", color: "#68472b" }}>JD</Avatar>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="greeting">FRIDAY, NOVEMBER 13, 2026</div>
              <h1>Your customer workspace</h1>
              <p>Everything you need to keep your customer relationships moving.</p>
            </div>
            <div className="workspace-select">
              <span>Workspace</span>
              <Select
                defaultValue="northstar"
                suffixIcon={<DownOutlined />}
                options={[{ value: "northstar", label: "Northstar Studio" }]}
              />
            </div>
          </div>

          <section className="welcome-strip">
            <div className="welcome-strip__copy">
              <div className="welcome-strip__label"><CheckCircleFilled /> ALL CAUGHT UP</div>
              <strong>Good things happen when everything’s in sync.</strong>
              <span>Your customer workspace is ready. Here’s what’s happening today.</span>
            </div>
            <div className="welcome-strip__art" aria-hidden="true">
              <div className="art-orbit art-orbit--one" /><div className="art-orbit art-orbit--two" />
              <div className="art-spark art-spark--one">✦</div><div className="art-spark art-spark--two">✧</div>
              <div className="art-orb"><AppstoreOutlined /></div>
            </div>
          </section>

          <div className="widgets-heading">
            <div><h2>Your widgets</h2><span>Live information from across your workspace</span></div>
            <Button icon={<SettingOutlined />}>Customize</Button>
          </div>

          <div className="widget-grid">
            {widgets.map((widget) => (
              <div className={`widget-slot widget-slot--${widget.name}`} key={widget.name}>
                <WidgetContainer config={widget} />
              </div>
            ))}
          </div>
          <footer className="page-footer">© 2026 Northstar Studio <span>·</span> Made for better customer relationships</footer>
        </div>
      </main>
    </div>
  );
}
