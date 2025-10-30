import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule],
  template: `
    <div class="dashboard-graph">
      <h2 class="graph-title">Ganancias por Factura</h2>

      <div class="chart-wrapper">
        <canvas baseChart
          [data]="graficaFacturas"
          [type]="chartType"
          [options]="chartOptions">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-graph {
      padding: 2rem;
      text-align: center;
    }

    .graph-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #333;
    }

    .chart-wrapper {
      width: 100%;
      max-width: 700px;
      height: 350px;
      margin: 0 auto;
      position: relative;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }
  `]
})
export class DashboardComponent implements OnInit {
  chartType: 'bar' = 'bar';

  graficaFacturas: ChartData<'bar', number[], string> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        data: [120000, 95000, 143000, 110000, 158000],
        label: 'Ganancias',
        backgroundColor: ['#5AA454', '#A10A28', '#C7B42C', '#1f77b4', '#FF9800'],
      }
    ]
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${(context.raw as number).toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number): string {
            return `$${Number(tickValue).toLocaleString()}`;
          }
        }
      }
    }
  };

  ngOnInit(): void {
    // Aquí luego puedes cargar datos reales desde el backend
  }
}