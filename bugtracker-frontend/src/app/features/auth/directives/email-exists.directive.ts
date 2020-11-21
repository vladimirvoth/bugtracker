import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[emailExists]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailExistsDirective),
      multi: true
    }
  ],
  host: {
    '(keyup)': 'validate($event)',
    '(change)': 'validate($event)'
  }
})
export class EmailExistsDirective implements Validator {
  constructor(private authService: AuthService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.emailExists(control).pipe(
      map((resp) => {
        return resp.emailExists === false
          ? null
          : {
              emailExists: true
            };
      })
    );
  }
}
