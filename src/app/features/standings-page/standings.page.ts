import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { IPointParticle } from './interfaces/particle.interface';
import { StandingsApiService } from './api.service';

@Component({
  selector: 'app-standings-overview',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './standings.page.html',
  styleUrl: './standings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsOverview {
  private readonly _api = inject(StandingsApiService);

  protected readonly particles = signal<IPointParticle[]>([]);
  protected readonly canShowResults = signal<boolean>(this._shouldShowResults());

  readonly chartResource = resource({
    loader: () => this._api.getAllUsersScore(),
  });

  readonly chartOptions = computed<EChartsOption>(() => {
    const scores = this.chartResource.value() ?? [];

    return {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['30%', '50%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            fontSize: '1rem',
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold',
            },
          },

          data: scores.map((score) => ({
            name: score.name,
            value: score.score,
          })),
        },
      ],
    };
  });

  constructor() {
    this._generateParticles();
  }

  private _shouldShowResults() {
    const now = new Date();

    // Enforces Greece time zone formatting
    const greeceTimeString = now.toLocaleString('en-US', {
      timeZone: 'Europe/Athens',
      hour: '2-digit',
      hour12: false,
    });

    // returns a number between 1 - 24
    const currentHour = parseInt(greeceTimeString, 10) + 1;

    return currentHour >= 19 && currentHour < 24;
  }

  private _generateParticles() {
    const pointValues = ['+1', '-1', '+5', '-5', '+10', '-10'];
    const totalParticles = 10;
    const generated: IPointParticle[] = [];

    for (let i = 0; i < totalParticles; i++) {
      const val = pointValues[Math.floor(Math.random() * pointValues.length)];
      generated.push({
        value: val,
        isPositive: val.startsWith('+'),
        left: `${Math.random() * 90}%`,
        top: `${Math.floor(Math.random() * 40 + 40)}%`,
        animationDelay: `${(i * (8 / totalParticles)).toFixed(2)}s`,
      });
    }

    this.particles.set(generated);
  }
}
