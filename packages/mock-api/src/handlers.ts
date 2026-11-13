import { http, HttpResponse } from "msw";

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Onboarding" | "Inactive";
  initials: string;
  color: string;
  lastSeen: string;
};

const customers: Customer[] = [
  { id: "c-1042", name: "Olivia Rhye", email: "olivia@acme.co", company: "Acme Studio", status: "Active", initials: "OR", color: "#e9e1ff", lastSeen: "Today, 10:42 AM" },
  { id: "c-1041", name: "Phoenix Baker", email: "phoenix@bright.io", company: "Bright Labs", status: "Active", initials: "PB", color: "#dceeff", lastSeen: "Today, 9:18 AM" },
  { id: "c-1040", name: "Lana Steiner", email: "lana@layers.io", company: "Layers", status: "Onboarding", initials: "LS", color: "#ffe8d9", lastSeen: "Yesterday" },
  { id: "c-1039", name: "Demi Wilkinson", email: "demi@quotient.co", company: "Quotient", status: "Active", initials: "DW", color: "#fde3ec", lastSeen: "Yesterday" },
  { id: "c-1038", name: "Candice Wu", email: "candice@circooles.com", company: "Circooles", status: "Inactive", initials: "CW", color: "#e1f3ea", lastSeen: "Nov 10, 2026" }
];

const orders = [
  { id: "ORD-2841", date: "2026-11-12T10:15:00Z", amount: 2480, status: "Processing" },
  { id: "ORD-2819", date: "2026-11-08T14:30:00Z", amount: 860, status: "Delivered" },
  { id: "ORD-2773", date: "2026-10-28T09:00:00Z", amount: 1540, status: "Delivered" }
];

const addresses = [
  { id: "a-1", label: "Headquarters", type: "Billing", street: "548 Market Street, Suite 720", city: "San Francisco, CA 94104", country: "United States", isDefault: true },
  { id: "a-2", label: "Design studio", type: "Shipping", street: "27 Clerkenwell Road", city: "London EC1M 5RN", country: "United Kingdom", isDefault: false },
  { id: "a-3", label: "Warehouse", type: "Shipping", street: "1400 N Milwaukee Ave", city: "Chicago, IL 60622", country: "United States", isDefault: false }
];

export const handlers = [
  http.get("/api/customers", () => HttpResponse.json(customers)),
  http.get("/api/customers/:customerId/orders", ({ params }) => {
    if (!customers.some((customer) => customer.id === params.customerId)) {
      return HttpResponse.json({ message: "Customer not found" }, { status: 404 });
    }
    return HttpResponse.json(orders);
  }),
  http.get("/api/customers/:customerId/addresses", ({ params }) => {
    if (!customers.some((customer) => customer.id === params.customerId)) {
      return HttpResponse.json({ message: "Customer not found" }, { status: 404 });
    }
    return HttpResponse.json(addresses);
  })
];
