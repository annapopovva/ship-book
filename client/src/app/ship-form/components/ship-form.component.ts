import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { even, RxwebValidators } from '@rxweb/reactive-form-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { base64ToFile } from 'ngx-image-cropper';

import { CrudService } from '../../shared/services/crud.service';
import { SnackbarMessageAbstract } from 'src/app/shared/abstract/snackbar-message.abstract';
import { Ship } from '../models/ship-data';
import { ValidateEmail } from '../validators/email.validator';
import { ValidateImo } from '../validators/imo.validator';

@Component({
  selector: 'app-ship-form',
  templateUrl: './ship-form.component.html',
  styleUrls: ['./ship-form.component.scss']
})
export class ShipFormComponent extends SnackbarMessageAbstract implements OnInit {
  public ship: any = new Ship();
  public addedPictures: any[] = [];
  public showCarousel: boolean = false;
  private formData: FormData = new FormData();

  public shipForm: FormGroup = this.formBuilder.group({
    name: ['', [RxwebValidators.required(), RxwebValidators.minLength({value: 3 })] ],
    imo: ['', [RxwebValidators.required(), ValidateImo]],
    type: ['', RxwebValidators.required() ],
    owner: ['', [RxwebValidators.required(), RxwebValidators.minLength({value: 3 })] ],
    email: ['', [RxwebValidators.required(), RxwebValidators.email(), ValidateEmail] ],
    pictures: ['', RxwebValidators.required() ] 
  });

  constructor(private router: Router, 
              private formBuilder: FormBuilder, 
              private crudService: CrudService, 
              private route: ActivatedRoute,
              private snackbar: MatSnackBar) {
      super(snackbar);

    //var test = this.shipForm?.addAsyncValidators()??
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.crudService.getShipById(id)
      .subscribe(response => {
        this.ship = response;
        this.buildForm();
      });
    }

  }

  //initialize a form
  private buildForm(): void {
    this.shipForm = this.formBuilder.group({
      name: [this.ship.name, [RxwebValidators.required(), RxwebValidators.minLength({value: 3 })] ],
      imo: [this.ship.imo, [RxwebValidators.required(), ValidateImo] ],
      type: [this.ship.type, RxwebValidators.required() ],
      owner: [this.ship.owner, [RxwebValidators.required(), RxwebValidators.minLength({value: 3 })] ],
      email: [this.ship.email, [RxwebValidators.required(), ValidateEmail] ] ,
      pictures: [this.ship.pictures, RxwebValidators.required() ]
    });
  }

  public onUploadPictures(picture: Event) {
    const files: FileList = (picture.target as HTMLInputElement).files;

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.shipForm.patchValue({ pictures: element });

      // show uploaded image immediately 
      const reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (event) => {
        this.showCarousel = true;
        this.addedPictures.push({ path: event.target.result });
      }
    }
  }

  public onDeletePicture(event: Event, index: number) {
    if (event.target instanceof HTMLElement) {
      event.target.remove();
    }
    this.addedPictures.map(picture => {
     let pictureFile  = base64ToFile(picture)
     console.log(pictureFile)
    })
    console.log(this.addedPictures, 'before')
    
  }

  public submitForm() {
    if (this.shipForm.invalid) {
      this.openSnackBar('Invalid form. Please enter all the fields correctly!');
      return;
    }

    // passing the entered data to the formData that will be send
    const { name, imo, type, owner, email, pictures } = this.shipForm.value;
    this.formData.append('name', name);
    this.formData.append('imo', imo);
    this.formData.append('type', type);
    this.formData.append('owner', owner);
    this.formData.append('email', email);
    this.formData.append('pictures', pictures)

    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
    //  console.log(['name','imo', 'type', 'owner', 'email', 'pictures'].map(x => this.formData.get(x)), "formData");
      this.crudService.updateShipData(id, this.formData)
      .subscribe(() => {
        this.router.navigate(['/ships']);
        this.shipForm.reset();
        this.openSnackBar('Your information was successfuly updated!');
      });
    }
    else {
      this.crudService.createShip(this.formData)
      .subscribe(() => {
        this.router.navigate(['/ships']);
        this.shipForm.reset();
        this.openSnackBar('Your ship was successfuly created!');
      });
    }
    
  }

}
