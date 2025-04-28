<section id="course" class="py-3 ">
    <div class="container">
        <div class="row d-flex justify-content-center ">
            <div class="title widget-header justify-content-center">
                <h2 class="text-center text-uppercase p-1 p-md-3">{{ $shortcode->title }} </h2>
            </div>
            @for ($i = 1; $i <= 50; $i++) @if ($shortcode->{'name'.$i}!=null)
                <div class="col-6 col-md-3 mt-2 mb-md-2 p-0 box-item">
                    <a href="{{ $shortcode->{'link'.$i} }}">
                        <!-- <div class="card bg-card card-item">
                            <img class="card-img-top zoom-effect" src="{{ RvMedia::getImageUrl($shortcode->{'img'.$i}) }}" alt="{{ $shortcode->{'name'.$i} }}">
                            <div class="card-body ">
                                <h5 class="card-title text-white text-center m-0">{{ $shortcode->{'name'.$i} }}
                                </h5>
                                <a href="{{ $shortcode->{'link'.$i} }}"
                                    class="btn mx-auto text-white btn-underline text-decoration-underline d-flex justify-content-center">
                                    <h6 class="text-white">XEM THÊM</h6>
                                </a>
                            </div>
                        </div> -->

                        <div class="card box-item-card">
                            <div class="img-fluid-eq__wrap"><img class="card-img-top zoom-effect" src="{{ RvMedia::getImageUrl($shortcode->{'img'.$i}) }}" alt="{{ $shortcode->{'name'.$i} }}"></div>
                            <div class="card-img-overlay d-flex flex-column justify-content-end  p-0">
                                <div class="btn-sup ">
                                    <h5 class="card-title text-white text-center m-0">{{ $shortcode->{'name'.$i} }}
                                    </h5>
                                  
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                @endif

                @endfor
        </div>
    </div>
</section>