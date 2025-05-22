import { Navigation2 } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold ${className}`}>
      <Navigation2 className="h-7 w-7 text-primary" />
      <span className="text-foreground">RoadBuddy</span>
    </Link>
  );
}
