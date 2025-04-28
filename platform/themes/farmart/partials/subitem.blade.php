<section id="course" class="py-3 py-md-5">

    <div class="container">
        <div class="row d-flex justify-content-center ">
            <div class="title">
                <h2 class="text-center text-uppercase text-white p-1 p-md-3">{{ $shortcode->title }} </h2>
            </div>
            @for ($i = 1; $i <= 4; $i++)
                @if ($shortcode->{'name'.$i}!=null)
                <div class="col-6 col-md-3 mt-md-2 mb-md-2 box-item">
                    <a href="{{ $shortcode->{'link'.$i} }}">
                        <div class="card bg-card card-item">
                            <img class="card-img-top" src="{{ RvMedia::getImageUrl($shortcode->{'img'.$i}) }}" alt="{{ $shortcode->{'name'.$i} }}">
                            <div class="card-body ">
                                <h5 class="card-title text-white text-center m-0">{{ $shortcode->{'name'.$i} }}
                                </h5>
                                <a href="{{ $shortcode->{'link'.$i} }}"
                                    class="btn mx-auto text-white btn-underline text-decoration-underline d-flex justify-content-center">
                                    <h6 class="text-white">KHÁM PHÁ</h6>
                                </a>
                            </div>
                        </div>
                    </a>
                </div>
                @endif
           
                @endfor
        </div>
    </div>
</section>