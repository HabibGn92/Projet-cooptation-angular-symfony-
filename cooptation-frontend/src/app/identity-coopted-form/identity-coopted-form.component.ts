
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-identity-coopted-form',
  templateUrl: './identity-coopted-form.component.html',
  styleUrls: ['./identity-coopted-form.component.css']
})
export class IdentityCooptedFormComponent implements OnInit {

  angForm: FormGroup | any;

  constructor(private fb: FormBuilder) {

    this.createForm();}

  ngOnInit(): void {
  }
  createForm() {
    this.angForm = this.fb.group({
       civility : ['', [Validators.required ]],
       username: ['', [Validators.required ]],
       lastname: ['', [Validators.required ]],
       email: ['', [Validators.required ,  Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
       phone: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(8),Validators.pattern("^\\d{0,9}$")]  ],
       cv: ['', [Validators.required ]],
      });

      }


}
 
