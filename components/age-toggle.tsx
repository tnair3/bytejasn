"use client";

import { useState, useSyncExternalStore } from "react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const TYPE_MS = 25; // time per typed character
const BIRTHDAY_TIMEZONE = "Europe/London"; // timezone the birthday is shown in

type Mode = "age" | "birthday";

/** Whole years since `birth`, then the remainder as days/hours/minutes/seconds. */
function getAge(birth: Date, now: Date) {
  // UTC getters/setters throughout so daylight-saving changes can't shift the result.
  let years = now.getUTCFullYear() - birth.getUTCFullYear();
  const anniversary = new Date(birth);
  anniversary.setUTCFullYear(birth.getUTCFullYear() + years);
  if (anniversary > now) {
    years -= 1;
    anniversary.setUTCFullYear(birth.getUTCFullYear() + years);
  }

  let rest = Math.max(0, now.getTime() - anniversary.getTime());
  const days = Math.floor(rest / DAY);
  rest -= days * DAY;
  const hours = Math.floor(rest / HOUR);
  rest -= hours * HOUR;
  const minutes = Math.floor(rest / MINUTE);
  rest -= minutes * MINUTE;
  const seconds = Math.floor(rest / SECOND);

  return { years: Math.max(0, years), days, hours, minutes, seconds };
}

// Re-render whenever the current second changes.
function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 250);
  return () => window.clearInterval(id);
}
const getSnapshot = () => Math.floor(Date.now() / SECOND);
// The server (and first client render) have no "now": avoids a hydration
// mismatch, and the real value appears right after hydration.
const getServerSnapshot = () => null;

/**
 * The pill from the about page: a live age counter that turns into the
 * birthday when clicked (and back again). The old text vanishes instantly and
 * the new text is typed out.
 *
 * The typing is a pure CSS animation (see TYPING_CSS): the full text is
 * rendered at once and revealed one character at a time with a stepped
 * clip-path. That works because the text is monospace, so every character is
 * the same width. No timers or per-character React state are involved.
 */
export default function AgeToggle({
  birth,
}: {
  /** Birth date and time as an ISO string, e.g. "2006-05-20T08:15:00+01:00" */
  birth: string;
}) {
  const seconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [mode, setMode] = useState<Mode>("age");
  // Set on every click. `id` restarts the CSS animation, `chars` is how many
  // steps it takes. null = nothing has been clicked yet.
  const [typing, setTyping] = useState<{ id: number; chars: number } | null>(
    null,
  );

  const birthDate = new Date(birth);
  const valid = !Number.isNaN(birthDate.getTime());

  const age =
    valid && seconds !== null
      ? getAge(birthDate, new Date(seconds * SECOND))
      : null;

  const ageText = !valid
    ? "invalid date"
    : age
      ? `${age.years}y ${age.days}d ${age.hours}h ${age.minutes}m ${age.seconds}s`
      : " "; // holds the line's height until the clock starts

  const birthdayText = valid
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: BIRTHDAY_TIMEZONE,
      }).format(birthDate)
    : "invalid date";

  const full = mode === "age" ? ageText : birthdayText;

  function toggle() {
    const nextMode: Mode = mode === "age" ? "birthday" : "age";
    const nextText = nextMode === "age" ? ageText : birthdayText;
    setMode(nextMode);
    setTyping({ id: Date.now(), chars: Math.max(1, nextText.length) });
  }

  // Screen readers get a stable label instead of a string that changes every
  // second or is half-typed.
  const label =
    mode === "age"
      ? `Age: ${age ? `${age.years} years` : "loading"}. Press to show birthday.`
      : `Birthday: ${birthdayText}. Press to show age.`;

  const duration = typing ? typing.chars * TYPE_MS : 0;
  const steps = typing ? typing.chars : 1;

  return (
    <>
      <style>{TYPING_CSS}</style>
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className="grid w-64 cursor-pointer select-none grid-cols-[16px_1fr_4px] items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium tracking-wide text-zinc-600 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:text-base"
      >
        <span
          aria-hidden
          className="size-2 animate-pulse rounded-full bg-purple-500"
        />
        <span aria-hidden className="text-center tabular-nums">
          {/* A new key on every click restarts the animation from the blank state. */}
          <span key={typing?.id ?? "rest"} className="relative inline-block">
            <span
              className="inline-block"
              style={
                typing
                  ? {
                      animation: `age-type ${duration}ms steps(${steps}, end) both`,
                    }
                  : undefined
              }
            >
              {full}
            </span>
            {typing && (
              // The caret rides the reveal edge, then is gone once it finishes.
              // It sits outside the clipped span so the clip can't cut it off.
              <span
                aria-hidden
                className="absolute inset-y-[0.1em] left-0 w-0.5 bg-current opacity-0"
                style={{
                  animation: `age-caret ${duration}ms steps(${steps}, end)`,
                }}
              />
            )}
          </span>
        </span>
        <span aria-hidden />
      </button>
    </>
  );
}

const TYPING_CSS = `
@keyframes age-type {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
@keyframes age-caret {
  from { left: 0%; opacity: 1; }
  to { left: 100%; opacity: 1; }
}
`;
