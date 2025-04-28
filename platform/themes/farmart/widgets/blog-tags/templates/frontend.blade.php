@if (is_plugin_active('blog'))
    @php
        $tags = get_popular_tags($config['number_display']);
    @endphp
    @if ($tags->isNotEmpty())
        <div class="widget-sidebar widget-blog-tag-cloud">
            <h2 class="widget-title">{{ BaseHelper::clean($config['name'] ?: __('Tags')) }}</h2>
            <div class="widget__inner">
                @foreach ($tags as $tag)
                    <a
                        class="tag-cloud-link"
                        href="{{ $tag->url }}"
                        title="{{ $tag->name }}"
                        aria-label="{{ $tag->name }}"
                    >{{ $tag->name }}</a>
                @endforeach
            </div>
        </div>
    @endif
@endif

<section class="bg-white">
  <div class="carousel" id="slick_slider">
    <div class="carousel__slide">
      <picture>
        <source class="mx-auto" media="(max-width: 600px)" srcset="https://kythuatdonga.com/images/banner/4.png">
        <source class="mx-auto" media="(min-width: 601px)" srcset="https://kythuatdonga.com/images/banner/3.png">
        <img class="mx-auto" src="https://kythuatdonga.com/images/banner/4.png" alt="Hình mặc định">
      </picture>
    </div>
  </div>
</section>