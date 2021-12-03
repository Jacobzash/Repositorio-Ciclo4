import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioclaveComponent } from './cambioclave.component';

describe('CambioclaveComponent', () => {
  let component: CambioclaveComponent;
  let fixture: ComponentFixture<CambioclaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioclaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioclaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
