import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { TaskComponent} from "../tasks/task/task.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveUserTasks } from "../tasks/tasks.component";
import { inject } from "@angular/core";



export const routes : Routes = [
    { path:'',redirectTo:'tasks',pathMatch:'full'},
    {path: 'tasks',loadComponent : () => import('../tasks/task/task.component').then((mod) => mod.TaskComponent),
        runGuardsAndResolvers:'always',
        resolve:{ userTasks : resolveUserTasks}
    },
    {path : 'tasks/new', component : NewTaskComponent,canDeactivate:[canLeaveEditPage]}
];