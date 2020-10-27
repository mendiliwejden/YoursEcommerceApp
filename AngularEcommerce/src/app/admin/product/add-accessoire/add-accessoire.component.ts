import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-accessoire",
  templateUrl: "./add-accessoire.component.html",
  styleUrls: ["./add-accessoire.component.css"],
})
export class AddAccessoireComponent implements OnInit {
  accessoire = {
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
  validate(accessoire) {
    if (accessoire.name) {
      if (accessoire.value) {
        return true;
      } else {
        this.data.error("Please enter accessoire value.");
      }
    } else {
      this.data.error("Please enter accessoire name.");
    }
  }

  async addAccessoire() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.accessoire)) {
        const data = await this.rest.post(
          "http://localhost:8080/api/accessories/new/" + this.id,
          {
            name: this.accessoire.name,

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
