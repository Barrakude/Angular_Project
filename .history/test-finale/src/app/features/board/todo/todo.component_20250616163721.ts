import { Component, inject, Input } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { TaskListService } from '../../../shared/services/task-list.service';

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

  private readonly _taskService = inject(TaskListService);

   onTaskAction(event: {task: ITask, action: string}): void {
    console.log('Action:', event.action, 'for task:', event.task);
    // Gestisci le diverse azioni basate su event.action
    switch(event.action) {
      case 'start':
        // Logica per iniziare il task
        break;
      case 'complete':
        // Logica per completare il task
        break;
      case 'back':
        // Logica per tornare indietro
        break;
    }
  }
}
