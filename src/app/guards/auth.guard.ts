import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private readonly SESSION_TIMEOUT_MINUTES = 30; // Set session timeout duration (e.g., 30 minutes)

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check session expiration

    console.log('xxx');

    const expiration = localStorage.getItem('sessionExpiration');
    if (expiration) {
      const now = new Date().getTime();
      const expirationTime = new Date(expiration).getTime();

      if (now < expirationTime) {
        // Session is valid
        this.extendSession(); // Optional: Reset the session timer on access
        return true;
      }
    }

    // Session expired or not set
    this.clearSession();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  private extendSession(): void {
    // Update session expiration time
    const newExpiration = new Date().getTime() + this.SESSION_TIMEOUT_MINUTES * 60 * 1000;
    localStorage.setItem('sessionExpiration', new Date(newExpiration).toISOString());
  }

  private clearSession(): void {
    // Clear session-related data
    localStorage.removeItem('sessionExpiration');
    localStorage.removeItem('currentUser'); // Clear other session-specific items as needed
  }
}
