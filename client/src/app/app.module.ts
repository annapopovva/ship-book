// Components
import { AppComponent } from './app.component';
import { ShipFormComponent } from './ship-form/components/ship-form.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ListShipsComponent } from './list-ships/components/list-ships.component';

// Pipes
import { FilterPipe } from './list-ships/pipes/filter.pipe';

// Services 
import { CrudService } from './shared/services/crud.service';
import { ErrorHandlingService } from './shared/services/error-handling.service';

// Angular Material:
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// Modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HttpClientModule } from '@angular/common/http';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ImageCropperModule } from "ngx-image-cropper";


const materialModules = [
  FlexLayoutModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatIconModule,
  IvyCarouselModule,
  MatTooltipModule
];

const appServices = [
  CrudService,
  ErrorHandlingService
];

@NgModule({
  declarations: [
    AppComponent,
    ShipFormComponent,
    DeleteDialogComponent,
    ListShipsComponent,
    FilterPipe
  ],
  imports: [
    materialModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule
  ],
  providers: [appServices],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
