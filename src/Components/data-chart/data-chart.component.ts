import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Coin } from '../../models/Coin';
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-data-chart',
  template: '<canvas #chartCanvas width="1000px" height="500px"></canvas>', // Use the same template reference name
  styleUrls: ['./data-chart.component.css'],
})
export class DataChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>; // Use the same template reference name
  @Input() Symbol: string = 'BTCUSDT';
  @Input() interval: string = '30m';
  @Input() startTime: number = 0;
  @Input() endTime: number = 0;
  @Input() width: number = 0;
  @Input() height: number = 0;
  data: number[] = [];

  constructor(private Api: BinanceApiService) {}

  ngAfterViewInit(): void {
    this.GetData(this.Symbol, this.interval, this.startTime, this.endTime);
    this.setCanvasSize(this.width, this.height);
  }
  setCanvasSize(width: number, height: number) {
    const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
    console.log(canvas);
    if (canvas) {
      console.log('cavas: ', canvas);
      canvas.width = width;
      canvas.height = height;
      // Call your chart rendering function here, or emit an event to trigger chart rendering
    }
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
          plugins: {
            legend: {
              display: false, // Hide the legend (including the default button)
            },
            tooltip: {
              mode: 'nearest', // Display tooltip for the nearest data point
              intersect: false, // Don't require exact hover position
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderWidth: 1,
              titleColor: 'white',
              bodyColor: 'white',
              displayColors: false, // Hide color boxes
              padding: 10,
              cornerRadius: 5,
              caretSize: 5,
              caretPadding: 5,
              position: 'average',
              callbacks: {
                // Customize tooltip label
                label: function (context) {
                  return 'Value: $ ' + new DecimalPipe('en-US').transform(context.parsed.y, '1.0-2');
                },
              }, // Positioning mode
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
        const closePrices = data.map((item) => item.close);
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
