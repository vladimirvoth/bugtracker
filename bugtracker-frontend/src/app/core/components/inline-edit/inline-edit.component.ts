import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent {
  @Input() control: FormControl;
  @Input() type?: 'text' | 'editor' | 'select' = 'text';
  @Input() selectItems?;
  @Output() focusOut = new EventEmitter();

  faPencilAlt = faPencilAlt;
  editMode = false;

  constructor() {}

  onFocusOut() {
    this.focusOut.emit(this.control.value);
    this.editMode = false;
  }
}
