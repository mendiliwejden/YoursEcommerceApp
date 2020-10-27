import { Description } from "./../../../Models/Product/description";
import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-description",
  templateUrl: "./add-description.component.html",
  styleUrls: ["./add-description.component.css"],
})
export class AddDescriptionComponent implements OnInit {
  Description = {
    name: "",
    value: "",
  };
  btnDisabled = false;

  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  //validate the forms
  validate(Description) {
    if (Description.name) {
      if (Description.value) {
        return true;
      } else {
        this.data.error("Please enter description value.");
      }
    } else {
      this.data.error("Please enter name.");
    }
  }

  async addDescription() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.Description)) {
        const data = await this.rest.post(
          "http://localhost:8080/api/descriptions/new/" + this.id,
          {
            name: this.Description.name,
            value: this.Description.value,
            productId: this.id,
          }
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/DetailProduct/" + this.id])
              .then(() => this.data.success(data["message"]))
              .catch((error) => this.data.error(error))
          : this.data.error(data["error"]);
      }
    } catch (error) {
      this.data.error(error);
    }
    this.btnDisabled = false;
  }
}
