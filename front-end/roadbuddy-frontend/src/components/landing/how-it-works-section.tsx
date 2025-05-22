import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Activity, Route } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Крок 1: Пошук та Відкриття',
    description: 'Легко знайдіть пункти перетину кордону або заправки. Використовуйте інтуїтивний пошук та фільтри, щоб швидко знайти потрібне.',
    imageSrc: '/search.jpg',
    imageAlt: 'Особа, що користується картою на пристрої для пошуку',
    aiHint: 'пошук на карті'
  },
  {
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: 'Крок 2: Отримання інформації в реальному часі',
    description: 'Доступ до актуальної інформації про довжину черг, динамічний час очікування та поточні ціни на пальне для прийняття обґрунтованих рішень.',
    imageSrc: '/time.jpg',
    imageAlt: 'Панель з живими графіками та цифрами',
    aiHint: 'панель даних'
  },
  {
    icon: <Route className="h-8 w-8 text-primary" />,
    title: 'Крок 3: Планування та Навігація',
    description: 'Оптимізуйте вашу поїздку, інтегруючи час очікування на кордоні та зупинки для заправки. Навігайте впевнено і економте час.',
    imageSrc: '/plan.jpg',
    imageAlt: 'Карта з оптимізованим маршрутом і виділеними точками',
    aiHint: 'навігація по карті'
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Як працює RoadBuddy
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Простий і зручний процес для покращення вашого досвіду подорожей.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-card">
              <div className="relative w-full h-48 md:h-60 lg:h-64 overflow-hidden rounded-t-lg">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={step.aiHint}
                />
              </div>

              <CardHeader className="items-center text-center pt-6">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  {step.icon}
                </div>
                <CardTitle className="text-xl text-card-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
