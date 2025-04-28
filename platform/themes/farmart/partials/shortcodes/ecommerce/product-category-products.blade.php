<div class="widget-products-with-category py-3" style="background-color:{{ $shortcode->background }} !important">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="row  mb-4 widget-header ">
                    <h2 class="col-auto mb-0 py-2">
                        <span>
                            {{ $shortcode->title ?: $category->name }}
                        </span>
                    </h2>
                </div>
                <div class="product-deals-day__body ">
                    <div class="product-deals-day-body row row-cols-lg-5 row-cols-md-4 row-cols-2 shop-products-listing g-0">
                        <!-- row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2  -->
                        @foreach ($products as $product)
                            <div class="col product-box-item"> <!-- Thêm thẻ .col để mỗi sản phẩm nằm trong một cột -->
                                <div class="product-inner">
                                    <div class="product-inner-item"> {!! Theme::partial('ecommerce.product-item', compact('product', 'wishlistIds')) !!} </div>

                                </div>
                            </div>
                        @endforeach
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
