import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "./common/http.service";
import { ApiApplication, paging } from "app/config/app.config";
import { ApiService } from "./common/api.service";
import { ProductServicesOption } from "app/model/product-services-option.model";
import { AllLstCart } from "app/model/lstCart.model";
import * as _ from "lodash";
import { NewAddress } from "app/model/new-address.model";
import { BookingProductModel } from "app/model/booking-product.model";
import { ItemsOnShop } from "app/model/items-on-shop.model";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class CartServices extends ApiService {
  constructor(http: HttpService, _router: Router) {
    super(ApiApplication.cart.controller, http, _router);
  }

  getAllServicesOption() {
    return this.get(
      this.apiBaseController + ApiApplication.cart.lstAllServicesOption
    ).map((rs) => {
      rs.result.data.map((item: ProductServicesOption) => {
        item.isChecked = false;
      });
      return rs.result.data;
    });
  }

  // api/cart/getListCart/?userId=1&perPage=10&page=1
  getAllItemsListCart(userId: number, perPage: number, page: number) {
    return this.get(
      this.apiBaseController +
        ApiApplication.cart.lstCart +
        "?" +
        ApiApplication.userId +
        "=" +
        userId +
        "&" +
        ApiApplication.perPage +
        "=" +
        perPage +
        "&" +
        ApiApplication.page +
        "=" +
        page
    );
  }

  //CalFeeInCart/?lServiceId=1&lCartId=19: // add services
  callFeeServicesInCart(lServiceId: number, lCartId: number) {
    return this.post(
      this.apiBaseController +
        ApiApplication.cart.addFeeServices +
        "?" +
        ApiApplication.lServiceId +
        "=" +
        lServiceId +
        "&" +
        ApiApplication.lCartId +
        "=" +
        lCartId
    );
  }

  //api/Cart/deleteCartServiceById/11 // remove services
  delFeeServicesInCart(lCartServiceId: number) {
    return this.deleteWithParams(
      this.apiBaseController + ApiApplication.cart.delPriceServices,
      lCartServiceId
    );
  }

  // api/Cart/deleteShopItem/11  // x??a shop items
  delShopItem(lCartItemId: number) {
    return this.deleteWithParams(
      this.apiBaseController + ApiApplication.cart.deleteShopItem,
      lCartItemId
    );
  }

  // x??a shop
  //api/Cart/deleteShop/11
  delShop(lCartId: number) {
    return this.deleteWithParams(
      this.apiBaseController + ApiApplication.cart.deleteShop,
      lCartId
    );
  }

  // api/Cart/getListDeliveryAddressByUserId?userId=1
  getAllAddress(userId: number) {
    return this.get(
      this.apiBaseController +
        ApiApplication.cart.getListDeliveryAddressByUserId +
        "?" +
        ApiApplication.userId +
        "=" +
        userId
    );
  }

  // th??m ?????a ch??? nh???n h??ng
  addNewAddress(address: NewAddress) {
    return this.post(
      this.apiBaseController + ApiApplication.cart.addDeliveryAddress,
      address
    );
  }

  // th??m ?????a ch??? nh???n h??ng
  updateAddress(address: NewAddress) {
    return this.post(
      this.apiBaseController + ApiApplication.cart.updateDeliveryAddress,
      address
    );
  }

  // x??a ?????a ch??? nh???n h??ng
  delAddress(addressId: number) {
    return this.put(
      this.apiBaseController +
        ApiApplication.cart.deactiveDeliveryAddressById +
        "?deliveryAddressId=" +
        addressId
    );
  }

  getCountry() {
    return this.get(ApiApplication.cart.getCountry);
  }

  //api/System/getAreaByParent/1
  getOtherDistance(id: number) {
    return this.get(ApiApplication.cart.getAreaOther + id);
  }

  checkDepositListOrder(deposit: BookingProductModel) {
    return this.put(
      this.apiBaseController + ApiApplication.cart.depositLsProduct,
      deposit
    );
  }

  updateNoteCart(cart: AllLstCart) {
    return this.put(
      this.apiBaseController + ApiApplication.cart.UpdateNoteCart,
      cart
    );
  }

  updateNoteItem(item: ItemsOnShop) {
    return this.put(
      this.apiBaseController + ApiApplication.cart.UpdateNoteItem,
      item
    );
  }

  updateQuanlityItem(item: ItemsOnShop) {
    return this.put(
      this.apiBaseController + ApiApplication.cart.UpdateQuanlity,
      item
    );
  }

  addToCardBasic(data: any) {
    return this.post(
      this.apiBaseController + ApiApplication.cart.AddToCartBasic,
      data
    );
  }

  //service d??ng cho order consignment
  getLsServiceConsignment(serviceGroupId?) {
    let url = "getLsServiceConsignment";
    if(serviceGroupId){
      url = `getLsServiceConsignment?serviceGroupId=${serviceGroupId}`
    }
    // danh s??ch d???ch v???
    return this.get(this.apiBaseController + url).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getListClassification() {
    // danh s??ch th??ng tin khai b??o
    return this.get(this.apiBaseController + "getListClassification").pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getListDeliveryAddressByUserId(userId) {
    // danh s??ch ?????a ch??? nh???n h??ng
    return this.get(
      this.apiBaseController +
        "getListDeliveryAddressByUserId/?userId=" +
        userId
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addDeliveryAddress(params) {
    // l??u ?????a ch??? nh???n h??ng
    return this.post(
      this.apiBaseController + "addDeliveryAddress",
      params
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deactiveDeliveryAddressById(deliveryAddressId) {
    // l??u ?????a ch??? nh???n h??ng
    const url =
      this.apiBaseController +
      "deactiveDeliveryAddressById/?deliveryAddressId" +
      deliveryAddressId;
    return this.post(url, deliveryAddressId).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
