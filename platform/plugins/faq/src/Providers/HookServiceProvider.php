<?php

namespace Botble\Faq\Providers;

use Botble\Base\Facades\Assets;
use Botble\Base\Facades\BaseHelper;
use Botble\Base\Facades\Html;
use Botble\Base\Facades\MetaBox;
use Botble\Base\Supports\ServiceProvider;
use Botble\Faq\Contracts\Faq as FaqContract;
use Botble\Faq\FaqCollection;
use Botble\Faq\FaqItem;
use Botble\Faq\Models\Faq;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        add_action(BASE_ACTION_META_BOXES, function (string $context, array|string|Model|null $object = null): void {
            if (! $object || $context != 'advanced') {
                return;
            }

            if (! in_array(get_class($object), config('plugins.faq.general.schema_supported', []))) {
                return;
            }

            if (! setting('enable_faq_schema', 0)) {
                return;
            }

            Assets::addStylesDirectly(['vendor/core/plugins/faq/css/faq.css'])
                ->addScriptsDirectly(['vendor/core/plugins/faq/js/faq.js']);

            MetaBox::addMetaBox(
                'faq_schema_config_wrapper',
                trans('plugins/faq::faq.faq_schema_config', [
                    'link' => Html::link(
                        'https://developers.google.com/search/docs/data-types/faqpage',
                        trans('plugins/faq::faq.learn_more'),
                        ['target' => '_blank']
                    ),
                ]),
                function () {
                    $value = [];
                    $selectedFaqs = [];

                    $args = func_get_args();
                    if ($args[0] && $args[0]->id) {
                        $value = MetaBox::getMetaData($args[0], 'faq_schema_config', true);
                        $selectedFaqs = MetaBox::getMetaData($args[0], 'faq_ids', true) ?: [];
                    }

                    $hasValue = ! empty($value);

                    $value = (array)$value;

                    foreach ($value as $key => $item) {
                        if (! is_array($item)) {
                            continue;
                        }

                        foreach ($item as $subItem) {
                            if (is_array($subItem['value'])) {
                                Arr::forget($value, $key);
                            }
                        }
                    }

                    $value = json_encode($value);

                    $faqs = Faq::query()->wherePublished()->pluck('question', 'id')->all();

                    return view(
                        'plugins/faq::schema-config-box',
                        compact('value', 'hasValue', 'faqs', 'selectedFaqs')
                    )->render();
                },
                get_class($object),
                $context
            );
        }, 39, 2);

        add_action(BASE_ACTION_PUBLIC_RENDER_SINGLE, function ($screen, $object): void {
            add_filter(THEME_FRONT_HEADER, function ($html) use ($object): string|null {
                if (! in_array(get_class($object), config('plugins.faq.general.schema_supported', []))) {
                    return $html;
                }

                if (! setting('enable_faq_schema', 0)) {
                    return $html;
                }

                $value = MetaBox::getMetaData($object, 'faq_schema_config', true);

                if (! $value || ! is_array($value)) {
                    return $html;
                }

                foreach ($value as $key => $item) {
                    if (! $item[0]['value'] && ! $item[1]['value']) {
                        Arr::forget($value, $key);
                    }
                }

                $schemaItems = new FaqCollection();

                foreach ($value as $item) {
                    $schemaItems->push(
                        new FaqItem(BaseHelper::clean($item[0]['value']), BaseHelper::clean($item[1]['value']))
                    );
                }

                app(FaqContract::class)->registerSchema($schemaItems);

                return $html;
            }, 39);
        }, 39, 2);
    }
}
