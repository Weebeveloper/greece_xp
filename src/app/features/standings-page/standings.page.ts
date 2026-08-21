import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { IPointParticle } from './particle.interface';

@Component({
  selector: 'app-standings-overview',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './standings.page.html',
  styleUrl: './standings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsOverview {
  protected readonly particles = signal<IPointParticle[]>([]);
  protected readonly canShowResults = signal<boolean>(false);

  chartOption: EChartsOption = {
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

        data: [
          { value: 1048, name: 'סהר' },
          { value: 735, name: 'עוכאנה' },
          { value: 580, name: 'אריאל' },
        ],
      },
    ],
  };

  constructor() {
    this.generateParticles();
  }

  private generateParticles() {
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
