import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnotherApiService {

    constructor(private _HttpClient:HttpClient) { }

      getPositionOfPlayer():Observable<any>{
          return this._HttpClient.get(`${Environment.baseUrl}/api/ATest/Get-Positions-As-SelectListItem` )
         }

}
