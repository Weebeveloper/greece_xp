import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INavTab } from './navbar.interface';
import { AppService } from '../../app-utilities/app.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit {
  private readonly _appService = inject(AppService);
  private readonly _router = inject(Router);

  readonly tabs: INavTab[] = [
    { label: 'Scoreboard', icon: 'emoji_events', route: '/standings' },
    { label: 'משימות', icon: 'receipt_long', route: '/quests' },
    { label: 'חנות', icon: 'shopping_bag', route: '/shop' },
  ];

  @ViewChildren('tabEl') private tabEls!: QueryList<ElementRef<HTMLElement>>;

  readonly activeIndex = signal(this._getActiveIndexFromUrl());

  readonly indicatorStyle = computed(() => {
    const rect = this._selectedTabsStyles()[this.activeIndex()];
    if (!rect) {
      return { transform: 'translateX(0px)', width: '0px' };
    }
    return {
      transform: `translateX(${rect.left}px)`,
      width: `${rect.width}px`,
    };
  });

  private _selectedTabsStyles = signal<{ left: number; width: number }[]>([]);

  constructor() {
    this._appService.showControlPanels.set(true);

    this._router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.activeIndex.set(this._getActiveIndexFromUrl());
      });
  }

  ngAfterViewInit(): void {
    const container = this.tabEls.first?.nativeElement.parentElement;
    if (!container) return;

    const containerLeft = container.getBoundingClientRect().left;
    this._selectedTabsStyles.set(
      this.tabEls.map((el) => {
        const r = el.nativeElement.getBoundingClientRect();
        return { left: r.left - containerLeft, width: r.width };
      }),
    );
  }

  private _getActiveIndexFromUrl(): number {
    const url = this._router.url.split('?')[0];
    const idx = this.tabs.findIndex((t) => url.startsWith(t.route));
    return idx === -1 ? 0 : idx;
  }
}
