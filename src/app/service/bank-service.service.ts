import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

let banks = JSON.parse(localStorage.getItem("favouritebanks")) || [];

@Injectable({
  providedIn: 'root'
})
export class BankServiceService {

  URL = `https://vast-shore-74260.herokuapp.com/banks`;
  public favouriteBanks: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public responseCache = new Map();

  constructor(private httpClient:HttpClient) { }

  public getFavouriteBanks(): Observable<any>{
    const itemsStream = new Observable(observer=>{
      observer.next(banks);
      observer.complete();
    });
    return <Observable<any[]>> itemsStream;
  }

  public addBank(bank){
    banks.push(bank);
    localStorage.setItem("favouritebanks",JSON.stringify(banks));
  }

  public removeBank(bank){
    let index;
    index = banks.findIndex(b =>b.ifsc == bank.ifsc);
    if(index!=-1){
      banks.splice(index,1);
      localStorage.setItem("favouritebanks",JSON.stringify(banks));
    }
  }

  public getBanksByCityname(cityname:string):Observable<any>{
    const banksCached = this.responseCache.get(`${this.URL}?city=${cityname}`);
    if(banksCached){
      return of(banksCached);
    }
    const response = this.httpClient.get<any>(`${this.URL}?city=${cityname}`);
    response.subscribe(banks=>this.responseCache.set(`${this.URL}?city=${cityname}`,banks));
   return response;
  }
}
