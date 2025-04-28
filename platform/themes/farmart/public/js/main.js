/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./platform/themes/farmart/assets/js/main.js":
/*!***************************************************!*\
  !*** ./platform/themes/farmart/assets/js/main.js ***!
  \***************************************************/
/***/ (() => {



var MartApp = MartApp || {};
window.MartApp = MartApp;
MartApp.$iconChevronLeft = '<span class="slick-prev-arrow svg-icon"><svg><use href="#svg-icon-chevron-left" xlink:href="#svg-icon-chevron-left"></use></svg></span>';
MartApp.$iconChevronRight = '<span class="slick-next-arrow svg-icon"><svg><use href="#svg-icon-chevron-right" xlink:href="#svg-icon-chevron-right"></use></svg></span>';
window._scrollBar = new ScrollBarHelper();
MartApp.isRTL = $("body").prop("dir") === "rtl";
(function ($) {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  });
  function basicEvents() {
    $(".form--quick-search .form-group--icon").show();
    var $categoryLabel = $(".product-category-label .text");
    $(document).on("change", ".product-category-select", function () {
      $categoryLabel.text($.trim($(this).find("option:selected").text()));
    });
    $categoryLabel.text($.trim($(".product-category-select option:selected").text()));
    $(document).ready(function () {
      $(".preloader").addClass("fade-in");
    });
  }
  function subMenuToggle() {
    $(".menu-item-has-children > a > .sub-toggle").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $parent = $this.closest(".menu-item-has-children");
      $parent.toggleClass("active");
    });
    $(".mega-menu__column > a > .sub-toggle").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $parent = $this.closest(".mega-menu__column");
      $parent.toggleClass("active");
    });
  }
  function siteToggleAction() {
    $(".toggle--sidebar").on("click", function (e) {
      e.preventDefault();
      var url = $(this).attr("href");
      $(this).toggleClass("active");
      $(this).siblings("a").removeClass("active");
      $(url).toggleClass("active");
      $(url).siblings(".panel--sidebar").removeClass("active");
      _scrollBar.hide();
    });
    $(document).on("click", ".close-toggle--sidebar", function (e) {
      e.preventDefault();
      var $panel;
      if ($(this).data("toggle-closest")) {
        $panel = $(this).closest($(this).data("toggle-closest"));
      }
      if (!$panel || !$panel.length) {
        $panel = $(this).closest(".panel--sidebar");
      }
      $panel.removeClass("active");
      _scrollBar.reset();
    });
    $("body").on("click", function (e) {
      if ($(e.target).siblings(".panel--sidebar").hasClass("active")) {
        $(".panel--sidebar").removeClass("active");
        _scrollBar.reset();
      }
    });
  }
  $(function () {
    basicEvents();
    subMenuToggle();
    siteToggleAction();
  });
  MartApp.init = function () {
    MartApp.$body = $(document.body);
    MartApp.formSearch = "#products-filter-form";
    MartApp.$formSearch = $(document).find(MartApp.formSearch);
    MartApp.productListing = ".products-listing";
    MartApp.$productListing = $(MartApp.productListing);
    this.lazyLoad(null, true);
    this.productQuickView();
    this.slickSlides();
    this.productQuantity();
    this.addProductToWishlist();
    this.addProductToCompare();
    this.addProductToCart();
    this.applyCouponCode();
    this.productGallery();
    this.lightBox();
    this.handleTabBootstrap();
    this.toggleViewProducts();
    this.filterSlider();
    this.toolbarOrderingProducts();
    this.productsFilter();
    this.searchProducts();
    this.ajaxUpdateCart();
    this.removeCartItem();
    this.removeWishlistItem();
    this.removeCompareItem();
    this.submitReviewProduct();
    this.vendorRegisterForm();
    this.customerDashboard();
    this.newsletterForm();
    this.contactSellerForm();
    this.stickyAddToCart();
    this.backToTop();
    this.stickyHeader();
    this.recentlyViewedProducts();
    this.reviewList();
    MartApp.$body.on("click", ".catalog-sidebar .backdrop, #cart-mobile .backdrop", function (e) {
      e.preventDefault();
      $(this).parent().removeClass("active");
      _scrollBar.reset();
    });
    MartApp.$body.on("click", ".sidebar-filter-mobile", function (e) {
      e.preventDefault();
      MartApp.toggleSidebarFilterProducts("open", $(e.currentTarget).data("toggle"));
    });
    MartApp.$body.on("submit", ".products-filter-form-vendor", function (e) {
      if (MartApp.$formSearch.length) {
        MartApp.$formSearch.trigger("submit");
        return false;
      }
      return true;
    });
  };
  MartApp.toggleSidebarFilterProducts = function () {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "close";
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "product-categories-primary-sidebar";
    var $el = $('[data-toggle-target="' + target + '"]');
    if (status === "close") {
      $el.removeClass("active");
      _scrollBar.reset();
    } else {
      $el.addClass("active");
      _scrollBar.hide();
    }
  };
  MartApp.productQuickView = function () {
    var $modal = $("#product-quick-view-modal");
    MartApp.$body.on("click", ".product-quick-view-button .quick-view", function (e) {
      e.preventDefault();
      var _self = $(e.currentTarget);
      _self.addClass("loading");
      $modal.removeClass("loaded").addClass("loading");
      $modal.modal("show");
      $modal.find(".product-modal-content").html("");
      $.ajax({
        url: _self.data("url"),
        type: "GET",
        success: function success(res) {
          if (!res.error) {
            $modal.find(".product-modal-content").html(res.data);
            MartApp.productGallery(true, $modal.find(".product-modal-content .product-gallery"));
            MartApp.lightBox();
            MartApp.lazyLoad($modal[0]);
          }
        },
        error: function error() {},
        complete: function complete() {
          $modal.addClass("loaded").removeClass("loading");
          _self.removeClass("loading");
        }
      });
    });
  };
  MartApp.productGallery = function (destroy, $gallery) {
    if (!$gallery || !$gallery.length) {
      $gallery = $(".product-gallery");
    }
    if ($gallery.length) {
      var first = $gallery.find(".product-gallery__wrapper");
      var second = $gallery.find(".product-gallery__variants");
      if (destroy) {
        if (first.length && first.hasClass("slick-initialized")) {
          first.slick("unslick");
        }
        if (second.length && second.hasClass("slick-initialized")) {
          second.slick("unslick");
        }
      }
      first.not(".slick-initialized").slick({
        rtl: MartApp.isRTL,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        asNavFor: second,
        dots: false,
        prevArrow: MartApp.$iconChevronLeft,
        nextArrow: MartApp.$iconChevronRight,
        lazyLoad: "ondemand"
      });
      second.not(".slick-initialized").slick({
        rtl: MartApp.isRTL,
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: false,
        focusOnSelect: true,
        asNavFor: first,
        vertical: true,
        prevArrow: '<span class="slick-prev-arrow svg-icon"><svg><use href="#svg-icon-arrow-up" xlink:href="#svg-icon-arrow-up"></use></svg></span>',
        nextArrow: '<span class="slick-next-arrow svg-icon"><svg><use href="#svg-icon-chevron-down" xlink:href="#svg-icon-chevron-down"></use></svg></span>',
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 6,
            vertical: false
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            vertical: false
          }
        }]
      });
    }
  };
  MartApp.lightBox = function () {
    var $productGallery = $(".product-gallery--with-images");
    if ($productGallery.data("lightGallery")) {
      $productGallery.data("lightGallery").destroy(true);
    }
    $productGallery.lightGallery({
      selector: ".item a",
      thumbnail: true,
      share: false,
      fullScreen: false,
      autoplay: false,
      autoplayControls: false,
      actualSize: false
    });
    var $galleries = $(".review-images-total.review-images");
    if ($galleries.length) {
      $galleries.map(function (index, value) {
        if (!$(value).data("lightGallery")) {
          $(value).lightGallery({
            selector: "a",
            thumbnail: true,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
          });
        }
      });
    }
  };
  MartApp.slickSlide = function (el) {
    var $el = $(el);
    if ($el.length && $el.not(".slick-initialized")) {
      var slickOptions = $el.data("slick") || {};
      if (slickOptions.appendArrows) {
        slickOptions.appendArrows = $el.parent().find(slickOptions.appendArrows);
      }
      slickOptions = Object.assign(slickOptions, {
        rtl: MartApp.isRTL,
        prevArrow: MartApp.$iconChevronLeft,
        nextArrow: MartApp.$iconChevronRight
      });
      $el.slick(slickOptions);
    }
  };
  MartApp.slickSlides = function () {
    $(".slick-slides-carousel").not(".slick-initialized").map(function (i, e) {
      MartApp.slickSlide(e);
    });
  };
  MartApp.lazyLoad = function (container) {
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (init) {
      MartApp.lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazyload",
        callback_error: function callback_error(img) {
          img.setAttribute("src", siteConfig.img_placeholder);
        }
      });
    } else {
      new LazyLoad({
        container: container,
        elements_selector: ".lazyload",
        callback_error: function callback_error(img) {
          img.setAttribute("src", siteConfig.img_placeholder);
        }
      });
    }
  };
  MartApp.productQuantity = function () {
    MartApp.$body.on("click", ".quantity .increase, .quantity .decrease", function (e) {
      e.preventDefault();
      var $this = $(this),
        $wrapperBtn = $this.closest(".product-button"),
        $btn = $wrapperBtn.find(".quantity_button"),
        $price = $this.closest(".quantity").siblings(".box-price").find(".price-current"),
        $priceCurrent = $price.html(),
        $qty = $this.siblings(".qty"),
        step = parseInt($qty.attr("step"), 10),
        current = parseInt($qty.val(), 10),
        min = parseInt($qty.attr("min"), 10),
        max = parseInt($qty.attr("max"), 10);
      min = min || 1;
      max = max || current + 1;
      if ($this.hasClass("decrease") && current > min) {
        $qty.val(current - step);
        $qty.trigger("change");
        var numQuantity = +$btn.attr("data-quantity");
        numQuantity = numQuantity - 1;
        $btn.attr("data-quantity", numQuantity);
        var $total2 = ($priceCurrent * 1 - $priceCurrent / current).toFixed(2);
        $price.html($total2);
      }
      if ($this.hasClass("increase") && current < max) {
        $qty.val(current + step);
        $qty.trigger("change");
        var _numQuantity = +$btn.attr("data-quantity");
        _numQuantity = _numQuantity + 1;
        $btn.attr("data-quantity", _numQuantity);
        var $total = ($priceCurrent * 1 + $priceCurrent / current).toFixed(2);
        $price.html($total);
      }
      MartApp.processUpdateCart($this);
    });
    MartApp.$body.on("keyup", ".quantity .qty", function (e) {
      e.preventDefault();
      var $this = $(this),
        $wrapperBtn = $this.closest(".product-button"),
        $btn = $wrapperBtn.find(".quantity_button"),
        $price = $this.closest(".quantity").siblings(".box-price").find(".price-current"),
        $priceFirst = $price.data("current"),
        current = parseInt($this.val(), 10),
        min = parseInt($this.attr("min"), 10),
        max = parseInt($this.attr("max"), 10);
      var min_check = min ? min : 1;
      var max_check = max ? max : current + 1;
      if (current <= max_check && current >= min_check) {
        $btn.attr("data-quantity", current);
        var $total = ($priceFirst * current).toFixed(2);
        $price.html($total);
      }
      MartApp.processUpdateCart($this);
    });
  };
  MartApp.addProductToWishlist = function () {
    MartApp.$body.on("click", ".wishlist-button .wishlist", function (e) {
      e.preventDefault();
      var $btn = $(e.currentTarget);
      $btn.addClass("loading");
      $.ajax({
        url: $btn.data("url"),
        method: "POST",
        success: function success(res) {
          var _res$data;
          if (res.error) {
            MartApp.showError(res.message);
            return false;
          }
          MartApp.showSuccess(res.message);
          $(".btn-wishlist .header-item-counter").text(res.data.count);
          if ((_res$data = res.data) !== null && _res$data !== void 0 && _res$data.added) {
            $('.wishlist-button .wishlist[data-url="' + $btn.data("url") + '"]').addClass("added-to-wishlist");
          } else {
            $('.wishlist-button .wishlist[data-url="' + $btn.data("url") + '"]').removeClass("added-to-wishlist");
          }
        },
        error: function error(res) {
          MartApp.showError(res.message);
        },
        complete: function complete() {
          $btn.removeClass("loading");
        }
      });
    });
  };
  MartApp.addProductToCompare = function () {
    MartApp.$body.on("click", ".compare-button .compare", function (e) {
      e.preventDefault();
      var $btn = $(e.currentTarget);
      $btn.addClass("loading");
      $.ajax({
        url: $btn.data("url"),
        method: "POST",
        success: function success(res) {
          if (res.error) {
            MartApp.showError(res.message);
            return false;
          }
          MartApp.showSuccess(res.message);
          $(".btn-compare .header-item-counter").text(res.data.count);
        },
        error: function error(res) {
          MartApp.showError(res.message);
        },
        complete: function complete() {
          $btn.removeClass("loading");
        }
      });
    });
  };
  MartApp.addProductToCart = function () {
    MartApp.$body.on("click", "form.cart-form button[type=submit]", function (e) {
      e.preventDefault();
      var $form = $(this).closest("form.cart-form");
      var $btn = $(this);
      $btn.addClass("loading");
      var data = $form.serializeArray();
      data.push({
        name: "checkout",
        value: $btn.prop("name") === "checkout" ? 1 : 0
      });
      $.ajax({
        type: "POST",
        url: $form.prop("action"),
        data: $.param(data),
        success: function success(res) {
          if (res.error) {
            MartApp.showError(res.message);
            if (res.data && res.data.next_url !== undefined) {
              window.location.href = res.data.next_url;
            }
            return false;
          }
          if (res.data && res.data.next_url !== undefined) {
            window.location.href = res.data.next_url;
            return false;
          }
          MartApp.showSuccess(res.message);
          MartApp.loadAjaxCart();
        },
        error: function error(res) {
          MartApp.handleError(res, $form);
        },
        complete: function complete() {
          $btn.removeClass("loading");
        }
      });
    });
  };
  MartApp.applyCouponCode = function () {
    $(document).on("keypress", ".form-coupon-wrapper .coupon-code", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        $(e.currentTarget).closest(".form-coupon-wrapper").find(".btn-apply-coupon-code").trigger("click");
        return false;
      }
    });
    $(document).on("click", ".btn-apply-coupon-code", function (e) {
      e.preventDefault();
      var _self = $(e.currentTarget);
      $.ajax({
        url: _self.data("url"),
        type: "POST",
        data: {
          coupon_code: _self.closest(".form-coupon-wrapper").find(".coupon-code").val()
        },
        beforeSend: function beforeSend() {
          _self.prop("disabled", true).addClass("loading");
        },
        success: function success(res) {
          if (!res.error) {
            $(".cart-page-content").load(window.location.href + "?applied_coupon=1 .cart-page-content > *", function () {
              _self.prop("disabled", false).removeClass("loading");
              MartApp.showSuccess(res.message);
            });
          } else {
            MartApp.showError(res.message);
          }
        },
        error: function error(data) {
          MartApp.handleError(data);
        },
        complete: function complete(res) {
          var _res$responseJSON;
          if (!(res.status == 200 && (res === null || res === void 0 || (_res$responseJSON = res.responseJSON) === null || _res$responseJSON === void 0 ? void 0 : _res$responseJSON.error) == false)) {
            _self.prop("disabled", false).removeClass("loading");
          }
        }
      });
    });
    $(document).on("click", ".btn-remove-coupon-code", function (e) {
      e.preventDefault();
      var _self = $(e.currentTarget);
      var buttonText = _self.text();
      _self.text(_self.data("processing-text"));
      $.ajax({
        url: _self.data("url"),
        type: "POST",
        success: function success(res) {
          if (!res.error) {
            $(".cart-page-content").load(window.location.href + " .cart-page-content > *", function () {
              _self.text(buttonText);
            });
          } else {
            MartApp.showError(res.message);
          }
        },
        error: function error(data) {
          MartApp.handleError(data);
        },
        complete: function complete(res) {
          var _res$responseJSON2;
          if (!(res.status == 200 && (res === null || res === void 0 || (_res$responseJSON2 = res.responseJSON) === null || _res$responseJSON2 === void 0 ? void 0 : _res$responseJSON2.error) == false)) {
            _self.text(buttonText);
          }
        }
      });
    });
  };
  MartApp.loadAjaxCart = function () {
    var _window$siteConfig;
    if ((_window$siteConfig = window.siteConfig) !== null && _window$siteConfig !== void 0 && _window$siteConfig.ajaxCart) {
      $.ajax({
        url: window.siteConfig.ajaxCart,
        method: "GET",
        success: function success(res) {
          if (!res.error) {
            $(".mini-cart-content .widget-shopping-cart-content").html(res.data.html);
            $(".btn-shopping-cart .header-item-counter").text(res.data.count);
            $(".cart--mini .cart-price-total .cart-amount span").text(res.data.total_price);
            $(".menu--footer .icon-cart .cart-counter").text(res.data.count);
            MartApp.lazyLoad($(".mini-cart-content")[0]);
          }
        }
      });
    }
  };
  MartApp.changeInputInSearchForm = function (parseParams) {
    isReadySubmitTrigger = false;
    MartApp.$formSearch.find("input, select, textarea").each(function (e, i) {
      var $el = $(i);
      var name = $el.attr("name");
      var value = parseParams[name] || null;
      var type = $el.attr("type");
      switch (type) {
        case "checkbox":
          $el.prop("checked", false);
          if (Array.isArray(value)) {
            $el.prop("checked", value.includes($el.val()));
          } else {
            $el.prop("checked", !!value);
          }
          break;
        default:
          if ($el.is("[name=max_price]")) {
            $el.val(value || $el.data("max"));
          } else if ($el.is("[name=min_price]")) {
            $el.val(value || $el.data("min"));
          } else if ($el.val() != value) {
            $el.val(value);
          }
          break;
      }
    });
    isReadySubmitTrigger = true;
  };
  MartApp.convertFromDataToArray = function (formData) {
    var data = [];
    formData.forEach(function (obj) {
      if (obj.value) {
        // break with price
        if (["min_price", "max_price"].includes(obj.name)) {
          var dataValue = MartApp.$formSearch.find("input[name=" + obj.name + "]").data(obj.name.substring(0, 3));
          if (dataValue == parseInt(obj.value)) {
            return;
          }
        }
        data.push(obj);
      }
    });
    return data;
  };
  var isReadySubmitTrigger = true;
  MartApp.productsFilter = function () {
    MartApp.widgetProductCategories = ".widget-product-categories";
    MartApp.$widgetProductCategories = $(MartApp.widgetProductCategories);
    $(document).on("change", "#products-filter-form .product-filter-item", function () {
      if (isReadySubmitTrigger) {
        $(this).closest("form").trigger("submit");
      }
    });
    function openCategoryFilter($li) {
      if (!$li) {
        var $categories = $(".widget-product-categories").find("li a.active");
        if ($categories.length) {
          MartApp.$widgetProductCategories.find(".widget-layered-nav-list > ul > li.category-filter").addClass("d-none");
        } else {
          MartApp.$widgetProductCategories.find(".widget-layered-nav-list > ul > li.category-filter").removeClass("d-none");
          MartApp.$widgetProductCategories.find(".show-all-product-categories").addClass("d-none");
        }
        MartApp.$widgetProductCategories.find(".widget-layered-nav-list li.category-filter").removeClass("opened");
        $categories.map(function (e, i) {
          var $parent = $(i).closest("li.category-filter").closest("ul").closest("li.category-filter");
          $parent.removeClass("d-none");
          if ($parent.length) {
            openCategoryFilter($parent);
            MartApp.$widgetProductCategories.find(".show-all-product-categories").removeClass("d-none");
          } else {
            MartApp.$widgetProductCategories.find("li.category-filter").removeClass("d-none");
            MartApp.$widgetProductCategories.find(".show-all-product-categories").addClass("d-none");
          }
        });
      } else if ($li.length) {
        $li.addClass("opened");
        $li.removeClass("d-none");
        $li.find("> .widget-layered-nav-list__item .nav-list__item-link").removeClass("active");
        if ($li.closest("ul").closest("li.category-filter").length) {
          openCategoryFilter($li.closest("ul").closest("li.category-filter"));
        }
      }
      MartApp.$widgetProductCategories.find(".loading-skeleton").removeClass("loading-skeleton");
    }
    openCategoryFilter();
    $(".catalog-toolbar__ordering input[name=sort-by]").on("change", function (e) {
      MartApp.$formSearch.find("input[name=sort-by]").val($(e.currentTarget).val());
      MartApp.$formSearch.trigger("submit");
    });
    MartApp.$body.on("click", ".cat-menu-close", function (e) {
      e.preventDefault();
      $(this).closest("li").toggleClass("opened");
    });
    $(document).on("click", MartApp.widgetProductCategories + " li a", function (e) {
      e.preventDefault();
      var $this = $(e.currentTarget);
      var activated = $this.hasClass("active");
      var $parent = $this.closest(MartApp.widgetProductCategories);
      $parent.find("li a").removeClass("active");
      $this.addClass("active");
      var categoryId = $this.data("id");
      if (categoryId) {
        var $item = $parent.find(".widget-layered-nav-list .nav-list__item-link[data-id=" + categoryId + "]");
        $item.addClass("active");
        openCategoryFilter();
      } else {
        $parent.find(".widget-layered-nav-list .category-filter").removeClass("opened d-none");
        $parent.find(".show-all-product-categories").addClass("d-none");
      }
      var $form = $this.closest(MartApp.formSearch);
      $form.find(".widget-product-brands ul li, .dropdown-swatches-wrapper, .text-swatches-wrapper, .visual-swatches-wrapper").each(function (i, el) {
        var $el = $(el);
        var categories = $el.data("categories");
        if (categories && Array.isArray(categories) && categories.length) {
          if (!categories.includes(categoryId)) {
            $el.addClass("d-none");
            $el.find("input").prop("checked", false);
            $el.find("select").val("");
          } else {
            $el.removeClass("d-none");
          }
        }
      });
      var $input = $parent.find("input[name='categories[]']");
      if ($input.length) {
        if (activated) {
          $this.removeClass("active");
          $input.val("");
        } else {
          $input.val(categoryId);
        }
        $input.trigger("change");
      } else {
        var href = $this.attr("href");
        MartApp.$formSearch.attr("action", href).trigger("submit");
      }
    });
    $(document).on("submit", "#products-filter-form", function (e) {
      e.preventDefault();
      var $form = $(e.currentTarget);
      var formData = $form.serializeArray();
      var data = MartApp.convertFromDataToArray(formData);
      var uriData = [];

      // Paginate
      var $elPage = MartApp.$productListing.find("input[name=page]");
      if ($elPage.val()) {
        data.push({
          name: "page",
          value: $elPage.val()
        });
      }

      // Without "s" param
      data.map(function (obj) {
        uriData.push(encodeURIComponent(obj.name) + "=" + obj.value);
      });
      var nextHref = $form.attr("action") + (uriData && uriData.length ? "?" + uriData.join("&") : "");

      // add to params get to popstate not show json
      data.push({
        name: "_",
        value: +new Date()
      });
      $.ajax({
        url: $form.attr("action"),
        type: "GET",
        data: data,
        beforeSend: function beforeSend() {
          // Show loading before sending
          MartApp.$productListing.find(".loading").show();
          // Animation scroll to filter button
          $("html, body").animate({
            scrollTop: MartApp.$productListing.offset().top - 200
          }, 500);
          // Change price step;
          var priceStep = MartApp.$formSearch.find(".nonlinear");
          if (priceStep.length) {
            priceStep[0].noUiSlider.set([MartApp.$formSearch.find("input[name=min_price]").val(), MartApp.$formSearch.find("input[name=max_price]").val()]);
          }
          MartApp.toggleSidebarFilterProducts();
        },
        success: function success(res) {
          if (!res.error) {
            var _res$additional, _res$additional2, _res$additional3;
            MartApp.$productListing.html(res.data);
            var total = res.message;
            if (total && $(".products-found").length) {
              $(".products-found").html('<span class="text-primary me-1">' + total.substr(0, total.indexOf(" ")) + "</span>" + total.substr(total.indexOf(" ") + 1));
            }
            MartApp.lazyLoad(MartApp.$productListing[0]);
            var title = ((_res$additional = res.additional) === null || _res$additional === void 0 || (_res$additional = _res$additional.category) === null || _res$additional === void 0 ? void 0 : _res$additional.name) || MartApp.$formSearch.data("title");
            $("h1.catalog-header__title").text(title);
            document.title = title;
            if ((_res$additional2 = res.additional) !== null && _res$additional2 !== void 0 && _res$additional2.breadcrumb) {
              $(".page-breadcrumbs div").html(res.additional.breadcrumb);
            }
            if ((_res$additional3 = res.additional) !== null && _res$additional3 !== void 0 && _res$additional3.filters_html) {
              MartApp.$formSearch.html(res.additional.filters_html);
              MartApp.$formSearch.find(".loading-skeleton").removeClass("loading-skeleton");
              MartApp.filterSlider();
              if (jQuery().mCustomScrollbar) {
                $(document).find(".ps-custom-scrollbar").mCustomScrollbar({
                  theme: "dark",
                  scrollInertia: 0
                });
              }
            }
            if (nextHref != window.location.href) {
              window.history.pushState(data, res.message, nextHref);
            }
          } else {
            MartApp.showError(res.message || "Opp!");
          }
        },
        error: function error(res) {
          MartApp.handleError(res);
        },
        complete: function complete() {
          MartApp.$productListing.find(".loading").hide();
        }
      });
    });
    if (MartApp.$formSearch.length) {
      window.addEventListener("popstate", function () {
        var url = window.location.origin + window.location.pathname;
        MartApp.$formSearch.attr("action", url);
        var parseParams = MartApp.parseParamsSearch();
        MartApp.changeInputInSearchForm(parseParams);
        MartApp.$formSearch.trigger("submit");
      }, false);
    }
    $(document).on("click", MartApp.productListing + " .pagination a", function (e) {
      e.preventDefault();
      var url = new URL($(e.currentTarget).attr("href"));
      var page = url.searchParams.get("page");
      MartApp.$productListing.find("input[name=page]").val(page);
      MartApp.$formSearch.trigger("submit");
    });
  };
  MartApp.parseParamsSearch = function (query) {
    var includeArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var pairs = query || window.location.search.substring(1);
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g; // Regex for replacing addition symbol with a space
    var decode = function decode(str) {
      return decodeURIComponent(str.replace(decodeRE, " "));
    };
    var params = {},
      e;
    while (e = re.exec(pairs)) {
      var k = decode(e[1]),
        v = decode(e[2]);
      if (k.substring(k.length - 2) == "[]") {
        if (includeArray) {
          k = k.substring(0, k.length - 2);
        }
        (params[k] || (params[k] = [])).push(v);
      } else params[k] = v;
    }
    return params;
  };
  MartApp.searchProducts = function () {
    $("body").on("click", function (e) {
      if (!$(e.target).closest(".form--quick-search").length) {
        $(".panel--search-result").removeClass("active");
      }
    });
    var currentRequest = null;
    $(".form--quick-search .input-search-product").on("keyup", function () {
      var $form = $(this).closest("form");
      ajaxSearchProduct($form);
    });
    $(".form--quick-search .product-category-select").on("change", function () {
      var $form = $(this).closest("form");
      ajaxSearchProduct($form);
    });
    $(".form--quick-search").on("click", ".loadmore", function (e) {
      e.preventDefault();
      var $form = $(this).closest("form");
      $(this).addClass("loading");
      ajaxSearchProduct($form, $(this).attr("href"));
    });
    function ajaxSearchProduct($form) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var $panel = $form.find(".panel--search-result");
      var k = $form.find(".input-search-product").val();
      if (!k) {
        $panel.html("").removeClass("active");
        return;
      }
      var $button = $form.find("button[type=submit]");
      currentRequest = $.ajax({
        type: "GET",
        url: url || $form.data("ajax-url"),
        data: url ? [] : $form.serialize(),
        beforeSend: function beforeSend() {
          if (currentRequest != null) {
            currentRequest.abort();
          }
          $button.addClass("loading");
        },
        success: function success(res) {
          if (!res.error) {
            if (url) {
              var $content = $("<div>" + res.data + "</div>");
              $panel.find(".panel__content").find(".loadmore-container").remove();
              $panel.find(".panel__content").append($content.find(".panel__content").contents());
            } else {
              $panel.html(res.data).addClass("active");
            }
          } else {
            $panel.html("").removeClass("active");
          }
          $button.removeClass("loading");
        },
        error: function error() {
          $button.removeClass("loading");
        }
      });
    }
  };
  MartApp.processUpdateCart = function ($this) {
    var $form = $(".cart-page-content").find(".form--shopping-cart");
    if (!$form.length) {
      return false;
    }
    $.ajax({
      type: "POST",
      cache: false,
      url: $form.prop("action"),
      data: new FormData($form[0]),
      contentType: false,
      processData: false,
      beforeSend: function beforeSend() {
        $this.addClass("loading");
      },
      success: function success(res) {
        if (res.error) {
          MartApp.showError(res.message);
          return false;
        }
        $(".cart-page-content").load(window.siteConfig.cartUrl + " .cart-page-content > *", function () {
          MartApp.lazyLoad($(".cart-page-content")[0]);
        });
        MartApp.loadAjaxCart();
        MartApp.showSuccess(res.message);
      },
      error: function error(res) {
        $this.closest(".ps-table--shopping-cart").removeClass("content-loading");
        MartApp.handleError(res);
      },
      complete: function complete() {
        $this.removeClass("loading");
      }
    });
  };
  MartApp.ajaxUpdateCart = function (_self) {
    $(document).on("click", ".cart-page-content .update_cart", function (e) {
      e.preventDefault();
      var $this = $(e.currentTarget);
      MartApp.processUpdateCart($this);
    });
  };
  MartApp.removeCartItem = function () {
    $(document).on("click", ".remove-cart-item", function (event) {
      event.preventDefault();
      var _self = $(this);
      $.ajax({
        url: _self.data("url"),
        method: "GET",
        beforeSend: function beforeSend() {
          _self.addClass("loading");
        },
        success: function success(res) {
          var _window$siteConfig2;
          if (res.error) {
            MartApp.showError(res.message);
            return false;
          }
          var $cartContent = $(".cart-page-content");
          if ($cartContent.length && (_window$siteConfig2 = window.siteConfig) !== null && _window$siteConfig2 !== void 0 && _window$siteConfig2.cartUrl) {
            $cartContent.load(window.siteConfig.cartUrl + " .cart-page-content > *", function () {
              MartApp.lazyLoad($cartContent[0]);
            });
          }
          MartApp.loadAjaxCart();
        },
        error: function error(res) {
          MartApp.handleError(res);
        },
        complete: function complete() {
          _self.removeClass("loading");
        }
      });
    });
  };
  MartApp.removeWishlistItem = function () {
    $(document).on("click", ".remove-wishlist-item", function (event) {
      event.preventDefault();
      var _self = $(this);
      $.ajax({
        url: _self.data("url"),
        method: "POST",
        data: {
          _method: "DELETE"
        },
        beforeSend: function beforeSend() {
          _self.addClass("loading");
        },
        success: function success(res) {
          if (res.error) {
            MartApp.showError(res.message);
          } else {
            MartApp.showSuccess(res.message);
            $(".btn-wishlist .header-item-counter").text(res.data.count);
            _self.closest("tr").remove();
          }
        },
        error: function error(res) {
          MartApp.handleError(res);
        },
        complete: function complete() {
          _self.removeClass("loading");
        }
      });
    });
  };
  MartApp.removeCompareItem = function () {
    $(document).on("click", ".remove-compare-item", function (event) {
      event.preventDefault();
      var _self = $(this);
      $.ajax({
        url: _self.data("url"),
        method: "POST",
        data: {
          _method: "DELETE"
        },
        beforeSend: function beforeSend() {
          _self.addClass("loading");
        },
        success: function success(res) {
          if (res.error) {
            MartApp.showError(res.message);
          } else {
            MartApp.showSuccess(res.message);
            $(".btn-compare .header-item-counter").text(res.data.count);
            $(".compare-page-content").load(window.location.href + " .compare-page-content > *");
          }
        },
        error: function error(res) {
          MartApp.handleError(res);
        },
        complete: function complete() {
          _self.removeClass("loading");
        }
      });
    });
  };
  MartApp.handleTabBootstrap = function () {
    var hash = window.location.hash;
    if (hash) {
      var tabTriggerEl = $('a[href="' + hash + '"]');
      if (tabTriggerEl.length) {
        var tab = new bootstrap.Tab(tabTriggerEl[0]);
        tab.show();
      }
    }
  };
  MartApp.filterSlider = function () {
    $(document).find(".nonlinear").each(function (index, element) {
      var $element = $(element);
      var min = $element.data("min");
      var max = $element.data("max");
      var $wrapper = $(element).closest(".nonlinear-wrapper");
      noUiSlider.create(element, {
        connect: true,
        behaviour: "tap",
        start: [$wrapper.find(".product-filter-item-price-0").val(), $wrapper.find(".product-filter-item-price-1").val()],
        range: {
          min: min,
          "10%": max * 0.1,
          "20%": max * 0.2,
          "30%": max * 0.3,
          "40%": max * 0.4,
          "50%": max * 0.5,
          "60%": max * 0.6,
          "70%": max * 0.7,
          "80%": max * 0.8,
          "90%": max * 0.9,
          max: max
        }
      });
      var nodes = [$wrapper.find(".slider__min"), $wrapper.find(".slider__max")];
      element.noUiSlider.on("update", function (values, handle) {
        nodes[handle].html(MartApp.numberFormat(values[handle]));
      });
      element.noUiSlider.on("change", function (values, handle) {
        $wrapper.find(".product-filter-item-price-" + handle).val(Math.round(values[handle])).trigger("change");
      });
    });
  };
  MartApp.numberFormat = function (number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      toFixedFix = function toFixedFix(n, prec) {
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        var k = Math.pow(10, prec);
        return Math.round(n * k) / k;
      },
      s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split(".");
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  };
  MartApp.submitReviewProduct = function () {
    var imagesReviewBuffer = [];
    var setImagesFormReview = function setImagesFormReview(input) {
      var dT = new ClipboardEvent("").clipboardData ||
      // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
      new DataTransfer(); // specs compliant (as of March 2018 only Chrome)
      for (var _i = 0, _imagesReviewBuffer = imagesReviewBuffer; _i < _imagesReviewBuffer.length; _i++) {
        var file = _imagesReviewBuffer[_i];
        dT.items.add(file);
      }
      input.files = dT.files;
      loadPreviewImage(input);
    };
    var loadPreviewImage = function loadPreviewImage(input) {
      var $uploadText = $(".image-upload__text");
      var maxFiles = $(input).data("max-files");
      var filesAmount = input.files.length;
      if (maxFiles) {
        if (filesAmount >= maxFiles) {
          $uploadText.closest(".image-upload__uploader-container").addClass("d-none");
        } else {
          $uploadText.closest(".image-upload__uploader-container").removeClass("d-none");
        }
        $uploadText.text(filesAmount + "/" + maxFiles);
      } else {
        $uploadText.text(filesAmount);
      }
      var viewerList = $(".image-viewer__list");
      var $template = $("#review-image-template").html();
      viewerList.addClass("is-loading");
      viewerList.find(".image-viewer__item").remove();
      if (filesAmount) {
        for (var i = filesAmount - 1; i >= 0; i--) {
          viewerList.prepend($template.replace("__id__", i));
        }
        var _loop = function _loop(j) {
          var reader = new FileReader();
          reader.onload = function (event) {
            viewerList.find(".image-viewer__item[data-id=" + j + "]").find("img").attr("src", event.target.result);
          };
          reader.readAsDataURL(input.files[j]);
        };
        for (var j = filesAmount - 1; j >= 0; j--) {
          _loop(j);
        }
      }
      viewerList.removeClass("is-loading");
    };
    $(document).on("change", ".form-review-product input[type=file]", function (event) {
      event.preventDefault();
      var input = this;
      var $input = $(input);
      var maxSize = $input.data("max-size");
      Object.keys(input.files).map(function (i) {
        if (maxSize && input.files[i].size / 1024 > maxSize) {
          var message = $input.data("max-size-message").replace("__attribute__", input.files[i].name).replace("__max__", maxSize);
          MartApp.showError(message);
        } else {
          imagesReviewBuffer.push(input.files[i]);
        }
      });
      var filesAmount = imagesReviewBuffer.length;
      var maxFiles = $input.data("max-files");
      if (maxFiles && filesAmount > maxFiles) {
        imagesReviewBuffer.splice(filesAmount - maxFiles - 1, filesAmount - maxFiles);
      }
      setImagesFormReview(input);
    });
    $(document).on("click", ".form-review-product .image-viewer__icon-remove", function (event) {
      event.preventDefault();
      var $this = $(event.currentTarget);
      var id = $this.closest(".image-viewer__item").data("id");
      imagesReviewBuffer.splice(id, 1);
      var input = $(".form-review-product input[type=file]")[0];
      setImagesFormReview(input);
    });
    if (sessionStorage.reloadReviewsTab) {
      if ($('#product-detail-tabs a[href="#product-reviews"]').length) {
        new bootstrap.Tab($('#product-detail-tabs a[href="#product-reviews"]')[0]).show();
      }
      sessionStorage.reloadReviewsTab = false;
    }
    $(document).on("click", ".form-review-product button[type=submit]", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var $this = $(e.currentTarget);
      var $form = $(this).closest("form");
      $.ajax({
        type: "POST",
        cache: false,
        url: $form.prop("action"),
        data: new FormData($form[0]),
        contentType: false,
        processData: false,
        beforeSend: function beforeSend() {
          $this.prop("disabled", true).addClass("loading");
        },
        success: function success(res) {
          if (!res.error) {
            $form.find("select").val(0);
            $form.find("textarea").val("");
            MartApp.showSuccess(res.message);
            setTimeout(function () {
              sessionStorage.reloadReviewsTab = true;
              window.location.reload();
            }, 1500);
          } else {
            MartApp.showError(res.message);
          }
        },
        error: function error(res) {
          MartApp.handleError(res, $form);
        },
        complete: function complete() {
          $this.prop("disabled", false).removeClass("loading");
        }
      });
    });
  };
  MartApp.vendorRegisterForm = function () {
    $(document).on("click", "input[name=is_vendor]", function () {
      if ($(this).val() == 1) {
        $(".show-if-vendor").slideDown().show();
      } else {
        $(".show-if-vendor").slideUp(500);
        $(this).closest("form").find("button[type=submit]").prop("disabled", false);
      }
    });
    $("#shop-url-register").on("keyup", function () {
      var displayURL = $(this).closest(".form-group").find("span small");
      displayURL.html(displayURL.data("base-url") + "/<strong>" + $(this).val().substring(0, 100).toLowerCase() + "</strong>");
    }).on("change", function () {
      var $this = $(this);
      var url = $this.val();
      if (!url) {
        return;
      }
      var displayURL = $this.closest(".form-group").find("span small");
      $.ajax({
        url: $this.data("url"),
        type: "POST",
        data: {
          url: url
        },
        beforeSend: function beforeSend() {
          $this.prop("disabled", true);
          $this.closest("form").find("button[type=submit]").prop("disabled", true);
        },
        success: function success(res) {
          var _res$data2;
          if (res.error) {
            $this.addClass("is-invalid").removeClass("is-valid");
            $(".shop-url-status").removeClass("text-success").addClass("text-danger").text(res.message);
          } else {
            $this.addClass("is-valid").removeClass("is-invalid");
            $(".shop-url-status").removeClass("text-danger").addClass("text-success").text(res.message);
            $this.closest("form").find("button[type=submit]").prop("disabled", false);
          }
          if ((_res$data2 = res.data) !== null && _res$data2 !== void 0 && _res$data2.slug) {
            displayURL.html(displayURL.data("base-url") + "/<strong>" + res.data.slug.substring(0, 100).toLowerCase() + "</strong>");
          }
        },
        error: function error(res) {
          MartApp.handleError(res);
        },
        complete: function complete() {
          $this.prop("disabled", false);
        }
      });
    });
  };
  MartApp.customerDashboard = function () {
    if ($.fn.datepicker) {
      $("#date_of_birth").datepicker({
        format: "yyyy-mm-dd",
        orientation: "bottom"
      });
    }
    $("#avatar").on("change", function (event) {
      var input = event.currentTarget;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $(".userpic-avatar").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    });
    $(document).on("click", ".btn-trigger-delete-address", function (event) {
      event.preventDefault();
      $(".btn-confirm-delete").data("url", $(this).data("url"));
      $("#confirm-delete-modal").modal("show");
    });
    $(document).on("click", ".btn-confirm-delete", function (event) {
      event.preventDefault();
      var $current = $(this);
      $.ajax({
        url: $current.data("url"),
        type: "GET",
        beforeSend: function beforeSend() {
          $current.addClass("loading");
        },
        success: function success(res) {
          $current.closest(".modal").modal("hide");
          if (res.error) {
            MartApp.showError(res.message);
          } else {
            MartApp.showSuccess(res.message);
            $('.btn-trigger-delete-address[data-url="' + $current.data("url") + '"]').closest(".col").remove();
          }
        },
        error: function error(res) {
          MartApp.handleError(res);
        },
        complete: function complete() {
          $current.removeClass("loading");
        }
      });
    });
  };
  MartApp.newsletterForm = function () {
    $(document).on("submit", "form.subscribe-form", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var $this = $(e.currentTarget);
      var _self = $this.find("button[type=submit]");
      $.ajax({
        type: "POST",
        cache: false,
        url: $this.prop("action"),
        data: new FormData($this[0]),
        contentType: false,
        processData: false,
        beforeSend: function beforeSend() {
          _self.prop("disabled", true).addClass("button-loading");
        },
        success: function success(res) {
          if (typeof refreshRecaptcha !== "undefined") {
            refreshRecaptcha();
          }
          if (!res.error) {
            $this.find("input[type=email]").val("");
            MartApp.showSuccess(res.message);
          } else {
            MartApp.showError(res.message);
          }
        },
        error: function error(res) {
          if (typeof refreshRecaptcha !== "undefined") {
            refreshRecaptcha();
          }
          MartApp.handleError(res);
        },
        complete: function complete() {
          _self.prop("disabled", false).removeClass("button-loading");
        }
      });
    });
  };
  MartApp.contactSellerForm = function () {
    $(document).on("click", "form.form-contact-store button[type=submit]", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var $this = $(e.currentTarget);
      var $form = $this.closest("form");
      $.ajax({
        type: "POST",
        cache: false,
        url: $form.prop("action"),
        data: new FormData($form[0]),
        contentType: false,
        processData: false,
        beforeSend: function beforeSend() {
          $this.prop("disabled", true).addClass("button-loading");
        },
        success: function success(res) {
          if (typeof refreshRecaptcha !== "undefined") {
            refreshRecaptcha();
          }
          if (!res.error) {
            $form.find("input[type=email]:not(:disabled)").val("");
            $form.find("input[type=text]:not(:disabled)").val("");
            $form.find("textarea").val("");
            MartApp.showSuccess(res.message);
          } else {
            MartApp.showError(res.message);
          }
        },
        error: function error(res) {
          if (typeof refreshRecaptcha !== "undefined") {
            refreshRecaptcha();
          }
          MartApp.handleError(res);
        },
        complete: function complete() {
          $this.prop("disabled", false).removeClass("button-loading");
        }
      });
    });
  };
  MartApp.recentlyViewedProducts = function () {
    MartApp.$body.find(".header-recently-viewed").each(function () {
      var $el = $(this);
      var loading;
      $el.hover(function () {
        var $recently = $el.find(".recently-viewed-products");
        if ($el.data("loaded") || loading) {
          return;
        }
        var url = $el.data("url");
        if (!url) {
          return;
        }
        $.ajax({
          type: "GET",
          url: url,
          beforeSend: function beforeSend() {
            loading = true;
          },
          success: function success(res) {
            if (!res.error) {
              $recently.html(res.data);
              if ($recently.find(".product-list li").length > 0) {
                MartApp.slickSlide($recently.find(".product-list"));
              }
              $el.data("loaded", true).find(".loading--wrapper").addClass("d-none");
            } else {
              MartApp.showError(res.message);
            }
          },
          error: function error(res) {
            MartApp.handleError(res);
          },
          complete: function complete() {
            loading = false;
          }
        });
      });
    });
  };
  MartApp.showNotice = function (messageType, message) {
    MartApp.$toastLive = $("#toast-notifications");
    if (MartApp.$toastLive.length) {
      MartApp.toast = new bootstrap.Toast(MartApp.$toastLive);
    }
    MartApp.$toastLive.removeClass(function (index, className) {
      return (className.match(/(^|\s)toast--\S+/g) || []).join(" ");
    });
    MartApp.$toastLive.addClass("toast--" + messageType);
    MartApp.$toastLive.find(".toast-body .toast-message").html(message);
    MartApp.toast.show();
  };
  MartApp.showError = function (message) {
    this.showNotice("error", message);
  };
  MartApp.showSuccess = function (message) {
    this.showNotice("success", message);
  };
  MartApp.handleError = function (data) {
    if (typeof data.errors !== "undefined" && data.errors.length) {
      MartApp.handleValidationError(data.errors);
    } else if (typeof data.responseJSON !== "undefined") {
      if (typeof data.responseJSON.errors !== "undefined") {
        if (data.status === 422) {
          MartApp.handleValidationError(data.responseJSON.errors);
        }
      } else if (typeof data.responseJSON.message !== "undefined") {
        MartApp.showError(data.responseJSON.message);
      } else {
        MartApp.showError(data.responseJSON.join(", ").join(", "));
      }
    } else {
      MartApp.showError(data.statusText);
    }
  };
  MartApp.handleValidationError = function (errors) {
    var message = "";
    $.each(errors, function (index, item) {
      if (message !== "") {
        message += "<br />";
      }
      message += item;
    });
    MartApp.showError(message);
  };
  MartApp.toggleViewProducts = function () {
    $(document).on("click", ".store-list-filter-button", function (e) {
      e.preventDefault();
      $("#store-listing-filter-form-wrap").toggle(500);
    });
    MartApp.$body.on("click", ".toolbar-view__icon a", function (e) {
      e.preventDefault();
      var $this = $(e.currentTarget);
      $this.closest(".toolbar-view__icon").find("a").removeClass("active");
      $this.addClass("active");
      $($this.data("target")).removeClass($this.data("class-remove")).addClass($this.data("class-add"));
      MartApp.$formSearch.find("input[name=layout]").val($this.data("layout"));
      var params = new URLSearchParams(window.location.search);
      params.set("layout", $this.data("layout"));
      var nextHref = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + params.toString();
      if (nextHref != window.location.href) {
        window.history.pushState(MartApp.$productListing.html(), "", nextHref);
      }
    });
  };
  MartApp.toolbarOrderingProducts = function () {
    MartApp.$body.on("click", ".catalog-toolbar__ordering .dropdown .dropdown-menu a", function (e) {
      e.preventDefault();
      var $this = $(e.currentTarget);
      var $parent = $this.closest(".dropdown");
      $parent.find("li").removeClass("active");
      $this.closest("li").addClass("active");
      $parent.find("a[data-bs-toggle=dropdown").html($this.html());
      $this.closest(".catalog-toolbar__ordering").find("input[name=sort-by]").val($this.data("value")).trigger("change");
    });
  };
  MartApp.backToTop = function () {
    var scrollPos = 0;
    var element = $("#back2top");
    $(window).scroll(function () {
      var scrollCur = $(window).scrollTop();
      if (scrollCur > scrollPos) {
        // scroll down
        if (scrollCur > 500) {
          element.addClass("active");
        } else {
          element.removeClass("active");
        }
      } else {
        // scroll up
        element.removeClass("active");
      }
      scrollPos = scrollCur;
    });
    element.on("click", function () {
      $("html, body").animate({
        scrollTop: "0px"
      }, 0);
    });
  };
  MartApp.stickyHeader = function () {
    var header = $(".header-js-handler");
    var checkpoint = header.height();
    header.each(function () {
      if ($(this).data("sticky") === true) {
        var el = $(this);
        $(window).scroll(function () {
          var currentPosition = $(this).scrollTop();
          if (currentPosition > checkpoint) {
            el.addClass("header--sticky");
          } else {
            el.removeClass("header--sticky");
          }
        });
      }
    });
  };
  MartApp.stickyAddToCart = function () {
    var $headerProduct = $(".header--product");
    $(window).scroll(function () {
      var currentPosition = $(this).scrollTop();
      if (currentPosition > 50) {
        $headerProduct.addClass("header--sticky");
      } else {
        $headerProduct.removeClass("header--sticky");
      }
    });
    $(".header--product ul li > a ").on("click", function (e) {
      e.preventDefault();
      var target = $(this).attr("href");
      $(this).closest("li").siblings("li").removeClass("active");
      $(this).closest("li").addClass("active");
      $(target).closest(".product-detail-tabs").find("a").removeClass("active");
      $(target).addClass("active");
      $(".header--product ul li").removeClass("active");
      $('.header--product ul li a[href="' + target + '"]').closest("li").addClass("active");
      $("#product-detail-tabs-content > .tab-pane").removeClass("active show");
      $($(target).attr("href")).addClass("active show");
      $("html, body").animate({
        scrollTop: $(target).offset().top - $(".header--product .navigation").height() - 165 + "px"
      }, 0);
    });
    var $trigger = $(".product-details .entry-product-header"),
      $stickyBtn = $(".sticky-atc-wrap");
    if ($stickyBtn.length && $trigger.length && $(window).width() < 768) {
      var summaryOffset = $trigger.offset().top + $trigger.outerHeight(),
        _footer = $(".footer-mobile"),
        off_footer = 0,
        ck_footer = _footer.length > 0;
      var stickyAddToCartToggle = function stickyAddToCartToggle() {
        var windowScroll = $(window).scrollTop(),
          windowHeight = $(window).height(),
          documentHeight = $(document).height();
        if (ck_footer) {
          off_footer = _footer.offset().top - _footer.height();
        } else {
          off_footer = windowScroll;
        }
        if (windowScroll + windowHeight === documentHeight || summaryOffset > windowScroll || windowScroll > off_footer) {
          $stickyBtn.removeClass("sticky-atc-shown");
        } else if (summaryOffset < windowScroll && windowScroll + windowHeight !== documentHeight) {
          $stickyBtn.addClass("sticky-atc-shown");
        }
      };
      stickyAddToCartToggle();
      $(window).scroll(stickyAddToCartToggle);
    }
  };
  MartApp.reviewList = function () {
    var $reviewListWrapper = MartApp.$body.find(".comment-list");
    var $loadingSpinner = MartApp.$body.find(".loading-spinner");
    $loadingSpinner.addClass("d-none");
    var fetchData = function fetchData(url) {
      var hasAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      $.ajax({
        url: url,
        type: "GET",
        beforeSend: function beforeSend() {
          $loadingSpinner.removeClass("d-none");
          if (hasAnimation) {
            $("html, body").animate({
              scrollTop: "".concat($(".product-reviews-container").offset().top, "px")
            }, 1500);
          }
        },
        success: function success(res) {
          $reviewListWrapper.html(res.data);
          $(".product-reviews-container .product-reviews-header").html(res.message);
          var $galleries = $(".product-reviews-container .review-images");
          if ($galleries.length) {
            $galleries.map(function (index, value) {
              if (!$(value).data("lightGallery")) {
                $(value).lightGallery({
                  selector: "a",
                  thumbnail: true,
                  share: false,
                  fullScreen: false,
                  autoplay: false,
                  autoplayControls: false,
                  actualSize: false
                });
              }
            });
          }
        },
        complete: function complete() {
          $loadingSpinner.addClass("d-none");
        }
      });
    };
    if ($reviewListWrapper.length < 1) {
      return;
    }
    fetchData($reviewListWrapper.data("url"));
    $reviewListWrapper.on("click", ".pagination ul li.page-item a", function (e) {
      e.preventDefault();
      var href = $(this).attr("href");
      if (href === "#") {
        return;
      }
      fetchData(href, true);
    });
  };
  $(function () {
    MartApp.init();
    window.onBeforeChangeSwatches = function (data, $attrs) {
      var $product = $attrs.closest(".product-details");
      var $form = $product.find(".cart-form");
      $product.find(".error-message").hide();
      $product.find(".success-message").hide();
      $product.find(".number-items-available").html("").hide();
      var $submit = $form.find("button[type=submit]");
      $submit.addClass("loading");
      if (data && data.attributes) {
        $submit.prop("disabled", true);
      }
    };
    window.onChangeSwatchesSuccess = function (res, $attrs) {
      var $product = $attrs.closest(".product-details");
      var $form = $product.find(".cart-form");
      var $footerCartForm = $(".footer-cart-form");
      $product.find(".error-message").hide();
      $product.find(".success-message").hide();
      if (res) {
        var $submit = $form.find("button[type=submit]");
        $submit.removeClass("loading");
        if (res.error) {
          $submit.prop("disabled", true);
          $product.find(".number-items-available").html('<span class="text-danger">(' + res.message + ")</span>").show();
          $form.find(".hidden-product-id").val("");
          $footerCartForm.find(".hidden-product-id").val("");
        } else {
          var data = res.data;
          var $price = $(document).find(".js-product-content");
          var $salePrice = $price.find(".product-price-sale");
          var $originalPrice = $price.find(".product-price-original");
          if (data.sale_price !== data.price) {
            $salePrice.removeClass("d-none");
            $originalPrice.addClass("d-none");
          } else {
            $salePrice.addClass("d-none");
            $originalPrice.removeClass("d-none");
          }
          $salePrice.find("ins .amount").text(data.display_sale_price);
          $salePrice.find("del .amount").text(data.display_price);
          $originalPrice.find(".amount").text(data.display_sale_price);
          if (data.sku) {
            $product.find(".meta-sku .meta-value").text(data.sku);
            $product.find(".meta-sku").removeClass("d-none");
          } else {
            $product.find(".meta-sku").addClass("d-none");
          }
          $form.find(".hidden-product-id").val(data.id);
          $footerCartForm.find(".hidden-product-id").val(data.id);
          $submit.prop("disabled", false);
          if (data.error_message) {
            $submit.prop("disabled", true);
            $product.find(".number-items-available").html('<span class="text-danger">(' + data.error_message + ")</span>").show();
          } else if (data.success_message) {
            $product.find(".number-items-available").html(res.data.stock_status_html).show();
          } else {
            $product.find(".number-items-available").html("").hide();
          }
          var unavailableAttributeIds = data.unavailable_attribute_ids || [];
          $product.find(".attribute-swatch-item").removeClass("pe-none");
          $product.find(".product-filter-item option").prop("disabled", false);
          if (unavailableAttributeIds && unavailableAttributeIds.length) {
            unavailableAttributeIds.map(function (id) {
              var $item = $product.find('.attribute-swatch-item[data-id="' + id + '"]');
              if ($item.length) {
                $item.addClass("pe-none");
                $item.find("input").prop("checked", false);
              } else {
                $item = $product.find('.product-filter-item option[data-id="' + id + '"]');
                if ($item.length) {
                  $item.prop("disabled", "disabled").prop("selected", false);
                }
              }
            });
          }
          var $gallery = $product.closest(".product-detail-container").find(".product-gallery");
          if (!data.image_with_sizes.origin.length) {
            data.image_with_sizes.origin.push(siteConfig.img_placeholder);
          }
          if (!data.image_with_sizes.thumb.length) {
            data.image_with_sizes.thumb.push(siteConfig.img_placeholder);
          }
          var imageHtml = "";
          data.image_with_sizes.origin.forEach(function (item) {
            imageHtml += "<div class='product-gallery__image item'>\n                                <a class='img-fluid-eq' href='".concat(item, "'>\n                                    <div class='img-fluid-eq__dummy'></div>\n                                    <div class='img-fluid-eq__wrap'>\n                                        <img class='mx-auto' alt='").concat(data.name, "' title='").concat(data.name, "' src='").concat(siteConfig.img_placeholder ? siteConfig.img_placeholder : item, "' data-lazy='").concat(item, "'>\n                                    </div>\n                                </a>\n                            </div>");
          });
          $gallery.find(".product-gallery__wrapper").slick("unslick").html(imageHtml);
          var thumbHtml = "";
          data.image_with_sizes.thumb.forEach(function (item) {
            thumbHtml += "<div class='item'>\n                            <div class='border p-1 m-1'>\n                                <img class='lazyload' alt='".concat(data.name, "' title='").concat(data.name, "' src='").concat(siteConfig.img_placeholder ? siteConfig.img_placeholder : item, "' data-src='").concat(item, "' data-lazy='").concat(item, "'>\n                            </div>\n                        </div>");
          });
          $gallery.find(".product-gallery__variants").slick("unslick").html(thumbHtml);
          MartApp.productGallery(true, $gallery);
          MartApp.lightBox();
        }
      }
    };
    if (jQuery().mCustomScrollbar) {
      $(document).find(".ps-custom-scrollbar").mCustomScrollbar({
        theme: "dark",
        scrollInertia: 0
      });
    }
    $(document).on("click", ".toggle-show-more", function (event) {
      event.preventDefault();
      $("#store-short-description").fadeOut();
      $(this).hide();
      $("#store-content").slideDown(500);
      $(".toggle-show-less").show();
    });
    $(document).on("click", ".toggle-show-less", function (event) {
      event.preventDefault();
      $(this).hide();
      $("#store-content").slideUp(500);
      $("#store-short-description").fadeIn();
      $(".toggle-show-more").show();
    });
    var collapseBreadcrumb = function collapseBreadcrumb() {
      $(".page-breadcrumbs ol li").each(function () {
        var $this = $(this);
        if (!$this.is(":first-child") && !$this.is(":nth-child(2)") && !$this.is(":last-child")) {
          if (!$this.is(":nth-child(3)")) {
            $this.find("a").closest("li").hide();
          } else {
            $this.find("a").hide();
            $this.find(".extra-breadcrumb-name").text("...").show();
          }
        }
      });
    };
    if ($(window).width() < 768) {
      collapseBreadcrumb();
    }
    $(window).on("resize", function () {
      collapseBreadcrumb();
    });
    $(".product-entry-meta .anchor-link").on("click", function (e) {
      e.preventDefault();
      var target = $(this).attr("href");
      $("#product-detail-tabs a").removeClass("active");
      $(target).addClass("active");
      $("#product-detail-tabs-content > .tab-pane").removeClass("active show");
      $($(target).attr("href")).addClass("active show");
      $("html, body").animate({
        scrollTop: $(target).offset().top - $(".header--product .navigation").height() - 250 + "px"
      }, 0);
    });
    $(document).on("click", "#sticky-add-to-cart .add-to-cart-button", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var $this = $(e.currentTarget);
      $this.addClass("button-loading");
      setTimeout(function () {
        var target = ".js-product-content .cart-form button[name=" + $this.prop("name") + "].add-to-cart-button";
        $(document).find(target).trigger("click");
        $this.removeClass("button-loading");
      }, 200);
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    var btnShowMore = document.querySelector(".btn-show-more");
    var description = document.querySelector(".catalog-description");
    if (btnShowMore && description) {
      btnShowMore.addEventListener("click", function () {
        if (description.classList.contains("expanded")) {
          description.classList.remove("expanded");
          description.style.maxHeight = "8em"; // Reset chiều cao
          btnShowMore.textContent = "Xem Thêm";
        } else {
          description.classList.add("expanded");
          description.style.maxHeight = description.scrollHeight + "px"; // Tự động mở rộng
          btnShowMore.textContent = "Ẩn Đi";
        }
      });
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".new-swiper", {
      loop: true,
      // Lặp vô hạn
      slidesPerView: 2,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        // Tự chạy mỗi 3 giây
        disableOnInteraction: false // Không dừng khi click vào slide
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        576: {
          // Mobile
          slidesPerView: 1,
          spaceBetween: 15
        },
        768: {
          // Tablet
          slidesPerView: 3,
          spaceBetween: 15
        },
        1024: {
          // PC
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
  });
})(jQuery);

/***/ }),

/***/ "./platform/plugins/simple-slider/resources/sass/simple-slider.scss":
/*!**************************************************************************!*\
  !*** ./platform/plugins/simple-slider/resources/sass/simple-slider.scss ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/payment/resources/sass/payment.scss":
/*!**************************************************************!*\
  !*** ./platform/plugins/payment/resources/sass/payment.scss ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/marketplace/resources/sass/vendor-dashboard/marketplace.scss":
/*!***************************************************************************************!*\
  !*** ./platform/plugins/marketplace/resources/sass/vendor-dashboard/marketplace.scss ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/marketplace/resources/sass/vendor-dashboard/marketplace-rtl.scss":
/*!*******************************************************************************************!*\
  !*** ./platform/plugins/marketplace/resources/sass/vendor-dashboard/marketplace-rtl.scss ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/language/resources/sass/language.scss":
/*!****************************************************************!*\
  !*** ./platform/plugins/language/resources/sass/language.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/language/resources/sass/language-public.scss":
/*!***********************************************************************!*\
  !*** ./platform/plugins/language/resources/sass/language-public.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/faq/resources/sass/faq.scss":
/*!******************************************************!*\
  !*** ./platform/plugins/faq/resources/sass/faq.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/ecommerce.scss":
/*!*************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/ecommerce.scss ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/ecommerce-product-attributes.scss":
/*!********************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/ecommerce-product-attributes.scss ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/currencies.scss":
/*!**************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/currencies.scss ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/review.scss":
/*!**********************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/review.scss ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/customer.scss":
/*!************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/customer.scss ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/front-theme.scss":
/*!***************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/front-theme.scss ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/front-theme-rtl.scss":
/*!*******************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/front-theme-rtl.scss ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/report.scss":
/*!**********************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/report.scss ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/order-return.scss":
/*!****************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/order-return.scss ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/customer-admin.scss":
/*!******************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/customer-admin.scss ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/sass/widget.scss":
/*!**********************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/sass/widget.scss ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/cookie-consent/resources/sass/cookie-consent.scss":
/*!****************************************************************************!*\
  !*** ./platform/plugins/cookie-consent/resources/sass/cookie-consent.scss ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/contact/resources/sass/contact.scss":
/*!**************************************************************!*\
  !*** ./platform/plugins/contact/resources/sass/contact.scss ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/contact/resources/sass/contact-public.scss":
/*!*********************************************************************!*\
  !*** ./platform/plugins/contact/resources/sass/contact-public.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/backup/resources/sass/backup.scss":
/*!************************************************************!*\
  !*** ./platform/plugins/backup/resources/sass/backup.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/widget/resources/sass/widget.scss":
/*!*************************************************************!*\
  !*** ./platform/packages/widget/resources/sass/widget.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/theme/resources/sass/theme-options.scss":
/*!*******************************************************************!*\
  !*** ./platform/packages/theme/resources/sass/theme-options.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/theme/resources/sass/admin-bar.scss":
/*!***************************************************************!*\
  !*** ./platform/packages/theme/resources/sass/admin-bar.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/theme/resources/sass/guideline.scss":
/*!***************************************************************!*\
  !*** ./platform/packages/theme/resources/sass/guideline.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/slug/resources/sass/slug.scss":
/*!*********************************************************!*\
  !*** ./platform/packages/slug/resources/sass/slug.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/shortcode/resources/sass/shortcode.scss":
/*!*******************************************************************!*\
  !*** ./platform/packages/shortcode/resources/sass/shortcode.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/seo-helper/resources/sass/seo-helper.scss":
/*!*********************************************************************!*\
  !*** ./platform/packages/seo-helper/resources/sass/seo-helper.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/revision/resources/sass/revision.scss":
/*!*****************************************************************!*\
  !*** ./platform/packages/revision/resources/sass/revision.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/plugin-management/resources/sass/plugin.scss":
/*!************************************************************************!*\
  !*** ./platform/packages/plugin-management/resources/sass/plugin.scss ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/menu/resources/sass/menu.scss":
/*!*********************************************************!*\
  !*** ./platform/packages/menu/resources/sass/menu.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/installer/resources/sass/style.scss":
/*!***************************************************************!*\
  !*** ./platform/packages/installer/resources/sass/style.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/packages/get-started/resources/sass/get-started.scss":
/*!***********************************************************************!*\
  !*** ./platform/packages/get-started/resources/sass/get-started.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/table/resources/sass/table.scss":
/*!*******************************************************!*\
  !*** ./platform/core/table/resources/sass/table.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/setting/resources/sass/admin-email.scss":
/*!***************************************************************!*\
  !*** ./platform/core/setting/resources/sass/admin-email.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/media/resources/sass/media.scss":
/*!*******************************************************!*\
  !*** ./platform/core/media/resources/sass/media.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/base/resources/sass/core.scss":
/*!*****************************************************!*\
  !*** ./platform/core/base/resources/sass/core.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/base/resources/sass/libraries/select2/select2.scss":
/*!**************************************************************************!*\
  !*** ./platform/core/base/resources/sass/libraries/select2/select2.scss ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/base/resources/sass/components/email.scss":
/*!*****************************************************************!*\
  !*** ./platform/core/base/resources/sass/components/email.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/base/resources/sass/components/error-pages.scss":
/*!***********************************************************************!*\
  !*** ./platform/core/base/resources/sass/components/error-pages.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/base/resources/sass/components/tree-category.scss":
/*!*************************************************************************!*\
  !*** ./platform/core/base/resources/sass/components/tree-category.scss ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/core/base/resources/sass/components/crop-image.scss":
/*!**********************************************************************!*\
  !*** ./platform/core/base/resources/sass/components/crop-image.scss ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./public/vendor/core/core/base/css/core.css":
/*!***************************************************!*\
  !*** ./public/vendor/core/core/base/css/core.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/themes/farmart/assets/sass/style.scss":
/*!********************************************************!*\
  !*** ./platform/themes/farmart/assets/sass/style.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/themes/farmart/assets/sass/style-rtl.scss":
/*!************************************************************!*\
  !*** ./platform/themes/farmart/assets/sass/style-rtl.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/translation/resources/sass/translation.scss":
/*!**********************************************************************!*\
  !*** ./platform/plugins/translation/resources/sass/translation.scss ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./platform/plugins/social-login/resources/sass/social-login.scss":
/*!************************************************************************!*\
  !*** ./platform/plugins/social-login/resources/sass/social-login.scss ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/themes/farmart/js/main": 0,
/******/ 			"vendor/core/plugins/social-login/css/social-login": 0,
/******/ 			"vendor/core/plugins/translation/css/translation": 0,
/******/ 			"themes/farmart/css/style-rtl": 0,
/******/ 			"themes/farmart/css/style": 0,
/******/ 			"vendor/core/core/base/css/core.rtl": 0,
/******/ 			"vendor/core/core/base/css/crop-image": 0,
/******/ 			"vendor/core/core/base/css/tree-category": 0,
/******/ 			"vendor/core/core/base/css/error-pages": 0,
/******/ 			"vendor/core/core/base/css/email": 0,
/******/ 			"vendor/core/core/base/css/libraries/select2": 0,
/******/ 			"vendor/core/core/base/css/core": 0,
/******/ 			"vendor/core/core/media/css/media": 0,
/******/ 			"vendor/core/core/setting/css/admin-email": 0,
/******/ 			"vendor/core/core/table/css/table": 0,
/******/ 			"vendor/core/packages/get-started/css/get-started": 0,
/******/ 			"vendor/core/packages/installer/css/style": 0,
/******/ 			"vendor/core/packages/menu/css/menu": 0,
/******/ 			"vendor/core/packages/plugin-management/css/plugin": 0,
/******/ 			"vendor/core/packages/revision/css/revision": 0,
/******/ 			"vendor/core/packages/seo-helper/css/seo-helper": 0,
/******/ 			"vendor/core/packages/shortcode/css/shortcode": 0,
/******/ 			"vendor/core/packages/slug/css/slug": 0,
/******/ 			"vendor/core/packages/theme/css/guideline": 0,
/******/ 			"vendor/core/packages/theme/css/admin-bar": 0,
/******/ 			"vendor/core/packages/theme/css/theme-options": 0,
/******/ 			"vendor/core/packages/widget/css/widget": 0,
/******/ 			"vendor/core/plugins/backup/css/backup": 0,
/******/ 			"vendor/core/plugins/contact/css/contact-public": 0,
/******/ 			"vendor/core/plugins/contact/css/contact": 0,
/******/ 			"vendor/core/plugins/cookie-consent/css/cookie-consent": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/widget": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/customer-admin": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/order-return": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/report": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/front-theme-rtl": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/front-theme": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/customer": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/review": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/currencies": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/ecommerce-product-attributes": 0,
/******/ 			"vendor/core/plugins/ecommerce/css/ecommerce": 0,
/******/ 			"vendor/core/plugins/faq/css/faq": 0,
/******/ 			"vendor/core/plugins/language/css/language-public": 0,
/******/ 			"vendor/core/plugins/language/css/language": 0,
/******/ 			"vendor/core/plugins/marketplace/css/marketplace-rtl": 0,
/******/ 			"vendor/core/plugins/marketplace/css/marketplace": 0,
/******/ 			"vendor/core/plugins/payment/css/payment": 0,
/******/ 			"vendor/core/plugins/simple-slider/css/simple-slider": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/themes/farmart/assets/js/main.js")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/themes/farmart/assets/sass/style.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/themes/farmart/assets/sass/style-rtl.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/translation/resources/sass/translation.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/social-login/resources/sass/social-login.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/simple-slider/resources/sass/simple-slider.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/payment/resources/sass/payment.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/marketplace/resources/sass/vendor-dashboard/marketplace.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/marketplace/resources/sass/vendor-dashboard/marketplace-rtl.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/language/resources/sass/language.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/language/resources/sass/language-public.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/faq/resources/sass/faq.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/ecommerce.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/ecommerce-product-attributes.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/currencies.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/review.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/customer.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/front-theme.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/front-theme-rtl.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/report.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/order-return.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/customer-admin.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/ecommerce/resources/assets/sass/widget.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/cookie-consent/resources/sass/cookie-consent.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/contact/resources/sass/contact.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/contact/resources/sass/contact-public.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/plugins/backup/resources/sass/backup.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/widget/resources/sass/widget.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/theme/resources/sass/theme-options.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/theme/resources/sass/admin-bar.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/theme/resources/sass/guideline.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/slug/resources/sass/slug.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/shortcode/resources/sass/shortcode.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/seo-helper/resources/sass/seo-helper.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/revision/resources/sass/revision.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/plugin-management/resources/sass/plugin.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/menu/resources/sass/menu.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/installer/resources/sass/style.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/packages/get-started/resources/sass/get-started.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/table/resources/sass/table.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/setting/resources/sass/admin-email.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/media/resources/sass/media.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/base/resources/sass/core.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/base/resources/sass/libraries/select2/select2.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/base/resources/sass/components/email.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/base/resources/sass/components/error-pages.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/base/resources/sass/components/tree-category.scss")))
/******/ 	__webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./platform/core/base/resources/sass/components/crop-image.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor/core/plugins/social-login/css/social-login","vendor/core/plugins/translation/css/translation","themes/farmart/css/style-rtl","themes/farmart/css/style","vendor/core/core/base/css/core.rtl","vendor/core/core/base/css/crop-image","vendor/core/core/base/css/tree-category","vendor/core/core/base/css/error-pages","vendor/core/core/base/css/email","vendor/core/core/base/css/libraries/select2","vendor/core/core/base/css/core","vendor/core/core/media/css/media","vendor/core/core/setting/css/admin-email","vendor/core/core/table/css/table","vendor/core/packages/get-started/css/get-started","vendor/core/packages/installer/css/style","vendor/core/packages/menu/css/menu","vendor/core/packages/plugin-management/css/plugin","vendor/core/packages/revision/css/revision","vendor/core/packages/seo-helper/css/seo-helper","vendor/core/packages/shortcode/css/shortcode","vendor/core/packages/slug/css/slug","vendor/core/packages/theme/css/guideline","vendor/core/packages/theme/css/admin-bar","vendor/core/packages/theme/css/theme-options","vendor/core/packages/widget/css/widget","vendor/core/plugins/backup/css/backup","vendor/core/plugins/contact/css/contact-public","vendor/core/plugins/contact/css/contact","vendor/core/plugins/cookie-consent/css/cookie-consent","vendor/core/plugins/ecommerce/css/widget","vendor/core/plugins/ecommerce/css/customer-admin","vendor/core/plugins/ecommerce/css/order-return","vendor/core/plugins/ecommerce/css/report","vendor/core/plugins/ecommerce/css/front-theme-rtl","vendor/core/plugins/ecommerce/css/front-theme","vendor/core/plugins/ecommerce/css/customer","vendor/core/plugins/ecommerce/css/review","vendor/core/plugins/ecommerce/css/currencies","vendor/core/plugins/ecommerce/css/ecommerce-product-attributes","vendor/core/plugins/ecommerce/css/ecommerce","vendor/core/plugins/faq/css/faq","vendor/core/plugins/language/css/language-public","vendor/core/plugins/language/css/language","vendor/core/plugins/marketplace/css/marketplace-rtl","vendor/core/plugins/marketplace/css/marketplace","vendor/core/plugins/payment/css/payment","vendor/core/plugins/simple-slider/css/simple-slider"], () => (__webpack_require__("./public/vendor/core/core/base/css/core.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;