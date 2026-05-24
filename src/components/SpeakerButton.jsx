import { useState, useCallback } from 'react';

/**
 * SpeakerButton – plays German TTS for a given sentence.
 */
export default function SpeakerButton({ sentence }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support Text-to-Speech.');
      return;
    }

    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'de-DE';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [sentence]);

  return (
    <button
      id={`speak-btn-${sentence.slice(0, 10).replace(/\s/g, '-')}`}
      onClick={handleSpeak}
      title="Speak this sentence"
      className={`
        group relative flex items-center justify-center
        w-10 h-10 rounded-xl cursor-pointer
        transition-all duration-300 ease-out
        ${speaking
          ? 'bg-primary-500/30 text-primary-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110'
          : 'bg-surface-800/60 text-surface-400 hover:bg-primary-600/20 hover:text-primary-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:scale-105'
        }
        border border-surface-700/50 hover:border-primary-500/40
        backdrop-blur-sm
      `}
    >
      {/* Sound waves animation when speaking */}
      {speaking && (
        <span className="absolute inset-0 rounded-xl animate-ping bg-primary-500/20" />
      )}

      {/* Speaker SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 relative z-10"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {speaking ? (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="animate-pulse" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="animate-pulse" style={{ animationDelay: '150ms' }} />
          </>
        ) : (
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="opacity-50 group-hover:opacity-100 transition-opacity" />
        )}
      </svg>
    </button>
  );
}
