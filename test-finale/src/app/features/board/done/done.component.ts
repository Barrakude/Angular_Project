import { Component, Input } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';

@Component({
  selector: 'tmg-done',
  imports: [
    TaskCardComponent
  ],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss'
})
export class DoneComponent {

  @Input() tasks:ITask[]=[];

   onTaskAction(task: ITask): void {
    // Logica per gestire l'azione del task (es. cambiare stato)
    console.log('Action clicked for task:', task);
  }
}
