import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent implements OnInit{
  userId = input.required<string>();
  // userTasks: Task[] = [];
  //  order? : 'asc' | 'desc';
  order = signal<'asc' | 'desc'>('desc')
  private tasksService= inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyref = inject(DestroyRef);
queryParams='';
  userTasks = computed( () =>
     this.tasksService.allTasks().filter( task => task.userId == this.userId()).
  sort((a,b) => {
    if(this.order() === 'desc'){
      return a.id > b.id ? -1 :1;
    }
    else{
      return a.id > b.id ? 1 : -1;
    }
  })
);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next : params => (this.order.set(params['order'])),
    });
   this.destroyref.onDestroy(() => subscription.unsubscribe());
  }
}
