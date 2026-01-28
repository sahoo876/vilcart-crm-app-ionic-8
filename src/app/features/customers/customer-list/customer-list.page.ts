import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonList, IonItem, IonLabel, IonToolbar, IonHeader, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonMenuButton } from '@ionic/angular/standalone';
// import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
// import { ShellComponent } from 'src/app/layout/shell.component';
@Component({
  standalone: true,
  imports: [
    // SidebarComponent,
    CommonModule,
    IonList,
    IonItem,
    IonLabel,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonMenuButton
],
  templateUrl: './customer-list.page.html',
  styleUrls: ['./customer-list.page.scss']
})
export class CustomerListPage {

  customers = [
    { id: 1, name: 'Ravi Kumar', mobile: '9876543210' },
    { id: 2, name: 'Suresh Das', mobile: '9123456780' }
  ];

  constructor(private router: Router) {}

  addCustomer() {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }
}
