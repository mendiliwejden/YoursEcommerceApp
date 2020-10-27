import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";

@Component({
  selector: "app-list-order",
  templateUrl: "./list-order.component.html",
  styleUrls: ["./list-order.component.css"],
})
export class ListOrderComponent implements OnInit {
  orders: any;
  constructor(private data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        "http://localhost:8080/api/paniers/comandesNoLiv"
      );
      data["success"]
        ? (this.orders = data["data"])
        : this.data.error(data["error"]);
    } catch (error) {
      this.data.error(error["error"]);
    }
  }
}
