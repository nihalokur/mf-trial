import { ReloadOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Empty, Spin, Typography } from "antd";
import type { ReactNode } from "react";
import { eventBus } from "@canvas/event-bus";

export { eventBus };

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#315efb",
          colorText: "#182230",
          colorTextSecondary: "#697586",
          colorBgLayout: "#f5f7fb",
          borderRadius: 10,
          fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        },
        components: {
          Card: { headerBg: "#ffffff" },
          Button: { controlHeight: 34 }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export function formatDateTime(value: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function WidgetCard({
  title,
  eyebrow,
  icon,
  children,
  loading = false,
  error,
  empty = false,
  onRefresh,
  collapsed = false,
  onToggleCollapse,
  extra
}: {
  title: string;
  eyebrow: string;
  icon: ReactNode;
  children: ReactNode;
  loading?: boolean;
  error?: string;
  empty?: boolean;
  onRefresh?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  extra?: ReactNode;
}) {
  return (
    <section className={`widget-card${collapsed ? " widget-card--collapsed" : ""}`}>
      <header className="widget-card__header">
        <div className="widget-card__identity">
          <div className="widget-card__icon">{icon}</div>
          <div>
            <div className="widget-card__eyebrow">{eyebrow}</div>
            <Typography.Title level={4} className="widget-card__title">{title}</Typography.Title>
          </div>
        </div>
        <div className="widget-card__actions">
          {extra}
          <Button
            type="text"
            className="widget-card__action"
            icon={<ReloadOutlined />}
            aria-label={`Refresh ${title} widget`}
            title="Refresh widget"
            onClick={onRefresh}
          />
          <Button
            type="text"
            className="widget-card__action"
            icon={collapsed ? <RightOutlined /> : <DownOutlined />}
            aria-label={`${collapsed ? "Expand" : "Collapse"} ${title} widget`}
            title={collapsed ? "Expand widget" : "Collapse widget"}
            onClick={onToggleCollapse}
          />
        </div>
      </header>
      {!collapsed && (
        <div className="widget-card__body">
          {loading ? (
            <div className="widget-card__state"><Spin /></div>
          ) : error ? (
            <div className="widget-card__state widget-card__error">{error}</div>
          ) : empty ? (
            <div className="widget-card__state"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
          ) : children}
        </div>
      )}
    </section>
  );
}

export function Metric({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className="metric">
      <div className="metric__label">{label}</div>
      <div className="metric__value">{value}</div>
      {note && <div className="metric__note">{note}</div>}
    </div>
  );
}
