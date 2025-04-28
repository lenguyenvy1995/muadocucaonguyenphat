<section id="customer-reviews" class="py-3"  style="background-color:{{$shortcode->background}} !important">
    <div class="container">
        <div class="row">
            <div class="title widget-header pt-0">
                <h2 class="text-uppercase ">{{ $shortcode->title }}</h2>
                <p class="text-center fs-5 ">{{ $shortcode->subtitle }}</p>
            </div>
            <div class="autoplay slick-slides-carousel" data-slick="{{ json_encode([
                    'rtl' => BaseHelper::siteLanguageDirection() == 'rtl',
                    'appendArrows' => '.arrows-wrapper',
                    'arrows' => true,
                    'dots' => false,
                    'autoplay' => true, // Sửa đổi thành true để kích hoạt tự động chạy
                    'infinite' => true, // Sửa đổi thành true để vòng lại khi hết slide
                    'speed' => 800,
                    'slidesToShow' => 3,
                    'slidesToScroll' => 1,
                    'swipeToSlide' => true,
                    'responsive' => [
                        [
                            'breakpoint' => 1400,
                            'settings' => [
                                'slidesToShow' => 3,
                            ],
                        ],
                        [
                            'breakpoint' => 1199,
                            'settings' => [
                                'slidesToShow' => 3,
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
                                'slidesToShow' => 1,
                                'slidesToScroll' => 1,
                            ],
                        ],
                    ],
                ]) }}">
                @for ($i = 1; $i <= 6; $i++) @if ($shortcode->{'name_' . $i})
                    <div class="box-card p-2">
                        <div class="card-item">
                            <div class="card-top">
                                <i class="fa-solid fa-quote-left"></i>
                                <p class="card-text ">{{ $shortcode->{'description_' . $i} }}</p>
                            </div>
                            <div class="card-bottom row mt-3">
                                <div class="col-4">
                                    <img class="img-fluid" src="{{ RvMedia::getImageUrl($shortcode->{'image_' . $i}) }}" alt="{{ $shortcode->{'name_' . $i} }}">
                                </div>

                                <div class="col-8 my-auto">
                                    <h3 class="card-title text-center">{{ $shortcode->{'name_' . $i} }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    @endif
                    @endfor

            </div>
        </div>
    </div>
</section>