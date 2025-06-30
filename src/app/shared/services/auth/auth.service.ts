import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Register} from '../../interfaces/register';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../../interfaces/login';
import { jwtDecode } from 'jwt-decode';
import { Verify } from '../../interfaces/verify';
import { ResetPassword } from '../../interfaces/reset-password';
import { Router } from '@angular/router';
import { ContactUs } from '../../interfaces/contact-us';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserData:BehaviorSubject<any>= new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient ,private _Router :Router) {
 
    if(typeof localStorage !== "undefined"){
        if(localStorage.getItem("userToken") !== null){
          this.decodeUserData();
          _Router.navigate([localStorage.getItem("currentPage")])
        }
      }
   }

   sendRegister(userData :Register):Observable<any>
   {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/register`,userData )
   }

   login(userData : Login):Observable<any>
   {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/get-token`,userData)
   }
   verify(data : Verify):Observable<any>
   {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/confirm-email`,data)
   }

   resend(email: string): Observable<any> {
    const body = {email};
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/request-new-code`, body);
  }
  sendEmailForgetPassword(email: string): Observable<any> {
    const body = { email };
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/send-forgetpassword-code`, body);
  }
  sendCodeForgetPassword(data: Verify): Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/confirm-forgetpassword-code`, data, 
  );
  }
  
  resetDataAfterConfirm(data : ResetPassword): Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/reset-password-after-Confirmation`, data);
  }

  sendMessage(data : ContactUs):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}/api/Auth/Contact-Us` , data)
     }
  
  

  decodeUserData(){
    // get token 
    let token = localStorage.getItem("userToken")

    // decode
    this.UserData.next(jwtDecode(JSON.stringify(token))) 
    
  }


}
