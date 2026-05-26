"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/**
 * Theme state lives outside React, on <html class="dark">, applied before
 * first paint by the no-FOUC inline script in app/layout.tsx. We read it with
 * useSyncExternalStore so the button stays in sync without setState-in-effect,
 * and so the server snapshot is deterministic ("light", the default).
 */
function subscribe(onChange: () => void): () => void {
  // The toggle is the only writer, but a MutationObserver keeps us correct if
  // anything else ever flips the class (e.g. another tab via storage event).
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  const onStorage = (e: StorageEvent) => {
    if (e.key === "theme") applyTheme(e.newValue === "dark" ? "dark" : "light");
  };
  window.addEventListener("storage", onStorage);
  return () => {
    obs.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  // Matches the default the inline script applies for the very first paint.
  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage may be unavailable (private mode) — ignore */
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border bg-tint/[0.03] text-foreground transition-colors hover:bg-tint/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {isDark ? (
        <Moon className="size-5" aria-hidden />
      ) : (
        <Sun className="size-5" aria-hidden />
      )}
    </button>
  );
}
