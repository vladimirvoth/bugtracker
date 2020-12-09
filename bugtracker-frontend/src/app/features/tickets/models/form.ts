import { FormControl, FormGroup, Validators } from '@angular/forms';

export const ticketForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.maxLength(150)]),
  description: new FormControl('', [Validators.required]),
  files: new FormControl('', [Validators.maxLength(150)]),
  tags: new FormControl('', [Validators.maxLength(150)])
});
