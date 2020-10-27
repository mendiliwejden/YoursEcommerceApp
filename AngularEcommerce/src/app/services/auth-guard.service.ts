import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if user login
    if (localStorage.getItem("token")) {
      // allow acces to route profile and block to login
      return state.url.startsWith("/dashboard")
        ? true
        : (this.router.navigate(["/"]), false);
    } else {
      // if user not log in block acces to profile and allow access to login page
      return state.url.startsWith("/dashboard")
        ? (this.router.navigate(["/"]), false)
        : true;
    }
  }
}
