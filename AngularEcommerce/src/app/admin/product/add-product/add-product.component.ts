import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  product = {
    name: "",
    prix: 0,
    stock: 0,
    categoryId: 0,
    marque: "",
    product_picture: null,
  };

  categories: any;
  btnDisabled = false;

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  //get list of categorys
  async ngOnInit() {
    try {
      const data = await this.rest.get(
        "http://localhost:8080/api/categorys/all"
      );
      data["success"]
        ? ((this.categories = data["data"]), console.log(this.categories))
        : this.data.error(data["error"]);
    } catch (error) {
      this.data.error(error["error"]);
    }
  }

  //validate the forms
  validate(product) {
    if (product.name) {
      if (product.prix) {
        if (product.stock) {
          if (product.categoryId) {
            if (product.marque) {
              if (product.product_picture) {
                return true;
              } else {
                this.data.error("Please select product image.");
              }
            } else {
              this.data.error("Please enter marque.");
            }
          } else {
            this.data.error("Please select category.");
          }
        } else {
          this.data.error("Please enter product quantity.");
        }
      } else {
        this.data.error("Please enter a price.");
      }
    } else {
      this.data.error("Please enter a title.");
    }
  }

  fileChange(event: any) {
    this.product.product_picture = event.target.files[0];
  }

  async post(id) {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === "product_picture") {
              form.append(
                "product_picture",
                this.product.product_picture,
                this.product.product_picture.name
              );
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        const data = await this.rest.post(
          "http://localhost:8080/api/products/new/" + id,
          form
        );
        data["success"]
          ? this.router
              .navigate(["/dashboard/addProduct"])
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
