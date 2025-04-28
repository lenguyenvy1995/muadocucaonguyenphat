<div class="mb-3">
    <label class="form-label">{{ __('Title') }}</label>
    <input class="form-control" name="title" type="text" value="{{ Arr::get($attributes, 'title') }}"
        placeholder="{{ __('Title') }}">
</div>

<div class="mb-3">
    <label class="form-label">{{ __('Nền') }}</label>
    <input class="form-control" name="background" type="text" value="{{ Arr::get($attributes, 'background') }}"
        placeholder="{{ __('Nền') }}">
</div>
<div class="mb-3">
<label class="form-label">{{ __('img') }}</label>
{!! Form::mediaImage('img', Arr::get($attributes, 'img')) !!}
</div>