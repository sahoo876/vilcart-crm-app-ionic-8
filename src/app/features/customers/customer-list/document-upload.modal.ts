import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
    standalone: true,
    templateUrl: './document-upload.modal.html',
    imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, CommonModule],
  })
  export class DocumentUploadModal {
  
    @Input() customerId!: string;
    @Input() docType!: 'doc1' | 'doc2' | 'doc3';
    @Input() existingDoc!: string;
  
    selectedFile!: File;
    previewUrl: string | null = null;
    window: any;
  
    constructor(
      private modalCtrl: ModalController,
      private customerService: CustomerService
    ) {}
  
    onFileSelect(event: any) {
      const file = event.target.files[0];
      if (!file) return;
  
      this.selectedFile = file;
  
      if (file.type.startsWith('image')) {
        this.previewUrl = URL.createObjectURL(file);
      } else {
        this.previewUrl = null;
      }
    }
  
    submit() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('docType', this.docType);
  
      this.customerService
        .uploadCustomerDoc(this.customerId, formData)
        .subscribe(() => {
          this.modalCtrl.dismiss({ updated: true });
        });
    }
  
    close() {
      this.modalCtrl.dismiss();
    }
  }