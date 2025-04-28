<div class="mb-3">
    <label class="form-label">{{ __('Tiêu đề') }}</label>
    <input class="form-control" name="title" type="text" value="{{ Arr::get($attributes, 'title') }}"
        placeholder="{{ __('Tiêu đề') }}">
</div>
@for ($i = 1; $i <= 20; $i++)
    <div class="p-2 border mb-2">
        <div class="mb-3">
            <label class="form-label">{{ __('Hình ảnh :number', ['number' => $i]) }}</label>
            {!! Form::mediaImage('image_' . $i, Arr::get($attributes, 'image_' . $i)) !!}
        </div>
        <div class="mb-3">
            <label class="form-label">{{ __('Đường Dẫn') . ' ' . $i }}</label>
            <input class="form-control" name="link{{ $i }}" type="textarea"
                value="{{ Arr::get($attributes, 'link' . $i) }}" placeholder="{{ __('Đường dẫn') . '' . $i }}">
        </div>
    </div>
@endfor
