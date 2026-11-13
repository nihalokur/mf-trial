import { Component, lazy, Suspense, useState } from "react";
import type { ReactNode } from "react";
import { Alert, Spin } from "antd";
import type { WidgetConfig } from "./widget-config";
import "./widget.css";

const remoteModules = {
  customers: lazy(() => import("customers/Widget")),
  orders: lazy(() => import("orders/Widget")),
  customerAddresses: lazy(() => import("customerAddresses/Widget"))
};

export function WidgetContainer({ config }: { config: WidgetConfig }) {
  const [loadError, setLoadError] = useState(false);
  const RemoteWidget = remoteModules[config.name];

  return (
    <div className={`canvas-widget canvas-widget--${config.name}`} aria-label={config.description}>
      {loadError ? (
        <Alert
          type="error"
          showIcon
          message={`${config.title} could not be loaded`}
          description={`Check that the widget server is running and that ${config.uri} is reachable.`}
        />
      ) : (
        <Suspense fallback={<div className="remote-loading"><Spin /> <span>Loading {config.title}…</span></div>}>
          <RemoteWidgetWithErrorBoundary onError={() => setLoadError(true)}>
            <RemoteWidget />
          </RemoteWidgetWithErrorBoundary>
        </Suspense>
      )}
    </div>
  );
}

class RemoteWidgetWithErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
