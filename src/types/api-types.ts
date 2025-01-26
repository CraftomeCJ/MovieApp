export type ApiState = {
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
};