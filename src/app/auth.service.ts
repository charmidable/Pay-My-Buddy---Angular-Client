import {EventEmitter, Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {DataService} from "./data.service";

@Injectable
(
  {
    providedIn: 'root'
  }
)
export class AuthService
{
  //==========================
  //=      Attributes        =
  //==========================

  isAuthenticated: boolean = false;
  authentificationResultEvent = new EventEmitter<boolean>();


  //==========================
  //=      Constructor       =
  //==========================

  constructor(private dataService: DataService)
  {

  }


  //==========================
  //=    business methods    =
  //==========================

  authenticate(email: string, password: string)
  {
    this.dataService.validateUser(email, password).subscribe
    (
      next => {
                    this.isAuthenticated = true;
                    this.authentificationResultEvent.emit(true);
                  },
      error => {
                      this.isAuthenticated = false;
                      this.authentificationResultEvent.emit(false);
                    }
    )
  }
}
