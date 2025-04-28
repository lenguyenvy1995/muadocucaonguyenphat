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
<div class="mb-3">
    <label class="form-label">{{ __('Nền') }}</label>
    <input class="form-control" name="background" type="text" value="{{ Arr::get($attributes, 'background') }}"
        placeholder="{{ __('Nền') }}">
</div>
<div class="p-2 border">
    @for ($i = 1; $i <= 6; $i++)
        <div class="p-2 border mb-2">
            <div class="mb-3">
                <label class="form-label">{{ __('Name :number', ['number' => $i]) }}</label>
                <input class="form-control" name="name_{{ $i }}" type="text"
                    value="{{ Arr::get($attributes, 'name_' . $i) }}"
                    placeholder="{{ __('Name :number', ['number' => $i]) }}">
            </div>
            <div class="mb-3">
                <label class="form-label">{{ __('Nội dung :number', ['number' => $i]) }}</label>
                <input class="form-control" name="description_{{ $i }}" type="text"
                    value="{{ Arr::get($attributes, 'description_' . $i) }}"
                    placeholder="{{ __('Nội dung :number', ['number' => $i]) }}">
            </div>
            <div class="mb-3">
                <label class="form-label">{{ __('Hình ảnh :number', ['number' => $i]) }}</label>
                {!! Form::mediaImage('image_' . $i,  Arr::get($attributes, 'image_' . $i)) !!}
            </div>
            <div class="mb-3">
                <label class="form-label">{{ __('Đường dẫn :number', ['number' => $i]) }}</label>
                <input class="form-control" name="link_{{ $i }}" type="text"
                    value="{{ Arr::get($attributes, 'link_' . $i) }}"
                    placeholder="{{ __('Đường dẫn :number', ['number' => $i]) }}">
            </div>
        </div>
    @endfor
</div>
