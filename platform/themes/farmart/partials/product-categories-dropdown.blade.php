@php
    $groupedCategories = $categories->groupBy('parent_id');

    $currentCategories = $groupedCategories->get(0);
@endphp

@if($currentCategories)
    @foreach ($currentCategories as $category)
        @php
            $hasChildren = $groupedCategories->has($category->id);
        @endphp
{{-- 
        <li @if ($hasChildren) class="menu-item-has-children " @endif>
            <a href="{{ route('public.single', $category->url) }}">
                @if ($category->icon_image)
                    <img
                        src="{{ RvMedia::getImageUrl($category->icon_image) }}"
                        alt="{{ $category->name }}"
                        width="18"
                        height="18"
                    >
                @elseif ($category->icon)
                    <i class="{{ $category->icon }}"></i>
                @endif
                <span class="ms-1">{{ $category->name }}</span>
                @if ($hasChildren)
                    <span class="sub-toggle">
                    <span class="svg-icon">
                        <svg>
                            <use
                                href="#svg-icon-chevron-right"
                                xlink:href="#svg-icon-chevron-right"
                            ></use>
                        </svg>
                    </span>
                </span>
                @endif
            </a> --}}
            @if ($hasChildren)
                @php
                    $currentCategories = $groupedCategories->get($category->id);
                @endphp

                <div class="menu-item-has-children" @if(! $groupedCategories->has($currentCategories[0]->id)) style="min-width: 250px;" @endif>
                    @if($currentCategories)
                        @foreach ($currentCategories as $childCategory)
                            @php
                                $hasChildren = $groupedCategories->has($childCategory->id);
                            @endphp
                            <div class="mega-menu__column">
                                @if ($hasChildren)
                                    <a href="{{ route('public.single', $childCategory->url) }}" style="background:var(--primary-color); border-bottom: 1px solid;font-size: 14px;font-weight: 700;color: #fff;display: block;padding-top: 12px;padding-bottom: 12px;padding-left: 25px;padding-right: 19px;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;">
                                        <h4>{{ $childCategory->name }}</h4>
                                        <span class="sub-toggle">
                                        <span class="svg-icon">
                                            <svg>
                                                <use
                                                    href="#svg-icon-chevron-right"
                                                    xlink:href="#svg-icon-chevron-right"
                                                ></use>
                                            </svg>
                                        </span>
                                    </span>
                                    </a>
                                    <ul class="mega-menu__list">
                                        @php
                                            $currentCategories = $groupedCategories->get($childCategory->id);
                                        @endphp
                                        @if($currentCategories)
                                            @foreach ($currentCategories as $item)
                                                <li><a href="{{ route('public.single', $item->url) }}"  style="background:var(--primary-color); border-bottom: 1px solid;font-size: 14px;font-weight: 700;color: #fff;display: block;padding-top: 12px;padding-bottom: 12px;padding-left: 25px;padding-right: 19px;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;">{{ $item->name }}</a></li>
                                            @endforeach
                                        @endif
                                    </ul>
                                @else
                                    <a href="{{ route('public.single', $childCategory->url) }}"  style="background:var(--primary-color); border-bottom: 1px solid;font-size: 14px;font-weight: 700; border-bottom: 1px solid;;color: #fff;display: block;padding-top: 12px;padding-bottom: 12px;padding-left: 25px;padding-right: 19px;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;">{{ $childCategory->name }}</a>
                                @endif
                            </div>
                        @endforeach
                    @endif
                </div>
            @endif
        </li>
    @endforeach
@endif
