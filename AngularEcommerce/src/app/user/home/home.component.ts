import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // public data attribute to escape a common error in angular
  constructor(private router: Router, public data: DataService) {
    // It'll be functional after the profile creation
    this.data.getProfile();
  }

  ngOnInit(): void {}

  get token() {
    return localStorage.getItem("token");
  }

  logout() {
    this.data.user = {};
    localStorage.removeItem("token");
    this.router.navigate([""]);
  }

  search() {}
}
