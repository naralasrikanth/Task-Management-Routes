import { Component, computed, DestroyRef, inject, input, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
   userId = input.required<string>();
   userName='';
  // @Input({required:true}) userId!: string;
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // userName = computed(() => this.usersService.users.find( u =>u.id === this.userId())?.name);

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName=this.usersService.users.find((users) => users.id === paramMap.get('usersId'))?.name ||'';
      }
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
    
  }
}
