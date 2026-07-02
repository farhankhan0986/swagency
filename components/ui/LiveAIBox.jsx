"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import KorvaneMark from "@/components/ui/KorvaneMark";
import AIGradientBorder from "@/components/ui/AIGradientBorder";

// Each entry cycles through in sequence. Keep responses short enough to fit
// the min-h-[132px] response pane without overflow.
const CONVERSATIONS = [
  {
    prompt: "Build a chatbot that can answer my questions",
    thinking: "Connecting to your docs…",
    response:
      "Connecting it to your docs and FAQ data. It'll answer instantly, escalate to you when it's unsure, and learn from every conversation.",
  },
  {
    prompt: "I need a web app for my business",
    thinking: "Scoping your requirements…",
    response:
      "Got it. We'll map out the pages, user flows, and tech stack. You'll have a clickable prototype within the week.",
  },
  {
    prompt: "Build me a mobile app for iOS and Android",
    thinking: "Choosing the right stack…",
    response:
      "One React Native codebase, two stores. We'll handle auth, push notifications, and offline mode so you ship fast on both platforms.",
  },
  {
    prompt: "Create an analytics dashboard for our team",
    thinking: "Pulling your data sources…",
    response:
      "We'll connect your APIs, build live charts, and surface the KPIs your team actually checks. Dark mode included by default.",
  },
  {
    prompt: "We need a CRM to track our leads",
    thinking: "Designing the pipeline…",
    response:
      "Custom pipeline, contact timeline, and email sync - built around how your sales team actually works, not a generic template.",
  },
  {
    prompt: "Automate our invoice and billing workflow",
    thinking: "Mapping the workflow…",
    response:
      "We'll wire up Stripe, auto-generate PDFs, send reminders, and log every payment. Your accountant will thank you.",
  },
];

// Timing constants — one full cycle ≈ 10–12 s depending on text length.
const PROMPT_SPEED = 36; // ms/char
const RESPONSE_SPEED = 18; // ms/char
const PAUSE_AFTER_PROMPT = 850;
const HOLD_AFTER_RESPONSE = 1800;
const FADE_DURATION = 600;
const GAP_BEFORE_LOOP = 400;

const Cursor = () => <span className="ai-cursor ml-1 align-middle" />;

export default function LiveAIBox() {
  const [reduced, setReduced] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [thinking, setThinking] = useState("");
  const [phase, setPhase] = useState("prompt"); // prompt | pause | response | hold | reset
  const [visible, setVisible] = useState(true);

  // Track reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // The looping typewriter. Cancels cleanly via a flag + tracked timeouts.
  const cancelledRef = useRef(false);
  const timersRef = useRef(new Set());
  // Tracks which conversation pair to show next.
  const indexRef = useRef(0);

  useEffect(() => {
    // Reduced motion: show first pair immediately, static cursor, no loop.
    if (reduced) {
      const first = CONVERSATIONS[0];
      setPrompt(first.prompt);
      setThinking(first.thinking);
      setResponse(first.response);
      setPhase("hold");
      setVisible(true);
      return;
    }

    cancelledRef.current = false;
    const timers = timersRef.current;

    const sleep = (ms) =>
      new Promise((resolve) => {
        const id = setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const typeText = async (text, setter, perChar) => {
      for (let i = 1; i <= text.length; i++) {
        if (cancelledRef.current) return;
        setter(text.slice(0, i));
        await sleep(perChar);
      }
    };

    const loop = async () => {
      while (!cancelledRef.current) {
        const convo = CONVERSATIONS[indexRef.current % CONVERSATIONS.length];
        indexRef.current += 1;

        setVisible(true);
        setPhase("prompt");
        setPrompt("");
        setResponse("");
        setThinking(convo.thinking);

        await typeText(convo.prompt, setPrompt, PROMPT_SPEED);
        if (cancelledRef.current) return;

        setPhase("pause");
        await sleep(PAUSE_AFTER_PROMPT);
        if (cancelledRef.current) return;

        setPhase("response");
        await typeText(convo.response, setResponse, RESPONSE_SPEED);
        if (cancelledRef.current) return;

        setPhase("hold");
        await sleep(HOLD_AFTER_RESPONSE);
        if (cancelledRef.current) return;

        setPhase("reset");
        setVisible(false);
        await sleep(FADE_DURATION + GAP_BEFORE_LOOP);
      }
    };

    loop();

    return () => {
      cancelledRef.current = true;
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, [reduced]);

  const cursorOnPrompt = phase === "prompt" || phase === "pause";
  const cursorOnResponse =
    phase === "response" || phase === "hold" || phase === "reset";
  const isThinking = phase === "pause";

  return (
    <AIGradientBorder className="w-full max-w-[440px] rounded-3xl">
      <div
        className="grid gap-5 bg-[rgb(var(--color-surface))] p-5"
        aria-label="Live demonstration of an AI feature being described"
      >
        {/* Header — mark + quiet interface label */}
        <div className="flex items-center justify-between">
          <KorvaneMark />
          <span className="font-mono text-[11px] tracking-wide text-[rgb(var(--color-muted)/0.7)]">
            assistant.build
          </span>
        </div>

        {/* The exchange — monospace, used nowhere else on the page. */}
        <motion.div
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
          transition={{ duration: FADE_DURATION / 1000, ease: "easeOut" }}
          className="grid gap-4"
        >
          {/* User prompt row */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background)/0.6)] px-4 py-3">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[rgb(var(--color-accent)/0.15)] text-[rgb(var(--color-accent))]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-3"
                aria-hidden="true"
              >
                <path
                  d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="min-w-0 flex-1 font-mono text-xs leading-6 text-[rgb(var(--color-foreground))]">
              {prompt}
              {cursorOnPrompt && <Cursor />}
            </p>
          </div>

          {/* AI output — thinking spinner, then streamed response */}
          <div className="min-h-[132px] px-1">
            {isThinking ? (
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-4 animate-spin text-[rgb(var(--color-accent))]"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity="0.25"
                  />
                  <path
                    d="M21 12a9 9 0 00-9-9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-mono text-xs text-[rgb(var(--color-muted))]">
                  {thinking}
                </span>
              </div>
            ) : (
              <p className="whitespace-pre-wrap break-words font-mono text-[13px] leading-7 text-[rgb(var(--color-muted))]">
                {response}
                {cursorOnResponse && response.length > 0 && <Cursor />}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AIGradientBorder>
  );
}
