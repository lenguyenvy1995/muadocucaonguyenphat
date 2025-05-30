@php
    $products->loadMissing(['defaultVariation', 'options', 'options.values']);
@endphp
<div class="loading loading-container">
    <div class="half-circle-spinner">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
    </div>
</div>
<!--products list-->
<input name="page" data-value="{{ $products->currentPage() }}" type="hidden">
<input name="q" type="hidden" value="{{ BaseHelper::stringify(request()->query('q')) }}">
<div
    class="row @if (request()->input('layout') == 'list') row-cols-1 shop-products-listing__list @else row-cols-xxl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 @endif shop-products-listing g-0">
    @forelse ($products as $product)
        <div class="col product-box-item">
            <div class="product-inner">
                <div class="product-inner-item">

                    {!! Theme::partial('ecommerce.product-item', compact('product')) !!}
                </div>
            </div>
        </div>
    @empty
        <div class="col-12 w-100">
            <div class="alert alert-warning mt-4 w-100" role="alert">
                {{ __(':total Product(s) found', ['total' => 0]) }}
            </div>
        </div>
    @endforelse
</div>

<div class="row mt-2 mb-3">
    {!! $products->withQueryString()->links(Theme::getThemeNamespace('partials.pagination-numeric')) !!}
</div>
