import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private baseUrl = 'https://beta.vilcartapp.com/v2/api';

  constructor(private http: HttpClient) {}

  getStates() {
    return this.http.get<any[]>(`${this.baseUrl}/state/allStates`);
  }

  getDistricts(stateId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/district/allDistricts?stateId=${stateId}`);
  }

  getSubDistricts(stateId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/subdistrict/allSubDistricts?districtId=${stateId}`);
  }

  getPostals(subDistrictId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/postalbranch/allPostalBranches?subdistrictId=${subDistrictId}`);
  }

  getVillages(postalbranchId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/village/allVillages?postalbranchId=${postalbranchId}`);
  }

  saveCustomer(data: any) {
    return this.http.post(`${this.baseUrl}/customers`, data);
  }

  updateCustomer(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/customers/${id}`, data);
  }
}
