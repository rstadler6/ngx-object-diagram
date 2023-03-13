import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxReloadButtonComponent } from './ngx-reload-button.component';

describe('NgxLoadButtonComponent', () => {
  let component: NgxReloadButtonComponent;
  let fixture: ComponentFixture<NgxReloadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxReloadButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxReloadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
