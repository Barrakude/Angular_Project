import { Routes } from '@angular/router';
import { BoardComponent } from './features/board/board.component';
import { TaskListComponent } from './features/task-list/task-list.component';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [

    {
        path:'',
        component:LayoutComponent,
        children:[
            {path:'', redirectTo:'/board',pathMatch:'full'},
            {path:'board', component:BoardComponent},
            {path:'task-list', component:TaskListComponent}
        ]
    },
    
];
