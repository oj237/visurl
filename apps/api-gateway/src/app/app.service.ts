import { Injectable } from '@nestjs/common';
import * as dns from 'dns';

@Injectable()
export class AppService {
  lookupUrl(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return dns.lookup(url, (err, addr, fam) => {
        console.log(err)
        console.log(addr)
        console.log(fam);
        if(err) return resolve(false);
        return resolve(true)
      })
    })
  }
}
