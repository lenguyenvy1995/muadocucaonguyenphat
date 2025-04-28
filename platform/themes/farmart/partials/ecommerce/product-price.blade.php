    <span class="product-price">
        <span class="product-price-sale @if (!$product->isOnSale()) d-none @endif">
            <bdi>
                @if($product->front_sale_price_with_taxes==0 || $product->front_sale_price_with_taxes == null)
                <span class="amount text-center">LIÊN HỆ</span>
                @else
                <del aria-hidden="true">

                    <span class="price-amount">
                        <bdi>
                            <span class="amount">{{ format_price($product->price_with_taxes) }} </span>
                        </bdi>
                    </span>
                </del>
                <ins>
                    <span class="price-amount">
                        <bdi>
                            <span class="amount">{{ format_price($product->front_sale_price_with_taxes) }} </span>
                        </bdi>
                    </span>
                </ins>
                @endif
            </bdi>

        </span>
        <span class="product-price-original  @if ($product->isOnSale()) d-none @endif">
            <span class="price-amount">
                <bdi>
                    @if($product->front_sale_price_with_taxes==0 || $product->front_sale_price_with_taxes == null)
                    <span class="amount text-center">LIÊN HỆ</span>
                    @else
                    <span class="amount">{{ format_price($product->front_sale_price_with_taxes) }} </span>
                    @endif
                </bdi>
            </span>
        </span>
    </span>