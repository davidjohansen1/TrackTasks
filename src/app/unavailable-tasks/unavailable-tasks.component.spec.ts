import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableTasksComponent } from './unavailable-tasks.component';

describe('UnavailableTasksComponent', () => {
  let component: UnavailableTasksComponent;
  let fixture: ComponentFixture<UnavailableTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnavailableTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailableTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
