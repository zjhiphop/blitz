{#if $T.consistHTML5}
<video id="{$T.video_id}" class="{$T.video_class}" width="{$T.width}" height="{$T.height}" poster="{$T.poster}" {#if $T.loop}loop{#/if}  {#if $T.preload}preload{#/if} {#if $T.autoplay}autoplay{#/if} {#if $T.controls}controls{#/if} >
    <source src="{$T.src}" />
</video>
{#else}
<p>
    <strong>Sorry,your device is not consisit video,please Download Video By:</strong>
    <a href="{$T.src}">Video URL</a>
</p>
{#/if}