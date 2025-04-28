@php
$slick = [
'rtl' => BaseHelper::isRtlEnabled(),
'appendArrows' => '.arrows-wrapper',
'arrows' => true,
'dots' => false,
'autoplay' => $shortcode->is_autoplay == 'yes',
'infinite' => $shortcode->infinite == 'yes' || $shortcode->is_infinite == 'yes',
'autoplaySpeed' => in_array($shortcode->autoplay_speed, theme_get_autoplay_speed_options()) ? $shortcode->autoplay_speed : 3000,
'speed' => 800,
'lazyLoad' => 'ondemand',
'slidesToShow' => 4,
'slidesToScroll' => 1,
'responsive' => [
[
'breakpoint' => 1700,
'settings' => [
'slidesToShow' => 4,
],
],
[
'breakpoint' => 1500,
'settings' => [
'slidesToShow' => 4,
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
'arrows' => false,
'dots' => true,
'slidesToShow' => 1,
'slidesToScroll' => 1,
],
],
],
];
@endphp
@if ($categories->isNotEmpty())

<!-- DANH MỤC SẢN PHẨM NỔI BẬT -->
<div class="widget-product-categories pt-4 pb-2"   style="background-color:{{$shortcode->background}} !important;overflow: hidden;">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="row align-items-center mb-2 widget-header  pb-3">
                    <h2 class="col-auto mb-0">{{ $shortcode->title }}</h2>
                </div>
                <div class="product-categories-body pb-4 arrows-top-right">
                    <div class="product-categories-box slick-slides-carousel" data-slick="{{ json_encode($slick) }}">
                        @foreach ($categories as $item)
                        <div class="product-category-item col-12 col-md-3 mt-1 mb-2">
                            <div class="category-item-body">
                                <div class="category__card card shine-animate-item">
                                    <div class="category__img">
                                        <a href="{{ $item->url }}" class="shine-animate">
                                            <img class="shine-animate" src="{{ RvMedia::getImageUrl($item->image, 'small', false, RvMedia::getDefaultImage()) }}" alt="icon {{ $item->name }}" />
                                        </a>
                                    </div>
                                    <div class="category__text text-center py-4 pt-4">
                                        <div class="icon services-icon">
                                            <svg class="w-6 h-6 text-gray-800 icon-inner" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                            </svg>
                                        </div>
                                        <h4 class="title"><a title="{{ $item->url }}" class="truncate-2-custom" href="{{ $item->url }}">{{ $item->name }}</a></h4>
                                        <div class="truncate-3-custom"> {!! $item->description !!}</div>
                                        <a href="{{ $item->url }}" class="btn">Xem Thêm</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        @endforeach
                    </div>
                    <div class="arrows-wrapper"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endif