import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUser: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  itemsPerPage = 5;
  currentPage = 1;
  totalUsers = 0;
  totalPages = 0;
  itemsPerPageOptions = [5, 10, 15];
  private userSubscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.userSubscription = this.userService
      .getUsers(this.currentPage, this.itemsPerPage)
      .pipe(
        delay(1000),
        catchError((error) => {
          this.errorMessage = 'Failed to fetch users. Please try again later.';
          this.isLoading = false;
          return throwError(() => new Error('Failed to fetch users'));
        })
      )
      .subscribe({
        next: (response) => {
          this.users = response.data;
          this.filteredUsers = [...this.users];
          this.totalUsers = response.total;
          this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
          this.isLoading = false;
          this.userService.numOfUsers = this.totalUsers;
        },
        error: (error) => {
          this.errorMessage = 'Failed to fetch users. Please try again later.';
          this.isLoading = false;
        },
      });
  }

  handleSearch(id: number | null): void {
    if (id !== null) {
      this.filteredUsers = this.users.filter((user) => user.id === id);
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  onPageChanged(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchUsers();
    }
  }

  onItemsPerPageChanged(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
