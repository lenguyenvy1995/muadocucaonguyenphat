<div class="outstanding-products py-5 ">
    <div class="container-fluid">
    <div class="row align-items-center mb-2 widget-header">
                <h2 class="col-auto mb-0 py-2">{{ $shortcode->title }} </h2>
            </div>
        <div class="row">
            <div class="product-deals-day__body arrows-top-right">
                <div
                    class="product-deals-day-body slick-slides-carousel"
                    data-slick="{{ json_encode([
                            'rtl' => BaseHelper::siteLanguageDirection() == 'rtl',
                            'appendArrows' => '.arrows-wrapper',
                            'arrows' => true,
                            'dots' => false,
                            'autoplay' => $shortcode->is_autoplay == 'yes',
                            'infinite' => $shortcode->infinite == 'yes' || $shortcode->is_infinite == 'yes',
                            'autoplaySpeed' => in_array($shortcode->autoplay_speed, theme_get_autoplay_speed_options())
                                ? $shortcode->autoplay_speed
                                : 3000,
                            'speed' => 800,
                            'slidesToShow' => 5,
                            'slidesToScroll' => 1,
                            'swipeToSlide' => true,
                            'responsive' => [
                                [
                                    'breakpoint' => 1400,
                                    'settings' => [
                                        'slidesToShow' => 5,
                                    ],
                                ],
                                [
                                    'breakpoint' => 1199,
                                    'settings' => [
                                        'slidesToShow' => 4,
                                    ],
                                ],
                                [
                                    'breakpoint' => 1024,
                                    'settings' => [
                                        'slidesToShow' => 3,
                                    ],
                                ],
                                [
                                    'breakpoint' => 767,
                                    'settings' => [
                                        'arrows' => true,
                                        'dots' => false,
                                        'slidesToShow' => 2,
                                        'slidesToScroll' => 2,
                                    ],
                                ],
                            ],
                        ]) }}">
                    @foreach ($products as $product)
                    <div class="col product-box-item"> <!-- Thêm thẻ .col để mỗi sản phẩm nằm trong một cột -->
                        <div class="product-inner">
                            <div class="product-inner-item"> {!! Theme::partial('ecommerce.product-item', compact('product', 'wishlistIds')) !!} </div>

                        </div>
                    </div>
                    @endforeach
                </div>
                <div class="arrows-wrapper"></div>
            </div>
        </div>
    </div>
</div>