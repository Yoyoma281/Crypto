import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  SimpleChanges,
  OnInit,
} from '@angular/core';

import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { BinanceApiService } from '../../../services/Api/BinanceApi/binance-api.service';
import { DecimalPipe } from '@angular/common';
import { CandleStickData } from '../../../models/CandleStickData';


@Component({
  selector: 'app-data-chart',
  template: '<canvas #chartCanvas width="1050px" height="550px"></canvas>', // Use the same template reference name
  styleUrls: ['./data-chart.component.css'],
})
export class DataChartComponent implements OnChanges, OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>; // Use the same template reference name
  @Input() Symbol: string = 'BTCUSDT';
  @Input() TimeFrame: string = '1m';
  data: CandleStickData[] = [];
  chartInstance: Chart | null = null;
  Lables: string[] = [];

  constructor(private Api: BinanceApiService) {}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes detected labels length:');
    this.destroyChart();
    this.GetData(this.Symbol, this.TimeFrame);
    // console.log("ngonchanges data: ", this.data)
  }
  private CreateaGraph(Data: CandleStickData[]) {
    // if (this.chartCanvas && this.chartCanvas.nativeElement) {
    // }
    Chart.register(...registerables, zoomPlugin); // Register the necessary components for Chart.js
    const ctx = this.chartCanvas.nativeElement.getContext('2d'); // Get the canvas context
    console.log('data in chart:  ', Data);
    if (ctx) {
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.Lables,
          datasets: [
            {
              label: 'Data',
              data: Data.map((item) => item.close),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
            },
            x: {
              beginAtZero: false,
              
            },
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
                
              },
              zoom: {

                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
              limits: {
                
              },

            },
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
                  return (
                    'Value: $ ' +
                    new DecimalPipe('en-US').transform(
                      context.parsed.y,
                      '1.0-2',
                    )
                  );
                },
              }, // Positioning mode
            },
          },
        },
      });
      // console.log('chart: ', this.chartInstance);
    } else {
      console.error('Canvas context is null.');
    }
  }
  private GetData(Symbol: string, Interval: string): void {
    this.Api.getKlinesData(Symbol, Interval).subscribe(
      (data) => {
        this.CreateLabels(data);
        this.CreateaGraph(data);
        console.log('data from getklines: ', data);
        const closePrices = data.map((item) => item.close);
        this.data = closePrices;
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
    );
  }
  private destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy the existing chart instance
      this.chartInstance = null; // Set chart instance to null
    }
  }
  private CreateLabels(Klinesdata: CandleStickData[]) {
    console.log('creating labels...');
    const CandleGap = Math.abs(
      Klinesdata[0].timestamp - Klinesdata[1].timestamp,
    );
    const DayInMilli = 86400000;
    const MonthInMilli = DayInMilli * 30;
    let Option = this.GetHourMinuteLabel;

    if (CandleGap > MonthInMilli) {
      // More than 30 days, use month/year labels
      Option = this.GetMonthYearLabel;
    } else if (CandleGap > DayInMilli) {
      // Between 1 day and 30 days, use day/month labels
      Option = this.GetDayMonthLabel;
    }

    this.Lables = [
      ...new Set(Klinesdata.map((item) => Option(item.timestamp))),
    ];
  }
  private GetMonthYearLabel(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
  private GetDayMonthLabel(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString('default', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  private GetHourMinuteLabel(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString('default', {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
    });
  }

}
