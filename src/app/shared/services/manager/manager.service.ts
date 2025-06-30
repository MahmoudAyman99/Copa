import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _HttpClient:HttpClient) { }

  subscribeAsManager(data  : any):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Subscriper/Join-As-Manager` , data)
     }
  createClub(form  : any):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Managers/create-club` , form)
     }
  
  assignAdmin(email: any): Observable<any> {
  return this._HttpClient.post(`${Environment.baseUrl}/api/Managers/asign-admin`, email);
}
      getActiveAdmins():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Managers/get-Active-Admins` )
     }
      getDeletedAdmins():Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Managers/get-Deleted-Admins` )
     }
      getSelectedAdmin(id : number):Observable<any>{
      return this._HttpClient.get(`${Environment.baseUrl}/api/Managers/get-Select-admin${id}` )
     }

  toggleAdmin(Id : number):Observable<any>{
      return this._HttpClient.post(`${Environment.baseUrl}/api/Managers/toggle-Admin`,Id )
     }

     updateClubLogo(File :FormData):Observable<any>{
  return this._HttpClient.put(`${Environment.baseUrl}/api/Managers/Update-Logo`, File
       );
}
     updateClubShirt(File :FormData):Observable<any>{
  return this._HttpClient.put(`${Environment.baseUrl}/api/Managers/Update-MainShirt`, File
       );
}
     updateClubPicture(File :FormData):Observable<any>{
  return this._HttpClient.put(`${Environment.baseUrl}/api/Managers/Update-ClubPicture`, File
       );
}
     updateClub(Form :any):Observable<any>{
  return this._HttpClient.put(`${Environment.baseUrl}/api/Managers/update-club`, Form
       );
}
  removePlayer(id : number):Observable<any>{
      return this._HttpClient.delete(`${Environment.baseUrl}/api/Managers/remove-player${id}` )
     }
  removeAdmin(id : number):Observable<any>{
      return this._HttpClient.delete(`${Environment.baseUrl}/api/Managers/remove-admin${id}` )
     }

  
}
