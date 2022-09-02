import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginUserComponent implements OnInit {

 
  loginForm!: FormGroup;
  submitted = false;
  error!:boolean;

  constructor(private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
) { }

  ngOnInit() {
    if (this.AuthService.isAuthenticated()) {
      this.router.navigateByUrl('cooptation-list');
    }
      this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          password: ['', [Validators.required]],
      });
      this.error=false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

 onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
    return;
}
this.AuthService.login(this.loginForm.value).subscribe(

  response => {

    if(response.token){

      localStorage.setItem('jwt', JSON.stringify(response));

      this.router.navigateByUrl('cooptation-list');

    }

  },() => {

    this.error = true;

  }

);}}