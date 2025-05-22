'use client';

import Link from 'next/link';
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
import { Input } from '@/components/ui/input';
import { Mail, Lock } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import { loginUser } from '@/services/authService';

const loginFormSchema = z.object({
  username: z.string().min(3, { message: "Ім’я користувача має містити щонайменше 3 символи." }),
  password: z.string().min(6, { message: "Пароль повинен містити щонайменше 6 символів." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await loginUser({
        userName: values.username,
        password: values.password,
      });
      
      window.location.href = '/';
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl rounded-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">Ласкаво просимо!</CardTitle>
            <CardDescription>
              Увійдіть, щоб отримати доступ до свого облікового запису RoadNav.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        Ім'я користувача
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Введіть ім'я користувача"
                          {...field}
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                        Пароль
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Вхід...' : 'Увійти'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3 pt-6">
            <p className="text-sm text-muted-foreground">
              Немає облікового запису?{' '}
              <Button variant="link" asChild className="px-0 h-auto py-0 text-primary hover:text-primary/80">
                <Link href="/register">Зареєструватися</Link>
              </Button>
            </p>
            <Button variant="link" asChild className="px-0 h-auto py-0 text-sm text-muted-foreground hover:text-foreground/80">
              <Link href="/forgot-password">Забули пароль?</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
