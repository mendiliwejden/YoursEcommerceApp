import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

import { CategoryService } from "../../../services/Category/category.service";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.css"],
})
export class EditCategoryComponent implements OnInit {
  id: any;

  btnDisabled = false;
  currentCateg: any;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.params.subscribe((res) => {
      this.rest
        .get(`http://localhost:8080/api/categorys/findOne/${res["id"]}`)
        .then((data) => {
          data["success"]
            ? ((this.currentCateg = data["data"]),
              console.log(this.currentCateg))
            : this.router.navigate(["/"]);
        })
        .catch((error) => this.data.error(error["message"]));
    });
  }

  validate(currentCateg) {
    if (currentCateg.name) {
      return true;
    } else {
      this.data.error("Please enter a name.");
    }
  }

  async edit() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentCateg)) {
        const data = await this.rest.put(
          "http://localhost:8080/api/categorys/update/" + this.id,
          { name: this.currentCateg.name }
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/listCategory"])
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
