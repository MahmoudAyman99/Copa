import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';
import { UpdatePassword } from '../../interfaces/update-password';
import { Address } from '../../interfaces/address';
import { UpdateName } from '../../interfaces/update-name';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   constructor(private _HttpClient :HttpClient) { }

   getUserData(): Observable<any> {
       return this._HttpClient.get(`${Environment.baseUrl}/api/Users/View-User-profile`
       );
}
updateUserPassword(Data: UpdatePassword):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}/api/Users/Update-password`, Data
       );
}
updateUserPhone(phoneNumber: string): Observable<any> {
  return this._HttpClient.post(
    `${Environment.baseUrl}/api/Users/Update-Phone`,
    JSON.stringify(phoneNumber), 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

modifyUserAddress(Address: Address):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}/api/Users/Modify-address`, Address
       );
}
updateUserName(Name: UpdateName):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}/api/Users/Update-Name`, Name
       );
}
updateUserPicture(picture :FormData):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}/api/Users/Update-Picture`, picture
       );
}
}
