import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAnimtaionComponent } from './loading-animtaion.component';

describe('LoadingAnimtaionComponent', () => {
  let component: LoadingAnimtaionComponent;
  let fixture: ComponentFixture<LoadingAnimtaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingAnimtaionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingAnimtaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
