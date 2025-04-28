<div class="mb-3">
    <label class="form-label">{{ __('Title') }}</label>
    <input class="form-control" name="title" type="text" value="{{ Arr::get($attributes, 'title') }}"
        placeholder="{{ __('Title') }}">
</div>

<div class="mb-3">
    <label class="form-label">{{ __('Subtitle') }}</label>
    <input class="form-control" name="subtitle" type="text" value="{{ Arr::get($attributes, 'subtitle') }}"
        placeholder="{{ __('Subtitle') }}">
</div>

<div class="p-2 border">
    @for ($i = 1; $i <= 30; $i++)
        <div class="p-2 border mb-2">

            <div class="mb-3">
                <label class="form-label">{{ __('Hình ảnh :number', ['number' => $i]) }}</label>
                {!! Form::mediaImage('image_' . $i,  Arr::get($attributes, 'image_' . $i)) !!}
            </div>
        </div>
    @endfor
</div>
