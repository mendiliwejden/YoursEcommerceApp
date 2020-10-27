import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../services/rest-api.service";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  nom = "";
  prenom = "";
  email = "";
  password = "";
  password1 = "";

  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService
  ) {}

  ngOnInit(): void {}

  validate() {
    if (this.nom) {
      if (this.prenom) {
        if (this.email) {
          if (this.password) {
            if (this.password1) {
              if (this.password === this.password1) {
                return true;
              } else {
                this.data.error("Passwords do not match");
              }
            } else {
              this.data.error("Confirmation password is not entered");
            }
          } else {
            this.data.error("Password is not entered");
          }
        } else {
          this.data.error("Email is not entered");
        }
      } else {
        this.data.error("Prenom is not entered");
      }
    } else {
      this.data.error("Name is not entered");
    }
  }

  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        //
        const data = await this.rest.post(
          "http://localhost:8080/api/users/singUp",
          {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            password: this.password,
          }
        );
        if (data["success"]) {
          this.data.success("Registration Successful");
        } else {
          this.data.error(data["error"]);
        }
      }
    } catch (error) {
      this.data.error(error.error);
    }
    this.btnDisabled = false;
  }
}
