@php
$menu = Menu::generateMenu([
'slug' => $config['menu_id'],
'options' => ['class' => 'ps-0'],
'view' => 'menu-default',
]);
@endphp

@if($menu)
<div class="col-xl-2">
    <div class="widget widget-custom-menu">
        <p class="h5 fw-bold widget-title mb-4">{{ $config['name'] }}</p>
        {!! $menu !!}
    </div>
</div>
@endif