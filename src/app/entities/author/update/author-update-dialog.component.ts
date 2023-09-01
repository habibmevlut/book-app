import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { finalize } from 'rxjs';
import { AuthorService } from '../service/author.service';
import { IAuthor, NewAuthor } from '../author.model';

@Component({
  selector: 'app-author-update-dialog',
  templateUrl: './author-update-dialog.component.html',
  styleUrls: ['./author-update-dialog.component.scss']
})
export class AuthorUpdateDialogComponent implements OnInit {

  isSaving: boolean = false;
  creatAndEditAuthorForm: FormGroup | undefined;
  authorData: IAuthor | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private dialogRef: MatDialogRef<AuthorUpdateDialogComponent>,
    private uiHelperService: UIHelperService,
    @Inject(MAT_DIALOG_DATA) data: { author: IAuthor },
  ) {
    this.authorData = data.author;
  }

  ngOnInit() {
    this.initForm();
  }

  save() {
    if (this.creatAndEditAuthorForm?.invalid || this.isSaving) {
      return;
    }
    this.isSaving = true;
    const authorFormData = this.creatAndEditAuthorForm?.getRawValue() as IAuthor | NewAuthor;

    if (authorFormData.id) {
      this.authorService.update(authorFormData)
        .pipe(finalize(() => (this.isSaving = false)))
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.dialogRef.close(res.body);
              this.uiHelperService.showSnackBarMessage('Author updated successfully')
            }
          },
          error: () => {
            this.isSaving = false;
            this.uiHelperService.showSnackBarMessage('Error while updating author');
          }
        });
    } else {
      this.authorService.create(authorFormData as NewAuthor)
        .pipe(finalize(() => (this.isSaving = false)))
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.dialogRef.close(res.body);
              this.uiHelperService.showSnackBarMessage('Author saved successfully');
            }
          },
          error: () => {
            this.isSaving = false;
            this.uiHelperService.showSnackBarMessage('Error while saving author');
          },
        });
    }
  }

  private initForm(): void {
    this.creatAndEditAuthorForm = this.formBuilder.group({
      id: new FormControl(this.authorData?.id ?? null),
      name: new FormControl(this.authorData?.name ?? null, [Validators.required]),
      surname: new FormControl(this.authorData?.surname ?? null, [Validators.required]),
      profileImage: new FormControl(this.authorData?.profileImage ?? null),
    });
  }
}
