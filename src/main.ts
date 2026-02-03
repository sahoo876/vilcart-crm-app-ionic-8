import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import {
  personAddOutline,
  peopleOutline,
  callOutline,
  cartOutline,
  statsChartOutline,
  menuOutline
} from 'ionicons/icons';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // ROUTER
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // HTTP + INTERCEPTOR
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    // ADD THIS LINE (Ionic Storage for standalone)
    importProvidersFrom(
      IonicStorageModule.forRoot()
    )
  ],
  //  providers: [
  //   provideRouter(routes),
  //   provideHttpClient(
  //     withInterceptors([authInterceptor])
  //   )
  // ]
}).then(() => {
  addIcons({
    'person-add-outline': personAddOutline,
    'people-outline': peopleOutline,
    'call-outline': callOutline,
    'cart-outline': cartOutline,
    'stats-chart-outline': statsChartOutline,
    'menu-outline': menuOutline
  });
});
