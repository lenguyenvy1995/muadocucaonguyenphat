@php
$posts = Botble\Blog\Models\Category::where('name', 'TIN TỨC')->first()->posts;

@endphp

<section id="new" class="d-block">

    <div class="container pb-4 pt-md-3">
        <div class="row align-items-center mb-2 widget-header">
            <h2 class="col-auto mb-0 py-2">TIN TỨC</h2>
        </div>
        <div class="swiper new-swiper row pt-3 pb-5">
            <div class="swiper-wrapper">
                @foreach ($posts as $post)
                <div class="swiper-slide new-card-customer card">
                    <a href="{{ $post->url }}">
                        <img class="lazyload card-img-top img-fluid"
                            data-src="{{ RvMedia::getImageUrl($post->image, null, false, RvMedia::getDefaultImage()) }}"
                            src="{{ RvMedia::getImageUrl($post->image, null, false, RvMedia::getDefaultImage()) }}"
                            alt="{{ $post->name }}" title="{{ $post->name }}">
                    </a>

                    <div class="card-body new-card-customer-body">
                        <h5 class="card-customer-title card-title fw-bold text-center truncate-custom-1">
                            <a href="{{ $post->url }}" class="text-dark text-decoration-none">{{ $post->name }}</a>
                        </h5>
                        <p class="card-customer-description card-description truncate-custom-3">
                            <a href="{{ $post->url }}" class="text-dark text-decoration-none">
                                {{ $post->description }}
                            </a>
                        </p>
                    </div>
                </div>
                @endforeach
            </div>

            <!-- Navigation Buttons (Đưa ra ngoài swiper-wrapper) -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>

            <!-- Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</section>