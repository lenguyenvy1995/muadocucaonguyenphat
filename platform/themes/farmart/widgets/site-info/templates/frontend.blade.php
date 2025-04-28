@if ($sidebar == 'footer_sidebar')
    <div class="col-xl-6">
        <div class="widget mb-5 mb-md-0">
            <p class="h5 fw-bold widget-title mb-4"> {{ theme_option('title-dn') }}</p>
          
            <div class="widget-description"> {{ theme_option('sub-desciption') }}</div>
            <ul class="ps-0 mt-3 mb-0">
       
                @if (theme_option('hotline'))
                    <li class="py-2">
                        <span class="svg-icon me-2">
                            <svg>
                                <use
                                    href="#svg-icon-phone"
                                    xlink:href="#svg-icon-phone"
                                ></use>
                            </svg>
                        </span>
                        <span>{{ __('Hotline 24/7:') }}
                            <p class="h5 ms-4 mt-2"><a href="tel:{{ $config['phone'] }}"> {{ theme_option('hotline') }}</a></p>
                        </span>
                    </li>
                @endif
                @if (theme_option('hotline2'))
                    <li class="py-2">
                        <span class="svg-icon me-2">
                                <svg>
                                    <use
                                    href="#svg-icon-phone"
                                    xlink:href="#svg-icon-phone"
                                ></use>
                            </svg>                                  
                        </span>
                        <span>Số Điện Thoại 2:
                            <p class="h5 ms-4 mt-2"><a href="tel:{{ $config['phone'] }}"> {{ theme_option('hotline2') }}</a></p>
                        </span>
                    </li>
                @endif
                @if (theme_option('address'))
                    <li class="py-2">
                        <span class="svg-icon me-2">
                            <svg>
                                <use
                                    href="#svg-icon-home"
                                    xlink:href="#svg-icon-home"
                                ></use>
                            </svg>
                        </span>
                        <span>{{theme_option('address') }}</span>
                    </li>
                @endif
                @if (theme_option('address2'))
                    <li class="py-2">
                        <span class="svg-icon me-2">
                            <svg>
                                <use
                                    href="#svg-icon-home"
                                    xlink:href="#svg-icon-home"
                                ></use>
                            </svg>
                        </span>
                        <span>{{theme_option('address2') }}</span>
                    </li>
                @endif
                @if (theme_option('address3'))
                    <li class="py-2">
                        <span class="svg-icon me-2">
                            <svg>
                                <use
                                    href="#svg-icon-home"
                                    xlink:href="#svg-icon-home"
                                ></use>
                            </svg>
                        </span>
                        <span>{{theme_option('address3') }}</span>
                    </li>
                @endif
                @if (theme_option('address4'))
                    <li class="py-2">
                        <span class="svg-icon me-2">
                            <svg>                       
                                <use
                                    href="#svg-icon-home"
                                    xlink:href="#svg-icon-home"
                                ></use>
                            </svg>
                        </span>
                        <span>{{theme_option('address4') }}</span>
                    </li>
                @endif
                
                @if (theme_option('email') )
                    <li class="py-2">
                        <span class="svg-icon me-2">
                            <svg>
                                <use
                                    href="#svg-icon-mail"
                                    xlink:href="#svg-icon-mail"
                                ></use>
                            </svg>
                        </span>
                        <span><a href="mailto:{{ $config['email'] }}">{{theme_option('email') }}</a></span>
                    </li>
                @endif

            </ul>
        </div>
    </div>
@elseif ($config['working_time'] || $config['phone'])
    <div class="row bg-light mb-4 g-0">
        <div class="col-12">
            <div class="px-3 py-4">
                <h6 class="fw-bold">{{ __('Hotline Order') }}:</h6>
                @if ($config['working_time'])
                    <p class="text">{{ $config['working_time'] }}</p>
                @endif
                @if ($config['phone'])
                    <h4 class="fw-bold">{{ $config['phone'] }}</h4>
                @endif
            </div>
        </div>
    </div>
@endif
