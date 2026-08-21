import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../../app-utilities/app.service';
import { Users } from '../../app-utilities/users.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly appService = inject(AppService);

  readonly Users = Users;

  readonly destination = signal<string>('קלימרה');
}
