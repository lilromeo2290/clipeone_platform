"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalKind = "create" | "track" | null;

interface SupportModalContextValue {
  open: ModalKind;
  openCreate: () => void;
  openTrack: () => void;
  close: () => void;
}

const SupportModalContext = createContext<SupportModalContextValue | null>(null);

export function SupportModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<ModalKind>(null);

  return (
    <SupportModalContext.Provider
      value={{
        open,
        openCreate: () => setOpen("create"),
        openTrack: () => setOpen("track"),
        close: () => setOpen(null),
      }}
    >
      {children}
    </SupportModalContext.Provider>
  );
}

export function useSupportModal() {
  const ctx = useContext(SupportModalContext);
  if (!ctx) {
    throw new Error("useSupportModal must be used inside <SupportModalProvider>");
  }
  return ctx;
}
