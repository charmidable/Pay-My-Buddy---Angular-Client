import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Client} from "../Model/Client";
import {DataService} from "../data.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit
{

  public navigation !: string;
  client            !: Client;


  constructor(
              private router:Router,
              private dataService : DataService
             ) { }

  ngOnInit(): void
  {
    this.dataService.getClient(1).subscribe
    (
  next => {
                  console.log(next.name);
                  console.log(next.id);
                  console.log(next.accountId);
               }
    )
    this.client = this.dataService.client;
  }

  navigateToTransfert()
  {
    this.router.navigateByUrl("home/transfert");
    this.navigation = "Transfert";
  }

  navigateToAccount()
  {
    this.router.navigateByUrl("home/account");
    this.navigation = "Account";
  }
}
