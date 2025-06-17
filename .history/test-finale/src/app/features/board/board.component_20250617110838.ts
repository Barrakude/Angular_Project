import { Component, inject, OnInit } from '@angular/core';
import { DoingComponent } from './doing/doing.component';
import { DoneComponent } from './done/done.component';
import { TodoComponent } from './todo/todo.component';
import { ITask } from '../../shared/interfaces/itask';
import { TaskListService } from '../../shared/services/task-list.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'tmg-board',
  imports: [TodoComponent, DoneComponent, DoingComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  private readonly _taskService: TaskListService = inject(TaskListService);

  activeTab: string = 'todo';
  tasks: ITask[] = [];

  ngOnInit(): void {
    this.getTaskList();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getTaskList() {
    this._taskService
      .getTasks()
      .pipe(
        take(1),
        map((data) => {
          this.tasks = data;
          console.log(this.tasks);
        })
      )
      .subscribe();
  }

  onTaskUpdated(): void {
    this.getTaskList();
  }

  get todoTasks(): ITask[] {
    return this.tasks.filter((task) => task.status === 'todo');
  }

  get doingTasks(): ITask[] {
    return this.tasks.filter((task) => task.status === 'doing');
  }

  get doneTasks(): ITask[] {
    return this.tasks.filter((task) => task.status === 'done');
  }
}
