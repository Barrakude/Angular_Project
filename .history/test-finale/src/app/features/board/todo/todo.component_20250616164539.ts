import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { TaskListService } from '../../../shared/services/task-list.service';
import { tap } from 'rxjs';

@Component({
  selector: 'tmg-todo',
  imports: [
    TaskCardComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() tasks:ITask[]=[];
  @Output() taskUpdated = new EventEmitter<void>();

  private readonly _taskService = inject(TaskListService);

   onTaskAction(event: {task: ITask, action: string}): void {
    console.log('Action:', event.action, 'for task:', event.task);
    // Gestisci le diverse azioni basate su event.action
    switch(event.action) {
      case 'start':
        this.setToDoing(event.task);
        break;
    }
  }

  private setToDoing(task:ITask):void{
    this._taskService.changeTaskStatus(task.id, 'doing').pipe(
      tap(()=>{
        console.log('task:', task.id, 'spostata a doing');
        this.taskUpdated.emit();
      })
    ).subscribe();
  }
}
