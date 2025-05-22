// services/authService.ts
import Cookies from 'js-cookie';

export interface LoginRequest {
  userName: string;
  password: string;
}

export async function loginUser(data: LoginRequest): Promise<void> {
  const response = await fetch('http://localhost:5041/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // важливо для роботи з cookie
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text(); 
    throw new Error(error || 'Помилка входу');
  }
}

export interface RegisterRequest {
  UserName: string;
  Email: string;
  Password: string;
  Role: string;
}

export async function registerUser(data: RegisterRequest): Promise<string> {
  const response = await fetch('http://localhost:5041/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      UserName: data.UserName,
      Email: data.Email,
      Password: data.Password,
      Role: data.Role
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error || 'Помилка реєстрації');
  }

  const result = await response.json();
  return result.token;
}


export function logoutUser() {
  Cookies.remove('jwt');
  window.location.href = '/login'; 
}
