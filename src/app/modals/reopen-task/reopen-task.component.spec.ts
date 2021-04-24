import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenTaskComponent } from './reopen-task.component';

describe('ReopenTaskComponent', () => {
  let component: ReopenTaskComponent;
  let fixture: ComponentFixture<ReopenTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReopenTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
