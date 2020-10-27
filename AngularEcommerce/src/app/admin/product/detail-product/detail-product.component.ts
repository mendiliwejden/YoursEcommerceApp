import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.component.html",
  styleUrls: ["./detail-product.component.css"],
})
export class DetailProductComponent implements OnInit {
  btnDisabled = false;
  products: any;
  features: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.rest
        .get(
          `http://localhost:8080/api/products/getByIdWithDetais/${res["id"]}`
        )
        .then((data) => {
          data["success"]
            ? ((this.products = data["data"]), console.log(this.products))
            : this.router.navigate(["/"]);
        })
        .catch((error) => this.data.error(error["message"]));
    });
  }

  async deleteFea(id) {
    if (confirm("Do you really want to delet this features ?")) {
      try {
        const data = await this.rest.delete(
          "http://localhost:8080/api/features/delete/" + id
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/DetailProduct/" + this.products.id])
              .then(() => this.data.success(data["message"]))
              .catch((error) => this.data.error(error))
          : this.data.error(data["message"]);
      } catch (error) {
        this.data.error(error["message"]);
      }
    }
  }
  async deleteAcc(id) {
    if (confirm("Do you really want to delet this accessorie ?")) {
      try {
        const data = await this.rest.delete(
          "http://localhost:8080/api/accessories/delete/" + id
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/DetailProduct/" + this.products.id])
              .then(() => this.data.success(data["message"]))
              .catch((error) => this.data.error(error))
          : this.data.error(data["message"]);
      } catch (error) {
        this.data.error(error["message"]);
      }
    }
  }

  async deleteDesc(id) {
    if (confirm("Do you really want to delet this description ?")) {
      try {
        const data = await this.rest.delete(
          "http://localhost:8080/api/descriptions/delete/" + id
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/DetailProduct/" + this.products.id])
              .then(() => this.data.success(data["message"]))
              .catch((error) => this.data.error(error))
          : this.data.error(data["message"]);
      } catch (error) {
        this.data.error(error["message"]);
      }
    }
  }
}
