import { Component, Input } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';

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

   onTaskAction(task: ITask): void {
    // Logica per gestire l'azione del task (es. cambiare stato)
    console.log('Action clicked for task:', task);
  }
}
