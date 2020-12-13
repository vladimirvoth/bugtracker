import { FormControl, FormGroup, Validators } from '@angular/forms';

export const ticketForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.maxLength(150)]),
  ticketType: new FormControl('', [Validators.required]),
  priority: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required])
});
