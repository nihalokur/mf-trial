import { useEffect, useState } from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import { eventBus, formatCurrency, formatDateTime, Metric, WidgetCard } from "@canvas/shared";
import "./widget.css";

type Order = { id: string; date: string; amount: number; status: string };
const fallbackCustomer = { customerId: "c-1042", customerName: "Olivia Rhye" };

export default function OrdersWidget() {
  const [customer, setCustomer] = useState(fallbackCustomer);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => eventBus.on("customer:selected", setCustomer), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/customers/${customer.customerId}/orders`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Order request failed (${response.status})`);
        return response.json() as Promise<Order[]>;
      })
      .then(setOrders)
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name !== "AbortError") setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [customer.customerId, refresh]);

  const total = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <WidgetCard
      title="Recent orders"
      eyebrow="Order activity"
      icon={<ShoppingOutlined />}
      loading={loading}
      error={error}
      empty={orders.length === 0}
      onRefresh={() => setRefresh((value) => value + 1)}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((value) => !value)}
      extra={<span className="widget-tag">{orders.length} orders</span>}
    >
      <div className="selected-customer">Showing orders for <strong>{customer.customerName}</strong></div>
      <div className="order-summary">
        <Metric label="Total order value" value={formatCurrency(total)} note="Across recent orders" />
        <Metric label="Average order" value={formatCurrency(orders.length ? total / orders.length : 0)} note="Per transaction" />
        <Metric label="Latest order" value={orders[0] ? formatDateTime(orders[0].date).split(",")[0] : "—"} note={orders[0]?.id ?? ""} />
      </div>
      <div className="widget-list">
        {orders.map((order) => (
          <div className="widget-list__row" key={order.id}>
            <Avatar shape="square" className="order-avatar"><ShoppingOutlined /></Avatar>
            <div className="widget-list__main">
              <div className="widget-list__title">{order.id}</div>
              <div className="widget-list__sub">{formatDateTime(order.date)}</div>
            </div>
            <div className="widget-list__end">
              <div className="widget-list__amount">{formatCurrency(order.amount)}</div>
              <Tag bordered={false} color={order.status === "Processing" ? "processing" : "success"}>{order.status}</Tag>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
