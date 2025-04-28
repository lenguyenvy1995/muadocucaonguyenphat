<div class="page-header">
    @if (!Theme::get('breadcrumbRendered', false) && Theme::breadcrumb()->getCrumbs())
        <div class="page-breadcrumbs">
            <div class="container-{{ $size ?? 'xxxl' }}">
                {!! Theme::partial('breadcrumbs') !!}
            </div>
        </div>
        @php
            Theme::set('breadcrumbRendered', true);
        @endphp
    @endif

    @if (!empty($withTitle) && !Theme::get('titleRendered', false))
        <div class="page-title text-center">

            <div class="container py-2 my-4">
            <div class="row align-items-center mb-2 widget-header pb-3"><h2 class="col-auto mb-0 py-2"> {{ $title ?? SeoHelper::getTitle() }}  </h2></div>
            </div>
        </div>
        @php
            Theme::set('titleRendered', true);
        @endphp
    @endif
</div>
