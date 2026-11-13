# Canvas microfrontends

The Canvas is a Vite host that composes three independently served React widgets:
Customers, Recent orders, and Customer addresses. Each widget is also a complete
standalone Vite app with its own mock-service-worker startup.

## Run locally

```sh
npm install
npm run mock:init
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The root dev command starts:

| App | Local URL | Federation entry |
| --- | --- | --- |
| Canvas | `http://localhost:5173` | Host |
| Customers | `http://localhost:3001` | `http://localhost:3001/remoteEntry.js` |
| Orders | `http://localhost:3002` | `http://localhost:3002/remoteEntry.js` |
| Customer addresses | `http://localhost:3003` | `http://localhost:3003/remoteEntry.js` |

Run an individual widget by using `npm run dev -w @canvas/customers`,
`npm run dev -w @canvas/orders`, or
`npm run dev -w @canvas/customer-addresses`.

## Structure

- `apps/canvas` owns the dashboard layout, the widget configuration, and the
  `WidgetContainer` that resolves each configured widget to its federated module.
- `apps/customers`, `apps/orders`, and `apps/customer-addresses` expose
  `./Widget` over Module Federation and also render it directly when run alone.
- `packages/shared` provides the shared Ant Design `ConfigProvider`, widget
  chrome, common metrics, styles, and date/currency formatting.
- `packages/event-bus` provides typed cross-widget customer selection events.
- `packages/mock-api` contains the MSW handlers used by the host and widgets.

Widgets refresh their own data and can independently collapse or expand. The
customer selection event updates the orders and address widgets. In development,
the mock API is enabled in each app by `mockServiceWorker.js`; the mock worker
script is generated into each app's `public` directory by `npm run mock:init`.

Use `npm run typecheck` and `npm run build` to validate all workspace apps.
