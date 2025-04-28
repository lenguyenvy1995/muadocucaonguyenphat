<div class="mb-3">
    <label class="form-label">{{ __('Nền') }}</label>
    <input class="form-control" name="background" type="text" value="{{ Arr::get($attributes, 'background') }}"
        placeholder="{{ __('Nền') }}">
</div>

<div class="mb-3">
    <label class="form-label">{{ __('tiêu đề lớn')}}</label>
    <input class="form-control" name="title" type="text" value="{{ Arr::get($attributes, 'title') }}"
        placeholder="{{ __('Tiêu đề lớn') }}">
</div>
@for ($i=1;$i<=4;$i++)
<div class="border p-2 mt-2">
    <div class="mb-3">
        <label class="form-label">{{ __('Tiêu đề ').$i }}</label>
        <input class="form-control" name="name{{$i}}" type="text" value="{{ Arr::get($attributes, 'name'.$i) }}"
            placeholder="{{ __('Tiêu đề ').$i }}">
    </div>
    <div class="mb-3 position-relative">
        <label class="form-label" for="primary_color">
            DESCRIPTION {{$i}}
        </label>
        <div class="mb-3 position-relative">
            <input class="form-control" type="text" name="description{{$i}}" id="description{{$i}}"
                value="{{ Arr::get($attributes, 'description'.$i) }}">
        </div>
    </div>
    <div class="mb-3">
        <label class="form-label">{{ __('Hình ảnh ').$i }}</label>
        {!! Form::mediaImage('img'.$i, Arr::get($attributes, 'img'.$i)) !!}
    </div>
</div>

@endfor