import {  CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { routes as userRoutes} from './users/users.routes'

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { inject } from "@angular/core";

const dummyCanMatch : CanMatchFn = (route , segments) => {
    const router = inject(Router);
    const shouldGetAcess = Math.random();
    if(shouldGetAcess < 1){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {path: '', component: NoTaskComponent
        // redirectTo:'/user/u1', pathMatch:'full'
        },
    {
        path:'users/:userId',component:UserTasksComponent,
        children :userRoutes,
        canMatch :[dummyCanMatch],
        data:{
            message:'Routes',
        },
        resolve :{userName : resolveUserName},
        title: resolveTitle,
        
    },
    {path:'**',component:NoTaskComponent}
];