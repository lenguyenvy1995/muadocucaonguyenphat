
<div class="mb-3">
    <label class="form-label">{{ __('Title') }}</label>
    <input class="form-control" name="title" type="text" value="{{ Arr::get($attributes, 'title') }}"
        placeholder="{{ __('Title') }}">
</div>
@for ($i=1;$i<=4;$i++)
<div class="border p-2 mt-2">
    <div class="mb-3">
        <label class="form-label">{{ __('Tên dịch vụ ').$i }}</label>
        <input class="form-control" name="name{{$i}}" type="text" value="{{ Arr::get($attributes, 'name'.$i) }}"
            placeholder="{{ __('Tên khoá học ').$i }}">
    </div>
    <div class="mb-3 position-relative">
        <label class="form-label" for="primary_color">
           LINK {{$i}}
        </label>
        <div class="mb-3 position-relative">
            <input class="form-control" type="text" name="link{{$i}}" id="link{{$i}}"
                value="{{ Arr::get($attributes, 'link'.$i) }}">
        </div>
    </div>
    <div class="mb-3">
        <label class="form-label">{{ __('Hình ảnh ').$i }}</label>
        {!! Form::mediaImage('img'.$i, Arr::get($attributes, 'img'.$i)) !!}
    </div>
</div>

@endfor
