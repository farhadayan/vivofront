import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

export const authGuard: CanActivateFn = () => {
  const configService = inject(ConfigService);
  const router = inject(Router);
  
  // In a real app, you would check actual authentication
  const isAuthenticated = true; // Mock authentication check
  
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};