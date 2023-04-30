import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:5000';

enum HTTP {
  POST="POST"
}

interface IToast {
  header: string;
  body: string;
  delay?: number
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  toasts: IToast[] = []

  constructor() { }

  async shortenUrl(url: string) {
    return await fetch(`${API_URL}/v1/shrink`, {
      method: HTTP.POST,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ url })
    }).then((res) => res.json());
  }

  notify(toast: IToast) {
    this.toasts.push(toast);
  }
}
