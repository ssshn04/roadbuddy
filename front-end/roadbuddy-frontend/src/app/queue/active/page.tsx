
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, Users, Clock, Trash2, ListX, Info } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface ActiveQueueEntry {
  id: string;
  borderPointName: string;
  position: number;
  enqueuedAt: Date;
  estimatedWaitTime: { hours: number; minutes: number };
}

// Placeholder data for active queues
const initialActiveQueues: ActiveQueueEntry[] = [
  {
    id: 'queue-1',
    borderPointName: 'Ягодин - Дорогуськ',
    position: 15,
    enqueuedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    estimatedWaitTime: { hours: 1, minutes: 15 },
  },
  {
    id: 'queue-2',
    borderPointName: 'Краківець - Корчова',
    position: 8,
    enqueuedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    estimatedWaitTime: { hours: 0, minutes: 40 },
  },
];

export default function ActiveQueuesPage() {
  const [activeQueues, setActiveQueues] = useState<ActiveQueueEntry[]>([]);
  const [clientSideLoaded, setClientSideLoaded] = useState(false);

  useEffect(() => {
    // Simulate fetching data and ensure dates are handled client-side
    setActiveQueues(initialActiveQueues.map(q => ({ ...q, enqueuedAt: new Date(q.enqueuedAt) })));
    setClientSideLoaded(true);
  }, []);

  const handleCancelRegistration = (queueId: string) => {
    // Simulate API call for deletion
    setActiveQueues(prevQueues => prevQueues.filter(queue => queue.id !== queueId));
    // TODO: Add toast notification for successful cancellation
  };

  if (!clientSideLoaded) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Завантаження активних черг...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Мої активні черги</h1>
          <Button asChild>
            <Link href="/queue/register">Зареєструватися в нову чергу</Link>
          </Button>
        </div>

        {activeQueues.length === 0 ? (
          <Card className="shadow-lg">
            <CardHeader className="items-center">
                <ListX className="h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="text-2xl">Активних черг не знайдено</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Схоже, у вас немає активних реєстрацій в чергах.
              </p>
              <Button asChild variant="outline">
                <Link href="/queues/register">Перейти до реєстрації</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {activeQueues.map(queue => (
              <Card key={queue.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-primary flex items-center">
                        <MapPin className="mr-2 h-6 w-6" />
                        {queue.borderPointName}
                      </CardTitle>
                      <CardDescription>Ваша поточна реєстрація в черзі.</CardDescription>
                    </div>
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleCancelRegistration(queue.id)}
                        aria-label="Скасувати реєстрацію"
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-foreground">
                    <Users className="mr-3 h-5 w-5 text-muted-foreground" />
                    <p><strong>Позиція в черзі:</strong> {queue.position}</p>
                  </div>
                  <div className="flex items-center text-foreground">
                    <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                    <p><strong>Час реєстрації:</strong> {format(queue.enqueuedAt, "dd.MM.yyyy HH:mm:ss")}</p>
                  </div>
                  <div className="flex items-center text-foreground">
                    <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                    <p>
                      <strong>Орієнтовний час очікування:</strong> 
                      {queue.estimatedWaitTime.hours > 0 && `${queue.estimatedWaitTime.hours} год. `}
                      {queue.estimatedWaitTime.minutes} хв.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Alert variant="default" className="bg-primary/5 border-primary/30">
                     <Info className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary">Зверніть увагу</AlertTitle>
                    <AlertDescription className="text-primary/80">
                      Орієнтовний час очікування може змінюватися залежно від ситуації на кордоні.
                    </AlertDescription>
                  </Alert>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
