<div class="mb-3">
    <label class="form-label">{{ __('Title') }}</label>
    <input
        class="form-control"
        name="title"
        type="text"
        value="{{ Arr::get($attributes, 'title') }}"
        placeholder="{{ __('Title') }}"
    >
</div>
<div class="mb-3">
    <label class="form-label">{{ __('Nội dung') }}</label>

    <textarea class="form-control" name="description" rows="20">{{ Arr::get($attributes, 'description') }}</textarea>
</div>
<div class="mb-3">
    <label class="form-label">{{ __('Đường dẫn Video') }}</label>

    <textarea class="form-control" name="link" rows="2">{{ Arr::get($attributes, 'link') }}</textarea>
</div>

<div class="mb-3">
    <label class="form-label">{{ __('Image') }}</label>
    {!! Form::mediaImage('image', Arr::get($attributes, 'image')) !!}
</div>
