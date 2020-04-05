import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {APIResponse} from '../Interfaces/API_Response';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private userServise: UserService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      "username": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
    });
  }

  isError: boolean = false;
  errorText: string;

  login(loginForm) {
    console.log(loginForm);
    this.isError = false;
    this.userServise.loginUser(loginForm.username, loginForm.password)
      .subscribe((response: any) => {
        if(response) {
          if(response.success === false) {
            this.isError = true;
            this.errorText = response.message;
          } else {
            localStorage.setItem("token", response.token);
            this.router.navigate(['/'])
          }
        }
      })
  }

  ngOnInit() {
  }

}
