export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.28),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(168,85,247,0.25),transparent_35%),radial-gradient(circle_at_50%_85%,rgba(236,72,153,0.14),transparent_35%)]" />

      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-pulse" />
      <div className="absolute right-[10%] top-[22%] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-[8%] left-[35%] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />
    </div>
  );
}