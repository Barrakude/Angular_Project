import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { TaskListService } from '../../../shared/services/task-list.service';
import { tap } from 'rxjs';

@Component({
  selector: 'tmg-doing',
  imports: [
  TaskCardComponent
  ],
  templateUrl: './doing.component.html',
  styleUrl: './doing.component.scss'
})
export class DoingComponent {
@Input() tasks:ITask[]=[];
@Output() taskUpdated = new EventEmitter();

private readonly _taskService = inject(TaskListService);

    onTaskAction(event: {task: ITask, action: string}): void {
    console.log('Action:', event.action, 'for task:', event.task);
    
    switch(event.action) {
      case 'complete':
        this.setToDone(event.task);
        break;
      case 'back':
        this.setToTodo(event.task);
      case 'delete':
        this.deleteTask(event.task);
        break;
    }
  }

   private setToDone(task: ITask): void {
    this._taskService.changeTaskStatus(task.id, 'done').pipe(
      tap(()=>{
        console.log('task:', task.id, 'spostata in done');
        this.taskUpdated.emit();
      })
    ).subscribe();
  }

  private setToTodo(task: ITask): void {
    this._taskService.changeTaskStatus(task.id, 'todo').pipe(
      tap(()=>{
        console.log('task:', task.id, 'spostata in todo');
        this.taskUpdated.emit();
      })
    ).subscribe();
  }

   private deleteTask(task:ITask):void{
    this._taskService.deleteTask(task.id).pipe(
      tap(()=>{
        console.log('task:', task.id, 'eliminata');
        this.taskUpdated.emit();
      })
    ).subscribe();
  }
}
