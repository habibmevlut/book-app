import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorUpdateDialogComponent } from './author-update-dialog.component';

describe('AuthorUdateDialogComponent', () => {
  let component: AuthorUpdateDialogComponent;
  let fixture: ComponentFixture<AuthorUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorUpdateDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
