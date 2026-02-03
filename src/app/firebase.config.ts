import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCLjj-Nrmw4xqUu3VvhGILuFh-NGf487KY',
  authDomain: 'vilcarterp-7ae7f.firebaseapp.com',
  projectId: 'vilcarterp-7ae7f',
  storageBucket: 'vilcarterp-7ae7f.appspot.com',
  messagingSenderId: '89284880347',
  appId: '1:89284880347:web:a5d28789ebf2fd7b4469fe'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp);
