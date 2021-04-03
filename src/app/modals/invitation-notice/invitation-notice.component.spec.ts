import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationNoticeComponent } from './invitation-notice.component';

describe('InvitationNoticeComponent', () => {
  let component: InvitationNoticeComponent;
  let fixture: ComponentFixture<InvitationNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
