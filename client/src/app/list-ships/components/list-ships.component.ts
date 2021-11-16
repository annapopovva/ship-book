import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { CrudService } from '../../shared/services/crud.service';
import { ShipModel } from '../../shared/models/ship';
import { SnackbarMessageAbstract } from '../../shared/abstract/snackbar-message.abstract';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list-ships',
  templateUrl: './list-ships.component.html',
  styleUrls: ['./list-ships.component.scss']
})
export class ListShipsComponent extends SnackbarMessageAbstract implements OnInit {
  public searchShip: string = '';
  public ships: ShipModel[] = [];

  constructor(private crudService: CrudService,
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) { 
                
    super(snackbar);
  }

  ngOnInit(): void {
    this.crudService.getAllShips()
    .subscribe(response => {
      this.ships = response;
      console.log(this.ships)
    });
  }

  public openDeleteDialog(shipId: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result)
        this.deleteShip(shipId);
      }
    });
  }

  public deleteShip(shipId: string) {
    this.crudService.deleteShip(shipId)
    .subscribe(() => {
      this.ships.splice(this.ships.findIndex(s => s._id === shipId), 1);
       // display a message for successfuly deleted ship
       this.openSnackBar('The ship was successfuly deleted!');
       setTimeout( () => {
         this.router.navigate(['/ships']);
       }, 3000);
    });
  }

}
