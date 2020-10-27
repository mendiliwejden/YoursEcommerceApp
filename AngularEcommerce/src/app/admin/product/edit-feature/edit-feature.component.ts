import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-feature",
  templateUrl: "./edit-feature.component.html",
  styleUrls: ["./edit-feature.component.css"],
})
export class EditFeatureComponent implements OnInit {
  id: any;

  btnDisabled = false;
  currentFeature: any;

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
        .get(`http://localhost:8080/api/features/getById/${res["id"]}`)
        .then((data) => {
          data["success"]
            ? ((this.currentFeature = data["data"]),
              console.log(this.currentFeature))
            : this.router.navigate(["/"]);
        })
        .catch((error) => this.data.error(error["message"]));
    });
  }

  validate(currentFeature) {
    if (currentFeature.name) {
      if (currentFeature.value) {
        return true;
      } else {
        this.data.error("Please enter  value.");
      }
    } else {
      this.data.error("Please enter  name.");
    }
  }

  async editFeature() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentFeature)) {
        const data = await this.rest.put(
          "http://localhost:8080/api/features/update/" + this.id,
          { name: this.currentFeature.name, value: this.currentFeature.value }
        );
        data["success"]
          ? this.router
              .navigate([
                "/dashboard/DetailProduct/" + this.currentFeature.productId,
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
