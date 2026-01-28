import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonItemDivider
} from '@ionic/angular/standalone';
import { MENU_ITEMS } from '../../../core/menu/menu.data';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonIcon
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = MENU_ITEMS;
}
