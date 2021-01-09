import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeFitnessComponent } from './welcome-fitness.component';

describe('WelcomeFitnessComponent', () => {
  let component: WelcomeFitnessComponent;
  let fixture: ComponentFixture<WelcomeFitnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeFitnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeFitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
