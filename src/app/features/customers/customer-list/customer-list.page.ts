import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  // IonList,
  // IonItem,
  // IonLabel,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton
} from '@ionic/angular/standalone';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModalController } from '@ionic/angular/standalone';
import { DocumentUploadModal } from './document-upload.modal';
import { CustomerService } from '../customer.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    // IonList,
    // IonItem,
    // IonLabel,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonMenuButton,
    // Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
],
  templateUrl: './customer-list.page.html',
  styleUrls: ['./customer-list.page.scss']
})
export class CustomerListPage {

  displayedColumns: string[] = [
    'slNo',
    'doc1',
    'doc2',
    'doc3',
    'kycExpiry',
    'verify',
    'Verified Doc Type',
    'Declaration Verified Doc Type',
    'Survey Status',
    'UUID',
    'state',
    'district',
    'Taluk',
    'Office Name',
    'Village',
    'Name',
    'Gender',
    'Add / View Beat',
    'Grade',
    'Team',
    'CRM',
    'TeleCaller',
    'Old Balance',
    'GST Number',
    'Shop Type',
    'Shop Name',
    'phoneNumber',
    'phoneNumber2',
    'Address',
    'Landmark',
    'Shop Break Time',
    'Qualification',
    'Smartphone User',
    'Route',
    'Created By',
    'View License',
    'Executive',
    'Location Captured',
    'Created On',
    'Last Called',
    'Average Sale',
    'creditPeriod',
    'creditLimit',
    'Referral Code',
    'App Version',
    'App Login',
    'actions'
  ];
  
  dataSource = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  customers: any;
  isDistributor = true;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.loadCustomers();
  }

  loadCustomers() {
    const page = 1;
    const dc = 'BLRU'
    this.customerService.getCustomers(page, dc).subscribe((res: any) =>{
      this.dataSource.data = res.docs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  async openDocModal(customer: any, docType: 'doc1' | 'doc2' | 'doc3') {
    const modal = await this.modalCtrl.create({
      component: DocumentUploadModal,
      componentProps: {
        customerId: customer._id,
        docType,
        existingDoc: customer[docType]
      }
    });

    modal.onDidDismiss().then(res => {
      if (res.data?.updated) {
        this.loadCustomers();
      }
    });

    await modal.present();
  }

  viewDoc(url: string) {
    if (!url) return;
    window.open(url, '_blank');
  }

  addCustomer() {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  updateKycExpiry(data: any) {

  }

  addBeats(customer: any) {

  }

  viewAddBeat(customer: any) {

  }

  addTeam(customer: any) {

  }

  addRoute(customer: any) {

  }

  viewTopItems(customer: any) {

  }

  viewImage(customer: any) {

  }

  formatLastCalled(value: string | null): string {
    if (!value) return '';
  
    const parts = value.split(' ');
    if (parts.length < 3) return value;
  
    return `${parts[2]} ${parts[0]} ${parts[1]}`;
  }

}
