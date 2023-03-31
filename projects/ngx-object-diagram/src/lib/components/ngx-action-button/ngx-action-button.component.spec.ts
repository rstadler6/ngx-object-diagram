import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxActionButtonComponent } from './ngx-action-button.component';

describe('NgxCollapseButtonComponent', () => {
  let component: NgxActionButtonComponent;
  let fixture: ComponentFixture<NgxActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxActionButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
