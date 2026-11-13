import { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { Customer } from "@canvas/mock-api";
import { eventBus, WidgetCard } from "@canvas/shared";
import "./widget.css";

export default function CustomersWidget() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState("c-1042");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch("/api/customers", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Customer request failed (${response.status})`);
        return response.json() as Promise<Customer[]>;
      })
      .then((data) => {
        setCustomers(data);
        const selected = data.find((customer) => customer.id === selectedId) ?? data[0];
        if (selected) {
          setSelectedId(selected.id);
          eventBus.emit("customer:selected", { customerId: selected.id, customerName: selected.name });
        }
      })
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name !== "AbortError") setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [refresh]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.company}`.toLowerCase().includes(query)
    );
  }, [customers, search]);

  function selectCustomer(customer: Customer) {
    setSelectedId(customer.id);
    eventBus.emit("customer:selected", { customerId: customer.id, customerName: customer.name });
  }

  return (
    <WidgetCard
      title="Customers"
      eyebrow="Your directory"
      icon={<UserOutlined />}
      loading={loading}
      error={error}
      empty={filtered.length === 0}
      onRefresh={() => setRefresh((value) => value + 1)}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((value) => !value)}
      extra={<span className="widget-tag">{customers.length} customers</span>}
    >
      <div className="widget-toolbar">
        <Input
          className="widget-search"
          placeholder="Search customers..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          allowClear
        />
        <Button className="widget-filter">All customers</Button>
      </div>
      <div className="widget-list">
        {filtered.slice(0, 5).map((customer) => (
          <button
            className={`customer-row${selectedId === customer.id ? " customer-row--selected" : ""}`}
            key={customer.id}
            onClick={() => selectCustomer(customer)}
          >
            <Avatar style={{ backgroundColor: customer.color, color: "#47536b" }}>{customer.initials}</Avatar>
            <span className="widget-list__main">
              <span className="widget-list__title">{customer.name}</span>
              <span className="widget-list__sub">{customer.email} <span className="customer-company">· {customer.company}</span></span>
            </span>
            <span className={`customer-status customer-status--${customer.status.toLowerCase()}`}>{customer.status}</span>
            <span className="customer-last-seen">{customer.lastSeen}</span>
          </button>
        ))}
      </div>
      <div className="widget-pagination">
        <span>Showing {filtered.length ? 1 : 0}–{Math.min(filtered.length, 5)} of {filtered.length} customers</span>
        <Button type="link" size="small" onClick={() => setSearch("")}>View all customers →</Button>
      </div>
    </WidgetCard>
  );
}
