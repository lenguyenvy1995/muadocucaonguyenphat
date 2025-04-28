<section id="brands" class="py-3">
	<div class="top_inside_divider"> </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="title widget-header justify-content-center"><h2 class="text-center text-uppercase p-1 p-md-3">{{ $shortcode->title }}</h2></div>
            </div>
            <div class="col-12">
                <ul class="list-item">
                    @for ($i = 1; $i <= 20; $i++)
                        @if ($shortcode->{'link' . $i})
                            <li>
                                <a href="{{ $shortcode->{'link' . $i} }}">
                                    <img class="list-item-img" src="{{ RvMedia::getImageUrl($shortcode->{'image_' . $i}) }}"
                                    alt="{{ $shortcode->{'title' . $i} }}">
                                </a>
                            </li>
                        @endif
                    @endfor
                </ul>
            </div>
        </div>
    </div>
</section>
