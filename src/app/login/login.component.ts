import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  password  !: string
  message    : string = "";
  email     !: string;


  constructor(private authService: AuthService) { }

  ngOnInit(): void
  {
  }


  onSubmit()
  {
    if( this.authService.authenticate(this.email, this.password) )
    {
      // navigation
    }
    else
    {
      this.message = "Your username or password was not recognized - try again";
    }
  }

}
