import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  standalone: true,
  selector: 'app-customer-form',
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.page.html'
})
export class CustomerFormPage implements OnInit {

  form!: FormGroup;
  isEdit = false;
  customerId: string | null = null;

  states: any[] = [];
  districts: any[] = [];
  subDistricts: any[] = [];
  postals: any[] = [];
  villages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: CustomerService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.loadStates();

    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.isEdit = true;
      this.loadCustomer(this.customerId);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      stateId: ['', Validators.required],
      districtId: ['', Validators.required],
      subDistrictId: ['', Validators.required],
      postalId: ['', Validators.required],
      villageId: ['', Validators.required],

      shopType: [''],
      shopName: ['', Validators.required],
      customerName: ['', Validators.required],
      phone1: ['', [Validators.required, Validators.minLength(10)]],
      phone2: [''],
      pan: [''],
      gst: [''],
      customerLocalName: [''],
      villageLocalName: [''],
      address: [''],
      landmark: [''],

      breakTime: ['', Validators.required],
      fridge: ['', Validators.required],
      qualification: [''],
      grade: ['', Validators.required],
      avgSalary: ['', Validators.required],
      smartphoneUser: ['', Validators.required],

      shopImage: [null],
      license: [null]
    });
  }

    loadStates() {
        this.api.getStates().subscribe((res: any) => {
            this.states = res?.state
        });
    }

    onStateChange() {
        const stateId = this.form.value.stateId;
        this.api.getDistricts(stateId).subscribe((res: any) => {
            this.districts = res?.district
        });
    }

  onDistrictChange() {
    const districtId = this.form.value.districtId;
    this.api.getSubDistricts(districtId).subscribe((res: any) => {
        this.subDistricts = res?.subdistrict
    });
  }

  onSubDistrictChange() {
    const subDistrictId = this.form.value.subDistrictId;
    this.api.getPostals(subDistrictId).subscribe((res: any) => { 
        this.postals = res?.village
    });
  }

  onPostalChange() {
    this.villages = this.postals; // adjust later if your API differs
  }

  onFileSelect(event: any, field: string) {
    const file = event.target.files[0];
    this.form.patchValue({ [field]: file });
  }

  loadCustomer(id: string) {
    // Dummy example — replace with real API later
    const existing = {
      stateId: '100000002',
      districtId: '100084360',
      shopName: 'Demo Shop',
      customerName: 'Ravi Kumar',
      phone1: '9876543210',
      grade: 'A',
      breakTime: 'yes',
      fridge: 'no',
      avgSalary: 500,
      smartphoneUser: 'yes'
    };

    this.form.patchValue(existing);
  }

  submit() {
    if (this.form.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const payload = this.form.value;

    if (this.isEdit) {
      this.api.updateCustomer(this.customerId!, payload)
        .subscribe(() => this.router.navigate(['/customers']));
    } else {
      this.api.saveCustomer(payload)
        .subscribe(() => this.router.navigate(['/customers']));
    }
  }
}
