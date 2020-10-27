import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.css"],
})
export class ListProductComponent implements OnInit {
  products: any;
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        "http://localhost:8080/api/products/getAll"
      );
      data["success"]
        ? (this.products = data["data"])
        : this.data.error(data["error"]);
    } catch (error) {
      this.data.error(error["error"]);
    }
  }

  async delete(id) {
    if (confirm("Do you really want to delet this Category ?")) {
      try {
        const data = await this.rest.delete(
          "http://localhost:8080/api/products/delete/" + id
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/listProduct"])
              .then(() => this.data.success(data["message"]))
              .catch((error) => this.data.error(error))
          : this.data.error(data["message"]);
      } catch (error) {
        this.data.error(error["message"]);
      }
    }
  }
}
