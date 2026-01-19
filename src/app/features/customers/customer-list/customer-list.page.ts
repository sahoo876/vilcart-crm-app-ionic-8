import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './customer-list.page.html'
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
