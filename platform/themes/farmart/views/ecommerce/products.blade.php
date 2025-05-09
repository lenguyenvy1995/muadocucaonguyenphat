@php
    Theme::layout('full-width');
    $products->loadMissing('defaultVariation');
@endphp

{!! $widgets = dynamic_sidebar('products_list_sidebar') !!}

@if (empty($widgets))
    {!! Theme::partial('page-header', ['size' => 'xxxl', 'withTitle' => false]) !!}
@endif

@isset($category)
    @if(!empty($category->description))
        <div class="container-xxxl">
            <div class="row catalog">
                <h2 class="catalog-header text-center">{{ SeoHelper::getTitle() }}</h2>
                <div class="col-12">
                    <div class="catalog-description">
                        {!! $category->description !!}
                    </div>
                    <div class="show-more text-center">
                        <button class="btn btn-outline-primary btn-show-more" data-value="0">{{ __('Xem Thêm') }}</button>
                    </div>
                </div>
            </div>
        </div>
    @endif
@endisset
  @includeIf(Theme::getThemeNamespace('views.ecommerce.includes.categories_child'))

<div class="container-xxxl">
    <div class="row my-5">
        <div class="col-12">
            <div class="row catalog-header justify-content-between">
                <div class="col-auto catalog-header__left d-flex align-items-center">
                    <h1 class="h2 catalog-header__title d-none d-lg-block">{{ SeoHelper::getTitle() }}</h1>
                    <a
                        class="d-lg-none sidebar-filter-mobile"
                        href="#"
                    >
                        <span class="svg-icon me-2">
                            <svg>
                                <use
                                    href="#svg-icon-filter"
                                    xlink:href="#svg-icon-filter"
                                ></use>
                            </svg>
                        </span>
                        <span>{{ __('Filter') }}</span>
                    </a>
                </div>
                <div class="col-auto catalog-header__right">
                    <div class="catalog-toolbar row align-items-center">
                        @include(Theme::getThemeNamespace('views.ecommerce.includes.sort'))
                        @include(Theme::getThemeNamespace('views.ecommerce.includes.layout'))
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xxl-2 col-lg-3">
            <form
                id="products-filter-form"
                data-action="{{ route('public.products') }}"
                data-title="{{ __('Products') }}"
                action="{{ URL::current() }}"
                method="GET"
            >
                @include(Theme::getThemeNamespace('views.ecommerce.includes.filters'))
            </form>
        </div>
        <div class="col-xxl-10 col-lg-9 products-listing position-relative">
            @include(Theme::getThemeNamespace('views.ecommerce.includes.product-items'))
        </div>
    </div>
</div>
