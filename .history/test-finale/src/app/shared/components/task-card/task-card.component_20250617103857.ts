import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../interfaces/itask';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'tmg-task-card',
  imports: [TitleCasePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: ITask;
  @Output() actionClick = new EventEmitter<{ task: ITask; action: string }>();

  onActionClick1(): void {
    const action = this.task.status === 'todo' ? 'start' : 'complete';
    this.actionClick.emit({ task: this.task, action });
  }

  onActionClick2(): void {
    this.actionClick.emit({ task: this.task, action: 'back' });
  }

  getActionButtonText(): string {
    switch (this.task.status) {
      case 'todo':
        return 'Inizia';
      case 'doing':
        return 'Completa';
      default:
        return 'Azione';
    }
  }

  getSecondActionButtonText(): string {
    return 'Sposta a Todo';
  }

  getActionButtonClass(): string {
    switch (this.task.status) {
      case 'todo':
        return 'btn btn-primary';
      case 'doing':
        return 'btn btn-warning';
      default:
        return 'btn btn-primary';
    }
  }

  getSecondActionButtonClass(): string {
    return 'btn btn-secondary';
  }

  deleteActionButton(): void {
    this.actionClick.emit({ task: this.task, action: 'delete' });
  }
}
