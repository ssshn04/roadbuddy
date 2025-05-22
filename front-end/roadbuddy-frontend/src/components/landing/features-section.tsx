import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound, Fuel, Route as RouteIcon } from 'lucide-react'; // Перейменовано Route на RouteIcon, щоб уникнути конфлікту
import Image from 'next/image';

const features = [
  {
    icon: <UsersRound className="h-10 w-10 text-primary" />,
    title: 'Керування Чергами',
    description: 'Слідкуйте за чергами на кордоні в реальному часі, отримуйте оцінки часу очікування та сповіщення.',
    details: ["Інтерактивна карта пунктів пропуску", "Динамічне оновлення часу очікування", "Налаштовувані сповіщення"],
    imageSrc: '/queue-management.jpg',
    imageAlt: 'Ілюстрація системи керування чергами на кордоні',
    aiHint: 'черга на кордоні'
  },
  {
    icon: <Fuel className="h-10 w-10 text-primary" />,
    title: 'Пошук Пального',
    description: 'Знаходьте заправки з актуальними цінами на пальне, фільтруйте за сервісами та читайте відгуки користувачів.',
    details: ["Оновлення цін у реальному часі", "Фільтрація за типом пального та послугами", "Відгуки та рейтинги користувачів"],
    imageSrc: '/fuel-finder.jpg',
    imageAlt: 'Ілюстрація бензоколонки з табло цін',
    aiHint: 'заправка'
  },
  {
    icon: <RouteIcon className="h-10 w-10 text-primary" />,
    title: 'Планувальник Маршруту',
    description: 'Оптимізуйте поїздки, враховуючи черги на кордоні та витрати на пальне у своєму маршруті.',
    details: ["Розумні пропозиції маршрутів", "Оцінка витрати пального", "Динамічне коригування на основі даних у реальному часі"],
    imageSrc: '/route-planner.jpg',
    imageAlt: 'Інтерфейс карти з оптимізованим маршрутом',
    aiHint: 'карта маршруту'
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Усе необхідне для комфортної подорожі
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            RoadBuddy пропонує набір інструментів, розроблених для економії часу та коштів у дорозі.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={feature.imageSrc}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={feature.aiHint}
                />
              </div>

              <CardHeader className="items-center text-center pt-6">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside text-left pl-4">
                  {feature.details.map(detail => <li key={detail}>{detail}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
