<div class="customer-page crop-avatar">
    <div class="container">
        <div class="customer-body">
            <div class="row body-border">

                <div class="col-md-3">
                    <div class="profile-sidebar">

                        <form
                            id="avatar-upload-form"
                            enctype="multipart/form-data"
                            action="javascript:void(0)"
                            onsubmit="return false"
                        >
                            <div class="avatar-upload-container">
                                <div class="form-group mb-3">
                                    <div id="account-avatar">
                                        <div class="profile-image">
                                            <div class="avatar-view mt-card-avatar">
                                                <img
                                                    class="br2"
                                                    src="{{ auth('customer')->user()->avatar_url }}"
                                                    alt="{{ auth('customer')->user()->name }}"
                                                >
                                                <div class="mt-overlay br2">
                                                    <span><x-core::icon name="ti ti-edit" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="text-danger hidden"
                                    id="print-msg"
                                ></div>
                            </div>
                        </form>

                        <div class="text-center">
                            <div class="profile-usertitle-name">
                                <strong>{{ auth('customer')->user()->name }}</strong>
                            </div>
                        </div>

                        <div class="profile-usermenu">
                            <ul class="list-group">
                                <li
                                    class="list-group-item"
                                    style="display:none"
                                >
                                    <a
                                        class="collection-item @if (Route::currentRouteName() == 'customer.overview') active @endif"
                                        href="{{ route('customer.overview') }}"
                                    >{{ __('Overview') }}</a>
                                    <i
                                        class="fa fa-user-circle-o float-end"
                                        aria-hidden="true"
                                    ></i>
                                </li>
                                <li class="list-group-item">
                                    <a
                                        class="collection-item @if (Route::currentRouteName() == 'customer.edit-account') active @endif"
                                        href="{{ route('customer.edit-account') }}"
                                    >{{ __('Profile') }}</a>
                                    <i
                                        class="fa fa-credit-card"
                                        aria-hidden="true"
                                    ></i>
                                </li>
                                <li class="list-group-item">
                                    <a
                                        class="collection-item @if (Route::currentRouteName() == 'customer.orders') active @endif"
                                        href="{{ route('customer.orders') }}"
                                    >{{ __('Orders') }}</a>
                                    <i
                                        class="fa fa-shopping-cart"
                                        aria-hidden="true"
                                    ></i>
                                </li>
                                @if (EcommerceHelper::isReviewEnabled())
                                    <li class="list-group-item">
                                        <a
                                            class="collection-item @if (Route::currentRouteName() == 'customer.product-reviews') active @endif"
                                            href="{{ route('customer.product-reviews') }}"
                                        >{{ __('Product Reviews') }}</a>
                                        <i class="fa fa-star"></i>
                                    </li>
                                @endif
                                @if (EcommerceHelper::isEnabledSupportDigitalProducts())
                                    <li class="list-group-item">
                                        <a
                                            class="collection-item @if (Route::currentRouteName() == 'customer.downloads') active @endif"
                                            href="{{ route('customer.downloads') }}"
                                        >{{ __('Downloads') }}</a>
                                        <i
                                            class="fa fa-download"
                                            aria-hidden="true"
                                        ></i>
                                    </li>
                                @endif
                                <li class="list-group-item">
                                    <a
                                        class="collection-item @if (Route::currentRouteName() == 'customer.address') active @endif"
                                        href="{{ route('customer.address') }}"
                                    >{{ __('Address books') }}</a>
                                    <i
                                        class="fa fa-book"
                                        aria-hidden="true"
                                    ></i>
                                </li>
                                <li class="list-group-item">
                                    <a
                                        class="collection-item @if (Route::currentRouteName() == 'customer.change-password') active @endif"
                                        href="{{ route('customer.change-password') }}"
                                    >{{ __('Change password') }}</a>
                                    <i
                                        class="fa fa-exclamation-circle"
                                        aria-hidden="true"
                                    ></i>
                                </li>
                                <li class="list-group-item">
                                    <a
                                        class="collection-item"
                                        href="{{ route('customer.logout') }}"
                                    >{{ __('Logout') }}</a>
                                    <i
                                        class="fa fa-sign-out"
                                        aria-hidden="true"
                                    ></i>

                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="col-md-9">
                    <div class="profile-content">
                        @yield('content')
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div
        class="modal fade"
        id="avatar-modal"
        role="dialog"
        aria-labelledby="avatar-modal-label"
        aria-hidden="true"
        tabindex="-1"
    >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <form
                    class="avatar-form"
                    method="post"
                    action="{{ route('customer.avatar') }}"
                    enctype="multipart/form-data"
                >
                    <div class="modal-header">
                        <h4
                            class="modal-title"
                            id="avatar-modal-label"
                        ><i class="til_img"></i><strong>{{ __('Profile Image') }}</strong></h4>
                        <button
                            class="btn-close"
                            data-bs-dismiss="modal"
                            type="button"
                        ></button>
                    </div>
                    <div class="modal-body">

                        <div class="avatar-body">

                            <!-- Upload image and data -->
                            <div class="avatar-upload">
                                <input
                                    class="avatar-src"
                                    name="avatar_src"
                                    type="hidden"
                                >
                                <input
                                    class="avatar-data"
                                    name="avatar_data"
                                    type="hidden"
                                >
                                @csrf
                                <label for="avatarInput">{{ __('New image') }}</label>
                                <input
                                    class="avatar-input"
                                    id="avatarInput"
                                    name="avatar_file"
                                    type="file"
                                >
                            </div>

                            <div
                                class="loading"
                                role="img"
                                aria-label="{{ __('Loading') }}"
                                tabindex="-1"
                            ></div>

                            <!-- Crop and preview -->
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="avatar-wrapper"></div>
                                    <div
                                        class="error-message text-danger"
                                        style="display: none"
                                    ></div>
                                </div>
                                <div class="col-md-3 avatar-preview-wrapper">
                                    <div class="avatar-preview preview-lg"></div>
                                    <div class="avatar-preview preview-md"></div>
                                    <div class="avatar-preview preview-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            class="btn--custom btn--rounded btn--outline"
                            data-bs-dismiss="modal"
                            type="button"
                        >{{ __('Close') }}</button>
                        <button
                            class="btn--custom btn--rounded btn--outline avatar-save"
                            type="submit"
                        >{{ __('Save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div><!-- /.modal -->
</div>
