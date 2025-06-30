import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _HttpClient:HttpClient) { }
  createPlayer(form  : any):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/DashBoard/create-player` , form)
     }
       getManOrAdminClubDetails():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/DashBoard/get-Club-Details` )
     }
      getActivePlayers():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/DashBoard/get-Active-Players` )
     }
      getDeletedPlayers():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/DashBoard/get-Deleted-Players` )
     }
     
      getSelectedPlayer(id : number):Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/DashBoard/get-Select-player${id}` )
     }
     
  togglePlayer(Id : number):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/DashBoard/toggle-player`,Id)
     }
     
     updatePlayer(Form :any , id:number):Observable<any>{
  return this._HttpClient.put(`${Environment.baseUrl}/api/Managers/Update-Player${id}`, Form
       );
}

}
