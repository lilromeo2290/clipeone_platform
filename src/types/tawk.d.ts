// Minimal type declaration for the Tawk.to JS API
// Docs: https://help.tawk.to/article/1hc4c1kb-javascript-api-events

interface TawkAPI {
  // Chat actions
  popup?: () => void;
  toggle?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
  hideTawkButton?: () => void;
  maximize?: () => void;
  minimize?: () => void;
  open?: () => void;
  close?: () => void;

  // Status helpers
  getStatus?: () => string; // "online" | "away" | "offline"

  // Event hooks (set by consumer)
  onLoad?: () => void;
  onStatusChange?: (status: string) => void;
  onChatMinimized?: () => void;
  onChatMaximized?: () => void;
  onChatStarted?: () => void;
  onChatEnded?: () => void;
}

interface Window {
  Tawk_API?: TawkAPI;
  Tawk_LoadStart?: Date;
}
