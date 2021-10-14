export {};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: unknown;
    RBS_APP_CONFIG: { [key: string]: string };
  }
}
