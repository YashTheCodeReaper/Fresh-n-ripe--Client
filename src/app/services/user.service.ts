import { EventsService } from './events.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { User } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User | undefined;
  isLogged: boolean = false;
  addProtection: boolean = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private eventsService: EventsService
  ) {}

  validateLogin() {
    return new Promise<any>((resolve, reject) => {
      if (this.cookieService.check('jwt')) {
        this.apiService
          .validateUser(this.cookieService.get('jwt'))
          .toPromise()
          .then((response: any) => {
            if (response.status == 'success') {
              this.isLogged = true;
              this.user = response.data[0];
            } else {
              this.isLogged = false;
            }
            if (this.user) {
              this.user.cart = JSON.parse(this.user?.cart.toString());
            }
            this.eventsService.eventSubject.next('cart update');
            resolve(this.isLogged);
          })
          .catch((error) => {
            console.log(error);
            reject('User not logged');
          });
      } else {
        this.isLogged = false;
        resolve(this.isLogged);
      }
    });
  }
}
