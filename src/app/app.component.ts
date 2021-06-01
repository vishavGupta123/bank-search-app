import { Component, OnInit } from '@angular/core';
import { BankServiceService } from './service/bank-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bank-search-application';
  cityName:string="MUMBAI";
  showSpinner:boolean = false;
  showFavouriteBanksBoolean:boolean = false;
  length : number;
  pageSize = 10;
  pageSizeOptions: number[]=[5, 10, 25, 100];
  searchBanks: {ifsc:string, bank_id:string, bank_name:string, branch:string, city:string,
    district:string, state:string}[]=[];
  bankArray:{ifsc:string, bank_id:string, bank_name:string, branch:string, city:string,
  district:string, state:string}[]=[];
  allBankArray:{ifsc:string, bank_id:string, bank_name:string, branch:string, city:string,
  district:string, state:string}[]=[];
  favouriteBanks:any[]=[];
  constructor(private bankService:BankServiceService){

  }

  ngOnInit():void{
    this.bankService.getFavouriteBanks().subscribe(
      (favouriteBanks)=>{
        console.log(favouriteBanks);
        this.favouriteBanks = favouriteBanks;
      },
      (err)=>{
        console.log(err);
      }
    )
    console.log(this.cityName)
    this.showSpinner = true;
    this.bankService.getBanksByCityname(this.cityName).subscribe(
      (banks)=>{
        console.log(banks);
        this.showSpinner = false;
        this.bankArray = banks;
        this.allBankArray = banks;
      },
      (err)=>{
        this.showSpinner = false;
        console.log(err);
      }
    )
  }

  fetchBanksFromCity(event){
    console.log(event);
    this.showSpinner = true;
    this.bankService.getBanksByCityname(this.cityName).subscribe(
      (banks)=>{
        console.log(banks);
        this.showSpinner = false;
        this.bankArray = banks;
        this.allBankArray = banks;
      },
      (err)=>{
        this.showSpinner = false;
        console.log(err);
      }
    )
  }

  searchForBanks(event){
    console.log(event);
    if(event.data != null){
      this.searchBanks = this.allBankArray.filter(bank=> bank.ifsc.includes(event.target.value) || bank.bank_name.includes(event.target.value)||
      bank.branch.includes(event.target.value) || bank.city.includes(event.target.value) || bank.district.includes(event.target.value));
      this.length = this.searchBanks.length;
      this.bankArray = this.searchBanks.slice(0,this.pageSize);
    }
    else if(event.target.value.length===0){
      this.bankArray = this.allBankArray;
    }
  }

  addToFavourite(bank){
    this.bankService.addBank(bank);
  }

  removeFromFavourite(bank){
    this.bankService.removeBank(bank);
  }

  selectFavourite(bank){
    console.log(bank);
    let index;
    index = this.favouriteBanks.findIndex(favouriteBank=>favouriteBank.ifsc === bank.ifsc);
    console.log(index);
    if(index == -1){
      this.favouriteBanks.push(bank);
    }
    else{
      this.favouriteBanks.splice(index,1);
    }
  }

  isFavourite(bank){
    return this.favouriteBanks.some(favouriteBank=> favouriteBank.ifsc == bank.ifsc);
  }

  showFavouriteBanks(){
    this.showFavouriteBanksBoolean = !this.showFavouriteBanksBoolean;
  }

  changePage(event){
    console.log(event);
    this.pageSize = event.pageSize;
    if(event.previousPageIndex < event.pageIndex){
      this.bankArray = this.searchBanks.slice((event.previousPageIndex+1)*this.pageSize,(event.pageIndex+1)*this.pageSize);
    }
    else {
      this.bankArray = this.searchBanks.slice((event.pageIndex)*this.pageSize,(event.previousPageIndex)*this.pageSize);
    }
  }


}
