import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsPageComponent } from './coins-page.component';

describe('CoinsPageComponent', () => {
  let component: CoinsPageComponent;
  let fixture: ComponentFixture<CoinsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
