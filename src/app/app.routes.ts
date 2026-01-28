import { Routes } from '@angular/router';
// import { customerRoutes } from './features/customers/customers.routes';
import { ShellComponent } from './layout/shell.component';

export const routes: Routes = [

  // Login (NO shell)
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.page')
        .then(m => m.LoginPage)
  },

  // App shell (WITH header + sidebar)
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customer-list/customer-list.page')
            .then(m => m.CustomerListPage)
      },
      {
        path: 'customers/new',
        loadComponent: () =>
          import('./features/customers/customer-form/customer-form.page')
            .then(m => m.CustomerFormPage)
      },
      {
        path: 'customers/edit/:id',
        loadComponent: () =>
          import('./features/customers/customer-form/customer-form.page')
            .then(m => m.CustomerFormPage)
      },
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full'
      }
    ]
  },

  // Default
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
