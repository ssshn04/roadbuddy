
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fuel } from 'lucide-react';

export default function FuelPagePlaceholder() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl rounded-lg">
          <CardHeader className="text-center">
            <Fuel className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold">Каталог АЗС</CardTitle>
            <CardDescription>Цей розділ наразі в розробці.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
             <p className="text-muted-foreground mb-6">
              Ми активно працюємо над створенням зручного каталогу автозаправних станцій. Завітайте пізніше!
            </p>
            <Button asChild>
                <Link href="/">Повернутися на головну</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
