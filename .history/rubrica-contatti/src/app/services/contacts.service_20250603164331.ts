import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../shared/icontact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl = 'http://localhost:3000/contatti';
  
  private _http:HttpClient=inject(HttpClient);

  getContacts():Observable<IContact[]>{
    return this._http.get<IContact[]>(this.baseUrl);
  }
}
