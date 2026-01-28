import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    CommonModule,

    // Ionic standalone components
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonButton
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() menuToggle = new EventEmitter<void>();

    toggleMenu() {
        console.log("menuToggle>>", this.menuToggle);
      this.menuToggle.emit();
    }
}
