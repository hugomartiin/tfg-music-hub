import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',

})  
export class SearchBarComponent {
  searchQuery = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    const trimmed = this.searchQuery.trim();
    if (trimmed) {
      this.search.emit(trimmed);
    }
  }
}
