// animations.ts
import { trigger, transition, style, animate, AnimationTriggerMetadata } from '@angular/animations';
import { ElementRef } from '@angular/core';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))]),
  transition(':leave', [animate('1s', style({ opacity: 0 }))]),
]);


export function fadeOnScroll(scrollElement: ElementRef): AnimationTriggerMetadata {
  const calculateOpacity = (event: Event) => {
    const element = scrollElement.nativeElement as HTMLElement;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const distanceFromTop = element.getBoundingClientRect().top;

    // Calculate the percentage scrolled
    const scrollPercentage = Math.min(1, Math.max(0, 1 - (distanceFromTop / windowHeight)));

    // Calculate opacity based on the scroll percentage
    const opacity = scrollPercentage;

    // Apply the opacity to the element
    element.style.opacity = opacity.toString();
  };

  return trigger('fadeOnScroll', [
    transition(':enter', [style({ opacity: 0 }), animate('1.5s', style({ opacity: 1 }))]),
    transition(':leave', [animate('1.5s', style({ opacity: 0 }))]),
  ]);
}