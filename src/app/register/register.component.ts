import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {ClientData} from "../Model/ClientData";

@Component
(
  {
    selector:    'app-register',
    styleUrls:  ['./register.component.css'],
    templateUrl: './register.component.html',
  }
)
export class RegisterComponent implements OnInit, OnDestroy
{
  //==========================
  //=      Attributes        =
  //==========================

  clientDataForm  !: ClientData;
  validEmailFormat = false;
  passwordIsValid  = false;
  emailCanBeUsed   = false;
  nameCanBeUsed    = false;
  emailIsValid     = false;
  nameIsValid      = false;


  //==========================
  //=      Constructor       =
  //==========================

  constructor
  (
    private authService   : AuthService,
    private dataService   : DataService,
    private router        : Router
  )
  { }

  ngOnInit(): void
  {
    this.clientDataForm = new ClientData();

    if(!this.dataService.connections)
    {
      this.loadConnections();
    }
  }

  ngOnDestroy(): void
  {
  }

  //==========================
  //=     Form Methods       =
  //==========================

  onSubmit()
  {
    console.log("*** onSubmit() ***")
    this.dataService.createNewClient(this.clientDataForm).subscribe
    (
      data => {
        this.dataService.email = this.clientDataForm.email;
        this.loadClient();

        let url = "/home/account"
        this.router.navigateByUrl(url);
      }
    )
  }

  checkIfNameCanBeUsed()
  {
    this.nameCanBeUsed = !this.dataService.isNickNameAccountAlreadyExist(this.clientDataForm.name.trim().toLowerCase());
  }

  checkIfNameIsValid()
  {
    if(this.clientDataForm.name)
    {
      this.nameIsValid = this.clientDataForm.name.trim().length > 0;
    }
    else
    {
      this.nameIsValid = false;
    }
  }

  checkIfEmailIsValid()
  {
    if(this.clientDataForm.email)
    {
      this.emailIsValid = this.clientDataForm.email.trim().length > 0;
    }
    else
    {
      this.emailIsValid = false;
    }
  }

  checkIfEmailCanBeUsed()
  {
    this.emailCanBeUsed = !this.dataService.isEmailAccountAlreadyExist(this.clientDataForm.email);
  }

  checkEmailFormat()
  {
    if(this.clientDataForm.email!='')
    {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.validEmailFormat = re.test(String(this.clientDataForm.email).toLowerCase())
    }
  }

  checkIfPasswordIsValid()
  {
    if(this.clientDataForm.password)
    {
      this.passwordIsValid = this.clientDataForm.password.trim().length > 0;
    }
    else
    {
      this.passwordIsValid = false;
    }
  }

  checkName()
  {
    this.checkIfNameIsValid();
    if(this.nameIsValid)
    {
      this.checkIfNameCanBeUsed();
    }

  }

  checkEmail()
  {
    this.checkIfEmailIsValid();

    if(this.emailIsValid)
    {
      this.checkEmailFormat();

      if(this.validEmailFormat)
      {
        this.checkIfEmailCanBeUsed();
      }
    }
  }


  //==========================
  //=    Business Methods    =
  //==========================

  loadConnections()
  {
    this.dataService.getAllConnections().subscribe();
  }

  loadClient()
  {
    this.dataService.loadClient();
  }

  navigateToLogin()
  {
    this.router.navigateByUrl("login");
  }
}
