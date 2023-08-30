import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorUdateDialogComponent } from './author-udate-dialog.component';

describe('AuthorUdateDialogComponent', () => {
  let component: AuthorUdateDialogComponent;
  let fixture: ComponentFixture<AuthorUdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorUdateDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorUdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
