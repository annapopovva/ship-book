import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { SnackbarMessageAbstract } from '../abstract/snackbar-message.abstract';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService extends SnackbarMessageAbstract {
  private errorMessage!: string;

  constructor(private snackbar: MatSnackBar) {
    super(snackbar);
  }

  public handleError = (errorRes: HttpErrorResponse) => {
      if(errorRes.error instanceof ErrorEvent) {
        this.errorMessage = errorRes.error.message;
        this.openSnackBar(this.errorMessage);
      }
      else {
        this.getServerErrorMessage(errorRes.error);
        console.log(errorRes.error)
      }
    return throwError(this.errorMessage);
  };

  private getServerErrorMessage(errorRes: HttpErrorResponse) {
    if (!errorRes.error || !errorRes.error.error) {
      this.errorMessage = 'An unknown error occurred';
      return throwError(this.errorMessage);
    }
    else if (errorRes.error.error.message == 'EMAIL_EXISTS') {
        this.errorMessage = 'This email already exists!';
        return this.openSnackBar(this.errorMessage);
    }
    switch (errorRes.status) {
      case 404: {
        this.errorMessage = `Not Found: ${errorRes.message}`;
        return this.openSnackBar(this.errorMessage);
      }
      case 403: {
        this.errorMessage = `Access Denied: ${errorRes.message}`;
        return this.openSnackBar(this.errorMessage);
      }
      case 500: {
        this.errorMessage = `Internal Server Error: ${errorRes.message}`;
        return this.openSnackBar(this.errorMessage);
      }
      default: {
        this.errorMessage = `Unknown Server Error: ${errorRes.message}`;
        return this.openSnackBar(this.errorMessage);
      }
    }
  }
}
