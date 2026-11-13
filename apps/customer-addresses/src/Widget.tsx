import { useEffect, useState } from "react";
import { EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { eventBus, WidgetCard } from "@canvas/shared";
import "./widget.css";

type Address = {
  id: string;
  label: string;
  type: string;
  street: string;
  city: string;
  country: string;
  isDefault: boolean;
};
const fallbackCustomer = { customerId: "c-1042", customerName: "Olivia Rhye" };

export default function CustomerAddressesWidget() {
  const [customer, setCustomer] = useState(fallbackCustomer);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => eventBus.on("customer:selected", setCustomer), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/customers/${customer.customerId}/addresses`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Address request failed (${response.status})`);
        return response.json() as Promise<Address[]>;
      })
      .then(setAddresses)
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name !== "AbortError") setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [customer.customerId, refresh]);

  return (
    <WidgetCard
      title="Customer addresses"
      eyebrow="Saved locations"
      icon={<EnvironmentOutlined />}
      loading={loading}
      error={error}
      empty={addresses.length === 0}
      onRefresh={() => setRefresh((value) => value + 1)}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((value) => !value)}
      extra={<span className="widget-tag">{addresses.length} locations</span>}
    >
      <div className="selected-customer">Addresses for <strong>{customer.customerName}</strong></div>
      <div>
        {addresses.map((address) => (
          <article className="address-card" key={address.id}>
            <div className="address-card__top">
              <div className="address-card__name"><HomeOutlined /> <span>{address.label}</span></div>
              <div className="address-tags">
                <Tag bordered={false}>{address.type}</Tag>
                {address.isDefault && <Tag bordered={false} color="blue">Default</Tag>}
              </div>
            </div>
            <div className="address-card__text">{address.street}<br />{address.city}<br />{address.country}</div>
          </article>
        ))}
      </div>
      <div className="address-footer"><span>Securely stored customer locations</span><EnvironmentOutlined /></div>
    </WidgetCard>
  );
}
