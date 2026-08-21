import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shop-overview',
  standalone: true,
  templateUrl: './shop.page.html',
  styleUrl: './shop.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopOverview {}
