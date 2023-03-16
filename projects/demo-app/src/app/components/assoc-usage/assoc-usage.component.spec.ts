import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocUsageComponent } from './assoc-usage.component';

describe('AssocUsageComponent', () => {
  let component: AssocUsageComponent;
  let fixture: ComponentFixture<AssocUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssocUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssocUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
