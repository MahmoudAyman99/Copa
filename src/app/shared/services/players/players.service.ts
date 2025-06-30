import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private _HttpClient :HttpClient) { }


  subscribeAsFreePlayer(data  : any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Subscriper/Join-as-player` , data)
  }
  getSuccessPlayers():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Home/get-successStories`)
  }
  getClubPlayersHome():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Home/get-club-players-home`)
  }
  getClubPlayersPage():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Home/get-club-players-home`)
  }
  getFreePlayersHome():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Home/get-free-players-home`)
  }
  getFreePlayersPage():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Home/get-Free-Players-Page`)
  }
  getPlayerDetails(id : number):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Users/get-player${id}`)
  }

  getPlayerData():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/Player/Get-Player-Data`)
  }
  updatePlayerPicture(picture :FormData):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}/api/Player/Update-Player-Picture`, picture
       );
}
  updatePlayerVideo(video :FormData):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}/api/Player/Update-Player-Video`, video
       );
}
  updatePlayerData(data :any):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}/api/Player/Update-Player-Data`, data
       );
}
}
