'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Car, ListChecks, MessageSquare, Edit3, User } from 'lucide-react';
import { fetchUserProfile, UserProfileDto } from '@/services/userService';

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState<UserProfileDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile()
            .then(data => {
                setUserProfile(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-12">Завантаження профілю...</p>;
    if (error) return <p className="text-center mt-12 text-red-500">Помилка: {error}</p>;
    if (!userProfile) return <p className="text-center mt-12">Профіль не знайдено</p>;

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* User Info Card */}
                    <Card className="shadow-lg">
                        <CardHeader className="flex flex-row items-center space-x-4">
                            <Avatar className="h-20 w-20 bg-muted text-muted-foreground flex items-center justify-center">                                
                                {/* <AvatarImage src={`https://placehold.co/100x100.png`} alt={userProfile.userName} /> */}
                                <User className="h-12 w-12" />
                                <AvatarFallback>{userProfile.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>

                            <div>
                                <CardTitle className="text-3xl">{userProfile.userName}</CardTitle>
                                <CardDescription className="text-lg">{userProfile.email}</CardDescription>
                                <p className="text-sm text-muted-foreground mt-1">Роль: {userProfile.role}</p>
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
                                    <p className="text-2xl font-semibold">{userProfile.vehiclesCount}</p>
                                    <p className="text-sm text-muted-foreground">Транспортні засоби</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                                <ListChecks className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-2xl font-semibold">{userProfile.queueEntriesCount}</p>
                                    <p className="text-sm text-muted-foreground">Записи в черзі</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                                <MessageSquare className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-2xl font-semibold">{userProfile.reviewsCount}</p>
                                    <p className="text-sm text-muted-foreground">Відгуки</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vehicles Section */}
                    <Card className="shadow-lg">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle className="text-2xl">Мої транспортні засоби</CardTitle>
                            <Button variant="outline">
                                <Edit3 className="mr-2 h-4 w-4" /> Додати ТЗ
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {userProfile.vehicles.length > 0 ? (
                                <ul className="space-y-4">
                                    {userProfile.vehicles.map((vehicle, index) => (
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
                                            {index < userProfile.vehicles.length - 1 && <Separator className="my-4" />}
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
