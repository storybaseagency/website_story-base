// Jojo am Faden, das sanft auf und ab wippt (Mikroanimation der Paket-Aktion).
// Der Faden reicht weit nach oben und wird vom Elternelement abgeschnitten,
// so bleibt er beim Wippen immer verbunden.
export function Jojo({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className="jojo-bob relative flex flex-col items-center">
        <span className="h-[600px] w-0.5 bg-ink-950/25" />
        <svg viewBox="0 0 64 64" className="-mt-1 size-16 drop-shadow-[0_10px_14px_rgba(7,8,13,0.25)]">
          <circle cx="32" cy="32" r="30" fill="#d88d69" />
          <circle cx="32" cy="32" r="22" fill="#c4703f" />
          <circle cx="32" cy="32" r="7" fill="#faf7f3" />
          <circle cx="32" cy="32" r="3" fill="#07080d" opacity="0.6" />
          <path d="M14 22a22 22 0 0 1 12-10" stroke="#f3d6c7" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}
