import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AppService } from '../../app-utilities/app.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage implements OnInit {
  private readonly _appService = inject(AppService);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this._appService.showControlPanels.set(false);
  }

  goHome() {
    this._appService.showControlPanels.set(true);
    this._router.navigateByUrl('/standings');
  }
}
