<section id="example-img">
    <div class="container">
        <div class="row">
            <div class="title mt-1 mb-1 mt-md-3 mb-md-3">
                <h2 class="text-center text-darger">{{ $shortcode->title }}</h2>
                <p class="text-center text-darger">{{ $shortcode->subtitle }}</p>
            </div>
            <!-- Bọc gallery bằng div có id để khởi tạo lightGallery -->
            <div id="lightgallery" class="gallery row">
                @for ($i = 1; $i <= 30; $i++)
                    @if ($shortcode->{'image_' . $i})
                        <div class="box-img">
                            <a href="{{ RvMedia::getImageUrl($shortcode->{'image_' . $i}) }}" 
                               class="gallery-item"
                               data-fancybox="gallery" data-fancybox-fullscreen="true" data-caption="{{ $shortcode->title }}">
                                <img class="img-fluid hvr-grow"
                                    src="{{ RvMedia::getImageUrl($shortcode->{'image_' . $i}) }}"
                                    alt="{{ $shortcode->title }}">
                            </a>
                        </div>
                    @endif
                @endfor
            </div>
        </div>
    </div>
</section>

<script>
   document.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind("[data-fancybox='gallery']", {
        Toolbar: {
            display: ["zoom", "fullscreen", "close"], // Hiển thị nút Fullscreen
        },
        Fullscreen: {
            autoStart: true // Tự động bật fullscreen khi mở ảnh
        },
        Image: {
            zoom: false, // Tắt zoom để ảnh hiển thị đúng kích thước màn hình
        },
        Thumbs: {
            autoStart: true // Hiển thị thumbnail
        },
        on: {
            ready: (fancybox) => {
                console.log("Fancybox mở ở chế độ Fullscreen");
            }
        }
    });
});
    </script>