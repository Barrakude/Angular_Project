import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskListService } from '../../shared/services/task-list.service';

@Component({
  selector: 'tmg-create-task',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  private readonly _taskService:TaskListService = inject(TaskListService);

  newTaskForm: FormGroup = new FormGroup({
    title: new FormControl('',[
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]*$/)

    ]),
    description: new FormControl('',[
      Validators.required,
      Validators.maxLength(100)
    ])
  });

  createTask():void{
    
  }
}
