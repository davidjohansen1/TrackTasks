import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTasksComponent } from './assigned-tasks.component';

describe('AssignedTasksComponent', () => {
  let component: AssignedTasksComponent;
  let fixture: ComponentFixture<AssignedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
