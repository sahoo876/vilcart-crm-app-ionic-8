import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
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
} from '@ionic/angular/standalone';
import { CustomerService } from '../customer.service';
@Component({
  standalone: true,
  imports: [
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

  customers: any;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ionViewWillEnter() {
    this.getCustomers();
  }

  getCustomers() {
    const page = 1;
    const dc = 'BLRU'
    this.customerService.getCustomers(page, dc).subscribe((res: any) =>{
      this.customers = res?.docs
    });
  }

  addCustomer() {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }


}
