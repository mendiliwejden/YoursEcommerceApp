import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.css"],
})
export class AddCategoryComponent implements OnInit {
  Category = "";
  btnDisabled = false;
  constructor(private data: DataService, private rest: RestApiService) {}

  ngOnInit(): void {}

  validate() {
    if (this.Category) {
      return true;
    } else {
      this.data.error("Category name is not entered.");
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          "http://localhost:8080/api/categorys/new",
          { name: this.Category }
        );
        data["success"]
          ? this.data.success(data["message"])
          : this.data.error(data["error"]);
      }
    } catch (error) {
      this.data.error(error);
    }
    this.btnDisabled = false;
  }
}
