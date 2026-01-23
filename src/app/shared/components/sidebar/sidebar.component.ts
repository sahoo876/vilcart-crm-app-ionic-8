import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS } from '../../../core/menu/menu.data';
@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  menuItems = MENU_ITEMS;
}
