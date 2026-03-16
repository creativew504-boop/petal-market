import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-accent" />
      <span className="text-sm text-muted-foreground">Ends in</span>
      <div className="flex gap-1">
        {[
          { val: time.hours, label: 'h' },
          { val: time.minutes, label: 'm' },
          { val: time.seconds, label: 's' },
        ].map((t) => (
          <span key={t.label} className="bg-foreground text-background text-xs font-mono font-bold px-2 py-1 rounded-md">
            {pad(t.val)}{t.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
