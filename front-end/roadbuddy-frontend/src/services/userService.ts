// services/userService.ts
export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
}

export interface UserProfileDto {
  userName: string;
  email: string;
  role: string;
  vehiclesCount: number;
  queueEntriesCount: number;
  reviewsCount: number;
  vehicles: Vehicle[];
}

export async function fetchUserProfile(): Promise<UserProfileDto> {
  const response = await fetch('/api/profile/me', {
    headers: {
      'Content-Type': 'application/json',
      // Якщо потрібен токен, можна додати Authorization: `Bearer ${token}`
    },
    credentials: 'include' // щоб cookie або токени зберігалися, якщо є авторизація по cookie
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
}
