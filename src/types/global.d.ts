export {};

declare global {
  interface Window {
    showLoginModal?: () => void;
  }
}
