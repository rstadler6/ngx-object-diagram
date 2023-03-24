import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxObjectDiagramAssocFieldComponent } from './ngx-object-diagram-assoc-field.component';

describe('NgxObjectDiagramAssocFieldComponent', () => {
  let component: NgxObjectDiagramAssocFieldComponent;
  let fixture: ComponentFixture<NgxObjectDiagramAssocFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxObjectDiagramAssocFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxObjectDiagramAssocFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
