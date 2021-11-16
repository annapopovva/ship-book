// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { ShipFormComponent } from './ship-form/components/ship-form.component';
import { ListShipsComponent } from './list-ships/components/list-ships.component';


const routes: Routes = [
  { path: 'create', component: ShipFormComponent },
  { path: 'edit/:id', component: ShipFormComponent },
  { path: 'ships', component: ListShipsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'ships' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
