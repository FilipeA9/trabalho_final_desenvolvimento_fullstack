import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaListComponent } from './dentista-list.component';

describe('DentistaListComponent', () => {
  let component: DentistaListComponent;
  let fixture: ComponentFixture<DentistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
