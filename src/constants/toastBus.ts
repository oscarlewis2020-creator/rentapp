type Listener = (message: string | null) => void;

let pending: string | null = null;
const listeners = new Set<Listener>();

export const toastBus = {
  // Call before navigating away
  show(message: string) {
    pending = message;
    listeners.forEach((l) => l(message));
  },
  // Settings reads this when it gains focus
  consume(): string | null {
    const m = pending;
    pending = null;
    return m;
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};
