import { Routes } from '@angular/router';

export const customerRoutes: Routes = [
  {
    path: 'customers',
    loadComponent: () =>
      import('./customer-list/customer-list.page')
        .then(m => m.CustomerListPage)
  },
  {
    path: 'customers/new',
    loadComponent: () =>
      import('./customer-form/customer-form.page')
        .then(m => m.CustomerFormPage)
  },
  {
    path: 'customers/edit/:id',
    loadComponent: () =>
      import('./customer-form/customer-form.page')
        .then(m => m.CustomerFormPage)
  }
];
