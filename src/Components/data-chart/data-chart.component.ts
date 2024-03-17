import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Coin } from '../../models/Coin';
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';

@Component({
  selector: 'app-data-chart',
  template: '<canvas #chartCanvas width="400" height="400"></canvas>', // Use the same template reference name
  styleUrls: ['./data-chart.component.css'],
})
export class DataChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>; // Use the same template reference name
  @Input() Symbol: string = 'BTCUSDT';
  @Input() interval: string = '30m';
  @Input() startTime: number = 0;
  @Input() endTime: number = 0;
  data: number[] = []

  constructor(private Api: BinanceApiService) {}

  ngAfterViewInit(): void {
    this.GetData(this.Symbol, this.interval, this.startTime, this.endTime);
  }

  CreateaGraph() {
    Chart.register(...registerables); // Register the necessary components for Chart.js
    const ctx = this.chartCanvas.nativeElement.getContext('2d'); // Get the canvas context

    if (ctx) {
      // const data = [15, 21, 1001, 40, 50];

      // Create the chart
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'Data',
              data: this.data,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              beginAtZero: true,
              // Add x-axis options
            },
          },
        },
      });
    } else {
      console.error('Canvas context is null.');
    }
  }
  GetData(
    Symbol: string,
    interval: string,
    startTime: number,
    endTime: number
  ): void {
    this.Api.getKlinesData(Symbol, interval, startTime, endTime).subscribe(
      (data) => {
        const closePrices = data.map(item => item.close);
        this.data = closePrices;
        console.table(data);
        this.CreateaGraph();
      },
      (error) => {
        // Handle any errors that occurred during the API call
        console.error('Error fetching data:', error);
      }
    );
  }
}
