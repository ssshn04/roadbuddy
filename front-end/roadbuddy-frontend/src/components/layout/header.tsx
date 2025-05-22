'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { logoutUser } from '@/services/authService';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt');
    setIsLoggedIn(!!token);
  }, []);

  const navItems = [
    { label: 'Черги на кордоні', href: '/queues' },
    { label: 'Пошук палива', href: '/fuel' },
    { label: 'Планувальник маршруту', href: '/planner' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/profile">Профіль</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  logoutUser();
                  setIsLoggedIn(false);
                }}
              >
                Вийти
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Увійти</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Зареєструватись</Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Відкрити меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      >
                        Профіль
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-lg"
                        onClick={() => {
                          logoutUser();
                          setIsLoggedIn(false);
                        }}
                      >
                        Вийти
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild className="w-full justify-start text-lg">
                        <Link href="/login">Увійти</Link>
                      </Button>
                      <Button asChild className="w-full justify-start text-lg">
                        <Link href="/register">Зареєструватись</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
