export const isPersisted = (storageKey: string) => {
  try {
    if (typeof window === "undefined") return false;

    const serializedState = localStorage.getItem(storageKey);
    return serializedState !== null;
  } catch (err) {
    console.warn({ PERSISTENCE_IS_PERSISTED_ERROR: err });
    return false;
  }
};

export const loadPersistedValue = <T>(
  fallbackState: T,
  storageKey: string,
  unmarshaller: (state: string) => T
): T => {
  try {
    if (typeof window === "undefined") return fallbackState;

    const serializedState = localStorage.getItem(storageKey);
    if (serializedState === null) return fallbackState;

    return unmarshaller(serializedState);
  } catch (err) {
    console.warn({ PERSISTENCE_LOAD_ERROR: err });
    return fallbackState;
  }
};

export const saveStateToStorage = <T>(
  state: T,
  storageKey: string,
  marshaller: (state: T) => string
) => {
  try {
    if (typeof window === "undefined") return;

    const serializedState = marshaller(state);
    localStorage.setItem(storageKey, serializedState);
  } catch (err) {
    console.error({ PERSISTENCE_SAVE_ERROR: err });
  }
};
