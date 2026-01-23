import { MenuItem } from './menu.model';

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Customers',
    children: [
      {
        title: 'Create Customer',
        icon: 'person-add-outline',
        url: '/customers/new'
      },
      {
        title: 'Customer List',
        icon: 'people-outline',
        url: '/customers'
      }
    ]
  },
  {
    title: 'TeleCaller',
    icon: 'call-outline',
    url: '/telecaller'
  },
  {
    title: 'Place Order',
    icon: 'cart-outline',
    url: '/orders'
  },
  {
    title: 'CRM Reports',
    icon: 'stats-chart-outline',
    url: '/reports'
  }
];
