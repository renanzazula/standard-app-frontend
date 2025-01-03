import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SessionManagerService {

  private readonly SESSION_TIMEOUT_MINUTES = 30;

  constructor(private router: Router) {
    this.startUserActivityTracking();
  }

  startUserActivityTracking(): void {
    const resetSession = () => {
      const newExpiration = new Date().getTime() + this.SESSION_TIMEOUT_MINUTES * 60 * 1000;
      localStorage.setItem('sessionExpiration', new Date(newExpiration).toISOString());
    };

    // Add event listeners to reset session on activity
    window.addEventListener('mousemove', resetSession);
    window.addEventListener('keydown', resetSession);
    window.addEventListener('click', resetSession);
  }

  stopUserActivityTracking(): void {
    // Remove event listeners to stop session management
    window.removeEventListener('mousemove', () => {});
    window.removeEventListener('keydown', () => {});
    window.removeEventListener('click', () => {});
  }
}
