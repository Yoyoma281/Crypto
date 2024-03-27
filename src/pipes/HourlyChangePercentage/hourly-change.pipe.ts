import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourlyChange',
})
export class HourlyChangePipe implements PipeTransform {
  transform(currentPrice: number, changeInHour: number): string {
    if (currentPrice === 0) {
      return ""; // Avoid division by zero
    }
    // Determine the absolute value of the change
    const absoluteChange = Math.abs(changeInHour);

    // Calculate the percentage change
    const hourlyChangePercent = (absoluteChange / currentPrice) * 100;

    return hourlyChangePercent.toFixed(2);
  }
}
