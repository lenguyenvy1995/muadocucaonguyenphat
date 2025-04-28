@php

$posts = Botble\Blog\Models\Category::where('name','DỊCH VỤ')->first()->posts;
@endphp
<div class="container pb-4 pt-4">
    <div class="row">
        <div class="title">
            <h2 class="text-center fw-bold "> DỊCH VỤ NỔI BẬT</h2>
        </div>

        <div class="product-deals-day-body slick-slides-carousel" data-slick="{{ json_encode([
                            'rtl' => BaseHelper::siteLanguageDirection() == 'rtl',
                            'appendArrows' => '.arrows-wrapper',
                            'arrows' => true,
                            'dots' => false,
                            'autoplay' =>'yes',
                            'infinite' =>'yes',
                         
                            'speed' => 800,
                            'slidesToShow' => 4,
                            'slidesToScroll' => 1,
                            'swipeToSlide' => true,
                            'responsive' => [
                                [
                                    'breakpoint' => 1400,
                                    'settings' => [
                                        'slidesToShow' => 4,
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
                                        'slidesToShow' => 2,
                                        'slidesToScroll' => 2,
                                    ],
                                ],
                            ], 
                        ]) }}">
            @foreach($posts as $post)
            <div class="card p-2">
                <img class="lazyload img-cover card-img-top entered loaded" data-src="{{ RvMedia::getImageUrl($post->image, null, false, RvMedia::getDefaultImage())}}" src="{{ RvMedia::getImageUrl($post->image, null, false, RvMedia::getDefaultImage())}}" data-ll-status="loaded">
                <div class=" card-body post-item__content">
                    <div class="entry-title card-title text-uppercase fw-bolder ">
                        <h5 class="entry-title-h5 m-0 text-center text-uppercase fw-bolder">{{ $post->name }}</h5>
                    </div>

                </div>
            </div>
            @endforeach


            
        </div>
    </div>
</div>