import { Component, inject, OnInit } from '@angular/core';
import {
  IPaginationParams,
  ITaskFilters,
  TaskListService,
} from '../../shared/services/task-list.service';
import { ITask } from '../../shared/interfaces/itask';
import { take, tap } from 'rxjs';
import { TaskStatusPipe } from '../../shared/pipes/task-status.pipe';
import {
  FormBuilder,
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
    this.loadTasks();
  }

  onSearch(): void {
    this.currentPage = 1; // Reset alla prima pagina quando si cerca
    this.loadTasks();
  }

  onClear(): void {
    this.searchForm.reset();
    this.currentPage = 1;
    this.loadTasks();
  }

  // Metodi per la navigazione
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTasks();
    }
  }

  goToFirstPage(): void {
    this.goToPage(this.firstPage);
  }

  goToLastPage(): void {
    this.goToPage(this.lastPage);
  }

  goToPrevPage(): void {
    if (this.prevPage) {
      this.goToPage(this.prevPage);
    }
  }

  goToNextPage(): void {
    if (this.nextPage) {
      this.goToPage(this.nextPage);
    }
  }

  // Genera array di numeri di pagina per la paginazione
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(this.currentPage - half, 1);
    let end = Math.min(start + maxPagesToShow - 1, this.totalPages);

    if (end - start + 1 < maxPagesToShow) {
      start = Math.max(end - maxPagesToShow + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  deleteTask(taskId: number): void {
    this._taskService
      .deleteTask(taskId)
      .pipe(
        take(1),
        tap(() => {
          console.log('task:', taskId, 'eliminata');
          this.loadTasks();
        })
      )
      .subscribe();
  }

  loadTasks(): void {
    const pagination: IPaginationParams = {
      page: this.currentPage,
      limit: this.itemsPerPage,
    };

    const formValues = this.searchForm.value;
    const filters: ITaskFilters = {};

    // Aggiungi solo i filtri che hanno valori non vuoti
    if (formValues.title?.trim()) {
      filters.title = formValues.title.trim();
    }
    if (formValues.description?.trim()) {
      filters.description = formValues.description.trim();
    }
    if (formValues.status) {
      filters.status = formValues.status;
    }

    this._taskService
      .getPageTasks(
        pagination,
        Object.keys(filters).length ? filters : undefined
      )
      .pipe(
        take(1),
        tap((response: IResponse<ITask[]>) => {
          this.tasks = response.data; // Assegna direttamente i dati dalla risposta
          this.totalItems = response.totalCount || 0;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

          // Aggiorna informazioni di navigazione
          this.prevPage = response.prev ?? null;
          this.nextPage = response.next || null;
          this.firstPage = response.first || 1;
          this.lastPage = response.last || this.totalPages;
        })
      )
      .subscribe();
  }
}
