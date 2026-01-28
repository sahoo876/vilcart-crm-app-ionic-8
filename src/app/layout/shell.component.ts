import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRouterOutlet, IonApp } from '@ionic/angular/standalone';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [
    CommonModule,
    IonRouterOutlet,
    SidebarComponent,
    HeaderComponent,
    IonApp
],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
    isSidebarOpen = true;

    toggleSidebar() {
        console.log("isSidebarOpen>>first", this.isSidebarOpen);
        this.isSidebarOpen = !this.isSidebarOpen;
        console.log("isSidebarOpen>>second", this.isSidebarOpen);
    }
}
