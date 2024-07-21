import { Component, inject, OnInit } from '@angular/core';

import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [UserComponent],
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  users = this.usersService.users;
   
  ngOnInit(): void {
    console.log(this.users);
    
  }
}
