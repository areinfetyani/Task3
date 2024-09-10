import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    PaginationComponent,
    UserComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [UserService],
  exports: [UserListComponent, UserDetailsComponent],
})
export class UserModule {}
