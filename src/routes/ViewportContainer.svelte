<script lang="ts">
    import { onMount } from "svelte";
    import { app } from "../state";  
    import ClickableChip from "./Components/ClickableChip.svelte";
    import Event from "./Components/Event.svelte";

    export let scroll = 0;
    
    const snapThreshold = 250;
    const day = 8_64_00_000; // one day in milliseconds

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let viewport: HTMLElement;
    let mounted: boolean = false;
    
    let width: number = 300; // width of each column in pixels

    let lastScrollLeft = 0;
    let lastScrollTime = Date.now();
    let start = Date.now();

    $app.currentYear = new Date(start).getUTCFullYear();
    $app.currentMonth = monthNames[new Date(start).getUTCMonth()];

    onMount(() => {
        mounted = true;
        width = viewport.clientWidth / $app.days;
        scroll = viewport.scrollTop;
    });

    $: start, $app.currentMonth = monthNames[new Date(start + (60*60*24*1000)).getUTCMonth()];
    $: start, $app.currentYear = new Date(start).getUTCFullYear();

    app.subscribe(u => {
        if (mounted) width = viewport.clientWidth / u.days;
    });
</script>

<main bind:this={viewport} on:scroll|preventDefault={_ => {
    scroll = viewport.scrollTop;

    lastScrollLeft = viewport.scrollLeft;
    lastScrollTime = Date.now();

    // for snapping the columns
    setTimeout(() => {
        // check if user scrolled in the last `snapThreshold` milliseconds, snap if false
        if ((Date.now() - lastScrollTime) > snapThreshold) {
            viewport.scroll({
                left: ((viewport.scrollLeft % width) < (width/2)) // decide whether to snap on the left or right
                    ? (viewport.scrollLeft - (viewport.scrollLeft % width)) + 1
                    : (viewport.scrollLeft + width - (viewport.scrollLeft % width)) + 1,
                top: viewport.scrollTop,
                behavior: 'smooth',
            });
        }
    }, snapThreshold);

    // infinite scrolling
    if (viewport.scrollLeft === 0) {
        viewport.scroll(width, viewport.scrollTop);
        start -= day; // one day in ms
    } else if (viewport.scrollLeft === viewport.scrollWidth - viewport.clientWidth) {
        viewport.scroll(width, viewport.scrollTop);
        start += day; // one day in ms
    }
}}>
    {#each [...Array($app.days + 2).keys()] as d}
        {@const currentDate = new Date(start + (d * day))}
        
        <section class="column" style:height="{(60 * ($app.zoom / 100)) * 25 + 48}px" style:width="{width}px">
            <div class="date">
                {#if currentDate.getFullYear() === new Date().getFullYear() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getDate() === new Date().getDate()}
                    <ClickableChip>
                        {dayNames[currentDate.getDay()]} {currentDate.getUTCDate()}
                    </ClickableChip>
                {:else}
                    {dayNames[currentDate.getDay()]} {currentDate.getUTCDate()}
                {/if}
            </div>
            <div data-weekend={[0, 6].includes(currentDate.getDay())}>
                <Event></Event>
                
                {#each [...Array(24).keys()] as i} 
                    <div class="hour-line" style:top="{60 * ($app.zoom / 100) * (i + 1)}px"></div>
                {/each}
            </div>
        </section>
    {/each}
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex: 1 0 0;

        height: 100%;
        overflow: scroll;
    }

    main::-webkit-scrollbar {
        display: none;
    }

    section.column {
        display: flex;
        flex-direction: column;
        flex: none;
    }

    div.date {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 36px;

        color: var(--gray6);
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.055px;

        height: 48px;
        width: 100%;

        border-bottom: 1px solid var(--gray3);

        position: sticky;
        top: 0;
        background: var(--gray0);
        z-index: 2;
    }

    div:not(.date) {
        flex: 1 0 0;
        align-self: stretch;

        position: relative;

        border-right: 1px solid var(--gray3);
    }

    div.hour-line {
        width: 100%;
        position: absolute;
        left: 0px;
        background: var(--gray2);
        height: 1px;
    }

    div:not(.date)[data-weekend="true"] {
        background: var(--gray_);
    }
</style>