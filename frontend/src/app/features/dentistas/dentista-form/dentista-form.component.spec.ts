import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaFormComponent } from './dentista-form.component';

describe('DentistaFormComponent', () => {
  let component: DentistaFormComponent;
  let fixture: ComponentFixture<DentistaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
