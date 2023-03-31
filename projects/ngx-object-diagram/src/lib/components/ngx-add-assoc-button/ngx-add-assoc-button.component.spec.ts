import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAddAssocButtonComponent } from './ngx-add-assoc-button.component';

describe('NgxAddAssocButtonComponent', () => {
  let component: NgxAddAssocButtonComponent;
  let fixture: ComponentFixture<NgxAddAssocButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAddAssocButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAddAssocButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
