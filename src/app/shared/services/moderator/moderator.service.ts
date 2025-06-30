import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  constructor(private _HttpClient:HttpClient) { }

  getAllClubs():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-All-Clubs` )
     }
  getAllUsers():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-All-Users` )
     }
  getAllAdmins():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-All-Admins` )
     }
  getBlockedUsers():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-Blocked-Users` )
     }
  getCount():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-Count` )
     }
  getActiveFreePlayers():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-Active-FreePlayers` )
     }
  getBinnedFreePlayers():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-Binned-FreePlayers` )
     }
  getSelectedPlayer(id :number):Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Moderator/Get-Selected-Binned-FreePlayer${id}` )
     }
  toggleUser(id : string):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Moderator/Toggle-User${id}` ,id )
     }
  blockUser(id : string):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Moderator/Block-User${id}` ,id )
     }
  resetPasswordToUser(id : string):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Moderator/Reset-Password${id}` ,id )
     }
  acceptPlayer(id : number):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Moderator/Accept-Player${id}` ,id )
     }
  rejectPlayer(id : number):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Moderator/Decline-Player${id}` ,id )
     }
}
