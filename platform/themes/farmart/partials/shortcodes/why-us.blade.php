<section id="why-us" class="py-3 my-1" style="background-color:{{ $shortcode->background }} !important">
    <div class="container">
        <div class="row justify-content-center ">
            <div class="title widget-header pt-0">
                <h2 class="text-uppercase ">{{ $shortcode->{'title'} }}</h2>
            </div>
            @for ($i = 1; $i <= 4; $i++)
                @if ($shortcode->{'name' . $i} != null)
                    <div class="col-6 col-md-3 boder-secondary ">
                        <div class=" item gap-md-3 pt-2">
                            <div class="ỉtem-inner-img img-fluid">
                                <img src="{{ RvMedia::getImageUrl($shortcode->{'img' . $i}) }}" width="80px"
                                    alt="{{ $shortcode->{'name' . $i} }}">
                            </div>
                            <div class="item-inner-content">
                                <h5 class="card-title text-star m-0">{{ $shortcode->{'name' . $i} }}
                                </h5>
                                <p>
                                    {{ $shortcode->{'description' . $i} }}
                                </p>
                            </div>
                        </div>
                    </div>
                @endif
            @endfor
        </div>
    </div>
</section>
