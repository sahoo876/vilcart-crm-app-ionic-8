// import { Component } from '@angular/core';
// import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
// // import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   imports: [
//     IonApp,
//     IonRouterOutlet,
//     // SidebarComponent,
//     CommonModule
//   ],
// })
// export class AppComponent {
//   showMenu = true;

//   constructor(private router: Router) {
//     this.router.events
//       .pipe(filter(e => e instanceof NavigationEnd))
//       .subscribe((event: any) => {
//         this.showMenu = !event.url.includes('/login');
//       });
//   }
// }

import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [IonRouterOutlet],
  template: '<ion-router-outlet></ion-router-outlet>',
})
export class AppComponent {}
