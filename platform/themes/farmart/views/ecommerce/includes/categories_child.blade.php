@isset($category)
    @if ($category->children->isNotEmpty())
        <div class=" container categories-children py-3">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center text-uppercase">{{ __('Danh mục con') }}</h3>
                </div>
            </div>
			
            <div class="row row-cols-lg-5 row-cols-md-4 row-cols-2">
                @foreach ($category->children as $child)
				
                    <div class="col category_innner">
                       <!-- <a class="category_innner_link" href="{{ route('public.products', ['category_id' => $child->id]) }}"> -->
						 <a class="category_innner_link" href="{{$child->url}}">
						
                            @if ($child->icon_image)
                                <img class="img-fluid" src="{{ RvMedia::getImageUrl($child->icon_image) }}" alt="{{ $category->name }}"
                                    width="18" height="18">
                            @elseif ($child->icon)
                                <i class="{{ $child->icon }}"></i>
                            @endif
                            <h5 class="category_tittle">
                                {{ $child->name }}
                            </h5>
                        </a>
                    </div>
                @endforeach

            </div>
        </div>
    @endif
@endisset
