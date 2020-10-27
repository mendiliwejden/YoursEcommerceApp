import { Component, OnInit } from "@angular/core";

import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-description",
  templateUrl: "./edit-description.component.html",
  styleUrls: ["./edit-description.component.css"],
})
export class EditDescriptionComponent implements OnInit {
  id: any;

  btnDisabled = false;
  currentDescription: any;
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
        .get(`http://localhost:8080/api/descriptions/getById/${res["id"]}`)
        .then((data) => {
          data["success"]
            ? ((this.currentDescription = data["data"]),
              console.log(this.currentDescription))
            : this.router.navigate(["/"]);
        })
        .catch((error) => this.data.error(error["message"]));
    });
  }

  validate(currentDescription) {
    if (currentDescription.name) {
      if (currentDescription.value) {
        return true;
      } else {
        this.data.error("Please enter  value.");
      }
    } else {
      this.data.error("Please enter  name.");
    }
  }

  async edit() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentDescription)) {
        const data = await this.rest.put(
          "http://localhost:8080/api/descriptions/update/" + this.id,
          {
            name: this.currentDescription.name,
            value: this.currentDescription.value,
          }
        );
        data["success"]
          ? this.router
              .navigate([
                "/dashboard/DetailProduct/" + this.currentDescription.productId,
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
