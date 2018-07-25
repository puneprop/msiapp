(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["checkout-checkout-module~index-index-module~product-product-module"],{

/***/ "./src/app/product/checkout/billing-details/billing-details.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/product/checkout/billing-details/billing-details.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  billing-details works!\n</p>\n"

/***/ }),

/***/ "./src/app/product/checkout/billing-details/billing-details.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/product/checkout/billing-details/billing-details.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/checkout/billing-details/billing-details.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/product/checkout/billing-details/billing-details.component.ts ***!
  \*******************************************************************************/
/*! exports provided: BillingDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingDetailsComponent", function() { return BillingDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BillingDetailsComponent = /** @class */ (function () {
    function BillingDetailsComponent() {
    }
    BillingDetailsComponent.prototype.ngOnInit = function () { };
    BillingDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-billing-details",
            template: __webpack_require__(/*! ./billing-details.component.html */ "./src/app/product/checkout/billing-details/billing-details.component.html"),
            styles: [__webpack_require__(/*! ./billing-details.component.scss */ "./src/app/product/checkout/billing-details/billing-details.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BillingDetailsComponent);
    return BillingDetailsComponent;
}());



/***/ }),

/***/ "./src/app/product/checkout/checkout-navbar/checkout-navbar.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/product/checkout/checkout-navbar/checkout-navbar.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3 class=\"text-center\">Checking Out Products</h3>\n\n<div class=\"board-inner\" id=\"status-buttons\">\n  <ul class=\"nav nav-tabs\" id=\"myTab\">\n    <div class=\"liner\"></div>\n\n    <!-- circular user icon -->\n    <li>\n      <a routerLink=\"/personal\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{ exact: true }\" data-toggle=\"tab\" title=\"Product Summary\">\n        <span class=\"round-tabs one\">\n          <i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i>\n        </span>\n      </a>\n    </li>\n\n    <!-- circular tasks icon -->\n    <li>\n      <a routerLink=\"/work\" routerLinkActive=\"active\" data-toggle=\"tab\" title=\"Shipping Details\">\n        <span class=\"round-tabs two\">\n          <i class=\"fa fa-truck\" aria-hidden=\"true\"></i>\n        </span>\n      </a>\n    </li>\n\n    <!-- circular home icon -->\n    <li>\n      <a routerLink=\"/address\" routerLinkActive=\"active\" data-toggle=\"tab\" title=\"Confirmation\">\n        <span class=\"round-tabs three\">\n          <i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i>\n        </span>\n      </a>\n    </li>\n\n    <!-- circular ok icon -->\n    <li>\n      <a routerLink=\"/result\" routerLinkActive=\"active\" data-toggle=\"tab\" title=\"Payment\">\n        <span class=\"round-tabs four\">\n          <i class=\"fa fa-credit-card\" aria-hidden=\"true\"></i>\n        </span>\n      </a>\n    </li>\n\n  </ul>\n  <div class=\"clearfix\"></div>\n</div>"

/***/ }),

/***/ "./src/app/product/checkout/checkout-navbar/checkout-navbar.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/product/checkout/checkout-navbar/checkout-navbar.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".board .nav-tabs {\n  position: relative;\n  margin: 40px auto;\n  margin-bottom: 0;\n  box-sizing: border-box; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n\n.nav {\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.liner {\n  height: 2px;\n  background: #ddd;\n  position: absolute;\n  width: 78%;\n  margin: 63px auto;\n  left: 0;\n  right: 0;\n  z-index: 1; }\n\n.nav-tabs > li {\n  width: 25%; }\n\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px; }\n\n.nav > li {\n  position: relative;\n  display: block; }\n\n.nav-tabs > li a {\n  width: 70px;\n  height: 70px;\n  margin: 20px auto;\n  border-radius: 100%;\n  padding: 0; }\n\n.nav-tabs > li > a {\n  line-height: 1.42857143;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0; }\n\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px; }\n\na {\n  color: #337ab7;\n  text-decoration: none; }\n\na {\n  background-color: transparent; }\n\n#status-buttons a.active span.round-tabs.one {\n  background: #22c222;\n  color: #fff; }\n\nspan.round-tabs.one {\n  color: #22c222;\n  border: 2px solid #22c222; }\n\nspan.round-tabs.two {\n  color: #febe29;\n  border: 2px solid #febe29; }\n\nspan.round-tabs.three {\n  color: #3e5e9a;\n  border: 2px solid #3e5e9a; }\n\nspan.round-tabs.four {\n  color: #f1685e;\n  border: 2px solid #f1685e; }\n\nspan.round-tabs {\n  width: 70px;\n  height: 70px;\n  line-height: 70px;\n  display: inline-block;\n  border-radius: 100px;\n  background: #fff;\n  z-index: 2;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  font-size: 25px; }\n"

/***/ }),

/***/ "./src/app/product/checkout/checkout-navbar/checkout-navbar.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/product/checkout/checkout-navbar/checkout-navbar.component.ts ***!
  \*******************************************************************************/
/*! exports provided: CheckoutNavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutNavbarComponent", function() { return CheckoutNavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CheckoutNavbarComponent = /** @class */ (function () {
    function CheckoutNavbarComponent() {
    }
    CheckoutNavbarComponent.prototype.ngOnInit = function () {
    };
    CheckoutNavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-checkout-navbar',
            template: __webpack_require__(/*! ./checkout-navbar.component.html */ "./src/app/product/checkout/checkout-navbar/checkout-navbar.component.html"),
            styles: [__webpack_require__(/*! ./checkout-navbar.component.scss */ "./src/app/product/checkout/checkout-navbar/checkout-navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CheckoutNavbarComponent);
    return CheckoutNavbarComponent;
}());



/***/ }),

/***/ "./src/app/product/checkout/checkout.component.html":
/*!**********************************************************!*\
  !*** ./src/app/product/checkout/checkout.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section>\n  <div class=\"container\">\n    <div class=\"board\">\n      <!-- Navigation Area (Circular Tabs) -->\n      <app-checkout-navbar></app-checkout-navbar>\n      <!-- End Navigation Area (Circular Tabs) -->\n\n      <!-- Content Area -->\n      <div class=\"tab-content\">\n        <!-- Routed view  -->\n        <router-outlet name=\"checkOutlet\"></router-outlet>\n      </div>\n      <!-- End Content Area -->\n    </div>\n\n    <!-- For Debugging: show our formData as it is being typed -->\n    <!-- <pre>{{ formData | json }}</pre> -->\n  </div>\n</section>"

/***/ }),

/***/ "./src/app/product/checkout/checkout.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/product/checkout/checkout.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".board {\n  margin: 60px auto;\n  height: 500px;\n  background: #fff; }\n"

/***/ }),

/***/ "./src/app/product/checkout/checkout.component.ts":
/*!********************************************************!*\
  !*** ./src/app/product/checkout/checkout.component.ts ***!
  \********************************************************/
/*! exports provided: CheckoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutComponent", function() { return CheckoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent() {
    }
    CheckoutComponent.prototype.ngOnInit = function () { };
    CheckoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-checkout",
            template: __webpack_require__(/*! ./checkout.component.html */ "./src/app/product/checkout/checkout.component.html"),
            styles: [__webpack_require__(/*! ./checkout.component.scss */ "./src/app/product/checkout/checkout.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CheckoutComponent);
    return CheckoutComponent;
}());



/***/ }),

/***/ "./src/app/product/checkout/checkout.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/product/checkout/checkout.module.ts ***!
  \*****************************************************/
/*! exports provided: CheckoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutModule", function() { return CheckoutModule; });
/* harmony import */ var _checkout_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkout.routing */ "./src/app/product/checkout/checkout.routing.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _checkout_navbar_checkout_navbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkout-navbar/checkout-navbar.component */ "./src/app/product/checkout/checkout-navbar/checkout-navbar.component.ts");
/* harmony import */ var _result_result_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./result/result.component */ "./src/app/product/checkout/result/result.component.ts");
/* harmony import */ var _products_products_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./products/products.component */ "./src/app/product/checkout/products/products.component.ts");
/* harmony import */ var _shipping_details_shipping_details_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shipping-details/shipping-details.component */ "./src/app/product/checkout/shipping-details/shipping-details.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _checkout_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./checkout.component */ "./src/app/product/checkout/checkout.component.ts");
/* harmony import */ var _billing_details_billing_details_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./billing-details/billing-details.component */ "./src/app/product/checkout/billing-details/billing-details.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var CheckoutModule = /** @class */ (function () {
    function CheckoutModule() {
    }
    CheckoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"], _checkout_routing__WEBPACK_IMPORTED_MODULE_0__["CheckoutRoutingModule"]],
            declarations: [
                _checkout_component__WEBPACK_IMPORTED_MODULE_8__["CheckoutComponent"],
                _billing_details_billing_details_component__WEBPACK_IMPORTED_MODULE_9__["BillingDetailsComponent"],
                _shipping_details_shipping_details_component__WEBPACK_IMPORTED_MODULE_5__["ShippingDetailsComponent"],
                _products_products_component__WEBPACK_IMPORTED_MODULE_4__["ProductsComponent"],
                _result_result_component__WEBPACK_IMPORTED_MODULE_3__["ResultComponent"],
                _checkout_navbar_checkout_navbar_component__WEBPACK_IMPORTED_MODULE_2__["CheckoutNavbarComponent"]
            ],
            exports: [_checkout_component__WEBPACK_IMPORTED_MODULE_8__["CheckoutComponent"]]
        })
    ], CheckoutModule);
    return CheckoutModule;
}());



/***/ }),

/***/ "./src/app/product/checkout/checkout.routing.ts":
/*!******************************************************!*\
  !*** ./src/app/product/checkout/checkout.routing.ts ***!
  \******************************************************/
/*! exports provided: checkoutRoutes, CheckoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkoutRoutes", function() { return checkoutRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutRoutingModule", function() { return CheckoutRoutingModule; });
/* harmony import */ var _checkout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkout.component */ "./src/app/product/checkout/checkout.component.ts");
/* harmony import */ var _result_result_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./result/result.component */ "./src/app/product/checkout/result/result.component.ts");
/* harmony import */ var _shipping_details_shipping_details_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipping-details/shipping-details.component */ "./src/app/product/checkout/shipping-details/shipping-details.component.ts");
/* harmony import */ var _billing_details_billing_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./billing-details/billing-details.component */ "./src/app/product/checkout/billing-details/billing-details.component.ts");
/* harmony import */ var _products_products_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./products/products.component */ "./src/app/product/checkout/products/products.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var checkoutRoutes = [
    {
        path: "checkouts",
        component: _checkout_component__WEBPACK_IMPORTED_MODULE_0__["CheckoutComponent"],
        children: [
            {
                path: "",
                component: _products_products_component__WEBPACK_IMPORTED_MODULE_4__["ProductsComponent"],
                outlet: "checkOutlet"
            },
            {
                path: "shipping-details",
                component: _shipping_details_shipping_details_component__WEBPACK_IMPORTED_MODULE_2__["ShippingDetailsComponent"],
                outlet: "checkOutlet"
            },
            {
                path: "billing-details",
                component: _billing_details_billing_details_component__WEBPACK_IMPORTED_MODULE_3__["BillingDetailsComponent"],
                outlet: "checkOutlet"
            },
            { path: "result", component: _result_result_component__WEBPACK_IMPORTED_MODULE_1__["ResultComponent"], outlet: "checkOutlet" }
        ]
    }
];
var CheckoutRoutingModule = /** @class */ (function () {
    function CheckoutRoutingModule() {
    }
    CheckoutRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_5__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(checkoutRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"]]
        })
    ], CheckoutRoutingModule);
    return CheckoutRoutingModule;
}());



/***/ }),

/***/ "./src/app/product/checkout/products/products.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/product/checkout/products/products.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/checkout/products/products.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/product/checkout/products/products.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/checkout/products/products.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/product/checkout/products/products.component.ts ***!
  \*****************************************************************/
/*! exports provided: ProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsComponent", function() { return ProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProductsComponent = /** @class */ (function () {
    function ProductsComponent() {
    }
    ProductsComponent.prototype.ngOnInit = function () { };
    ProductsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-products",
            template: __webpack_require__(/*! ./products.component.html */ "./src/app/product/checkout/products/products.component.html"),
            styles: [__webpack_require__(/*! ./products.component.scss */ "./src/app/product/checkout/products/products.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProductsComponent);
    return ProductsComponent;
}());



/***/ }),

/***/ "./src/app/product/checkout/result/result.component.html":
/*!***************************************************************!*\
  !*** ./src/app/product/checkout/result/result.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  result works!\n</p>\n"

/***/ }),

/***/ "./src/app/product/checkout/result/result.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/product/checkout/result/result.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/checkout/result/result.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/product/checkout/result/result.component.ts ***!
  \*************************************************************/
/*! exports provided: ResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultComponent", function() { return ResultComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResultComponent = /** @class */ (function () {
    function ResultComponent() {
    }
    ResultComponent.prototype.ngOnInit = function () { };
    ResultComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-result",
            template: __webpack_require__(/*! ./result.component.html */ "./src/app/product/checkout/result/result.component.html"),
            styles: [__webpack_require__(/*! ./result.component.scss */ "./src/app/product/checkout/result/result.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ResultComponent);
    return ResultComponent;
}());



/***/ }),

/***/ "./src/app/product/checkout/shipping-details/shipping-details.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/product/checkout/shipping-details/shipping-details.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  shipping-details works!\n</p>\n"

/***/ }),

/***/ "./src/app/product/checkout/shipping-details/shipping-details.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/product/checkout/shipping-details/shipping-details.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/checkout/shipping-details/shipping-details.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/product/checkout/shipping-details/shipping-details.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ShippingDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShippingDetailsComponent", function() { return ShippingDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShippingDetailsComponent = /** @class */ (function () {
    function ShippingDetailsComponent() {
    }
    ShippingDetailsComponent.prototype.ngOnInit = function () { };
    ShippingDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-shipping-details",
            template: __webpack_require__(/*! ./shipping-details.component.html */ "./src/app/product/checkout/shipping-details/shipping-details.component.html"),
            styles: [__webpack_require__(/*! ./shipping-details.component.scss */ "./src/app/product/checkout/shipping-details/shipping-details.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ShippingDetailsComponent);
    return ShippingDetailsComponent;
}());



/***/ })

}]);
//# sourceMappingURL=checkout-checkout-module~index-index-module~product-product-module.js.map