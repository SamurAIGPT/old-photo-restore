export function CreditBadge({ credits }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800/80 border border-zinc-700 text-zinc-300 rounded-full text-xs font-semibold">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
      <span>{credits} credits</span>
    </div>
  );
}
