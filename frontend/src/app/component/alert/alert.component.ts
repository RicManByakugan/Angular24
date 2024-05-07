import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateX(100%)' })), 
      state('*', style({ transform: 'translateX(0)' })), 
      transition(
        ':enter', 
        animate('0.5s ease-in-out')), 
        transition(':leave', 
        [animate('0.5s ease-in-out', style({ transform: 'translateX(-2px)' })),]
      )
    ])
  ]
    
})
export class AlertComponent {
  isVisible: boolean = true;
  @Input() message: string = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 10000);
  }

  hideCallout() {
    this.isVisible = false;
  }
}
