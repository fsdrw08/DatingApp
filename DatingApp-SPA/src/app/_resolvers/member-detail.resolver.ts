import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service'
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<User> {
  constructor(private userService: UserService,
    private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problem retriving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
