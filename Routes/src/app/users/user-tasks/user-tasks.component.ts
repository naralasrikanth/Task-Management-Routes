import { Component, computed, DestroyRef, inject, input, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ResolveFn, RouterLink, RouterOutlet ,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent  {
   userId = input.required<string>();
   userName=input.required<string>();
   message = input.required<string>();
  // @Input({required:true}) userId!: string;
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // userName = computed(() => this.usersService.users.find( u =>u.id === this.userId())?.name);

  // ngOnInit(): void {
  //   console.log(this.activatedRoute);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName=this.usersService.users.find((users) => users.id === paramMap.get('usersId'))?.name ||'';
  //     }
  //   });

  //   this.destroyRef.onDestroy( () => subscription.unsubscribe());
    
  // }


}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle : ResolveFn<string> = (
  activatedRoute,routerState
) => {
  return resolveUserName(activatedRoute,routerState) + '\'s Tasks'
}