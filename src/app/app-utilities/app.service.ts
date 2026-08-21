import { Injectable, signal } from '@angular/core';
import { Users } from './users.enum';

@Injectable({ providedIn: 'root' })
export class AppService {
  showControlPanels = signal<boolean>(true);
  selectedUser = signal<Users | null>(null);
}
