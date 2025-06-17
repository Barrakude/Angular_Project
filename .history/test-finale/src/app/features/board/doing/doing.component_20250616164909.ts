import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { TaskListService } from '../../../shared/services/task-list.service';

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
        this.moveTaskToDone(event.task);
        break;
      case 'back':
        this.moveTaskToTodo(event.task);
        break;
    }
  }

   private moveTaskToDone(task: ITask): void {
    this._taskService.changeTaskStatus(task.id, 'done').subscribe({
      next: () => {
        console.log('Task moved to done');
        this.taskUpdated.emit();
      },
      error: (error) => {
        console.error('Error moving task to done:', error);
      }
    });
  }

  private moveTaskToTodo(task: ITask): void {
    this._taskService.changeTaskStatus(task.id, 'todo').subscribe({
      next: () => {
        console.log('Task moved back to todo');
        this.taskUpdated.emit();
      },
      error: (error) => {
        console.error('Error moving task to todo:', error);
      }
    });
  }
}
