import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUpdateDialogComponent } from './category-update-dialog.component';

describe('CategoryUpdateDialogComponent', () => {
  let component: CategoryUpdateDialogComponent;
  let fixture: ComponentFixture<CategoryUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryUpdateDialogComponent]
    });
    fixture = TestBed.createComponent(CategoryUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
