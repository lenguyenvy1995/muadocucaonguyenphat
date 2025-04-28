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
                            <p class="h4 ms-4 mt-2"> {{ theme_option('hotline') }}</p>
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
                            <p class="h4 ms-4 mt-2"> {{ theme_option('hotline2') }}</p>
                        </span>
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
                        <span>{{theme_option('email') }}</span>
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
                       
                    </li>
                @endif
             
                @if (theme_option('map') )
                    <li class="py-2">
                       
                        <span><iframe width="100%" height="500" src="{{theme_option('map') }}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></span>
                    </li>
                @endif
            </ul>