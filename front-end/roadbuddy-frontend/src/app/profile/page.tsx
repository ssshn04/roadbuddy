'use client';

import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Car, ListChecks, MessageSquare, Edit3, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

// Placeholder data based on UserProfileDto
const userProfileData = {
  userName: 'ssshn04',
  email: 'ssshn04@gmail.com',
  role: 'Водій автомобіля',
  vehiclesCount: 2,
  queueEntriesCount: 5,
  reviewsCount: 1,
  vehicles: [
    { id: 1, brand: 'Toyota', model: 'Camry', licensePlate: 'AB1234CE', year: 2021 },
    { id: 2, brand: 'Honda', model: 'Civic', licensePlate: 'IO5678BC', year: 2019 },
    { id: 3, brand: 'Volkswagen', model: 'Passat', licensePlate: 'CH9101AK', year: 2020 },
  ],
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* User Info Card */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://placehold.co/100x100.png`} alt={userProfileData.userName} data-ai-hint="profile avatar" />
                <AvatarFallback>{userProfileData.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{userProfileData.userName}</CardTitle>
                <CardDescription className="text-lg">{userProfileData.email}</CardDescription>
                <p className="text-sm text-muted-foreground mt-1">Роль: {userProfileData.role}</p>
              </div>
              <Button variant="outline" size="icon" className="ml-auto">
                <Edit3 className="h-4 w-4" />
                <span className="sr-only">Редагувати профіль</span>
              </Button>
            </CardHeader>
          </Card>

          {/* Stats Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Статистика</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <Car className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">{userProfileData.vehiclesCount}</p>
                  <p className="text-sm text-muted-foreground">Транспортні засоби</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <ListChecks className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">{userProfileData.queueEntriesCount}</p>
                  <p className="text-sm text-muted-foreground">Записи в черзі</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">{userProfileData.reviewsCount}</p>
                  <p className="text-sm text-muted-foreground">Відгуки</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicles Section */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-2xl">Мої транспортні засоби</CardTitle>
              <Button variant="outline" asChild>
                <Link href="/profile/vehicles/add">
                  <Edit3 className="mr-2 h-4 w-4" /> Додати ТЗ
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {userProfileData.vehicles.length > 0 ? (
                <ul className="space-y-4">
                  {userProfileData.vehicles.map((vehicle, index) => (
                    <li key={vehicle.id}>
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{vehicle.brand} {vehicle.model}</h3>
                                <p className="text-sm text-muted-foreground">Номер: {vehicle.licensePlate}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Рік: {vehicle.year}</p>
                        </div>
                      </div>
                      {index < userProfileData.vehicles.length - 1 && <Separator className="my-4" />}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">У вас ще немає доданих транспортних засобів.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
