import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user!: User;

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/users', this.user.id]);
    console.log(this.user);
  }
}
