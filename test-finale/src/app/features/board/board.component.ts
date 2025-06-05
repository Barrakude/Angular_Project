import { Component } from '@angular/core';
import { DoingComponent } from './doing/doing.component';
import { DoneComponent } from './done/done.component';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'tmg-board',
  imports: [
    TodoComponent,
    DoneComponent,
    DoingComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  activeTab:string = 'todo';

  setActiveTab(tab:string):void{
    this.activeTab = tab;
  }

}
