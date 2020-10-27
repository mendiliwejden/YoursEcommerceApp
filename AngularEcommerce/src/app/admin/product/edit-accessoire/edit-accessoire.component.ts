import { Component, OnInit } from "@angular/core";

import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-accessoire",
  templateUrl: "./edit-accessoire.component.html",
  styleUrls: ["./edit-accessoire.component.css"],
})
export class EditAccessoireComponent implements OnInit {
  id: any;

  btnDisabled = false;
  currentAccessoire: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.params.subscribe((res) => {
      this.rest
        .get(`http://localhost:8080/api/accessories/getById/${res["id"]}`)
        .then((data) => {
          data["success"]
            ? ((this.currentAccessoire = data["data"]),
              console.log(this.currentAccessoire))
            : this.router.navigate(["/"]);
        })
        .catch((error) => this.data.error(error["message"]));
    });
  }

  validate(currentAccessoire) {
    if (currentAccessoire.name) {
      return true;
    } else {
      this.data.error("Please enter a name.");
    }
  }

  async edit() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentAccessoire)) {
        const data = await this.rest.put(
          "http://localhost:8080/api/accessories/update/" + this.id,
          {
            name: this.currentAccessoire.name,
          }
        );
        data["success"]
          ? this.router
              .navigate([
                "/dashboard/DetailProduct/" + this.currentAccessoire.productId,
              ])
              .then(() => this.data.success(data["message"]))
              .catch((error) => this.data.error(error))
          : this.data.error(data["message"]);
      }
    } catch (error) {
      this.data.error(error["message"]);
    }
    this.btnDisabled = false;
  }
}
