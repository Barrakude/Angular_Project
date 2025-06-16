import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse';
import { ITask } from '../interfaces/itask';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  
  private readonly _http:HttpClient=inject(HttpClient);
  private readonly url = 'http://localhost:3000/tasks';

  getTasks():Observable<ITask[]>{
    return this._http.get<IResponse<ITask[]>>(this.url).pipe(
      map(({ data }) => data)
    );
  }

  deleteTask(id:number):Observable<ITask>{
    return this._http.delete<IResponse<ITask>>(`${this.url}/${id}`).pipe(
      map(({ data }) => data)
    );
  }
}
