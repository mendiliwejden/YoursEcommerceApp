import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RestApiService } from "./services/rest-api.service";
import { DataService } from "./services/data.service";
import { AuthGuardService } from "./services/auth-guard.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { HomeComponent } from "./user/home/home.component";
import { ContactComponent } from "./user/contact/contact.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ErrorComponent } from "./user/error/error.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { NavbarAdminComponent } from "./admin/navbar-admin/navbar-admin.component";
import { SidebarAdminComponent } from "./admin/sidebar-admin/sidebar-admin.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { ListCategoryComponent } from "./admin/category/list-category/list-category.component";
import { AddCategoryComponent } from "./admin/category/add-category/add-category.component";
import { EditCategoryComponent } from "./admin/category/edit-category/edit-category.component";
import { ListProductComponent } from "./admin/product/list-product/list-product.component";
import { EditProductComponent } from "./admin/product/edit-product/edit-product.component";
import { AddProductComponent } from "./admin/product/add-product/add-product.component";
import { MessageComponent } from "./message/message.component";
import { ListOrderComponent } from './admin/orders/list-order/list-order.component';
import { AddDescriptionComponent } from './admin/product/add-description/add-description.component';
import { AddFeatureComponent } from './admin/product/add-feature/add-feature.component';
import { AddAccessoireComponent } from './admin/product/add-accessoire/add-accessoire.component';
import { DetailProductComponent } from './admin/product/detail-product/detail-product.component';
import { EditAccessoireComponent } from './admin/product/edit-accessoire/edit-accessoire.component';
import { EditFeatureComponent } from './admin/product/edit-feature/edit-feature.component';
import { EditDescriptionComponent } from './admin/product/edit-description/edit-description.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    NavbarComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DashboardComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListProductComponent,
    EditProductComponent,
    AddProductComponent,
    MessageComponent,
    ListOrderComponent,
    AddDescriptionComponent,
    AddFeatureComponent,
    AddAccessoireComponent,
    DetailProductComponent,
    EditAccessoireComponent,
    EditFeatureComponent,
    EditDescriptionComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
