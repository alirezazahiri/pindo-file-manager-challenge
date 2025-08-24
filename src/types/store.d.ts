export type StoreAction<T = void, P = void> = {
  type: T;
  payload: P;
};
