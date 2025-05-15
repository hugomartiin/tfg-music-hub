import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
    imports: [CommonModule],

})
export class ButtonComponent {
  @Input() label!: string;
  @Input() value!: string;
  @Input() selected: boolean = false;
  @Input() className: string = '';


  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
