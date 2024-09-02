import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel binding

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [FormsModule, CommonModule], // Import FormsModule for ngModel
})
export class HeaderComponent {
  searchValue: string = '';
  @Input({ required: true }) showInput: boolean = true;
  @Output() searchId = new EventEmitter<number | null>(); // Emit number or null

  // Triggered when the search bar input changes
  onSearchChange() {
    const id = parseInt(this.searchValue, 10);
    if (!isNaN(id)) {
      this.searchId.emit(id); // Emit the user ID if it's a valid number
    } else {
      this.searchId.emit(null); // Emit null if the input is invalid
    }
  }
}
