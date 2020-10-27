import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public data: DataService) {
    //get user profile details
    this.data.getProfile();
  }

  get token() {
    return localStorage.getItem("token");
  }

  logout() {
    //clear user object
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {}
}
