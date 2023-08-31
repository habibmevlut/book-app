import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { ICategory, NewCategory } from '../category.model';
import { CategoryService } from '../service/category.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category-update-dialog',
  templateUrl: './category-update-dialog.component.html',
  styleUrls: ['./category-update-dialog.component.scss']
})
export class CategoryUpdateDialogComponent implements OnInit {

  isSaving: boolean = false;
  creatAndEditCategoryForm: FormGroup | undefined;
  categoryData: ICategory | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CategoryUpdateDialogComponent>,
    private categoryService: CategoryService,
    private uiHelperService: UIHelperService,
    @Inject(MAT_DIALOG_DATA) data: { category: ICategory },
  ) {
    this.categoryData = data.category;
  }

  ngOnInit() {
    this.initForm();
  }

  save() {
    if (this.creatAndEditCategoryForm?.invalid || this.isSaving) {
      return;
    }
    this.isSaving = true;
    const categoryFormData = this.creatAndEditCategoryForm?.getRawValue() as ICategory | NewCategory;

    if (categoryFormData.id) {
      this.categoryService.update(categoryFormData)
        .pipe(finalize(() => (this.isSaving = false)))
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.dialogRef.close(res.body);
              this.uiHelperService.showSnackBarMessage('Category updated successfully')
            }
          },
          error: () => {
            this.isSaving = false;
            this.uiHelperService.showSnackBarMessage('Error while updating color');
          }
        });
    } else {
      this.categoryService.create(categoryFormData as NewCategory)
        .pipe(finalize(() => (this.isSaving = false)))
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.dialogRef.close(res.body);
              this.uiHelperService.showSnackBarMessage('Category saved successfully');
            }
          },
          error: () => {
            this.isSaving = false;
            this.uiHelperService.showSnackBarMessage('Error while saving color');
          },
        });
    }
  }


  private initForm(): void {
    this.creatAndEditCategoryForm = this.formBuilder.group({
      id: new FormControl(this.categoryData?.id ? this.categoryData.id : null),
      name: new FormControl(this.categoryData?.name ? this.categoryData.name : null, [Validators.required]),
      code: new FormControl(this.categoryData?.code ? this.categoryData.code : null, [Validators.required]),
      description: new FormControl(this.categoryData?.description ? this.categoryData.description : null,),
    });
  }
}
