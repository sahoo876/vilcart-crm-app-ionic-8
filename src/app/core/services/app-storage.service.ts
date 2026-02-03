import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private _storage!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async setSecure(key: string, value: string) {
    await SecureStoragePlugin.set({ key, value });
  }

  async getSecure(key: string) {
    const res = await SecureStoragePlugin.get({ key });
    return res.value;
  }

  async removeSecure(key: string) {
    await SecureStoragePlugin.remove({ key });
  }

  async set(key: string, value: any) {
    await this._storage.set(key, value);
  }

  async get(key: string) {
    return this._storage.get(key);
  }

  async clearAll() {
    await this._storage.clear();
    await SecureStoragePlugin.clear();
  }
}
