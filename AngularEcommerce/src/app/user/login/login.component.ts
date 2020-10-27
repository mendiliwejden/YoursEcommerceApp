import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestApiService } from "../../services/rest-api.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  btnDisabled = false;

  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService
  ) {}

  ngOnInit(): void {}
  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.error("Password is not entered");
      }
    } else {
      this.data.error("Email is not entered");
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          "http://localhost:8080/api/users/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        if (data["success"]) {
          localStorage.setItem("token", data["token"]);
          await this.data.getProfile();
          console.log(data);
          this.router.navigate(["/dashboard/profile"]);
        } else {
          this.data.error(data["message"]);
        }
      }
    } catch (error) {
      this.data.error(error["message"]);
    }
    this.btnDisabled = false;
  }
}
