import { Component, inject, OnInit } from '@angular/core';
import { TaskListService } from '../../shared/services/task-list.service';
import { ITask } from '../../shared/interfaces/itask';
import { take, tap } from 'rxjs';
import { TaskStatusPipe } from '../../shared/pipes/task-status.pipe';

@Component({
  selector: 'tmg-task-list',
  imports: [
    TaskStatusPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  private readonly _taskService:TaskListService = inject(TaskListService);

  tasks:ITask[]=[];


ngOnInit(): void {
  this.getTask();
}


  getTask():void{
    this._taskService.getTasks().pipe(
      take(1),
      tap((data)=>{
        this.tasks = data;
      })
    ).subscribe()
  }

}
