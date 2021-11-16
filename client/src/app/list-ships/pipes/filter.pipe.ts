import { Pipe, PipeTransform } from '@angular/core';
import { ShipModel } from 'src/app/shared/models/ship';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ships: ShipModel[], searchShip: string): any[] {
    if(!ships || !searchShip) {
      return ships;
    }

    searchShip = searchShip.toLocaleLowerCase();

    return ships.filter(ship => 
        ship.name.toLocaleLowerCase().includes(searchShip) || ship.imo.toLocaleLowerCase().includes(searchShip)
    );
  }

}
