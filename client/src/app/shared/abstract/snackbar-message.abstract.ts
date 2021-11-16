import { MatSnackBar } from '@angular/material/snack-bar';

export abstract class SnackbarMessageAbstract {
    
    constructor(private snackBar: MatSnackBar){}

    // show a message for success or error
    public openSnackBar(message: string) {
        this.snackBar.open(message, ' ', {
        duration: 1800
        });
    }
}