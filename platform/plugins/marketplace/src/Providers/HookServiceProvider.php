<?php

namespace Botble\Marketplace\Providers;

use Botble\Base\Contracts\BaseModel;
use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Facades\Assets;
use Botble\Base\Facades\BaseHelper;
use Botble\Base\Facades\Html;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\FormAbstract;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\Ecommerce\Enums\CustomerStatusEnum;
use Botble\Ecommerce\Models\Customer;
use Botble\Ecommerce\Models\Discount;
use Botble\Ecommerce\Models\Invoice;
use Botble\Ecommerce\Models\Order;
use Botble\Ecommerce\Models\Product;
use Botble\Ecommerce\Tables\CustomerTable;
use Botble\Ecommerce\Tables\ProductTable;
use Botble\Language\Facades\Language;
use Botble\LanguageAdvanced\Supports\LanguageAdvancedManager;
use Botble\Marketplace\Enums\RevenueTypeEnum;
use Botble\Marketplace\Enums\WithdrawalStatusEnum;
use Botble\Marketplace\Facades\MarketplaceHelper;
use Botble\Marketplace\Models\Revenue;
use Botble\Marketplace\Models\Store;
use Botble\Marketplace\Models\VendorInfo;
use Botble\Marketplace\Models\Withdrawal;
use Botble\Media\Facades\RvMedia;
use Botble\Slug\Facades\SlugHelper;
use Botble\Table\Abstracts\TableAbstract;
use Botble\Table\CollectionDataTable;
use Botble\Table\Columns\Column;
use Botble\Table\EloquentDataTable;
use Botble\Theme\Events\RenderingThemeOptionSettings;
use Exception;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\ValidationException;
use Throwable;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->app->booted(function () {
            add_filter(BASE_FILTER_AFTER_FORM_CREATED, [$this, 'registerAdditionalData'], 128, 2);

            add_action(BASE_ACTION_AFTER_CREATE_CONTENT, [$this, 'saveAdditionalData'], 128, 3);

            add_action(BASE_ACTION_AFTER_UPDATE_CONTENT, [$this, 'saveAdditionalData'], 128, 3);

            TableAbstract::beforeRendering(function () {
                add_filter(BASE_FILTER_GET_LIST_DATA, [$this, 'addColumnToEcommerceTable'], 153, 2);
                add_filter(BASE_FILTER_TABLE_HEADINGS, [$this, 'addHeadingToEcommerceTable'], 153, 2);
                add_filter(BASE_FILTER_TABLE_QUERY, [$this, 'modifyQueryInCustomerTable'], 153);

                add_filter('base_filter_table_filters', function (array $filters, TableAbstract $table) {
                    if ($table instanceof CustomerTable) {
                        $filters['is_vendor'] = [
                            'title' => trans('plugins/marketplace::store.forms.is_vendor'),
                            'type' => 'select',
                            'choices' => [1 => trans('core/base::base.yes'), 0 => trans('core/base::base.no')],
                            'validate' => 'required|in:1,0',
                        ];
                    }

                    if ($table instanceof ProductTable) {
                        $filters['store_id'] = [
                            'title' => trans('plugins/marketplace::store.forms.store'),
                            'type' => 'select-search',
                            'validate' => 'required|string',
                            'callback' => fn () => Store::query()->pluck('name', 'id')->all(),
                        ];
                    }

                    return $filters;
                }, 120, 2);
            });

            add_filter(BASE_FILTER_APPEND_MENU_NAME, [$this, 'getUnverifiedVendors'], 130, 2);
            add_filter(BASE_FILTER_MENU_ITEMS_COUNT, [$this, 'getMenuItemCount'], 121);

            $this->app['events']->listen(RenderingThemeOptionSettings::class, function () {
                add_action(RENDERING_THEME_OPTIONS_PAGE, [$this, 'addThemeOptions'], 55);
            });

            if (is_plugin_active('language') && is_plugin_active('language-advanced')) {
                FormAbstract::beforeRendering(function (FormAbstract $form) {
                    $model = $form->getModel();

                    if (
                        $model instanceof BaseModel &&
                        in_array('vendor', Route::current()->middleware()) &&
                        auth('customer')->check() &&
                        auth('customer')->user()->is_vendor &&
                        Language::getCurrentAdminLocaleCode() != Language::getDefaultLocaleCode() &&
                        $model->getKey() &&
                        LanguageAdvancedManager::isSupported($model)
                    ) {
                        $refLang = null;

                        if (Language::getCurrentAdminLocaleCode() != Language::getDefaultLocaleCode()) {
                            $refLang = '?ref_lang=' . Language::getCurrentAdminLocaleCode();
                        }

                        $form->setFormOption(
                            'url',
                            route('marketplace.vendor.language-advanced.save', $model->getKey()) . $refLang
                        );
                    }
                }, 9999);
            }

            FormAbstract::beforeRendering(function () {
                add_action(BASE_ACTION_TOP_FORM_CONTENT_NOTIFICATION, [$this, 'createdByVendorNotification'], 45, 2);
                add_action(BASE_ACTION_TOP_FORM_CONTENT_NOTIFICATION, [$this, 'withdrawalVendorNotification'], 47, 2);
            });

            add_filter(ACTION_BEFORE_POST_ORDER_REFUND_ECOMMERCE, [$this, 'beforeOrderRefund'], 120, 3);
            add_filter(ACTION_AFTER_POST_ORDER_REFUNDED_ECOMMERCE, [$this, 'afterOrderRefunded'], 120, 3);

            if (MarketplaceHelper::isVendorRegistrationEnabled()) {
                add_filter('ecommerce_customer_registration_form_validation_rules', function (array $rules): array {
                    return $rules + [
                            'shop_name' => [
                                'nullable',
                                'required_if:is_vendor,1',
                                'string',
                                'min:2',
                            ],
                            'shop_phone' => [
                                    'nullable',
                                    'required_if:is_vendor,1',
                                ] + explode('|', BaseHelper::getPhoneValidationRule()),
                            'shop_url' => [
                                'nullable',
                                'required_if:is_vendor,1',
                                'string',
                                'min:2',
                            ],
                        ];
                }, 45, 2);

                add_filter('ecommerce_customer_registration_form_validation_attributes', function (array $attributes): array {
                    return $attributes + [
                            'shop_name' => __('Shop Name'),
                            'shop_phone' => __('Shop Phone'),
                            'shop_url' => __('Shop URL'),
                        ];
                }, 45);

                add_filter('ecommerce_customer_registration_form_validation_messages', function (array $attributes): array {
                    return $attributes + [
                            'shop_name.required_if' => __('Shop Name is required.'),
                            'shop_phone.required_if' => __('Shop Phone is required.'),
                            'shop_url.required_if' => __('Shop URL is required.'),
                        ];
                }, 45);

                add_action('customer_register_validation', function ($request) {
                    if (is_plugin_active('marketplace') && $request->input('is_vendor') == 1) {
                        $existing = SlugHelper::getSlug($request->input('shop_url'), SlugHelper::getPrefix(Store::class));

                        if ($existing) {
                            throw ValidationException::withMessages([
                                'shop_url' => __('Shop URL is existing. Please choose another one!'),
                            ]);
                        }
                    }
                }, 45, 2);
            }

            add_filter('ecommerce_import_product_row_data', [$this, 'setStoreToRow'], 45);

            add_filter('ecommerce_invoice_variables', function (array $variables, Invoice $invoice): array {
                if (! $invoice->reference) {
                    return $variables;
                }

                $store = $invoice->reference->store;

                if (! $store || ! $store->id) {
                    return $variables;
                }

                if ($store->logo) {
                    $variables['logo_full_path'] = RvMedia::getRealPath($store->logo);
                    $variables['company_logo_full_path'] = RvMedia::getRealPath($store->logo);
                }

                if ($store->name) {
                    $variables['site_title'] = $store->name;
                }

                return array_merge($variables, [
                    'company_name' => $store->name,
                    'company_address' => $store->address,
                    'company_phone' => $store->phone,
                    'company_email' => $store->email,
                    'company_tax_id' => $store->tax_id,
                ]);
            }, 45, 2);

            add_filter('ecommerce_product_eager_loading_relations', function (array $with) {
                return array_merge($with, ['store', 'store.slugable']);
            }, 120);
        });
    }

    public function beforeOrderRefund(BaseHttpResponse $response, Order $order, Request $request): BaseHttpResponse
    {
        $refundAmount = $request->input('refund_amount');
        if ($refundAmount) {
            $store = $order->store;
            if ($store && $store->id) {
                $vendor = $store->customer;
                if ($vendor && $vendor->id) {
                    $vendorInfo = $vendor->vendorInfo;
                    if ($vendorInfo->balance < $refundAmount) {
                        $response
                            ->setError()
                            ->setMessage(
                                trans('plugins/marketplace::order.refund.insufficient_balance', [
                                    'balance' => format_price($vendorInfo->balance),
                                ])
                            );
                    }
                }
            }
        }

        return $response;
    }

    public function afterOrderRefunded(BaseHttpResponse $response, Order $order, Request $request): BaseHttpResponse
    {
        $refundAmount = $request->input('refund_amount');
        if ($refundAmount) {
            $store = $order->store;
            if ($store && $store->id) {
                $vendor = $store->customer;
                if ($vendor && $vendor->id) {
                    $vendorInfo = $vendor->vendorInfo;

                    if ($vendor->balance > $refundAmount) {
                        $vendorInfo->total_revenue -= $refundAmount;
                        $vendorInfo->balance -= $refundAmount;

                        $data = [
                            'fee' => 0,
                            'currency' => get_application_currency()->title,
                            'current_balance' => $vendor->balance,
                            'customer_id' => $vendor->getKey(),
                            'order_id' => $order->getKey(),
                            'user_id' => Auth::id(),
                            'type' => RevenueTypeEnum::SUBTRACT_AMOUNT,
                            'description' => trans('plugins/marketplace::order.refund.description', [
                                'order' => $order->code,
                            ]),
                            'amount' => $refundAmount,
                            'sub_amount' => $refundAmount,
                        ];

                        try {
                            DB::beginTransaction();

                            Revenue::query()->create($data);

                            $vendorInfo->save();

                            DB::commit();
                        } catch (Throwable|Exception $th) {
                            DB::rollBack();

                            return $response
                                ->setError()
                                ->setMessage($th->getMessage());
                        }
                    } else {
                        $response
                            ->setError()
                            ->setMessage(
                                trans('plugins/marketplace::order.refund.insufficient_balance', [
                                    'balance' => format_price($vendorInfo->balance),
                                ])
                            );
                    }
                }
            }
        }

        return $response;
    }

    public function addThemeOptions(): void
    {
        theme_option()
            ->setSection([
                'title' => trans('plugins/marketplace::marketplace.theme_options.name'),
                'desc' => trans('plugins/marketplace::marketplace.theme_options.description'),
                'id' => 'opt-text-subsection-marketplace',
                'subsection' => true,
                'icon' => 'ti ti-shopping-bag',
                'fields' => [
                    [
                        'id' => 'logo_vendor_dashboard',
                        'type' => 'mediaImage',
                        'label' => trans('plugins/marketplace::marketplace.theme_options.logo_vendor_dashboard'),
                        'attributes' => [
                            'name' => 'logo_vendor_dashboard',
                            'value' => null,
                            'attributes' => [
                                'allow_thumb' => false,
                            ],
                        ],
                    ],
                ],
            ]);
    }

    public function registerAdditionalData(FormAbstract $form, array|Model|string|null $data): FormAbstract
    {
        if ($data instanceof Product && request()->segment(1) === BaseHelper::getAdminPrefix()) {
            $stores = Store::query()->pluck('name', 'id')->all();

            $form
                ->when($stores, function (FormAbstract $form) use ($stores) {
                    $form
                        ->addAfter(
                            'status',
                            'store_id',
                            SelectField::class,
                            SelectFieldOption::make()
                                ->label(trans('plugins/marketplace::store.forms.store'))
                                ->choices([0 => trans('plugins/marketplace::store.forms.select_store')] + $stores)
                                ->searchable()
                                ->emptyValue(trans('plugins/marketplace::store.forms.select_store'))
                                ->toArray()
                        );
                });
        } elseif ($data instanceof Customer) {
            if ($data->is_vendor && $form->has('status')) {
                $statusOptions = $form->getField('status')->getOptions();
                $statusOptions['help_block'] = [
                    'text' => trans('plugins/marketplace::marketplace.helpers.customer_status', [
                        'status' => CustomerStatusEnum::ACTIVATED()->label(),
                        'store' => BaseStatusEnum::DRAFT()->label(),
                    ]),
                ];

                $form->modify('status', 'customSelect', $statusOptions);
            }

            $form->addAfter('email', 'is_vendor', 'onOff', [
                'label' => trans('plugins/marketplace::store.forms.is_vendor'),
                'default_value' => false,
            ]);
        }

        return $form;
    }

    public function saveAdditionalData(string $type, Request $request, Model|string|null $object): bool
    {
        if (! is_in_admin()) {
            return false;
        }

        if (in_array($type, [STORE_MODULE_SCREEN_NAME, (new Store())->getTable()])) {
            $customer = $object->customer;
            if ($customer && $customer->id) {
                if ($object->status->getValue() == BaseStatusEnum::PUBLISHED) {
                    $customer->status = CustomerStatusEnum::ACTIVATED;
                } else {
                    $customer->status = CustomerStatusEnum::LOCKED;
                }

                $customer->save();
            }
        } elseif (
            $type == PRODUCT_MODULE_SCREEN_NAME &&
            $request->has('store_id') &&
            request()->segment(1) !== 'vendor'
        ) {
            $object->store_id = $request->input('store_id');
            $object->save();
        } elseif (in_array($type, [CUSTOMER_MODULE_SCREEN_NAME, (new Customer())->getTable()])
            && in_array(
                Route::currentRouteName(),
                ['customers.create', 'customers.create.store', 'customers.edit', 'customers.edit.update']
            )
        ) {
            if ($request->has('is_vendor')) {
                $object->is_vendor = $request->input('is_vendor');
            }

            // Create vendor info
            if ($object->is_vendor && ! $object->vendorInfo->id) {
                VendorInfo::query()->create(['customer_id' => $object->id]);
            }

            if ($object->is_vendor) {
                $store = $object->store;

                if (! $store->name) {
                    $store->name = $object->name;
                }

                if (! $store->phone) {
                    $store->phone = $object->phone;
                }

                if (! $store->logo) {
                    $store->logo = $object->avatar;
                }

                if ($object->status->getValue() == CustomerStatusEnum::ACTIVATED) {
                    $store->status = BaseStatusEnum::PUBLISHED;
                } else {
                    $store->status = BaseStatusEnum::DRAFT;
                }

                $store->save();

                if (! $store->slug) {
                    SlugHelper::createSlug($store);
                }
            }

            $object->save();
        }

        return true;
    }

    public function addColumnToEcommerceTable(EloquentDataTable|CollectionDataTable $data, Model|string|null $model)
    {
        if (! $model || ! is_in_admin(true)) {
            return $data;
        }

        if ($model::class === Customer::class && Route::is('marketplace.vendors.index')) {
            return $data->addColumn('store_name', function ($item) {
                if (! $item->store->name) {
                    return '&mdash;';
                }

                return Html::link(route('marketplace.store.edit', $item->store->id), $item->store->name);
            });
        }

        return match ($model::class) {
            Customer::class => $data->addColumn('is_vendor', function ($item) {
                if (! $item->is_vendor) {
                    return trans('core/base::base.no');
                }

                return Html::tag('span', trans('core/base::base.yes'), ['class' => 'text-success']);
            }),
            Order::class, Discount::class => $data
                ->addColumn('store_id', function ($item) {
                    $store = $item->original_product && $item->original_product->store->name ? $item->original_product->store : $item->store;

                    if (! $store->name) {
                        return '&mdash;';
                    }

                    return Html::link($store->url, $store->name, ['target' => '_blank']);
                })
                ->filter(function ($query) use ($model) {
                    $keyword = request()->input('search.value');
                    if ($keyword) {
                        $query = $query
                            ->whereHas('store', function ($subQuery) use ($keyword) {
                                return $subQuery->where('name', 'LIKE', '%' . $keyword . '%');
                            });

                        if ($model instanceof Order) {
                            $query = $query
                                ->whereHas('address', function ($subQuery) use ($keyword) {
                                    return $subQuery
                                        ->where('name', 'LIKE', '%' . $keyword . '%')
                                        ->orWhere('email', 'LIKE', '%' . $keyword . '%')
                                        ->orWhere('phone', 'LIKE', '%' . $keyword . '%');
                                })
                                ->orWhereHas('user', function ($subQuery) use ($keyword) {
                                    return $subQuery
                                        ->where('name', 'LIKE', '%' . $keyword . '%')
                                        ->orWhere('email', 'LIKE', '%' . $keyword . '%')
                                        ->orWhere('phone', 'LIKE', '%' . $keyword . '%');
                                })
                                ->orWhere('code', 'LIKE', '%' . $keyword . '%');
                        }

                        return $query;
                    }

                    return $query;
                }),
            Product::class => $data
                ->addColumn('store_id', function ($item) {
                    $store = $item->original_product && $item->original_product->store->name ? $item->original_product->store : $item->store;

                    if (! $store->name) {
                        return '&mdash;';
                    }

                    return Html::link($store->url, $store->name, ['target' => '_blank']);
                })
                ->filter(function ($query) {
                    $keyword = request()->input('search.value');
                    if ($keyword) {
                        $query
                            ->where('name', 'LIKE', '%' . $keyword . '%')
                            ->where('is_variation', 0)
                            ->orWhere(function ($query) use ($keyword) {
                                $query
                                    ->where('is_variation', 0)
                                    ->where(function ($query) use ($keyword) {
                                        $query
                                            ->orWhere('sku', 'LIKE', '%' . $keyword . '%')
                                            ->orWhere('created_at', 'LIKE', '%' . $keyword . '%')
                                            ->orWhereHas('store', function ($subQuery) use ($keyword) {
                                                return $subQuery->where('name', 'LIKE', '%' . $keyword . '%');
                                            });
                                    });
                            });

                        return $query;
                    }

                    return $query;
                }),
            default => $data,
        };
    }

    public function addHeadingToEcommerceTable(array $headings, Model|string|null $model): array
    {
        if (! $model || ! is_in_admin(true) || Route::is('marketplace.vendors.index')) {
            return $headings;
        }

        return match ($model::class) {
            Customer::class => array_merge($headings, [
                Column::make('is_vendor')
                    ->title(trans('plugins/marketplace::store.forms.is_vendor'))
                    ->alignCenter()
                    ->width(100),
            ]),
            Order::class, Product::class, Discount::class => array_merge($headings, [
                Column::make('store_id')
                    ->title(trans('plugins/marketplace::store.forms.store'))
                    ->alignLeft()
                    ->orderable(false)
                    ->searchable(false),
            ]),
            default => $headings,
        };
    }

    public function modifyQueryInCustomerTable(Builder|EloquentBuilder|null $query): Builder|EloquentBuilder|null
    {
        $model = null;

        if ($query instanceof Builder || $query instanceof EloquentBuilder) {
            $model = $query->getModel();
        }

        return match ($model::class) {
            Customer::class => $query->addSelect('is_vendor'),
            Order::class, Product::class, Discount::class => $query->addSelect($model->getTable() . '.store_id')->with(
                ['store']
            ),
            default => $query,
        };
    }

    public function getUnverifiedVendors(string|int|null $number, string $menuId): int|string|null
    {
        switch ($menuId) {
            case 'cms-plugins-marketplace-unverified-vendor':
                if (! Auth::user()->hasPermission('marketplace.unverified-vendor.index')) {
                    return $number;
                }

                if (! MarketplaceHelper::getSetting('verify_vendor', 1)) {
                    return $number;
                }

                return Blade::render('<x-core::navbar.badge-count class="unverified-vendors" />');

            case 'cms-plugins-withdrawal':
                if (! Auth::user()->hasPermission('marketplace.withdrawal.index')) {
                    return $number;
                }

                return Blade::render('<x-core::navbar.badge-count class="pending-withdrawals" />');

            case 'cms-plugins-marketplace':
                if (
                    ! Auth::user()->hasAnyPermission([
                        'marketplace.withdrawal.index',
                        'marketplace.unverified-vendor.index',
                    ])
                ) {
                    return $number;
                }

                return Blade::render('<x-core::navbar.badge-count class="marketplace-notifications-count" />');

            case 'cms-plugins-ecommerce.product':
                if (! Auth::user()->hasPermission('products.index')) {
                    return $number;
                }

                return Blade::render('<x-core::navbar.badge-count class="pending-products" />');
        }

        return $number;
    }

    public function getMenuItemCount(array $data = []): array
    {
        if (! Auth::check()) {
            return $data;
        }

        $countUnverifiedVendors = 0;

        if (Auth::user()->hasPermission('marketplace.unverified-vendor.index') &&
            MarketplaceHelper::getSetting('verify_vendor', 1)
        ) {
            $countUnverifiedVendors = Customer::query()
                ->where('is_vendor', true)
                ->whereNull('vendor_verified_at')
                ->count();

            $data[] = [
                'key' => 'unverified-vendors',
                'value' => $countUnverifiedVendors,
            ];
        }

        $countPendingWithdrawals = 0;

        if (Auth::user()->hasPermission('marketplace.withdrawal.index')) {
            $countPendingWithdrawals = Withdrawal::query()
                ->where('status', 'IN', [WithdrawalStatusEnum::PENDING, WithdrawalStatusEnum::PROCESSING])
                ->count();

            $data[] = [
                'key' => 'pending-withdrawals',
                'value' => $countPendingWithdrawals,
            ];
        }

        if (Auth::user()->hasAnyPermission(['marketplace.withdrawal.index', 'marketplace.unverified-vendor.index'])) {
            $data[] = [
                'key' => 'marketplace-notifications-count',
                'value' => $countUnverifiedVendors + $countPendingWithdrawals,
            ];
        }

        if (Auth::user()->hasPermission('products.index')) {
            $countPendingProducts = Product::query()
                ->where('status', BaseStatusEnum::PENDING)
                ->where('created_by_type', Customer::class)
                ->where('created_by_id', '!=', 0)
                ->where('approved_by', 0)
                ->count();

            $data[] = [
                'key' => 'pending-products',
                'value' => $countPendingProducts,
            ];

            $pendingOrders = Order::query()
                ->where('status', BaseStatusEnum::PENDING)
                ->where('is_finished', 1)
                ->count();

            $data[] = [
                'key' => 'ecommerce-count',
                'value' => $pendingOrders + $countPendingProducts,
            ];
        }

        return $data;
    }

    public function createdByVendorNotification(Request $request, Model|string|null $data = null): bool
    {
        if (! MarketplaceHelper::getSetting('enable_product_approval', 1)) {
            return false;
        }

        if (! $data instanceof Product || ! in_array(Route::currentRouteName(), ['products.create', 'products.edit'])) {
            return false;
        }

        if ($data->created_by_id &&
            $data->created_by_type == Customer::class &&
            Auth::user()->hasPermission('products.edit')
        ) {
            $isApproved = $data->status == BaseStatusEnum::PUBLISHED;
            if (! $isApproved) {
                Assets::addScriptsDirectly(['vendor/core/plugins/marketplace/js/marketplace-product.js']);
            }

            echo view('plugins/marketplace::partials.notification', ['product' => $data, 'isApproved' => $isApproved])
                ->render();

            return true;
        }

        return false;
    }

    public function withdrawalVendorNotification(Request $request, Model|string|null $data = null): bool
    {
        if (! $data instanceof Withdrawal || Route::currentRouteName() != 'marketplace.withdrawal.edit') {
            return false;
        }

        if (! $data->customer->store || ! $data->customer->store->id) {
            return false;
        }

        echo view('plugins/marketplace::withdrawals.store-info', ['store' => $data->customer->store])->render();

        return true;
    }

    public function setStoreToRow(array $row): array
    {
        $row['store_id'] = 0;

        if (! empty($row['vendor'])) {
            $row['vendor'] = trim($row['vendor']);

            if (is_numeric($row['vendor'])) {
                $store = Store::query()->find($row['vendor']);
            } else {
                $store = Store::query()->where('name', $row['vendor'])->first();
            }

            $row['store_id'] = $store ? $store->id : 0;
        }

        return $row;
    }
}
