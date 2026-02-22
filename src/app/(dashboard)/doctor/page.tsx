export default function DoctorDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif text-text-light">My Schedule</h1>
        <div className="text-xs text-text-muted uppercase tracking-widest font-bold">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="premium-glass p-12 rounded-3xl text-center border border-frost-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-midnight-light border border-frost-border flex items-center justify-center text-champagne text-2xl">
                ☕
            </div>
            <h2 className="text-xl font-serif text-text-light mb-2">Clear Schedule</h2>
            <p className="text-text-muted font-light max-w-sm mx-auto">No appointments scheduled for today. Take a moment to relax and recharge.</p>
        </div>
      </div>
    </div>
  );
}
