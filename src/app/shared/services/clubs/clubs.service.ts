import { Environment } from '../../../base/Environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

   constructor(private _HttpClient :HttpClient) { }

   getHomeClubs():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/Home/get-clubs-home`)
   }
   getClubsPage():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/Home/get-clubs-page`)
   }
  getClubDetails(id: number): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Users/get-club-details${id}`
    );
  }
  getPlayersOfClubDetails(id: number): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Users/get-clubPlayers-For-Clubdetails${id}`
    );
  } 
  getManagerOfClubDetails(id: number): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Users/get-Manager-For-Clubdetails${id}`
    );
  } 
  
  }
