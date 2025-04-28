<section class=" section-introduce py-5" style="background-color: #f2f2f2;">
    <div class="container">
        <div class="row">

            @if ($shortcode->image)
                <div class="col-md-5 d-none d-md-block">
                    <div class="introduction ">
                        <img class="img-fluid  " src="{{ RvMedia::getImageUrl($shortcode->image) }}" alt="giới thiệu"
                            title="giới thiệu" srcset="">
                    </div>
                </div>
            @endif
            @if ($shortcode->link)
                <div class="col-12 col-md-5 ">

                    <div class="video-intro">
                        <iframe width="100%" height="315" src="{{ $shortcode->{'link'} }}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            @endif
            <div class="col-12 col-md-7">
                <div class="pt-5 p-md-5">
                    <h2 style="text-align:center">{{ $shortcode->title }}</h2>
                    <div class="fs-6 ">
                        <p class="text-justify" style="text-align: justify;"> {!! $shortcode->description !!} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
