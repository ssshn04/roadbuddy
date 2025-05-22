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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Lock, User, Briefcase } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import { registerUser } from '@/services/authService';

const roles = [
  "Водій автомобіля",
  "Водій автобуса",
  "Прикордонник",
  "Оператор АЗС",
] as const;

const registerFormSchema = z
  .object({
    username: z.string().min(3, { message: "Ім'я користувача повинно містити щонайменше 3 символи." }),
    email: z.string().email({ message: "Будь ласка, введіть дійсну адресу електронної пошти." }),
    password: z.string().min(6, { message: "Пароль повинен містити щонайменше 6 символів." }),
    confirmPassword: z.string().min(6, { message: "Підтвердження пароля повинно містити щонайменше 6 символів." }),
    role: z.enum(roles, { errorMap: () => ({ message: "Будь ласка, оберіть роль." }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: roles[0], // Встановлюємо дефолтну роль, щоб Select працював стабільно
    },
  });

  const roleMap: Record<string, string> = {
    "Водій автомобіля": "Driver",
    "Водій автобуса": "Driver",
    "Прикордонник": "BorderOfficer",
    "Оператор АЗС": "FuelOperator",
  };

  async function onSubmit(values: RegisterFormValues) {
    const convertedRole = roleMap[values.role];
    if (!convertedRole) {
      alert("Обрана роль не підтримується.");
      return;
    }

    try {
      const payload = {
        UserName: values.username,
        Email: values.email,
        Password: values.password,
        Role: convertedRole,
      };

      const token = await registerUser(payload);
      console.log("Token:", token);
      localStorage.setItem("token", token);

      window.location.href = "/";
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl rounded-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">Створити обліковий запис</CardTitle>
            <CardDescription>Приєднуйтесь до RoadNav та подорожуйте розумніше!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        Ім'я користувача
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ваше ім'я" {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        Електронна пошта
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} className="mt-1" />
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
                        <Input type="password" placeholder="••••••••" {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                        Підтвердіть пароль
                      </FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        Ваша роль
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultValue={roles[0]}
                      >
                        <FormControl>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Оберіть вашу роль" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Створення..." : "Створити акаунт"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3 pt-6">
            <p className="text-sm text-muted-foreground">
              Вже маєте обліковий запис?{' '}
              <Button variant="link" asChild className="px-0 h-auto py-0 text-primary hover:text-primary/80">
                <Link href="/login">Увійти</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
