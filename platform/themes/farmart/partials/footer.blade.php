
    <footer id="footer">
        <!-- <div class="footer-info border-top bg-white">
            <div class="container-xxxl py-3">
                {!! dynamic_sidebar('pre_footer_sidebar') !!}
            </div>
        </div> -->
        @if (Widget::group('footer_sidebar')->getWidgets())
            <div class="footer-widgets">
                <div class="container-fluid">
                    <div class="row  py-5">
                        {!! dynamic_sidebar('footer_sidebar') !!}
                        <div class=" col-12 col-xl-3">
                            <p class="h5 fw-bold widget-title mb-4">BẢN ĐỒ</p>
                            <iframe src="{{ theme_option('map') }}" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            
        @endif
        @if (Widget::group('bottom_footer_sidebar')->getWidgets())
            <div class="container-xxxl">
                <div
                    class="footer__links"
                    id="footer-links"
                >
                    {!! dynamic_sidebar('bottom_footer_sidebar') !!}
                </div>
            </div>
        @endif
        <div class="container-fluid ">
            <div class="row  pb-4">
                <div class="col-lg-12 col-md-12 py-3 bg-dark">
                    <div class="copyright d-flex justify-content-center ">
                        <div class="copy text-center text-white">   <span>{{ theme_option('copyright') }}</span> <span> {{ theme_option('title-dn') }} - design by <a href="https://tivatech.vn"><b>TIVATECH.VN</b></a></span></div>
                    </div>
                </div>
        
                <!-- <div class="col-lg-6 col-md-6 py-3">
                    <div class="footer-socials d-flex justify-content-md-end justify-content-center">
                        @if (theme_option('social_links'))
                            <p class="me-3 mb-0">{{ __('Stay connected:') }}</p>
                            <div class="footer-socials-container">
                                <ul class="ps-0 mb-0">
                                    @foreach (json_decode(theme_option('social_links'), true) as $socialLink)
                                        @if (count($socialLink) == 3)
                                            <li class="d-inline-block ps-1 my-1">
                                                <a
                                                    href="{{ Arr::get($socialLink[2], 'value') }}"
                                                    title="{{ Arr::get($socialLink[0], 'value') }}"
                                                    target="_blank"
                                                >
                                                    <img
                                                        class="lazyload"
                                                        data-src="{{ RvMedia::getImageUrl(Arr::get($socialLink[1], 'value')) }}"
                                                        alt="{{ Arr::get($socialLink[0], 'value') }}"
                                                    />
                                                </a>
                                            </li>
                                        @endif
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    </div>
                </div> -->
            </div>
        </div>
    </footer>
    @if (is_plugin_active('ecommerce'))
        <div
            class="panel--sidebar"
            id="navigation-mobile"
        >
            <div class="panel__header">
                <span class="svg-icon close-toggle--sidebar">
                    <svg>
                        <use
                            href="#svg-icon-arrow-left"
                            xlink:href="#svg-icon-arrow-left"
                        ></use>
                    </svg>
                </span>
                <h3>{{ __('Categories') }}</h3>
            </div>
            <div class="panel__content">
                <ul class="menu--mobile">
                    {!! Theme::get('productCategoriesDropdown') !!}
                </ul>
            </div>
        </div>
    @endif

    <div
        class="panel--sidebar"
        id="menu-mobile"
    >
        <div class="panel__header">
            <span class="svg-icon close-toggle--sidebar">
                <svg>
                    <use
                        href="#svg-icon-arrow-left"
                        xlink:href="#svg-icon-arrow-left"
                    ></use>
                </svg>
            </span>
            <h3>{{ __('Menu') }}</h3>
        </div>
        <div class="panel__content">
            {!! Menu::renderMenuLocation('main-menu', [
                'view' => 'menu',
                'options' => ['class' => 'menu--mobile'],
            ]) !!}

            {!! Menu::renderMenuLocation('header-navigation', [
                'view' => 'menu',
                'options' => ['class' => 'menu--mobile'],
            ]) !!}

            <ul class="menu--mobile">

                @if (is_plugin_active('ecommerce'))
                    @if (EcommerceHelper::isCompareEnabled())
                        <li><a href="{{ route('public.compare') }}"><span>{{ __('Compare') }}</span></a></li>
                    @endif

                    @if (count($currencies) > 1)
                        <li class="menu-item-has-children">
                            <a href="#">
                                <span>{{ get_application_currency()->title }}</span>
                                <span class="sub-toggle">
                                    <span class="svg-icon">
                                        <svg>
                                            <use
                                                href="#svg-icon-chevron-down"
                                                xlink:href="#svg-icon-chevron-down"
                                            ></use>
                                        </svg>
                                    </span>
                                </span>
                            </a>
                            <ul class="sub-menu">
                                @foreach ($currencies as $currency)
                                    @if ($currency->id !== get_application_currency_id())
                                        <li><a
                                                href="{{ route('public.change-currency', $currency->title) }}"><span>{{ $currency->title }}</span></a>
                                        </li>
                                    @endif
                                @endforeach
                            </ul>
                        </li>
                    @endif
                @endif
                @if (is_plugin_active('language'))
                    @php
                        $supportedLocales = Language::getSupportedLocales();
                    @endphp

                    @if ($supportedLocales && count($supportedLocales) > 1)
                        @php
                            $languageDisplay = setting('language_display', 'all');
                        @endphp
                        <li class="menu-item-has-children">
                            <a href="#">
                                @if ($languageDisplay == 'all' || $languageDisplay == 'flag')
                                    {!! language_flag(Language::getCurrentLocaleFlag(), Language::getCurrentLocaleName()) !!}
                                @endif
                                @if ($languageDisplay == 'all' || $languageDisplay == 'name')
                                    {{ Language::getCurrentLocaleName() }}
                                @endif
                                <span class="sub-toggle">
                                    <span class="svg-icon">
                                        <svg>
                                            <use
                                                href="#svg-icon-chevron-down"
                                                xlink:href="#svg-icon-chevron-down"
                                            ></use>
                                        </svg>
                                    </span>
                                </span>
                            </a>
                            <ul class="sub-menu">
                                @foreach ($supportedLocales as $localeCode => $properties)
                                    @if ($localeCode != Language::getCurrentLocale())
                                        <li>
                                            <a
                                                href="{{ Language::getSwitcherUrl($localeCode, $properties['lang_code']) }}">
                                                @if ($languageDisplay == 'all' || $languageDisplay == 'flag')
                                                    {!! language_flag($properties['lang_flag'], $properties['lang_name']) !!}
                                                @endif
                                                @if ($languageDisplay == 'all' || $languageDisplay == 'name')
                                                    <span>{{ $properties['lang_name'] }}</span>
                                                @endif
                                            </a>
                                        </li>
                                    @endif
                                @endforeach
                            </ul>
                        </li>
                    @endif
                @endif
            </ul>
        </div>
    </div>
    <div
        class="panel--sidebar panel--sidebar__right"
        id="search-mobile"
    >
        <div class="panel__header">
            @if (is_plugin_active('ecommerce'))
                <form
                    class="form--quick-search w-100"
                    data-ajax-url="{{ route('public.ajax.search-products') }}"
                    action="{{ route('public.products') }}"
                    method="get"
                >
                    <div class="search-inner-content">
                        <div class="text-search">
                            <div class="search-wrapper">
                                <input
                                    class="search-field input-search-product"
                                    name="q"
                                    type="text"
                                    placeholder="{{ __('Search something...') }}"
                                    autocomplete="off"
                                >
                                <button
                                    class="btn"
                                    type="submit"
                                    aria-label="Submit"
                                >
                                    <span class="svg-icon">
                                        <svg>
                                            <use
                                                href="#svg-icon-search"
                                                xlink:href="#svg-icon-search"
                                            ></use>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <a
                                class="close-search-panel close-toggle--sidebar"
                                href="#"
                                aria-label="Search"
                            >
                                <span class="svg-icon">
                                    <svg>
                                        <use
                                            href="#svg-icon-times"
                                            xlink:href="#svg-icon-times"
                                        ></use>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="panel--search-result"></div>
                </form>
            @endif
        </div>
    </div>
    <section id="module-on-mobile">
    <div class="module-item d-block d-md-none">
      <ul>
      @if (theme_option('hotline')) 
        <li> <a  href="tel: {{ theme_option('hotline') }}" target="_blank">
            <img  src="https://tivatech.b-cdn.net/icons/calling.png" alt=""> <span>Hotline </span>
          </a>
        </li>
        @endif
        @if (theme_option('zalo')) 
        <li> <a href="https://zalo.me/{{ theme_option('zalo') }}" target="_blank">
            <img src="https://tivatech.vn/storage/icon/widget_icon_zalo.svg" alt=""><span>Zalo  </span>
          </a>
        </li>
        @endif
      
        @if (theme_option('email')) 
        <li>
          <a href="mailto:{{theme_option('email') }}" target="_blank">
            <img src="https://tivatech.b-cdn.net/icons/mail.1.png" alt="cskh@tivatech.vn"><span>Mail</span>
          </a>
        </li>
        @endif
        @if (theme_option('zalo2')) 
        <li> <a href="https://zalo.me/{{ theme_option('zalo2') }}" target="_blank">
            <img src="https://tivatech.vn/storage/icon/widget_icon_zalo.svg" alt=""><span>Zalo </span>
          </a>
        </li>
        @endif
        @if (theme_option('fanpage')) 
        <li> <a href="{{ theme_option('fanpage') }}" target="_blank">
            <img src="https://tivatech.b-cdn.net/icons/fb.png" alt=""><span>Fanpage </span>
          </a>
        </li>
        @endif
        @if (theme_option('hotline2')) 
        <li> <a  href="tel: {{ theme_option('hotline2') }}" target="_blank">
            <img  src="https://tivatech.b-cdn.net/icons/calling.png" alt=""> <span>Hotline</span>
          </a>
        </li>
        @endif
        @if (theme_option('facebook')) 
        <li><a href="{{ theme_option('facebook') }}" target="_blank">
            <img src="https://tivatech.b-cdn.net/icons/messenger.png" alt=""> <span>Messenger</span>
          </a></li>
          @endif
      </ul>
    </div>
  </section>
@if (theme_option('hotline')) 
<div class="hotline-phone-ring-wrap d-none d-md-block" style="bottom:20px !important">
<div class="hotline-phone-ring">
    <div class="hotline-phone-ring-circle"></div>
    <div class="hotline-phone-ring-circle-fill"></div>
    <div class="hotline-phone-ring-img-circle">
    <a href="tel:{{ preg_replace('/\s+/','',theme_option('hotline')) }}" class="pps-btn-img">
        <span class="text-white">
                <img class="lazyload" alt="hotline" srcset="" src="https://tivatech.b-cdn.net/icons/icon-call.png" style="">
    </a>
    </div>
</div>
    <div class="hotline-bar">
        <a href="tel:{{ preg_replace('/\s+/','',theme_option('hotline')) }}">
            <span class="text-hotline yellow">{!! theme_option('hotline') !!}</span>
        </a>
    </div>
</div>
@endif

@if (theme_option('hotline2')) 
<div class="hotline-phone-ring-wrap  d-none d-md-block" style="bottom:80px !important">
<div class="hotline-phone-ring">
    <div class="hotline-phone-ring-circle"></div>
    <div class="hotline-phone-ring-circle-fill"></div>
    <div class="hotline-phone-ring-img-circle">
    <a href="tel:{{ preg_replace('/\s+/','',theme_option('hotline2')) }}" class="pps-btn-img">
        <span class="text-white">
                <img class="lazyload" alt="hotline" srcset="" src="https://tivatech.b-cdn.net/icons/icon-call.png" style="">
    </a>
    </div>
</div>
    <div class="hotline-bar">
        <a href="tel:{{ preg_replace('/\s+/','',theme_option('hotline2')) }}">
            <span class="text-hotline yellow">{!! theme_option('hotline2') !!}</span>
        </a>
    </div>
</div>
@endif 
@if (theme_option('zalo')) 
<div  class="zalo d-none d-md-block" >
    <a href="https://zalo.me/{{ theme_option('zalo') }}" id="nutzalo" target="_blank" rel="noopener noreferrer">
            <div id="fcta-zalo-tracking" class="fcta-zalo-mess"style="bottom: 145px !important" >
                <span id="fcta-zalo-tracking">Chat hỗ trợ</span>
            </div>
            <div class="fcta-zalo-vi-tri-nut" style="bottom: 140px !important">
                <div id="fcta-zalo-tracking" class="fcta-zalo-nen-nut">
                    <div id="fcta-zalo-tracking" class="fcta-zalo-ben-trong-nut"> <img class="img-fluid"
                            src="https://tivatech.vn/storage/icon/widget_icon_zalo.svg" alt="zalo"></div>
                    <div id="fcta-zalo-tracking" class="fcta-zalo-text">Chat ngay</div>
                </div>
            </div>
        </a>
</div>
@endif
@if (theme_option('fanpage')) 
<div  class="zalo d-none d-md-block" >
    <a href="{{ theme_option('facebook') }}" id="nutzalo" target="_blank" rel="noopener noreferrer">
            <div id="fcta-zalo-tracking" class="fcta-zalo-mess"style="bottom: 245px !important" >
                <span id="fcta-zalo-tracking">Fanpage</span>
            </div>
            <div class="fcta-zalo-vi-tri-nut" style="bottom: 240px !important">
                <div id="fcta-zalo-tracking" class="fcta-zalo-nen-nut">
                    <div id="fcta-zalo-tracking" class="fcta-zalo-ben-trong-nut"> <img class="img-fluid"
                            src="https://tivatech.b-cdn.net/icons/fb.png" alt="zalo"></div>
                    <div id="fcta-zalo-tracking" class="fcta-zalo-text">Chat ngay</div>
                </div>
            </div>
        </a>
</div>
@endif
    @if (is_plugin_active('ecommerce'))
        {!! Theme::partial('ecommerce.quick-view-modal') !!}
    @endif
    {!! Theme::partial('toast') !!}

    <div class="panel-overlay-layer"></div>
    <div id="back2top">
        <span class="svg-icon">
            <svg>
                <use
                    href="#svg-icon-arrow-up"
                    xlink:href="#svg-icon-arrow-up"
                ></use>
            </svg>
        </span>
    </div>

    <script>
        'use strict';

        window.trans = {
            "View All": "{{ __('View All') }}",
            "No reviews!": "{{ __('No reviews!') }}"
        };

        window.siteConfig = {
            "url": "{{ route('public.index') }}",
            "img_placeholder": "{{ theme_option('lazy_load_image_enabled', 'yes') == 'yes' ? image_placeholder() : null }}",
            "countdown_text": {
                "days": "{{ __('days') }}",
                "hours": "{{ __('hours') }}",
                "minutes": "{{ __('mins') }}",
                "seconds": "{{ __('secs') }}"
            }
        };

        @if (is_plugin_active('ecommerce') && EcommerceHelper::isCartEnabled())
            window.siteConfig.ajaxCart = "{{ route('public.ajax.cart') }}";
            window.siteConfig.cartUrl = "{{ route('public.cart') }}";
        @endif
    </script>

    {!! Theme::footer() !!}

    @if (session()->has('success_msg') ||
            session()->has('error_msg') ||
            (isset($errors) && $errors->count() > 0) ||
            isset($error_msg))
        <script type="text/javascript">
            window.onload = function() {
                @if (session()->has('success_msg'))
                    MartApp.showSuccess('{{ session('success_msg') }}');
                @endif

                @if (session()->has('error_msg'))
                    MartApp.showError('{{ session('error_msg') }}');
                @endif

                @if (isset($error_msg))
                    MartApp.showError('{{ $error_msg }}');
                @endif

                @if (isset($errors))
                    @foreach ($errors->all() as $error)
                        MartApp.showError('{!! BaseHelper::clean($error) !!}');
                    @endforeach
                @endif
            };
        </script>
    @endif
    </body>

    </html>
