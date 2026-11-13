export type WidgetName = "customers" | "orders" | "customerAddresses";

export type WidgetConfig = {
  name: WidgetName;
  uri: string;
  title: string;
  description: string;
};

export const widgets: WidgetConfig[] = [
  {
    name: "customers",
    uri: "http://localhost:3001/remoteEntry.js",
    title: "Customers",
    description: "Customer directory"
  },
  {
    name: "orders",
    uri: "http://localhost:3002/remoteEntry.js",
    title: "Recent orders",
    description: "Order activity"
  },
  {
    name: "customerAddresses",
    uri: "http://localhost:3003/remoteEntry.js",
    title: "Customer addresses",
    description: "Saved locations"
  }
];
