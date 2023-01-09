import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getData(key: string) {
    return localStorage.getItem(key) || "";
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

//   private encrypt(txt: string): string {
//     return CryptoJS.AES.encrypt(txt, this.key).toString();
//   }

//   private decrypt(txtToDecrypt: string) {
//     return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
//   }
}