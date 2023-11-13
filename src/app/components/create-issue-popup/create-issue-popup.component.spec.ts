import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssuePopupComponent } from './create-issue-popup.component';

describe('CreateIssuePopupComponent', () => {
  let component: CreateIssuePopupComponent;
  let fixture: ComponentFixture<CreateIssuePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateIssuePopupComponent]
    });
    fixture = TestBed.createComponent(CreateIssuePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
