import { Component, OnInit } from '@angular/core';
import { BankServiceService } from 'src/app/service/bank-service.service';

@Component({
  selector: 'app-favourite-banks',
  templateUrl: './favourite-banks.component.html',
  styleUrls: ['./favourite-banks.component.scss']
})
export class FavouriteBanksComponent implements OnInit {

  favouriteBanks:any[] = [];

  constructor(private bankService:BankServiceService) { }

  ngOnInit(): void {
    this.bankService.getFavouriteBanks().subscribe(
      (favouriteBanks)=>{
        this.favouriteBanks = favouriteBanks;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
