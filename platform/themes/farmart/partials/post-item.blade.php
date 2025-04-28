<div class="col-6 col-md-4 p-1">
    <article class="post-item-wrapper">
        <div class="post-item__inner">  
            <div class="row g-0 pb-2">
                <a class="img-fluid-eq" href="{{ $post->url }}">
                    <div class="card card-item">
                        <div class="card-item-img">
                        <img class="lazyload img-cover card-img-top" data-src="{{ RvMedia::getImageUrl($post->image, null, false, RvMedia::getDefaultImage()) }}" src="{{ image_placeholder($post->image) }}">
                        </div>
                        <div class=" card-body post-item__content">
                                <div class="entry-title card-title text-uppercase fw-bolder ">
                                    <h5 class="entry-title-h5 m-0 text-center text-uppercase fw-bolder">{{ $post->name }}</h5>
                                </div>
                                <!-- <div class="entry-description card-text m-0">
                                <p class="text-jt mb-0">{{ Str::limit($post->description, 400) }}</p>
                                </div> -->
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </article>
</div>