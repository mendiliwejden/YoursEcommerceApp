import { ProfileComponent } from "./user/profile/profile.component";
import { EditAccessoireComponent } from "./admin/product/edit-accessoire/edit-accessoire.component";
import { EditFeatureComponent } from "./admin/product/edit-feature/edit-feature.component";
import { EditDescriptionComponent } from "./admin/product/edit-description/edit-description.component";
import { DetailProductComponent } from "./admin/product/detail-product/detail-product.component";
import { AddDescriptionComponent } from "./admin/product/add-description/add-description.component";
import { AddAccessoireComponent } from "./admin/product/add-accessoire/add-accessoire.component";
import { AddFeatureComponent } from "./admin/product/add-feature/add-feature.component";
import { ListOrderComponent } from "./admin/orders/list-order/list-order.component";
import { EditProductComponent } from "./admin/product/edit-product/edit-product.component";
import { AddProductComponent } from "./admin/product/add-product/add-product.component";
import { ListProductComponent } from "./admin/product/list-product/list-product.component";
import { EditCategoryComponent } from "./admin/category/edit-category/edit-category.component";
import { AddCategoryComponent } from "./admin/category/add-category/add-category.component";
import { ListCategoryComponent } from "./admin/category/list-category/list-category.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { ErrorComponent } from "./user/error/error.component";
import { RegisterComponent } from "./user/register/register.component";
import { LoginComponent } from "./user/login/login.component";
import { HomeComponent } from "./user/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/listCategory",
    component: ListCategoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/addCategory",
    component: AddCategoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/editCategory/:id",
    component: EditCategoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/listProduct",
    component: ListProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/addProduct",
    component: AddProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/listProduct/addFeature/:id",
    component: AddFeatureComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/listProduct/addDescription/:id",
    component: AddDescriptionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/listProduct/addAccessoire/:id",
    component: AddAccessoireComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/DetailProduct/:id",
    component: DetailProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/editProduct/:id",
    component: EditProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/editDescription/:id",
    component: EditDescriptionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/editFeature/:id",
    component: EditFeatureComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/editAccessoire/:id",
    component: EditAccessoireComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard/listOrders",
    component: ListOrderComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "**",
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
