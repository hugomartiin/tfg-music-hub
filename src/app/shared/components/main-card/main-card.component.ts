import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-card',
  standalone: true,
  templateUrl: './main-card.component.html',
  imports: [ CommonModule],
})
export class MainCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image?: string;
  @Input() hoverColor!: string;
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
  
      this.onClick.emit();
    
  }
}
