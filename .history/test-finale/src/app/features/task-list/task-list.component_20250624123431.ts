import { Component, inject, OnInit } from '@angular/core';
import { IPaginationParams, ITaskFilters, TaskListService } from '../../shared/services/task-list.service';
import { ITask } from '../../shared/interfaces/itask';
import { take, tap } from 'rxjs';
import { TaskStatusPipe } from '../../shared/pipes/task-status.pipe';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { IResponse } from '../../shared/interfaces/iresponse';

@Component({
  selector: 'tmg-task-list',
  imports: [TaskStatusPipe, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  private readonly _taskService: TaskListService = inject(TaskListService);
  private readonly _fb: FormBuilder = inject(FormBuilder);

  tasks: ITask[] = [];
  filteredTask: ITask[] = [];

  //proprietà per la paginazione
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;

  //proprietà per la navigazione
  prevPage: number | null = null;
  nextPage: number | null = null;
  firstPage = 1;
  lastPage = 1;

  searchForm: FormGroup = this._fb.group({
    title: [''],
    description: [''],
    status: [''],
  });

  statusOption = ['todo', 'doing', 'done'];

  ngOnInit(): void {
    //this.getTask();
    this.loadTasks();
  }

  loadTasks(): void {
    const pagination: IPaginationParams = {
      page: this.currentPage,
      limit: this.itemsPerPage
    };

    const formValues = this.searchForm.value;
    const filters: ITaskFilters = {};

    // Aggiungi solo i filtri che hanno valori
    if (formValues.title) filters.title = formValues.title;
    if (formValues.description) filters.description = formValues.description;
    if (formValues.status) filters.status = formValues.status;

    this._taskService.getTasks(pagination, Object.keys(filters).length ? filters : undefined)
      .pipe(
        take(1),
        tap((response: IResponse<ITask[]>) => {
          this.tasks = response.data;
          this.totalItems = response.totalCount || 0;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          
          // Aggiorna informazioni di navigazione
          this.prevPage = response.prev ?? null;
          this.nextPage = response.next || null;
          this.firstPage = response.first || 1;
          this.lastPage = response.last || this.totalPages;
        })
      ).subscribe();
  }
  //! metodo senza paginazione
  // getTask(): void {
  //   this._taskService
  //     .getTasks()
  //     .pipe(
  //       take(1),
  //       tap((data) => {
  //         this.tasks = data;
  //         this.filteredTask = data;
  //       })
  //     )
  //     .subscribe();
  // }

  // onSearch(): void {
  //   const formValues = this.searchForm.value;

  //   this.filteredTask = this.tasks.filter((task) => {
  //     const titleValue =
  //       !formValues.title ||
  //       task.title.toLowerCase().includes(formValues.title.toLowerCase());

  //     const descriptionValue =
  //       !formValues.description ||
  //       task.description
  //         .toLowerCase()
  //         .includes(formValues.description.toLowerCase());

  //     const statusValue =
  //       !formValues.status || task.status === formValues.status;

  //     return titleValue && descriptionValue && statusValue;
  //   });
  // }

  onClear(): void {
    this.searchForm.reset();
    this.filteredTask = this.tasks;
  }
}
