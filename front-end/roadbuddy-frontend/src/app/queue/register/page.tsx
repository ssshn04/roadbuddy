
'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { MapPin, Clock, Users, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react'; // Added Trash2
import { format } from 'date-fns'; // For date formatting

// Placeholder data based on your DTOs
interface BorderPoint {
  id: string; // Guid can be represented as string in frontend
  name: string;
}

const borderPoints: BorderPoint[] = [
  { id: 'c9b8a7d6-e5f4-3210-b1a2-c3d4e5f6a7b8', name: 'Ягодин - Дорогуськ' },
  { id: 'd1e2f3a4-b5c6-7890-d1e2-f3a4b5c6d7e8', name: 'Краківець - Корчова' },
  { id: 'f9e8d7c6-b5a4-3210-e1f2-a3b4c5d6e7f8', name: 'Ужгород - Вишнє Нємецке' },
  { id: 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f6a7b8', name: 'Чоп - Захонь' },
];

// Simulating a user ID
const placeholderUserId = 'E5401FB8-B43C-44B6-9F2A-7ABF1D280AC7';

const registerQueueFormSchema = z.object({
  borderPointId: z.string({ required_error: 'Будь ласка, оберіть пункт пропуску.' }),
});

type RegisterQueueFormValues = z.infer<typeof registerQueueFormSchema>;

interface QueueRegistrationResult {
  borderPointName: string;
  position: number;
  enqueuedAt: Date;
  estimatedWaitTime: { hours: number; minutes: number }; 
}

export default function RegisterQueuePage() {
  const [registrationResult, setRegistrationResult] = useState<QueueRegistrationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterQueueFormValues>({
    resolver: zodResolver(registerQueueFormSchema),
    defaultValues: {
      borderPointId: undefined,
    },
  });

  const [enqueuedAtClient, setEnqueuedAtClient] = useState<Date | null>(null);
  useEffect(() => {
    if (registrationResult) {
      setEnqueuedAtClient(new Date()); 
    }
  }, [registrationResult]);


  async function onSubmit(values: RegisterQueueFormValues) {
    setIsLoading(true);
    setError(null);
    setRegistrationResult(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedBorderPoint = borderPoints.find(bp => bp.id === values.borderPointId);

    if (!selectedBorderPoint) {
      setError('Обраний пункт пропуску не знайдено.');
      setIsLoading(false);
      return;
    }

    const simulatedPosition = Math.floor(Math.random() * 100) + 1;
    const estimatedMinutes = simulatedPosition * 5; 

    setRegistrationResult({
      borderPointName: selectedBorderPoint.name,
      position: simulatedPosition,
      enqueuedAt: new Date(),
      estimatedWaitTime: {
        hours: Math.floor(estimatedMinutes / 60),
        minutes: estimatedMinutes % 60,
      },
    });
    setIsLoading(false);
    form.reset(); 
  }

  async function handleDeleteRegistration() {
    setIsLoading(true);
  
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRegistrationResult(null);
    setError(null); 
    setIsLoading(false);

  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg shadow-xl rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Реєстрація в чергу</CardTitle>
            <CardDescription>Оберіть пункт пропуску та зареєструйтеся для перетину кордону.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="borderPointId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        Пункт пропуску
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Оберіть пункт пропуску" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {borderPoints.map(bp => (
                            <SelectItem key={bp.id} value={bp.id}>{bp.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading || !!registrationResult}>
                  {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {error && (
          <Card className="w-full max-w-lg shadow-xl rounded-lg mt-8 bg-destructive/10 border-destructive">
            <CardHeader className="flex flex-row items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <CardTitle className="text-xl text-destructive">Помилка реєстрації</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {registrationResult && enqueuedAtClient && (
          <Card className="w-full max-w-lg shadow-xl rounded-lg mt-8 bg-primary/5 border-primary">
            <CardHeader className="flex flex-row items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl text-primary">Реєстрація успішна!</CardTitle>
                <CardDescription>Ви успішно зареєстровані в черзі.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                <p><strong>Пункт пропуску:</strong> {registrationResult.borderPointName}</p>
              </div>
              <div className="flex items-center">
                <Users className="mr-3 h-5 w-5 text-muted-foreground" />
                <p><strong>Ваша позиція в черзі:</strong> {registrationResult.position}</p>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                <p><strong>Час реєстрації:</strong> {format(enqueuedAtClient, "dd.MM.yyyy HH:mm:ss")}</p>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                <p>
                  <strong>Орієнтовний час очікування:</strong> 
                  {registrationResult.estimatedWaitTime.hours > 0 && `${registrationResult.estimatedWaitTime.hours} год. `}
                  {registrationResult.estimatedWaitTime.minutes} хв.
                </p>
              </div>
            </CardContent>
             <CardFooter>
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleDeleteRegistration}
                  disabled={isLoading}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isLoading ? 'Видалення...' : 'Видалити реєстрацію'}
                </Button>
            </CardFooter>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
