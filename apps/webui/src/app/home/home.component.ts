import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';

class Widget {
  url: string = '';
  visurl: string = '';
  visits: number = 0;
  inits: number = 0;

  constructor() {}

  patch(data: { url: string, visurl: string, visits: number, inits: number}) {
    this.url = data.url;
    this.visurl = data.visurl;
    this.visits = data.visits;
    this.inits = data.inits;
  }
}

@Component({
  selector: 'vi-surl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loader$: BehaviorSubject<boolean>;
  widget$: BehaviorSubject<boolean>;

  vi: FormGroup;

  widget: Widget;

  constructor(private fb: FormBuilder,
              public appSvc: AppService) {
    this.loader$ = new BehaviorSubject<boolean>(false);
    this.widget$ = new BehaviorSubject<boolean>(false);

    this.vi = this.fb.group({
      'url': ['', Validators.compose([Validators.required, Validators.pattern(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g)])]
    });

    this.widget = new Widget();
  }

  async shorten(){
    this.loader$.next(true);

    try {
      const payload = this.vi.getRawValue();
      
      const data = await this.appSvc.shortenUrl(payload.url);
      //console.log(data);
      if(data && !data.visurl) throw new Error();
      
      this.widget.patch(data);

      this.widget$.next(true);
      this.loader$.next(false);
    } catch (error: any) {
      //console.log(error);
      this.appSvc.notify({ header: 'vi', body: error.message || 'An unknown error occurred. Please try again later or contact support.' });
      this.loader$.next(false);
    }
  }

  clip(url: string) {
    navigator.clipboard.writeText(url);
    this.appSvc.notify({ header: 'vi', body: 'Copied' });
  }

  reset() {
    this.widget$.next(false);
  }

}
