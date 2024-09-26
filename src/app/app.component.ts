import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public formGroup: FormGroup;

  fb = inject(FormBuilder);

  constructor() {
    this.formGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(10)]],
      clave: [
        '',
        [Validators.required, Validators.minLength(6), this.spacesValidator],
      ],
    });

    /*
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    */
  }

  login() {
    console.log(this.formGroup);
    if (this.formGroup.invalid) {
      console.log('INVALIDO!!');
    } else {
      console.log('VALIDO!!!');
    }
  }

  spacesValidator(control: AbstractControl): null | object {
    const valor: string = <string>control.value;
    const tieneEspacios = valor.includes(' ');

    if (tieneEspacios) {
      return {
        espacios: {
          posicion: valor.indexOf(' '),
        },
      };
    }
    return null;
  }
}
