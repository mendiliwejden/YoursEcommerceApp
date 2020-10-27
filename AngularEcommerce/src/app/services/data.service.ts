import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  message = "";
  messageType = "danger";

  user: any;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.message = "";
      }
    });
  }

  error(message) {
    this.messageType = "danger";
    this.message = message;
  }

  success(message) {
    this.messageType = "success";
    this.message = message;
  }

  warning(message) {
    this.messageType = "warning";
    this.message = message;
  }

  //return all user informations
  async getProfile() {
    try {
      if (localStorage.getItem("token")) {
        const data = await this.rest.get(
          "http://localhost:8080/api/users/getUserById"
        );

        if (data["success"]) {
          this.user = data["user"];
          console.log(this.user);
        } else {
          console.log("no profile");
        }
      }
    } catch (e) {
      this.error(e);
    }
  }
}
