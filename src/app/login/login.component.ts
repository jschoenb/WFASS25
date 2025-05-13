import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'bs-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{
  loginForm :FormGroup;

  constructor(private fb:FormBuilder,
              private router: Router,
              private authService: AuthenticationService
              ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  login(){
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe(
      (res:any) =>{
        console.log(res);
      }
    )
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }
}
