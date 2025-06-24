import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse';
import { ITask } from '../interfaces/itask';

export interface ITaskFilters{
  title?:string;
  description?:string;
  status?:string;
}

export interface IPaginationParams {
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  
  private readonly _http:HttpClient=inject(HttpClient);
  private readonly url = 'http://localhost:3000/tasks';

  // getTasks():Observable<ITask[]>{
  //   return this._http.get<IResponse<ITask[]>>(this.url).pipe(
  //     map(({ data }) => data)
  //   );
  // }

  getTasks(pagination?: IPaginationParams, filters:ITaskFilters):Observable<IResponse<ITask[]>>{
    let params = new HttpParams();

    if(pagination){
      params = params.set('_page',pagination.page.toString());
       params = params.set('_limit',pagination.limit.toString());
    }
  }

  deleteTask(id:number):Observable<ITask>{
    return this._http.delete<IResponse<ITask>>(`${this.url}/${id}`).pipe(
      map(({ data }) => data)
    );
  }

  changeTaskStatus(id: number, status: string): Observable<ITask> {
    return this._http.patch<IResponse<ITask>>(`${this.url}/${id}`, { status }).pipe(
      map(({ data }) => data)
    );
  }

  updateTask(id: number, body: ITask): Observable<ITask> {
    return this._http.patch<IResponse<ITask>>(`${this.url}/${id}`, { body }).pipe(
      map(({ data }) => data)
    );
  }

  createTask(body:ITask): Observable<ITask> {
    return this._http.post<IResponse<ITask>>(this.url, body).pipe(
      map(({ data }) => data)
    );
  }

  detailTask(id:number):Observable<ITask>{
    return this._http.get<IResponse<ITask>>(`${this.url}/${id}`).pipe(
      map(({ data }) => data)
    );
  }

}
