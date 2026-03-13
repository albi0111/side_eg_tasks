import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() bike: any = {};
  @Output() addToFavourites: EventEmitter<string> = new EventEmitter<string>();

  addBikeToFavourites(value: string) {
    this.addToFavourites.emit(value);
  }
}
