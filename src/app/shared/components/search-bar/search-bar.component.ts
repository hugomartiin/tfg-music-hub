import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Input() model = '';
  @Output() modelChange = new EventEmitter<string>();

  @Output() search = new EventEmitter<string>();     
  @Output() queryChange = new EventEmitter<string>();   

  onSearch() {
    const trimmed = this.model.trim();
    if (trimmed) {
      this.search.emit(trimmed);
    }
  }

  onTyping(query: string) {
    this.modelChange.emit(query);
    this.queryChange.emit(query.trim());
  }
}
