import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromedioComponent } from './promedio.component';

describe('PromedioComponent', () => {
  let component: PromedioComponent;
  let fixture: ComponentFixture<PromedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromedioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
