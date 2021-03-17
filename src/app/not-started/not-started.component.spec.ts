import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotStartedComponent } from './not-started.component';

describe('NotStartedComponent', () => {
  let component: NotStartedComponent;
  let fixture: ComponentFixture<NotStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotStartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
