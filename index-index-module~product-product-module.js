(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index-index-module~product-product-module"],{

/***/ "./node_modules/shortid/index.js":
/*!***************************************!*\
  !*** ./node_modules/shortid/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(/*! ./lib/index */ "./node_modules/shortid/lib/index.js");


/***/ }),

/***/ "./node_modules/shortid/lib/alphabet.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/alphabet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(/*! ./random/random-from-seed */ "./node_modules/shortid/lib/random/random-from-seed.js");

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),

/***/ "./node_modules/shortid/lib/build.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/build.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(/*! ./encode */ "./node_modules/shortid/lib/encode.js");
var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),

/***/ "./node_modules/shortid/lib/decode.js":
/*!********************************************!*\
  !*** ./node_modules/shortid/lib/decode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),

/***/ "./node_modules/shortid/lib/encode.js":
/*!********************************************!*\
  !*** ./node_modules/shortid/lib/encode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(/*! ./random/random-byte */ "./node_modules/shortid/lib/random/random-byte-browser.js");

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),

/***/ "./node_modules/shortid/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");
var encode = __webpack_require__(/*! ./encode */ "./node_modules/shortid/lib/encode.js");
var decode = __webpack_require__(/*! ./decode */ "./node_modules/shortid/lib/decode.js");
var build = __webpack_require__(/*! ./build */ "./node_modules/shortid/lib/build.js");
var isValid = __webpack_require__(/*! ./is-valid */ "./node_modules/shortid/lib/is-valid.js");

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(/*! ./util/cluster-worker-id */ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js") || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),

/***/ "./node_modules/shortid/lib/is-valid.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/is-valid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),

/***/ "./node_modules/shortid/lib/random/random-byte-browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-byte-browser.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),

/***/ "./node_modules/shortid/lib/random/random-from-seed.js":
/*!*************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-from-seed.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),

/***/ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/lib/util/cluster-worker-id-browser.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),

/***/ "./src/app/index/index.component.html":
/*!********************************************!*\
  !*** ./src/app/index/index.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Carousel -->\r\n<div class=\"container\">\r\n  <!--Carousel Wrapper-->\r\n  <div id=\"carousel-example-2\" class=\"carousel slide carousel-fade\" data-ride=\"carousel\">\r\n    <!--Indicators-->\r\n    <ol class=\"carousel-indicators\">\r\n      <li data-target=\"#carousel-example-2\" data-slide-to=\"0\" class=\"active\"></li>\r\n      <li data-target=\"#carousel-example-2\" data-slide-to=\"1\"></li>\r\n      <li data-target=\"#carousel-example-2\" data-slide-to=\"2\"></li>\r\n    </ol>\r\n    <!--/.Indicators-->\r\n    <!--Slides-->\r\n    <div class=\"carousel-inner\" role=\"listbox\">\r\n      <div class=\"carousel-item active\">\r\n        <div class=\"view\">\r\n          <img class=\"d-block w-100\" src=\"../../assets/banner_img/img_1.jpg\" alt=\"First slide\">\r\n          <div class=\"mask rgba-black-light\"></div>\r\n        </div>\r\n        <div class=\"carousel-caption\">\r\n          <h3 class=\"h3-responsive\">Apple iPhone</h3>\r\n          <p>Explore iPhone, the world's most powerful personal device</p>\r\n        </div>\r\n      </div>\r\n      <div class=\"carousel-item\">\r\n        <!--Mask color-->\r\n        <div class=\"view\">\r\n          <img class=\"d-block w-100\" src=\"../../assets/banner_img/img_3.jpg\" alt=\"Third slide\">\r\n          <div class=\"mask rgba-black-slight\"></div>\r\n        </div>\r\n        <div class=\"carousel-caption\">\r\n          <h3 class=\"h3-responsive\">Never Settle - OnePlus</h3>\r\n          <p>OnePlus creates beautifully designed products with premium build quality & brings the best technology to users\r\n            around the world</p>\r\n        </div>\r\n      </div>\r\n      <div class=\"carousel-item\">\r\n        <!--Mask color-->\r\n        <div class=\"view\">\r\n          <img class=\"d-block w-100\" src=\"../../assets/banner_img/img_4.jpg\" alt=\"Third slide\">\r\n          <div class=\"mask rgba-black-slight\"></div>\r\n        </div>\r\n        <div class=\"carousel-caption\">\r\n          <h3 class=\"h3-responsive\">Google Pixel</h3>\r\n          <p>Discover a better way to capture, store, and see the world</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.Slides-->\r\n    <!--Controls-->\r\n    <a class=\"carousel-control-prev\" href=\"#carousel-example-2\" role=\"button\" data-slide=\"prev\">\r\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n      <span class=\"sr-only\">Previous</span>\r\n    </a>\r\n    <a class=\"carousel-control-next\" href=\"#carousel-example-2\" role=\"button\" data-slide=\"next\">\r\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n      <span class=\"sr-only\">Next</span>\r\n    </a>\r\n    <!--/.Controls-->\r\n  </div>\r\n  <!--/.Carousel Wrapper-->\r\n  <br>\r\n  <app-best-product></app-best-product>\r\n</div>"

/***/ }),

/***/ "./src/app/index/index.component.scss":
/*!********************************************!*\
  !*** ./src/app/index/index.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/index/index.component.ts":
/*!******************************************!*\
  !*** ./src/app/index/index.component.ts ***!
  \******************************************/
/*! exports provided: IndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexComponent", function() { return IndexComponent; });
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

var IndexComponent = /** @class */ (function () {
    function IndexComponent() {
    }
    IndexComponent.prototype.ngOnInit = function () { };
    IndexComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-index",
            template: __webpack_require__(/*! ./index.component.html */ "./src/app/index/index.component.html"),
            styles: [__webpack_require__(/*! ./index.component.scss */ "./src/app/index/index.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ }),

/***/ "./src/app/product/add-product/add-product.component.html":
/*!****************************************************************!*\
  !*** ./src/app/product/add-product/add-product.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Modal -->\r\n<div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Product</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form #addProductForm=\"ngForm\" (ngSubmit)=\"createProduct(addProductForm)\">\r\n          <!--First row-->\r\n          <div class=\"row\">\r\n            <!--First column-->\r\n            <div class=\"col-md-6\">\r\n              <div class=\"md-form\">\r\n                <input type=\"text\" class=\"form-control\" id=\"form9\" name=\"productName\" [(ngModel)]=\"product.productName\" placeholder=\"Product Name\">\r\n              </div>\r\n            </div>\r\n            <!--Second column-->\r\n            <div class=\"col-md-6\">\r\n              <div class=\"md-form\">\r\n                <input type=\"text\" class=\"form-control\" id=\"form10\" name=\"productCategory\" [(ngModel)]=\"product.productCategory\" placeholder=\"Product Category\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!--/.First row-->\r\n          <!--Second row-->\r\n          <div class=\"row\">\r\n            <!--First column-->\r\n            <div class=\"col-md-12\">\r\n              <div class=\"md-form\">\r\n                <textarea type=\"text\" id=\"form76\" class=\"md-textarea\" placeholder=\"Product Description\" name=\"productDescription\" [(ngModel)]=\"product.productDescription\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!--/.Second row-->\r\n          <!--Third row-->\r\n          <div class=\"row\">\r\n            <!--First column-->\r\n            <div class=\"col-md-6\">\r\n              <div class=\"md-form\">\r\n                <input type=\"number\" id=\"form41\" name=\"productPrice\" class=\"form-control\" [(ngModel)]=\"product.productPrice\" placeholder=\"Product Price\">\r\n              </div>\r\n            </div>\r\n            <!--Second column-->\r\n            <div class=\"col-md-6\">\r\n              <div class=\"md-form\">\r\n                <input type=\"text\" id=\"form51\" class=\"form-control\" name=\"productQuatity\" [(ngModel)]=\"product.productQuatity\" placeholder=\"Product Quantity\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!--/.Third row-->\r\n          <!--Fourth row-->\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"md-form\">\r\n                <input type=\"text\" id=\"form51\" [(ngModel)]=\"product.productSeller\" class=\"form-control\" name=\"productSeller\" placeholder=\"Seller\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!--/.Fourth row-->\r\n          <!--Fifth row-->\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"md-form\">\r\n                <input type=\"text\" id=\"form51\" [(ngModel)]=\"product.productImageUrl\" class=\"form-control\" name=\"productImageUrl\" placeholder=\"Image Url exactly 640*360 dimensions\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!--/.Fifth row-->\r\n          <div class=\"modal-footer\">\r\n            <button type=\"submit\" class=\"btn btn-primary\">Add Product</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/product/add-product/add-product.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/product/add-product/add-product.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/add-product/add-product.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/product/add-product/add-product.component.ts ***!
  \**************************************************************/
/*! exports provided: AddProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddProductComponent", function() { return AddProductComponent; });
/* harmony import */ var ng2_toasty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ng2-toasty */ "./node_modules/ng2-toasty/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_models_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/models/product */ "./src/app/shared/models/product.ts");
/* harmony import */ var _shared_services_product_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/product.service */ "./src/app/shared/services/product.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var shortId = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
var AddProductComponent = /** @class */ (function () {
    function AddProductComponent(productService, toastyService, toastyConfig) {
        this.productService = productService;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.product = new _shared_models_product__WEBPACK_IMPORTED_MODULE_2__["Product"]();
        this.toastyConfig.theme = "material";
    }
    AddProductComponent.prototype.ngOnInit = function () { };
    AddProductComponent.prototype.createProduct = function (productForm) {
        var toastOptions = {
            title: "Product Creation",
            msg: "product " + productForm.value["productName"] + "is added successfully",
            showClose: true,
            timeout: 5000,
            theme: "default"
        };
        productForm.value["productId"] = "PROD_" + shortId.generate();
        productForm.value["productAdded"] = moment().unix();
        productForm.value["ratings"] = Math.floor(Math.random() * 5 + 1);
        if (productForm.value["productImageUrl"] === undefined) {
            productForm.value["productImageUrl"] =
                "http://via.placeholder.com/640x360/007bff/ffffff";
        }
        productForm.value["favourite"] = false;
        var date = productForm.value["productAdded"];
        this.productService.createProduct(productForm.value);
        this.product = new _shared_models_product__WEBPACK_IMPORTED_MODULE_2__["Product"]();
        $("#exampleModalLong").modal("hide");
        this.toastyService.success(toastOptions);
    };
    AddProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-add-product",
            template: __webpack_require__(/*! ./add-product.component.html */ "./src/app/product/add-product/add-product.component.html"),
            styles: [__webpack_require__(/*! ./add-product.component.scss */ "./src/app/product/add-product/add-product.component.scss")]
        }),
        __metadata("design:paramtypes", [_shared_services_product_service__WEBPACK_IMPORTED_MODULE_3__["ProductService"],
            ng2_toasty__WEBPACK_IMPORTED_MODULE_0__["ToastyService"],
            ng2_toasty__WEBPACK_IMPORTED_MODULE_0__["ToastyConfig"]])
    ], AddProductComponent);
    return AddProductComponent;
}());



/***/ }),

/***/ "./src/app/product/best-product/best-product.component.html":
/*!******************************************************************!*\
  !*** ./src/app/product/best-product/best-product.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Section: Products v.2-->\r\n<section class=\"section pb-3\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <blockquote class=\"blockquote float-left bq-primary\">\r\n        <h3 class=\"bq-title\">Our Best Products</h3>\r\n      </blockquote>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <a class=\"btn btn-default float-right\" [routerLink]=\"[ '/products/all-products' ]\">View All</a>\r\n    </div>\r\n  </div>\r\n  <owl-carousel [options]=\"options\" [items]=\"bestProducts\" [carouselClasses]=\"['owl-theme', 'row', 'sliding']\">\r\n    <!--First column-->\r\n    <div class=\"item\" style=\"padding:20px\" *ngFor=\"let product of bestProducts;let i = index\">\r\n      <div class=\" mb-r\">\r\n\r\n        <!--Card-->\r\n        <div class=\"card card-cascade wider\">\r\n\r\n          <!--Card image-->\r\n          <a [routerLink]=\"['/products/product', product.$key]\">\r\n            <div class=\"view overlay hm-white-slight\">\r\n              <img [src]=\"product.productImageUrl\" class=\"img-fluid\" alt=\"\">\r\n              <a>\r\n                <div class=\"mask waves-effect waves-light\" mdbRippleRadius></div>\r\n              </a>\r\n            </div>\r\n          </a>\r\n          <!--/.Card image-->\r\n\r\n          <!--Card content-->\r\n          <div class=\"card-body text-center no-padding\">\r\n            <!--Category & Title-->\r\n            <a href=\"\" class=\"text-muted\">\r\n              <h5>{{ product.productCategory }}</h5>\r\n            </a>\r\n            <h5 class=\"card-title\">\r\n              <strong>\r\n                <a [routerLink]=\"['/products/product', product.$key]\">{{ product.productName }}</a>\r\n              </strong>\r\n            </h5>\r\n\r\n            <!--Description-->\r\n            <p class=\"card-text\">{{ product.productDescription }}\r\n            </p>\r\n\r\n            <!--Card footer-->\r\n            <div class=\"card-footer\">\r\n              <span class=\"left\">{{ product.productPrice }}$</span>\r\n              <span class=\"right\">\r\n                <a placement=\"top\" mdbTooltip=\"Add to Wishlist\" container=\"body\">\r\n                  <i class=\"fa fa-heart\"></i>\r\n                </a>\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <!--/.Card content-->\r\n        </div>\r\n        <!--/.Card-->\r\n      </div>\r\n      <!--/First column-->\r\n    </div>\r\n  </owl-carousel>\r\n</section>\r\n<!--Section: Products v.2-->"

/***/ }),

/***/ "./src/app/product/best-product/best-product.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/product/best-product/best-product.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".section .section-heading {\n  margin-top: 2rem;\n  margin-bottom: 4rem; }\n\n.section-heading {\n  text-align: center; }\n\n.section-description {\n  margin-left: 5%;\n  margin-right: 5%; }\n\n.section-description {\n  color: #757575;\n  margin-bottom: 4rem;\n  margin-left: 15%;\n  margin-right: 15%;\n  text-align: center; }\n\n.section img {\n  max-width: 100%;\n  height: auto; }\n\n.card.card-cascade.narrower {\n  margin-top: 20px; }\n\n.card.card-cascade {\n  width: 100%; }\n\n.card:not([class*=\"card-outline-\"]) {\n  border: 0; }\n\n.card.card-cascade.narrower .view {\n  margin-left: 4%;\n  margin-right: 4%;\n  margin-top: -20px; }\n\n.card.card-cascade .view {\n  border-radius: 4px; }\n\n.btn-floating:hover,\n.card-overlay,\n.card.card-cascade .view,\n.colorful-select .dropdown-content li a:hover,\n.colorful-select .dropdown-content li span:hover,\n.comments-list img,\n.modal-dialog.cascading-modal.modal-avatar .modal-header img,\n.reply-form img,\n.testimonial-carousel .testimonial .avatar img,\n.z-depth-2 {\n  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n\n.card.card-cascade .card-body {\n  padding-top: 1.8rem; }\n\n.btn .fa,\n.card .card-body {\n  position: relative; }\n\n.card .rating {\n  color: #ffa000; }\n\n.rating {\n  list-style-type: none; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.rating li {\n  display: inline-block; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.card-text {\n  line-height: 20px;\n  height: 60px;\n  overflow: hidden; }\n\n.card .card-footer {\n  background-color: transparent; }\n\n.card .card-footer .left {\n  float: left; }\n\n.card .card-footer .right {\n  float: right;\n  display: flex; }\n\n.card .card-footer .right a.active {\n  color: #d50000; }\n\n.card .card-footer .right a {\n  color: #757575;\n  margin-left: 1rem;\n  transition: 0.4s; }\n"

/***/ }),

/***/ "./src/app/product/best-product/best-product.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/product/best-product/best-product.component.ts ***!
  \****************************************************************/
/*! exports provided: BestProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BestProductComponent", function() { return BestProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/product.service */ "./src/app/shared/services/product.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BestProductComponent = /** @class */ (function () {
    function BestProductComponent(productService) {
        this.productService = productService;
        this.bestProducts = [];
    }
    BestProductComponent.prototype.ngOnInit = function () {
        this.options = {
            dots: false,
            responsive: {
                "0": { items: 1, margin: 5 },
                "430": { items: 2, margin: 5 },
                "550": { items: 3, margin: 5 },
                "670": { items: 4, margin: 5 }
            },
            autoplay: true,
            loop: true,
            autoplayTimeout: 3000,
            lazyLoad: true
        };
        this.getAllProducts();
    };
    BestProductComponent.prototype.getAllProducts = function () {
        var _this = this;
        var x = this.productService.getProducts();
        x.snapshotChanges().subscribe(function (product) {
            _this.bestProducts = [];
            for (var i = 0; i < 5; i++) {
                var y = product[i].payload.toJSON();
                y["$key"] = product[i].key;
                _this.bestProducts.push(y);
            }
            // product.forEach(element => {
            //   const y = element.payload.toJSON();
            //   y["$key"] = element.key;
            //   this.bestProducts.push(y as Product);
            // });
        });
    };
    BestProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-best-product",
            template: __webpack_require__(/*! ./best-product.component.html */ "./src/app/product/best-product/best-product.component.html"),
            styles: [__webpack_require__(/*! ./best-product.component.scss */ "./src/app/product/best-product/best-product.component.scss")]
        }),
        __metadata("design:paramtypes", [_shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]])
    ], BestProductComponent);
    return BestProductComponent;
}());



/***/ }),

/***/ "./src/app/product/cart-calculator/cart-calculator.component.html":
/*!************************************************************************!*\
  !*** ./src/app/product/cart-calculator/cart-calculator.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\"d-flex justify-content-between align-items-center mb-3\">\n  <span class=\"text-muted\">Your cart</span>\n  <span class=\"badge badge-primary badge-pill\">{{products.length}}</span>\n</h4>\n<ul class=\"list-group mb-3\">\n  <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let product of products\">\n    <div>\n      <h6 class=\"my-0\">{{product.productName}}</h6>\n    </div>\n    <span class=\"text-muted\">${{product.productPrice}}</span>\n  </li>\n  <hr>\n  <li class=\"list-group-item d-flex justify-content-between\">\n    <span>Total (USD)</span>\n    <strong>${{totalValue}}</strong>\n  </li>\n  <a class=\"btn btn-primary\" [routerLink]=\"['/products/all-products']\">Continue Shipping</a>\n  <a class=\"btn btn-default\" [routerLink]=\"['/checkouts']\">Checkout</a>\n\n</ul>"

/***/ }),

/***/ "./src/app/product/cart-calculator/cart-calculator.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/product/cart-calculator/cart-calculator.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/cart-calculator/cart-calculator.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/product/cart-calculator/cart-calculator.component.ts ***!
  \**********************************************************************/
/*! exports provided: CartCalculatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartCalculatorComponent", function() { return CartCalculatorComponent; });
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

var CartCalculatorComponent = /** @class */ (function () {
    function CartCalculatorComponent() {
        this.totalValue = 0;
    }
    CartCalculatorComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var dataChanges = changes.products;
        var products = dataChanges.currentValue;
        this.totalValue = 0;
        products.forEach(function (product) {
            console.log("Adding: " + product.productName + " $ " + product.productPrice);
            _this.totalValue += product.productPrice;
        });
    };
    CartCalculatorComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], CartCalculatorComponent.prototype, "products", void 0);
    CartCalculatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-cart-calculator",
            template: __webpack_require__(/*! ./cart-calculator.component.html */ "./src/app/product/cart-calculator/cart-calculator.component.html"),
            styles: [__webpack_require__(/*! ./cart-calculator.component.scss */ "./src/app/product/cart-calculator/cart-calculator.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CartCalculatorComponent);
    return CartCalculatorComponent;
}());



/***/ }),

/***/ "./src/app/product/cart-products/cart-products.component.html":
/*!********************************************************************!*\
  !*** ./src/app/product/cart-products/cart-products.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br>\n<div class=\"container\" *ngIf=\"cartProducts.length > 0\">\n  <div class=\"row\">\n    <!-- List of Products -->\n    <div class=\"col-8\">\n      <div class=\"row\">\n        <div class=\"col-4\" *ngFor=\"let product of cartProducts\">\n          <div class=\"item\">\n            <div class=\" mb-r\">\n\n              <!--Card-->\n              <div class=\"card card-cascade wider\">\n\n                <!--Card image-->\n                <a [routerLink]=\"['/products/product', product.$key ]\">\n\n                  <div class=\"view overlay hm-white-slight\">\n                    <img [src]=\"product.productImageUrl\" class=\"img-fluid\" alt=\"\" width=\"360px\" height=\"640px\">\n                    <a>\n                      <div class=\"mask waves-effect waves-light\" mdbRippleRadius></div>\n                    </a>\n                  </div>\n                </a>\n\n                <!--/.Card image-->\n\n                <!--Card content-->\n                <div class=\"card-body text-center no-padding\">\n                  <!--Category & Title-->\n                  <a class=\"text-muted\">\n                    <h5>{{ product.productCategory }}</h5>\n                  </a>\n                  <h5 class=\"card-title\">\n                    <strong>\n                      <a [routerLink]=\"['/products/product', product.$key]\">{{ product.productName }}</a>\n                    </strong>\n                  </h5>\n\n                  <!--Description-->\n                  <p class=\"card-text\">{{ product.productDescription }}\n                  </p>\n\n                  <!--Card footer-->\n                  <div class=\"card-footer\">\n                    <span class=\"left\">{{ product.productPrice }} $</span>\n                    <span class=\"right\">\n                      <a placement=\"top\" mdbTooltip=\"Quick Look\" container=\"body\" [routerLink]=\"['/products/product', product.$key]\">\n                        <i class=\"fa fa-eye\"></i>\n                      </a>\n                      <a placement=\"top\" mdbTooltip=\"Remove Product\" container=\"body\" (click)=\"removeCartProduct(product)\">\n                        <i class=\"fa fa-trash\"></i>\n                      </a>\n                    </span>\n                  </div>\n\n                </div>\n                <!--/.Card content-->\n\n              </div>\n              <!--/.Card-->\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n    <div class=\"col-4\">\n      <app-cart-calculator [products]=\"cartProducts\"></app-cart-calculator>\n    </div>\n  </div>\n</div>\n<div class=\"container\" *ngIf=\"cartProducts.length === 0\">\n  <app-no-products-found [title]=\"messageTitle\" [description]=\"messageDescription\"></app-no-products-found>\n</div>"

/***/ }),

/***/ "./src/app/product/cart-products/cart-products.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/product/cart-products/cart-products.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".section .section-heading {\n  margin-top: 2rem;\n  margin-bottom: 4rem; }\n\n.section-heading {\n  text-align: center; }\n\n.section-description {\n  margin-left: 5%;\n  margin-right: 5%; }\n\n.section-description {\n  color: #757575;\n  margin-bottom: 4rem;\n  margin-left: 15%;\n  margin-right: 15%;\n  text-align: center; }\n\n.section img {\n  max-width: 100%;\n  height: auto; }\n\n.card.card-cascade.narrower {\n  margin-top: 10px; }\n\n.card.card-cascade {\n  width: 100%; }\n\n.card:not([class*=\"card-outline-\"]) {\n  border: 0; }\n\n.card.card-cascade.narrower .view {\n  margin-left: 4%;\n  margin-right: 4%;\n  margin-top: -20px; }\n\n.card.card-cascade .view {\n  border-radius: 4px; }\n\n.btn-floating:hover,\n.card-overlay,\n.card.card-cascade .view,\n.colorful-select .dropdown-content li a:hover,\n.colorful-select .dropdown-content li span:hover,\n.comments-list img,\n.modal-dialog.cascading-modal.modal-avatar .modal-header img,\n.reply-form img,\n.testimonial-carousel .testimonial .avatar img,\n.z-depth-2 {\n  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n\n.card.card-cascade .card-body {\n  padding-top: 1.8rem; }\n\n.btn .fa,\n.card .card-body {\n  position: relative; }\n\n.card .rating {\n  color: #ffa000; }\n\n.rating {\n  list-style-type: none; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.rating li {\n  display: inline-block; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.card-text {\n  line-height: 20px;\n  height: 60px;\n  overflow: hidden; }\n\n.card .card-footer {\n  background-color: transparent; }\n\n.card .card-footer .left {\n  float: left; }\n\n.card .card-footer .right {\n  float: right;\n  display: flex; }\n\n.card .card-footer .right a.active {\n  color: #d50000; }\n\n.card .card-footer .right a {\n  color: #757575;\n  margin-left: 1rem;\n  transition: 0.4s; }\n"

/***/ }),

/***/ "./src/app/product/cart-products/cart-products.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/product/cart-products/cart-products.component.ts ***!
  \******************************************************************/
/*! exports provided: CartProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartProductsComponent", function() { return CartProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/product.service */ "./src/app/shared/services/product.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartProductsComponent = /** @class */ (function () {
    function CartProductsComponent(productService) {
        this.productService = productService;
        this.showDataNotFound = true;
        // Not Found Message
        this.messageTitle = "No Products Found in Cart";
        this.messageDescription = "Please, Add Products to Cart";
    }
    CartProductsComponent.prototype.ngOnInit = function () {
        this.getCartProduct();
    };
    CartProductsComponent.prototype.removeCartProduct = function (product) {
        this.productService.removeLocalCartProduct(product);
        // Recalling
        this.getCartProduct();
    };
    CartProductsComponent.prototype.getCartProduct = function () {
        this.cartProducts = this.productService.getLocalCartProducts();
    };
    CartProductsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-cart-products",
            template: __webpack_require__(/*! ./cart-products.component.html */ "./src/app/product/cart-products/cart-products.component.html"),
            styles: [__webpack_require__(/*! ./cart-products.component.scss */ "./src/app/product/cart-products/cart-products.component.scss")]
        }),
        __metadata("design:paramtypes", [_shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]])
    ], CartProductsComponent);
    return CartProductsComponent;
}());



/***/ }),

/***/ "./src/app/product/favourite-products/favourite-products.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/product/favourite-products/favourite-products.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br>\n<div class=\"container\" *ngIf=\"favoruiteProducts.length > 0\">\n  <div class=\"row\">\n    <!-- List of Products -->\n    <div class=\"col-sm-4\" *ngFor=\"let product of favoruiteProducts\">\n      <div class=\"item\">\n        <div class=\" mb-r\">\n\n          <!--Card-->\n          <div class=\"card card-cascade wider\">\n\n            <!--Card image-->\n            <a [routerLink]=\"['/products/product', product.$key ]\">\n\n              <div class=\"view overlay hm-white-slight\">\n                <img [src]=\"product.productImageUrl\" class=\"img-fluid\" alt=\"\" width=\"360px\" height=\"640px\">\n                <a>\n                  <div class=\"mask waves-effect waves-light\" mdbRippleRadius></div>\n                </a>\n              </div>\n            </a>\n\n            <!--/.Card image-->\n\n            <!--Card content-->\n            <div class=\"card-body text-center no-padding\">\n              <!--Category & Title-->\n              <a class=\"text-muted\">\n                <h5>{{ product.productCategory }}</h5>\n              </a>\n              <h5 class=\"card-title\">\n                <strong>\n                  <a [routerLink]=\"['/products/product', product.$key]\">{{ product.productName }}</a>\n                </strong>\n              </h5>\n\n              <!--Description-->\n              <p class=\"card-text\">{{ product.productDescription }}\n              </p>\n\n              <!--Card footer-->\n              <div class=\"card-footer\">\n                <span class=\"left\">{{ product.productPrice }} $</span>\n                <span class=\"right\">\n                  <a placement=\"top\" mdbTooltip=\"Quick Look\" container=\"body\" [routerLink]=\"['/products/product', product.$key]\">\n                    <i class=\"fa fa-eye\"></i>\n                  </a>\n                  <a placement=\"top\" mdbTooltip=\"Remove Product\" container=\"body\" (click)=\"removeFavourite(product)\">\n                    <i class=\"fa fa-trash\"></i>\n                  </a>\n                </span>\n              </div>\n\n            </div>\n            <!--/.Card content-->\n\n          </div>\n          <!--/.Card-->\n\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container\" *ngIf=\"favoruiteProducts.length === 0\">\n\n  <app-no-products-found [title]=\"messageTitle\" [description]=\"messageDescription\"></app-no-products-found>\n</div>\n"

/***/ }),

/***/ "./src/app/product/favourite-products/favourite-products.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/product/favourite-products/favourite-products.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".section .section-heading {\n  margin-top: 2rem;\n  margin-bottom: 4rem; }\n\n.section-heading {\n  text-align: center; }\n\n.section-description {\n  margin-left: 5%;\n  margin-right: 5%; }\n\n.section-description {\n  color: #757575;\n  margin-bottom: 4rem;\n  margin-left: 15%;\n  margin-right: 15%;\n  text-align: center; }\n\n.section img {\n  max-width: 100%;\n  height: auto; }\n\n.card.card-cascade.narrower {\n  margin-top: 10px; }\n\n.card.card-cascade {\n  width: 100%; }\n\n.card:not([class*=\"card-outline-\"]) {\n  border: 0; }\n\n.card.card-cascade.narrower .view {\n  margin-left: 4%;\n  margin-right: 4%;\n  margin-top: -20px; }\n\n.card.card-cascade .view {\n  border-radius: 4px; }\n\n.btn-floating:hover,\n.card-overlay,\n.card.card-cascade .view,\n.colorful-select .dropdown-content li a:hover,\n.colorful-select .dropdown-content li span:hover,\n.comments-list img,\n.modal-dialog.cascading-modal.modal-avatar .modal-header img,\n.reply-form img,\n.testimonial-carousel .testimonial .avatar img,\n.z-depth-2 {\n  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n\n.card.card-cascade .card-body {\n  padding-top: 1.8rem; }\n\n.btn .fa,\n.card .card-body {\n  position: relative; }\n\n.card .rating {\n  color: #ffa000; }\n\n.rating {\n  list-style-type: none; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.rating li {\n  display: inline-block; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.card-text {\n  line-height: 20px;\n  height: 60px;\n  overflow: hidden; }\n\n.card .card-footer {\n  background-color: transparent; }\n\n.card .card-footer .left {\n  float: left; }\n\n.card .card-footer .right {\n  float: right;\n  display: flex; }\n\n.card .card-footer .right a.active {\n  color: #d50000; }\n\n.card .card-footer .right a {\n  color: #757575;\n  margin-left: 1rem;\n  transition: 0.4s; }\n\nbody {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOS8xMiKqq3kAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAABHklEQVRIib2Vyw6EIAxFW5idr///Qx9sfG3pLEyJ3tAwi5EmBqRo7vHawiEEERHS6x7MTMxMVv6+z3tPMUYSkfTM/R0fEaG2bbMv+Gc4nZzn+dN4HAcREa3r+hi3bcuu68jLskhVIlW073tWaYlQ9+F9IpqmSfq+fwskhdO/AwmUTJXrOuaRQNeRkOd5lq7rXmS5InmERKoER/QMvUAPlZDHcZRhGN4CSeGY+aHMqgcks5RrHv/eeh455x5KrMq2yHQdibDO6ncG/KZWL7M8xDyS1/MIO0NJqdULLS81X6/X6aR0nqBSJcPeZnlZrzN477NKURn2Nus8sjzmEII0TfMiyxUuxphVWjpJkbx0btUnshRihVv70Bv8ItXq6Asoi/ZiCbU6YgAAAABJRU5ErkJggg==); }\n\n.error-template {\n  padding: 40px 15px;\n  text-align: center; }\n\n.error-actions {\n  margin-top: 15px;\n  margin-bottom: 15px; }\n\n.error-actions .btn {\n  margin-right: 10px; }\n"

/***/ }),

/***/ "./src/app/product/favourite-products/favourite-products.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/product/favourite-products/favourite-products.component.ts ***!
  \****************************************************************************/
/*! exports provided: FavouriteProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavouriteProductsComponent", function() { return FavouriteProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/product.service */ "./src/app/shared/services/product.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FavouriteProductsComponent = /** @class */ (function () {
    function FavouriteProductsComponent(productService) {
        this.productService = productService;
        this.showDataNotFound = true;
        // Not Found Message
        this.messageTitle = "No Favourite Products Found";
        this.messageDescription = "Please, choose your favourite products";
    }
    FavouriteProductsComponent.prototype.ngOnInit = function () {
        this.getFavouriteProduct();
    };
    FavouriteProductsComponent.prototype.removeFavourite = function (product) {
        this.productService.removeLocalFavourite(product);
        this.getFavouriteProduct();
    };
    FavouriteProductsComponent.prototype.getFavouriteProduct = function () {
        this.favoruiteProducts = this.productService.getLocalFavouriteProducts();
    };
    FavouriteProductsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-favourite-products",
            template: __webpack_require__(/*! ./favourite-products.component.html */ "./src/app/product/favourite-products/favourite-products.component.html"),
            styles: [__webpack_require__(/*! ./favourite-products.component.scss */ "./src/app/product/favourite-products/favourite-products.component.scss")]
        }),
        __metadata("design:paramtypes", [_shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]])
    ], FavouriteProductsComponent);
    return FavouriteProductsComponent;
}());



/***/ }),

/***/ "./src/app/product/product-detail/product-detail.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/product/product-detail/product-detail.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"product-image\">\n        <div class=\"view hm-zoom z-depth-2\" style=\"cursor: pointer\">\n          <img [src]=\"product.productImageUrl\" [alt]=\"product.productName\" width=\"100%\" class=\"img-fluid rounded\">\n        </div>\n        <div class=\"\" style=\"margin-top:15px\">\n          <ul class=\"list-group mb-3\">\n            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\n              <div>\n                <h6 class=\"my-0\">Product Price</h6>\n              </div>\n              <span class=\"text-muted\" style=\"color:crimson !important\">${{product.productPrice}}</span>\n            </li>\n            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\n              <div>\n                <h6 class=\"my-0\">Product Seller</h6>\n              </div>\n              <span class=\"text-muted\" style=\"color:crimson !important\">{{product.productSeller}}</span>\n            </li>\n          </ul>\n          <button class=\"btn btn-primary\">Add to Cart</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-8\">\n      <div class=\"product-detail\">\n        <h5 class=\"product-head\">Product Details</h5>\n        <table class=\"table\" cellspacing=\"0\" style=\"max-height: 28px\">\n          <tbody>\n            <tr>\n              <th scope=\"row\">Product Name</th>\n              <td>{{product.productName}}</td>\n            </tr>\n            <tr>\n              <th scope=\"row\">Product Description</th>\n              <td>{{product.productDescription}}</td>\n            </tr>\n            <tr>\n              <th scope=\"row\">Product Category</th>\n              <td>{{product.productCategory}}</td>\n            </tr>\n            <tr>\n              <th scope=\"row\">No. of quantity available</th>\n              <td>{{product.productQuatity}}</td>\n            </tr>\n            <tr>\n              <th scope=\"row\">Product Added on</th>\n              <td>{{product.productAdded * 1000 | date}}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/product/product-detail/product-detail.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/product/product-detail/product-detail.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".product-detail .product-head {\n  padding: 10px;\n  font-weight: 500; }\n\n.product-detail .table th {\n  width: 152px; }\n\n.product-ship {\n  height: 15rem; }\n"

/***/ }),

/***/ "./src/app/product/product-detail/product-detail.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/product/product-detail/product-detail.component.ts ***!
  \********************************************************************/
/*! exports provided: ProductDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailComponent", function() { return ProductDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_models_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/models/product */ "./src/app/shared/models/product.ts");
/* harmony import */ var _shared_services_product_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/product.service */ "./src/app/shared/services/product.service.ts");
/* harmony import */ var _shared_loader_spinner_loader_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/loader-spinner/loader-spinner */ "./src/app/shared/loader-spinner/loader-spinner.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductDetailComponent = /** @class */ (function () {
    function ProductDetailComponent(route, productService, spinnerService) {
        this.route = route;
        this.productService = productService;
        this.spinnerService = spinnerService;
        this.product = new _shared_models_product__WEBPACK_IMPORTED_MODULE_2__["Product"]();
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params["id"]; // (+) converts string 'id' to a number
            _this.getProductDetail(id);
        });
    };
    ProductDetailComponent.prototype.getProductDetail = function (id) {
        var _this = this;
        this.spinnerService.show();
        var x = this.productService.getProductById(id);
        x.snapshotChanges().subscribe(function (product) {
            _this.spinnerService.hide();
            var y = product.payload.toJSON();
            y["$key"] = id;
            _this.product = y;
        });
    };
    ProductDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-product-detail",
            template: __webpack_require__(/*! ./product-detail.component.html */ "./src/app/product/product-detail/product-detail.component.html"),
            styles: [__webpack_require__(/*! ./product-detail.component.scss */ "./src/app/product/product-detail/product-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _shared_services_product_service__WEBPACK_IMPORTED_MODULE_3__["ProductService"],
            _shared_loader_spinner_loader_spinner__WEBPACK_IMPORTED_MODULE_4__["LoaderSpinnerService"]])
    ], ProductDetailComponent);
    return ProductDetailComponent;
}());



/***/ }),

/***/ "./src/app/product/product-list/product-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/product/product-list/product-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br>\r\n<div class=\"container\">\r\n  <div class=\"row\" *ngIf=\"authService.isAdmin()\">\r\n    <div class=\"col-sm\">\r\n      <div class=\"float-right\">\r\n        <button type=\"button\" class=\"btn btn-primary waves-light\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">\r\n          Add Product\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-3\">\r\n      <div class=\"form-group\">\r\n        <label for=\"brand_select\">By Brands:</label>\r\n        <select class=\"form-control\" name=\"\" id=\"brand_select\" [(ngModel)]=\"selectedBrand\">\r\n          <option *ngFor=\"let brand of brands\" [ngValue]=\"brand\">{{brand}}</option>\r\n        </select>\r\n      </div>\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item\">Cras justo odio</li>\r\n        <li class=\"list-group-item\">Dapibus ac facilisis in</li>\r\n        <li class=\"list-group-item\">Morbi leo risus</li>\r\n      </ul>\r\n    </div>\r\n    <div class=\"col-md-9\">\r\n\r\n      <div class=\"container\">\r\n        <div class=\"row\">\r\n          <!-- List of Products -->\r\n          <div class=\"col-sm-4 mb-2\" *ngFor=\"let product of productList | filterByBrand: selectedBrand | paginate: { itemsPerPage: 6, currentPage: page }\">\r\n            <div class=\"item\">\r\n              <div class=\" mb-r\">\r\n                <!--Card-->\r\n                <div class=\"card card-cascade wider\">\r\n                  <!--Card image-->\r\n                  <a [routerLink]=\"['/products/product', product.$key]\">\r\n                    <div class=\"view overlay hm-white-slight\">\r\n                      <img [src]=\"product.productImageUrl\" class=\"img-fluid\" alt=\"\" width=\"360px\" height=\"640px\">\r\n                      <a>\r\n                        <div class=\"mask waves-effect waves-light\" mdbRippleRadius></div>\r\n                      </a>\r\n                    </div>\r\n                  </a>\r\n                  <!--/.Card image-->\r\n                  <!--Card content-->\r\n                  <div class=\"card-body text-center no-padding\">\r\n                    <!--Category & Title-->\r\n                    <a class=\"text-muted\">\r\n                      <h5>{{ product.productCategory }}</h5>\r\n                    </a>\r\n                    <p class=\"card-title\">\r\n                      <strong>\r\n                        <a [routerLink]=\"['/products/product', product.$key]\" routerLinkActive=\"router-link-active\">{{ product.productName }}</a>\r\n                      </strong>\r\n                    </p>\r\n                    <!--Description-->\r\n                    <p class=\"card-text\">{{ product.productDescription }}\r\n                    </p>\r\n                    <!--Card footer-->\r\n                    <div class=\"card-footer\">\r\n                      <span class=\"left\">{{ product.productPrice }} $</span>\r\n                      <span class=\"right\">\r\n                        <a placement=\"top\" mdbTooltip=\"Quick Look\" container=\"body\" [routerLink]=\"['/products/product', product.$key]\">\r\n                          <i class=\"fa fa-eye\"></i>\r\n                        </a>\r\n                        <a placement=\"top\" mdbTooltip=\"Add to Wishlist\" container=\"body\" (click)=\"addFavourite(product)\">\r\n                          <i class=\"fa fa-heart\"></i>\r\n                        </a>\r\n                        <a placement=\"top\" mdbTooltip=\"Add to Wishlist\" container=\"body\" (click)=\"addToCart(product)\">\r\n                          <i class=\"fa fa-shopping-cart\"></i>\r\n                        </a>\r\n                        <a placement=\"top\" mdbTooltip=\"Remove Product\" container=\"body\" *ngIf=\"authService.isAdmin()\" (click)=\"removeProduct(product.$key)\">\r\n                          <i class=\"fa fa-trash\"></i>\r\n                        </a>\r\n                      </span>\r\n                    </div>\r\n\r\n                  </div>\r\n                  <!--/.Card content-->\r\n\r\n                </div>\r\n                <!--/.Card-->\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <!-- Pagination -->\r\n        <div class=\"text-center mt-3\">\r\n          <pagination-controls (pageChange)=\"page = $event\"></pagination-controls>\r\n        </div>\r\n      </div>\r\n      <!--/.Card-->\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-add-product></app-add-product>\r\n<ng2-toasty></ng2-toasty>\r\n"

/***/ }),

/***/ "./src/app/product/product-list/product-list.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/product/product-list/product-list.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".section .section-heading {\n  margin-top: 2rem;\n  margin-bottom: 4rem; }\n\n.section-heading {\n  text-align: center; }\n\n.section-description {\n  margin-left: 5%;\n  margin-right: 5%; }\n\n.section-description {\n  color: #757575;\n  margin-bottom: 4rem;\n  margin-left: 15%;\n  margin-right: 15%;\n  text-align: center; }\n\n.section img {\n  max-width: 100%;\n  height: auto; }\n\n.card.card-cascade.narrower {\n  margin-top: 10px; }\n\n.card.card-cascade {\n  width: 100%; }\n\n.card:not([class*=\"card-outline-\"]) {\n  border: 0; }\n\n.card.card-cascade.narrower .view {\n  margin-left: 4%;\n  margin-right: 4%;\n  margin-top: -20px; }\n\n.card.card-cascade .view {\n  border-radius: 4px; }\n\n.btn-floating:hover,\n.card-overlay,\n.card.card-cascade .view,\n.colorful-select .dropdown-content li a:hover,\n.colorful-select .dropdown-content li span:hover,\n.comments-list img,\n.modal-dialog.cascading-modal.modal-avatar .modal-header img,\n.reply-form img,\n.testimonial-carousel .testimonial .avatar img,\n.z-depth-2 {\n  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n\n.card.card-cascade .card-body {\n  padding-top: 1.8rem; }\n\n.btn .fa,\n.card .card-body {\n  position: relative; }\n\n.card .rating {\n  color: #ffa000; }\n\n.rating {\n  list-style-type: none; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.rating li {\n  display: inline-block; }\n\n.no-padding .fa,\n.rating {\n  padding: 0; }\n\n.card-text {\n  line-height: 20px;\n  height: 60px;\n  overflow: hidden; }\n\n.card .card-footer {\n  background-color: transparent; }\n\n.card .card-footer .left {\n  float: left; }\n\n.card .card-footer .right {\n  float: right;\n  display: flex; }\n\n.card .card-footer .right a.active {\n  color: #d50000; }\n\n.card .card-footer .right a {\n  color: #757575;\n  margin-left: 1rem;\n  transition: 0.4s; }\n\n.card .card-footer .right a .fa-heart {\n  color: #3f51b5; }\n"

/***/ }),

/***/ "./src/app/product/product-list/product-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/product/product-list/product-list.component.ts ***!
  \****************************************************************/
/*! exports provided: ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_toasty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-toasty */ "./node_modules/ng2-toasty/index.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
/* harmony import */ var _shared_services_product_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/product.service */ "./src/app/shared/services/product.service.ts");
/* harmony import */ var _shared_loader_spinner_loader_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/loader-spinner/loader-spinner */ "./src/app/shared/loader-spinner/loader-spinner.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(authService, productService, spinnerService, toastyConfig, toastyService) {
        this.authService = authService;
        this.productService = productService;
        this.spinnerService = spinnerService;
        this.toastyConfig = toastyConfig;
        this.toastyService = toastyService;
        this.brands = ["All", "Google", "Apple", "Samsung", "OnePlus", "Lenovo", "Nokia", "Motorolla"];
        this.page = 1;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.getAllProducts();
    };
    ProductListComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.spinnerService.show();
        var x = this.productService.getProducts();
        x.snapshotChanges().subscribe(function (product) {
            _this.spinnerService.hide();
            _this.productList = [];
            product.forEach(function (element) {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                _this.productList.push(y);
            });
        });
    };
    ProductListComponent.prototype.removeProduct = function (key) {
        this.productService.deleteProduct(key);
    };
    ProductListComponent.prototype.addFavourite = function (product) {
        this.productService.addFavouriteProduct(product);
    };
    ProductListComponent.prototype.addToCart = function (product) {
        this.productService.addToCart(product);
    };
    ProductListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-product-list",
            template: __webpack_require__(/*! ./product-list.component.html */ "./src/app/product/product-list/product-list.component.html"),
            styles: [__webpack_require__(/*! ./product-list.component.scss */ "./src/app/product/product-list/product-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _shared_services_product_service__WEBPACK_IMPORTED_MODULE_3__["ProductService"],
            _shared_loader_spinner_loader_spinner__WEBPACK_IMPORTED_MODULE_4__["LoaderSpinnerService"],
            ng2_toasty__WEBPACK_IMPORTED_MODULE_1__["ToastyConfig"],
            ng2_toasty__WEBPACK_IMPORTED_MODULE_1__["ToastyService"]])
    ], ProductListComponent);
    return ProductListComponent;
}());



/***/ }),

/***/ "./src/app/product/product.component.html":
/*!************************************************!*\
  !*** ./src/app/product/product.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  product works!\r\n</p>"

/***/ }),

/***/ "./src/app/product/product.component.scss":
/*!************************************************!*\
  !*** ./src/app/product/product.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/product.component.ts":
/*!**********************************************!*\
  !*** ./src/app/product/product.component.ts ***!
  \**********************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
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

var ProductComponent = /** @class */ (function () {
    function ProductComponent() {
    }
    ProductComponent.prototype.ngOnInit = function () { };
    ProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-product",
            template: __webpack_require__(/*! ./product.component.html */ "./src/app/product/product.component.html"),
            styles: [__webpack_require__(/*! ./product.component.scss */ "./src/app/product/product.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProductComponent);
    return ProductComponent;
}());



/***/ }),

/***/ "./src/app/product/product.module.ts":
/*!*******************************************!*\
  !*** ./src/app/product/product.module.ts ***!
  \*******************************************/
/*! exports provided: ProductModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductModule", function() { return ProductModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _product_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product.routing */ "./src/app/product/product.routing.ts");
/* harmony import */ var _checkout_checkout_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkout/checkout.module */ "./src/app/product/checkout/checkout.module.ts");
/* harmony import */ var _product_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./product.component */ "./src/app/product/product.component.ts");
/* harmony import */ var _best_product_best_product_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./best-product/best-product.component */ "./src/app/product/best-product/best-product.component.ts");
/* harmony import */ var _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./product-list/product-list.component */ "./src/app/product/product-list/product-list.component.ts");
/* harmony import */ var _add_product_add_product_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./add-product/add-product.component */ "./src/app/product/add-product/add-product.component.ts");
/* harmony import */ var _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./product-detail/product-detail.component */ "./src/app/product/product-detail/product-detail.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _favourite_products_favourite_products_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./favourite-products/favourite-products.component */ "./src/app/product/favourite-products/favourite-products.component.ts");
/* harmony import */ var _cart_products_cart_products_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cart-products/cart-products.component */ "./src/app/product/cart-products/cart-products.component.ts");
/* harmony import */ var _cart_calculator_cart_calculator_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cart-calculator/cart-calculator.component */ "./src/app/product/cart-calculator/cart-calculator.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Core Dependencies



// configuration and services

// Components










var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_product_routing__WEBPACK_IMPORTED_MODULE_3__["ProductRoutes"]),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
                _checkout_checkout_module__WEBPACK_IMPORTED_MODULE_4__["CheckoutModule"]
            ],
            declarations: [
                _product_component__WEBPACK_IMPORTED_MODULE_5__["ProductComponent"],
                _best_product_best_product_component__WEBPACK_IMPORTED_MODULE_6__["BestProductComponent"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_7__["ProductListComponent"],
                _add_product_add_product_component__WEBPACK_IMPORTED_MODULE_8__["AddProductComponent"],
                _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_9__["ProductDetailComponent"],
                _favourite_products_favourite_products_component__WEBPACK_IMPORTED_MODULE_11__["FavouriteProductsComponent"],
                _cart_products_cart_products_component__WEBPACK_IMPORTED_MODULE_12__["CartProductsComponent"],
                _cart_calculator_cart_calculator_component__WEBPACK_IMPORTED_MODULE_13__["CartCalculatorComponent"]
            ],
            exports: [_best_product_best_product_component__WEBPACK_IMPORTED_MODULE_6__["BestProductComponent"]]
        })
    ], ProductModule);
    return ProductModule;
}());



/***/ }),

/***/ "./src/app/product/product.routing.ts":
/*!********************************************!*\
  !*** ./src/app/product/product.routing.ts ***!
  \********************************************/
/*! exports provided: ProductRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductRoutes", function() { return ProductRoutes; });
/* harmony import */ var _cart_products_cart_products_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart-products/cart-products.component */ "./src/app/product/cart-products/cart-products.component.ts");
/* harmony import */ var _favourite_products_favourite_products_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./favourite-products/favourite-products.component */ "./src/app/product/favourite-products/favourite-products.component.ts");
/* harmony import */ var _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-list/product-list.component */ "./src/app/product/product-list/product-list.component.ts");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index/index.component */ "./src/app/index/index.component.ts");
/* harmony import */ var _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product-detail/product-detail.component */ "./src/app/product/product-detail/product-detail.component.ts");





var ProductRoutes = [
    {
        path: "products",
        children: [
            {
                path: "",
                component: _index_index_component__WEBPACK_IMPORTED_MODULE_3__["IndexComponent"]
            },
            {
                path: "all-products",
                component: _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_2__["ProductListComponent"]
            },
            {
                path: "favourite-products",
                component: _favourite_products_favourite_products_component__WEBPACK_IMPORTED_MODULE_1__["FavouriteProductsComponent"]
            },
            {
                path: "cart-items",
                component: _cart_products_cart_products_component__WEBPACK_IMPORTED_MODULE_0__["CartProductsComponent"]
            },
            {
                path: "checkouts",
                loadChildren: "./checkout/checkout.module#CheckoutModule"
            },
            {
                path: "product/:id",
                component: _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_4__["ProductDetailComponent"]
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/shared/models/product.ts":
/*!******************************************!*\
  !*** ./src/app/shared/models/product.ts ***!
  \******************************************/
/*! exports provided: Product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());



/***/ })

}]);
//# sourceMappingURL=index-index-module~product-product-module.js.map