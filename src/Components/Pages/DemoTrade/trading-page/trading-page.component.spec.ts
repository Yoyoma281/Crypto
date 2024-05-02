import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPageComponent } from './trading-page.component';

describe('TradingPageComponent', () => {
  let component: TradingPageComponent;
  let fixture: ComponentFixture<TradingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
