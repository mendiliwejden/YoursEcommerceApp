import { Component, OnInit } from "@angular/core";

import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

import { CategoryService } from "../../../services/Category/category.service";

@Component({
  selector: "app-list-category",
  templateUrl: "./list-category.component.html",
  styleUrls: ["./list-category.component.css"],
})
export class ListCategoryComponent implements OnInit {
  categories: [];
  constructor(
    private categoryService: CategoryService,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    return this.categoryService.getListCategory().subscribe((data: any) => {
      //this.categories = data;
      if (data["success"]) {
        (this.categories = data["data"]), console.log(this.categories);
      } else {
        data.error(["error"]);
      }
    });
  }

  editCategory(id) {
    this.router.navigate(["/dashboard/editCategory/", id]);
  }

  async delete(id) {
    if (confirm("Do you really want to delet this Category ?")) {
      try {
        const data = await this.rest.delete(
          "http://localhost:8080/api/categorys/delete/" + id
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/listCategory"])
              .then(() => this.data.success(data["message"]))
              .catch((error) => this.data.error(error))
          : this.data.error(data["message"]);
      } catch (error) {
        this.data.error(error["message"]);
      }
    }
  }
}
