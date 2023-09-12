import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UIHelperService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }


  /**
   * Shows a snackbar message.
   * @param message
   */
  showSnackBarMessage(message: string) {
    this.snackBar.open(
      message,
      'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000
      }
    );
  }

  /**
   * Combines non-null or array objects with length and turns them into http parameters.
   * @param req
   */
  createRequestOptionMultipleWithoutNull = (...req: any[]): HttpParams => {
    let orgOptions = this.mergeOptions(...req);

    orgOptions = Object.keys(orgOptions).reduce((p: any, c: string) => {
      if (!(this.isNullOrUndefined(orgOptions[c]) || (Array.isArray(orgOptions[c]) && orgOptions[c].length === 0))) {
        p[c] = orgOptions[c];
      }
      return p;
    }, {});

    return this.createRequestOption(orgOptions);
  };


  /**
   * Returns true if the entered value is null or undefined
   * @param value
   */
  isNullOrUndefined = (value: any): boolean => {
    return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
  };


  /**
   * Creates http parameters from the entered object.
   * @param req
   */
  createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();

    // If the entered value is not null or undefined, it is added to the options.
    if (req) {
      Object.keys(req).forEach(key => {
        if (!this.isNullOrUndefined(req[key]) && !this.isEmptyArray(req[key]) && key !== 'sort') {
          options = options.set(key, req[key]);
        }
      });

      // If the entered value is an array, it is added to the options.
      if (req.sort) {
        req.sort.forEach((val: string) => {
          options = options.append('sort', val);
        });
      }
    }

    return options;
  };


  /**
   * Returns true if the entered value is an empty array.
   * @param arr
   */
  isEmptyArray = (arr: any): boolean => Array.isArray(arr) && arr.length <= 0;

  /**
   * Combines entities
   * @param req
   */
  mergeOptions = (...req: any[]): any => {
    return Object.assign({}, ...req);
  };


}
