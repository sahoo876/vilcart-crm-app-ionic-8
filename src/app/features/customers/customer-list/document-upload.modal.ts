import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from 'src/app/firebase.config';
import { AppStorageService } from 'src/app/core/services/app-storage.service';
import { CustomerService } from '../customer.service';

@Component({
    standalone: true,
    templateUrl: './document-upload.modal.html',
    imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, CommonModule],
  })
  export class DocumentUploadModal {
  
    @Input() customer!: any;
    @Input() docType!: 'doc1' | 'doc2' | 'doc3';
  
    selectedFile!: File;
    previewUrl: string | null = null;
    window: any;
    loading = false;
  
    constructor(
      private modalCtrl: ModalController,
      private customerService: CustomerService,
      private storageService: AppStorageService
    ) {}

    onFileChange(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
    // onFileSelect(event: any) {
    //   const file = event.target.files[0];
    //   if (!file) return;
      
    //   this.selectedFile = file;
  
    //   if (file.type.startsWith('image')) {
    //     this.previewUrl = URL.createObjectURL(file);
    //   } else {
    //     this.previewUrl = null;
    //   }
    // }
  
    // submit() {
    //   if (!this.selectedFile) return;

    //   this.loading = true;
      
    //   const formData = new FormData();
    //   formData.append('file', this.selectedFile);
    //   formData.append('docType', this.docType);
  
    //   this.customerService
    //     .uploadCustomerDoc(this.customerId, formData)
    //     .subscribe(() => {
    //       this.modalCtrl.dismiss({ updated: true });
    //     });
    // }

    async upload() {
      if (!this.selectedFile) return;
    
      this.loading = true;
    
      try {
        const path = `customers/${Date.now()}_${this.selectedFile.name}`;
        const fileRef = ref(firebaseStorage, path);
    
        await uploadBytes(fileRef, this.selectedFile);
        const downloadURL = await getDownloadURL(fileRef);
    
        const payload = await this.prepareCustomerPayload({
          ...this.customer,
          [this.docType]: downloadURL
        });
    
        this.customerService.updateCustomer(payload).subscribe(() => {
          this.loading = false;
          this.modalCtrl.dismiss({ updated: true });
        });
    
      } catch (err) {
        this.loading = false;
        console.error(err);
      }
    }     
  
    close() {
      this.modalCtrl.dismiss();
    }

    // THIS REPLACES ALL YOUR DELETE LOGIC
    async prepareCustomerPayload(customer: any) {
      const deleteKeys = [
        '12_2021_sales','April2021Target','cachedSales','crm','location',
        'lastBill','lastCalledBy','surveyRes','userName','uuid',
        '01_2023_sales','02_2023_sales','03_2023_sales',
        // move ALL delete keys here (one-time effort)
      ];

      deleteKeys.forEach(k => delete customer[k]);

      // normalize fields (from old updateNode)
      customer.lastOrderedTotal = Number(customer.lastOrderedTotal || 0);
      customer.oldBalance = Number(customer.oldBalance || 0);
      customer.dcName =
        this.storageService.get('selectedDC') ||
        JSON.parse(await this.storageService.getSecure('loggedInUser') || '{}').dcName;

      customer.isPayLater = !!customer.isPayLater;
      customer.addShipping = !!customer.addShipping;

      return customer;
    }
  }