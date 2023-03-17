import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCollapseButtonComponent } from './ngx-collapse-button.component';

describe('NgxCollapseButtonComponent', () => {
  let component: NgxCollapseButtonComponent;
  let fixture: ComponentFixture<NgxCollapseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCollapseButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCollapseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
