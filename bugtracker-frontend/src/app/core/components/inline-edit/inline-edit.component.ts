import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { editorConfig } from '../../../../assets/config/config.angular-editor';

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
  editorConfig = editorConfig;
  editMode = false;

  constructor() {}

  onFocusOut() {
    this.focusOut.emit(this.control.value);
    this.editMode = false;
  }

  // @Todo: Move into a directive
  matchSelectTypeValue(value) {
    const item = this.selectItems.find((item) => item.key === value);
    if (item && item.value) {
      return item.value;
    } else {
      return value;
    }
  }
}
