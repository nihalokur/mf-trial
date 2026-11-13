export type AppEventMap = {
  "customer:selected": { customerId: string; customerName: string };
  "customer:cleared": undefined;
};

type EventHandler<T> = (payload: T) => void;

class EventBus<Events extends object> {
  private readonly listeners = new Map<keyof Events, Set<EventHandler<never>>>();

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    let handlers = this.listeners.get(event);
    if (!handlers) {
      handlers = new Set<EventHandler<never>>();
      this.listeners.set(event, handlers);
    }

    handlers.add(handler as EventHandler<never>);
    return () => this.off(event, handler);
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    const handlers = this.listeners.get(event);
    handlers?.delete(handler as EventHandler<never>);
    if (handlers?.size === 0) this.listeners.delete(event);
  }

  emit<K extends keyof Events>(
    event: K,
    ...args: Events[K] extends undefined ? [] | [Events[K]] : [Events[K]]
  ): void {
    const payload = args[0] as Events[K];
    this.listeners.get(event)?.forEach((handler) => handler(payload as never));
  }
}

export const eventBus = new EventBus<AppEventMap>();
