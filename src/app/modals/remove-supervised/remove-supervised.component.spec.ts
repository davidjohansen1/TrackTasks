import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSupervisedComponent } from './remove-supervised.component';

describe('RemoveSupervisedComponent', () => {
  let component: RemoveSupervisedComponent;
  let fixture: ComponentFixture<RemoveSupervisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSupervisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSupervisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
