import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss']
})
export class EditInputComponent {
  @Input() control: FormControl;
  @Output() focusOut: EventEmitter<number> = new EventEmitter<number>();

  currency = '$';
  editMode = false;

  constructor() {}

  onFocusOut() {
    // this.focusOut.emit(this.data);
    console.log('control', this.control.value);
    this.editMode = false;
  }
}
