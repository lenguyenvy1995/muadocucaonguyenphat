<?php

namespace Botble\Ecommerce\Models;

use Botble\ACL\Models\User;
use Botble\Base\Casts\SafeContent;
use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Models\BaseModel;
use Botble\Ecommerce\Enums\DiscountTargetEnum;
use Botble\Ecommerce\Enums\DiscountTypeEnum;
use Botble\Ecommerce\Enums\DiscountTypeOptionEnum;
use Botble\Ecommerce\Enums\ProductTypeEnum;
use Botble\Ecommerce\Enums\StockStatusEnum;
use Botble\Ecommerce\Facades\Discount as DiscountFacade;
use Botble\Ecommerce\Facades\EcommerceHelper;
use Botble\Ecommerce\Facades\FlashSale as FlashSaleFacade;
use Botble\Ecommerce\Services\Products\ProductPriceService;
use Botble\Ecommerce\Services\Products\UpdateDefaultProductService;
use Botble\Faq\Models\Faq;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

/**
 * @method notOutOfStock()
 */
class Product extends BaseModel
{
    protected $table = 'ec_products';

    protected $fillable = [
        'name',
        'description',
        'content',
        'image', // Featured image
        'images',
        'sku',
        'order',
        'quantity',
        'allow_checkout_when_out_of_stock',
        'with_storehouse_management',
        'is_featured',
        'brand_id',
        'is_variation',
        'sale_type',
        'price',
        'sale_price',
        'start_date',
        'end_date',
        'length',
        'wide',
        'height',
        'weight',
        'tax_id',
        'views',
        'stock_status',
        'barcode',
        'cost_per_item',
        'generate_license_code',
    ];

    protected $appends = [
        'original_price',
        'front_sale_price',
    ];

    protected $casts = [
        'status' => BaseStatusEnum::class,
        'stock_status' => StockStatusEnum::class,
        'product_type' => ProductTypeEnum::class,
        'price' => 'float',
        'sale_price' => 'float',
        'name' => SafeContent::class,
        'description' => SafeContent::class,
        'content' => SafeContent::class,
        'sale_type' => 'int',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    protected float $originalPrice = 0;

    protected float $finalPrice = 0;

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            $product->created_by_id = Auth::check() ? Auth::id() : 0;
            $product->created_by_type = User::class;
        });

        static::deleting(function (Product $product) {
            $product->variations()->each(fn (ProductVariation $item) => $item->delete());
            $product->variationInfo()->delete();
            $product->categories()->detach();
            $product->productAttributeSets()->detach();
            $product->productCollections()->detach();
            $product->discounts()->detach();
            $product->crossSales()->detach();
            $product->upSales()->detach();
            $product->groupedProduct()->detach();
            $product->taxes()->detach();
            $product->views()->delete();
            $product->reviews()->delete();
            $product->flashSales()->detach();
            $product->productFiles()->delete();
            $product->productLabels()->detach();
            $product->tags()->detach();
        });

        static::updated(function (Product $product) {
            if ($product->is_variation && $product->original_product->defaultVariation->product_id == $product->id) {
                app(UpdateDefaultProductService::class)->execute($product);
            }

            if (! $product->is_variation && $product->variations()->exists()) {
                Product::query()
                    ->whereIn('id', $product->variations()->pluck('product_id')->all())
                    ->where('is_variation', 1)
                    ->update(['name' => $product->name]);
            }

            EcommerceHelper::clearProductMaxPriceCache();
        });
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            ProductCategory::class,
            'ec_product_category_product',
            'product_id',
            'category_id'
        );
    }

    public function productAttributeSets(): BelongsToMany
    {
        return $this->belongsToMany(
            ProductAttributeSet::class,
            'ec_product_with_attribute_set',
            'product_id',
            'attribute_set_id'
        );
    }

    public function productCollections(): BelongsToMany
    {
        return $this->belongsToMany(
            ProductCollection::class,
            'ec_product_collection_products',
            'product_id',
            'product_collection_id'
        );
    }

    public function discounts(): BelongsToMany
    {
        return $this->belongsToMany(Discount::class, 'ec_discount_products', 'product_id', 'discount_id');
    }

    public function crossSales(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                Product::class,
                'ec_product_cross_sale_relations',
                'from_product_id',
                'to_product_id'
            )
            ->withPivot(['price', 'price_type', 'apply_to_all_variations', 'is_variant']);
    }

    public function upSales(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'ec_product_up_sale_relations', 'from_product_id', 'to_product_id');
    }

    public function groupedProduct(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'ec_grouped_products', 'parent_product_id', 'product_id');
    }

    public function productLabels(): BelongsToMany
    {
        return $this->belongsToMany(
            ProductLabel::class,
            'ec_product_label_products',
            'product_id',
            'product_label_id'
        );
    }

    public function taxes(): BelongsToMany
    {
        return $this->original_product->belongsToMany(Tax::class, 'ec_tax_products')->with(['rules']);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(
            ProductTag::class,
            'ec_product_tag_product',
            'product_id',
            'tag_id'
        );
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class)->withDefault();
    }

    public function products(): BelongsToMany
    {
        return $this
            ->belongsToMany(Product::class, 'ec_product_related_relations', 'from_product_id', 'to_product_id')
            ->where('is_variation', 0);
    }

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class, 'configurable_product_id');
    }

    public function parentProduct(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'ec_product_variations', 'product_id', 'configurable_product_id');
    }

    public function variationAttributeSwatchesForProductList(): HasMany
    {
        return $this
            ->hasMany(ProductVariation::class, 'configurable_product_id')
            ->join(
                'ec_product_variation_items',
                'ec_product_variation_items.variation_id',
                '=',
                'ec_product_variations.id'
            )
            ->join('ec_product_attributes', 'ec_product_attributes.id', '=', 'ec_product_variation_items.attribute_id')
            ->join(
                'ec_product_attribute_sets',
                'ec_product_attribute_sets.id',
                '=',
                'ec_product_attributes.attribute_set_id'
            )
            ->where('ec_product_attribute_sets.status', BaseStatusEnum::PUBLISHED)
            ->where('ec_product_attribute_sets.is_use_in_product_listing', 1)
            ->select([
                'ec_product_attributes.*',
                'ec_product_variations.*',
                'ec_product_variation_items.*',
                'ec_product_attribute_sets.*',
                'ec_product_attributes.title as attribute_title',
            ]);
    }

    public function variationInfo(): HasOne
    {
        return $this->hasOne(ProductVariation::class, 'product_id')->withDefault();
    }

    public function defaultVariation(): HasOne
    {
        return $this
            ->hasOne(ProductVariation::class, 'configurable_product_id')
            ->where('ec_product_variations.is_default', 1)
            ->withDefault();
    }

    public function groupedItems(): HasMany
    {
        return $this->hasMany(GroupedProduct::class, 'parent_product_id');
    }

    protected function crossSaleProducts(): Attribute
    {
        return Attribute::get(function () {
            $this->loadMissing('crossSales');

            return $this->crossSales->filter(
                fn (Product $product) => ! $product->pivot->is_variant
            );
        });
    }

    protected function images(): Attribute
    {
        return Attribute::make(
            get: function (string|null $value): array {
                try {
                    if ($value === '[null]') {
                        return [];
                    }

                    $images = json_decode((string)$value, true);

                    if (is_array($images)) {
                        $images = array_filter($images);
                    }

                    return $images ?: [];
                } catch (Exception) {
                    return [];
                }
            }
        );
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: function (string|null $value) {
                $firstImage = Arr::first($this->images) ?: null;

                if ($this->is_variation) {
                    return $firstImage;
                }

                return $value ?: $firstImage;
            }
        );
    }

    protected function frontSalePrice(): Attribute
    {
        return Attribute::get(
            fn () => app(ProductPriceService::class)->getPrice($this)
        );
    }

    protected function originalPrice(): Attribute
    {
        return Attribute::get(
            fn () => app(ProductPriceService::class)->getOriginalPrice($this)
        );
    }

    protected function stockStatusLabel(): Attribute
    {
        return Attribute::make(
            get: function (): string|null {
                if ($this->with_storehouse_management) {
                    return $this->isOutOfStock() ? StockStatusEnum::OUT_OF_STOCK()->label() : StockStatusEnum::IN_STOCK()
                        ->label();
                }

                return $this->stock_status->label();
            }
        );
    }

    protected function stockStatusHtml(): Attribute
    {
        return Attribute::make(
            get: function (): string|null {
                if ($this->with_storehouse_management) {
                    return $this->isOutOfStock() ? StockStatusEnum::OUT_OF_STOCK()->toHtml() : StockStatusEnum::IN_STOCK()
                        ->toHtml();
                }

                return $this->stock_status->toHtml();
            }
        );
    }

    protected function originalProduct(): Attribute
    {
        return Attribute::make(
            get: function (): int|null|self {
                if (! $this->is_variation) {
                    return $this;
                }

                return $this->variationInfo->id ? $this->variationInfo->configurableProduct : $this;
            }
        );
    }

    public function getFlashSalePrice(): float|false|null
    {
        $flashSale = FlashSaleFacade::getFacadeRoot()->flashSaleForProduct($this);

        if ($flashSale && $flashSale->pivot->quantity > $flashSale->pivot->sold) {
            return $flashSale->pivot->price;
        }

        return $this->price;
    }

    public function getDiscountPrice(): float|int|null
    {
        $promotion = DiscountFacade::getFacadeRoot()
            ->promotionForProduct(
                [$this->id],
                $this->original_product->productCollections->pluck('id')->all(),
                $this->original_product->categories->pluck('id')->all()
            );

        if (! $promotion) {
            return $this->price;
        }

        $price = $this->price;
        switch ($promotion->type_option) {
            case DiscountTypeOptionEnum::SAME_PRICE:
                $price = $promotion->value;

                break;
            case DiscountTypeOptionEnum::AMOUNT:
                $price = $price - $promotion->value;
                if ($price < 0) {
                    $price = 0;
                }

                break;
            case DiscountTypeOptionEnum::PERCENTAGE:
                $price = $price - ($price * $promotion->value / 100);
                if ($price < 0) {
                    $price = 0;
                }

                break;
        }

        return $price;
    }

    public function isOutOfStock(): bool
    {
        if (! $this->with_storehouse_management) {
            return $this->stock_status == StockStatusEnum::OUT_OF_STOCK;
        }

        return $this->quantity <= 0 && ! $this->allow_checkout_when_out_of_stock;
    }

    public function canAddToCart(int $quantity): bool
    {
        return ! $this->with_storehouse_management ||
            ($this->quantity - $quantity) >= 0 ||
            $this->allow_checkout_when_out_of_stock;
    }

    public function promotions(): BelongsToMany
    {
        return $this
            ->belongsToMany(Discount::class, 'ec_discount_products', 'product_id')
            ->where('type', DiscountTypeEnum::PROMOTION)
            ->where('start_date', '<=', Carbon::now())
            ->whereIn('target', [DiscountTargetEnum::SPECIFIC_PRODUCT, DiscountTargetEnum::PRODUCT_VARIANT])
            ->where(function ($query) {
                return $query
                    ->whereNull('end_date')
                    ->orWhere('end_date', '>=', Carbon::now());
            })
            ->where('product_quantity', 1);
    }

    public function tax(): BelongsTo
    {
        if (! $this->original_product->tax_id && $defaultTaxRate = get_ecommerce_setting('default_tax_rate')) {
            $this->original_product->tax_id = $defaultTaxRate;
        }

        return $this->original_product->belongsTo(Tax::class, 'tax_id')->withDefault();
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'product_id')->wherePublished();
    }

    public function views(): HasMany
    {
        return $this->hasMany(ProductView::class, 'product_id');
    }

    public function flashSales(): BelongsToMany
    {
        return $this->original_product
            ->belongsToMany(FlashSale::class, 'ec_flash_sale_products', 'product_id', 'flash_sale_id')
            ->withPivot(['price', 'quantity', 'sold']);
    }

    public function latestFlashSales(): BelongsToMany
    {
        return $this
            ->flashSales()
            ->wherePublished()
            ->notExpired()
            ->latest();
    }

    protected function frontSalePriceWithTaxes(): Attribute
    {
        return Attribute::get(function (): float|null {
            if (! EcommerceHelper::isDisplayProductIncludingTaxes()) {
                return $this->front_sale_price;
            }

            return $this->front_sale_price + $this->front_sale_price * ($this->total_taxes_percentage / 100);
        });
    }

    protected function priceWithTaxes(): Attribute
    {
        return Attribute::get(function (): float|null {
            if (! EcommerceHelper::isDisplayProductIncludingTaxes()) {
                return $this->price;
            }

            return $this->price + $this->price * ($this->total_taxes_percentage / 100);
        });
    }

    protected function totalTaxesPercentage(): Attribute
    {
        return Attribute::get(fn () => $this->taxes
            ->where(fn ($item) => ! $item->rules || $item->rules->isEmpty())
            ->where('status', BaseStatusEnum::PUBLISHED)
            ->sum('percentage'));
    }

    public function variationProductAttributes(): HasMany
    {
        return $this
            ->hasMany(ProductVariation::class, 'product_id')
            ->join(
                'ec_product_variation_items',
                'ec_product_variation_items.variation_id',
                '=',
                'ec_product_variations.id'
            )
            ->join('ec_product_attributes', 'ec_product_attributes.id', '=', 'ec_product_variation_items.attribute_id')
            ->join(
                'ec_product_attribute_sets',
                'ec_product_attribute_sets.id',
                '=',
                'ec_product_attributes.attribute_set_id'
            )
            ->distinct()
            ->select([
                'ec_product_variations.product_id',
                'ec_product_variations.configurable_product_id',
                'ec_product_attributes.*',
                'ec_product_attribute_sets.title as attribute_set_title',
                'ec_product_attribute_sets.slug as attribute_set_slug',
            ])
            ->orderBy('order');
    }

    protected function variationAttributes(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->variationProductAttributes->count()) {
                return '';
            }

            $attributes = $this->variationProductAttributes->pluck('title', 'attribute_set_title')->toArray();

            return '(' . mapped_implode(', ', $attributes, ': ') . ')';
        });
    }

    protected function priceInTable(): Attribute
    {
        return Attribute::get(function () {
            $price = format_price($this->front_sale_price);

            if ($this->front_sale_price != $this->price) {
                $price .= sprintf(' <del class="text-danger">%s</del>', format_price($this->price));
            }

            return $price;
        });
    }

    public function createdBy(): MorphTo
    {
        return $this->morphTo()->withDefault();
    }

    protected function faqItems(): Attribute
    {
        return Attribute::get(function () {
            $this->loadMissing('metadata');

            $faqs = (array)$this->getMetaData('faq_schema_config', true);

            if (is_plugin_active('faq')) {
                $selectedExistingFaqs = $this->getMetaData('faq_ids', true);

                if ($selectedExistingFaqs && is_array($selectedExistingFaqs)) {
                    $selectedExistingFaqs = array_filter($selectedExistingFaqs);

                    if ($selectedExistingFaqs) {
                        $selectedFaqs = Faq::query()
                            ->wherePublished()
                            ->whereIn('id', $selectedExistingFaqs)
                            ->pluck('answer', 'question')
                            ->all();

                        foreach ($selectedFaqs as $question => $answer) {
                            $faqs[] = [
                                [
                                    'key' => 'question',
                                    'value' => $question,
                                ],
                                [
                                    'key' => 'answer',
                                    'value' => $answer,
                                ],
                            ];
                        }
                    }
                }
            }

            $faqs = array_filter($faqs);

            if (empty($faqs)) {
                return [];
            }

            foreach ($faqs as $key => $item) {
                if (! $item[0]['value'] && ! $item[1]['value']) {
                    Arr::forget($faqs, $key);
                }
            }

            return $faqs;
        })->shouldCache();
    }

    protected function reviewImages(): Attribute
    {
        return Attribute::get(fn () => $this->reviews->sortByDesc('created_at')->reduce(function ($carry, $item) {
            return array_merge($carry, (array)$item->images);
        }, []));
    }

    public function isTypePhysical(): bool
    {
        return ! isset($this->attributes['product_type']) || $this->attributes['product_type'] == ProductTypeEnum::PHYSICAL;
    }

    public function isTypeDigital(): bool
    {
        return isset($this->attributes['product_type']) && $this->attributes['product_type'] == ProductTypeEnum::DIGITAL;
    }

    public function productFiles(): HasMany
    {
        return $this->hasMany(ProductFile::class, 'product_id');
    }

    protected function productFileExternalCount(): Attribute
    {
        return Attribute::get(fn () => $this->productFiles->filter(fn (ProductFile $file) => $file->is_external_link)->count());
    }

    protected function productFileInternalCount(): Attribute
    {
        return Attribute::get(fn () => $this->productFiles->filter(fn (ProductFile $file) => ! $file->is_external_link)->count());
    }

    protected function salePercent(): Attribute
    {
        return Attribute::get(function (): int {
            if ($this->front_sale_price == 0 && $this->price !== 0) {
                return 100;
            }

            if (! $this->front_sale_price || ! $this->price) {
                return 0;
            }

            return (int) round(($this->price - $this->front_sale_price) / $this->price * 100);
        });
    }

    public function scopeNotOutOfStock(Builder $query): Builder
    {
        if (EcommerceHelper::showOutOfStockProducts() || is_in_admin()) {
            return $query;
        }

        return $query
            ->where(function ($query) {
                $query
                    ->where(function ($subQuery) {
                        $subQuery
                            ->where('with_storehouse_management', 0)
                            ->where('stock_status', '!=', StockStatusEnum::OUT_OF_STOCK);
                    })
                    ->orWhere(function ($subQuery) {
                        $subQuery
                            ->where('with_storehouse_management', 1)
                            ->where('quantity', '>', 0);
                    })
                    ->orWhere(function ($subQuery) {
                        $subQuery
                            ->where('with_storehouse_management', 1)
                            ->where('allow_checkout_when_out_of_stock', 1);
                    });
            });
    }

    public function options(): HasMany
    {
        return $this->hasMany(Option::class)->orderBy('order');
    }

    public function isOnSale(): bool
    {
        return $this->front_sale_price !== $this->price;
    }

    public function generateSku(): string|null
    {
        if (
            ! get_ecommerce_setting('auto_generate_product_sku', true) ||
            ! $setting = get_ecommerce_setting('product_sku_format', null)
        ) {
            return null;
        }

        while (true) {
            $sku = str_replace(
                ['[%s]', '[%S]'],
                strtoupper(Str::random(5)),
                $setting
            );

            $sku = str_replace(
                ['[%d]', '[%D]'],
                mt_rand(10000, 99999),
                $sku
            );

            foreach (explode('%s', $sku) as $ignored) {
                $sku = preg_replace('/%s/i', strtoupper(Str::random(1)), $sku, 1);
            }

            foreach (explode('%d', $sku) as $ignored) {
                $sku = preg_replace('/%d/i', mt_rand(0, 9), $sku, 1);
            }

            if (Product::query()->where('sku', $sku)->exists()) {
                continue;
            }

            return $sku;
        }
    }

    public function getOriginalPrice(): float
    {
        return $this->originalPrice;
    }

    public function setOriginalPrice(float|null $price): static
    {
        $this->originalPrice = (float) $price;

        return $this;
    }

    public function getFinalPrice(): float
    {
        return $this->finalPrice;
    }

    public function setFinalPrice(float|null $price): static
    {
        $this->finalPrice = (float) $price;

        return $this;
    }
}
