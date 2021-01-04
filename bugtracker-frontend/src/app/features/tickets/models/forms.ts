import { FormControl, FormGroup, Validators } from '@angular/forms';

export const newTicketForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.maxLength(150)]),
  type: new FormControl('', [Validators.required]),
  priority: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required])
});

export const updateTicketForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.maxLength(150)]),
  type: new FormControl('', [Validators.required]),
  priority: new FormControl('', [Validators.required]),
  status: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required])
});

export const commentForm = new FormGroup({
  comment: new FormControl('', [Validators.required])
});
