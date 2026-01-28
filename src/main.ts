import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([authInterceptor])
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
