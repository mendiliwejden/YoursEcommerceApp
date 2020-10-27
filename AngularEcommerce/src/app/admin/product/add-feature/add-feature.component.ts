import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-feature",
  templateUrl: "./add-feature.component.html",
  styleUrls: ["./add-feature.component.css"],
})
export class AddFeatureComponent implements OnInit {
  feature = {
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
  validate(feature) {
    if (feature.name) {
      if (feature.value) {
        return true;
      } else {
        this.data.error("Please enter feature value.");
      }
    } else {
      this.data.error("Please enter feature name.");
    }
  }

  async addfeature() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.feature)) {
        const data = await this.rest.post(
          "http://localhost:8080/api/features/new/" + this.id,
          {
            name: this.feature.name,
            value: this.feature.value,
            accessoireId: this.id,
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
