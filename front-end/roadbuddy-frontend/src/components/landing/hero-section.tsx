
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-secondary text-secondary-foreground py-20 md:py-32">
      <div className="absolute inset-0">
        <Image
          src="/highway.jpg"
          alt="Scenic highway"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="modern highway traffic"
          priority
        />
         <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/80 to-secondary/50"></div>
      </div>
      <div className="container relative z-10 mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Керуйте розумніше з <span className="text-primary">RoaBuddy</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-secondary-foreground/80 md:text-xl">
          Черги на кордоні в реальному часі, найкращі ціни на пальне та оптимізовані маршрути.
          Подорожуйте впевнено та ефективно.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild className="shadow-lg transform transition-transform hover:scale-105">
            <Link href="/queue/active">Перевірити черги на кордоні</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="shadow-lg border-primary text-primary hover:bg-primary/10 transform transition-transform hover:scale-105">
            <Link href="/fuel">Знайти найкращі ціни на пальне</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
