import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { TaskService } from '../../../shared/services/task.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'tmg-done',
  imports: [TaskCardComponent],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss',
})
export class DoneComponent {
  @Input() tasks: ITask[] = [];
  @Output() taskUpdated = new EventEmitter<void>();

  constructor(private readonly _taskService: TaskService) {}

  onTaskAction(task: ITask): void {
    // Logica per gestire l'azione del task (es. cambiare stato)
    console.log('Action clicked for task:', task);
    this.deleteTask(event);
  }

  private deleteTask(task: ITask): void {
    this._taskService
      .deleteTask(task.id)
      .pipe(
        tap(() => {
          console.log('task:', task.id, 'eliminata');
          this.taskUpdated.emit(); // Assicurati che questo sia presente
        })
      )
      .subscribe();
  }
}
