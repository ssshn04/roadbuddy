
'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
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
import { Input } from '@/components/ui/input';
import { ArrowLeft, CarIcon, VenetianMask, ShieldCheck, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useToast } from '@/hooks/use-toast'; // Import useToast

const vehicleFormSchema = z.object({
  brand: z.string().min(2, { message: 'Марка повинна містити щонайменше 2 символи.' }),
  model: z.string().min(1, { message: 'Модель повинна містити щонайменше 1 символ.' }),
  licensePlate: z.string()
    .min(4, { message: 'Номерний знак повинен містити щонайменше 4 символи.' })
    .max(10, { message: 'Номерний знак не повинен перевищувати 10 символів.'})
    .regex(/^[A-ZА-ЯІЇЄҐ0-9\s-]{4,10}$/i, { message: 'Недійсний формат номерного знаку.' }),
  year: z.coerce.number()
    .min(1900, { message: 'Рік випуску не може бути раніше 1900.' })
    .max(new Date().getFullYear() + 1, { message: `Рік випуску не може бути пізніше ${new Date().getFullYear() + 1}.` }),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export default function AddVehiclePage() {
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast(); // Initialize useToast

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      brand: '',
      model: '',
      licensePlate: '',
      year: undefined,
    },
  });

  function onSubmit(values: VehicleFormValues) {
    // TODO: Implement vehicle addition logic
    console.log('Vehicle data:', values);
    
    // Simulate successful submission
    toast({ 
      title: "Транспортний засіб додано!", 
      description: `${values.brand} ${values.model} (${values.licensePlate}) успішно додано.`
    });
    
    form.reset(); // Reset form after submission
    router.push('/profile'); // Redirect to profile page
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg shadow-xl rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Додати транспортний засіб</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/profile">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        До профілю
                    </Link>
                </Button>
            </div>
            <CardDescription>Заповніть інформацію про ваш транспортний засіб.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <CarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Марка
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Наприклад, Toyota" {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <VenetianMask className="mr-2 h-4 w-4 text-muted-foreground" />
                        Модель
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Наприклад, Camry" {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <ShieldCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                        Номерний знак
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Наприклад, АА1234ВВ" {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                        Рік випуску
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={`Наприклад, ${new Date().getFullYear() - 2}`} {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Додавання...' : 'Додати транспортний засіб'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
