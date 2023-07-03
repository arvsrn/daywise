<script lang="ts">
    import { app } from "../../state";
  import Menu from "./Menu.svelte";
  import MenuOption from "./MenuOption.svelte";
    
    const enum Drag {
        TOP,
        BOTTOM,
        NONE,
        SELF,
    }
    
    let hour: number = 60 * ($app.zoom / 100); // how big an hour is in pixels
    let quarter: number = hour / 4;

    export let color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray' = 'orange';

    let selected: boolean = false;
    let startTime: number = hour * 2;
    let endTime: number = hour * 3;
    let dragging: Drag = Drag.NONE;
    let mX: number = 0;
    let mY: number = 0;

    let finalEndTime: number = endTime - (endTime % quarter)
    let finalStartTime: number = startTime - (startTime % quarter);

    let showing: boolean = false;
    let mouse: [number, number] = [0, 0];

    const onMouseMove = (e: MouseEvent) => {
        switch (dragging) {
            case Drag.BOTTOM:
                if (((endTime + e.movementY) - startTime) >= quarter) {
                    if (endTime + e.movementY < 1440)
                        endTime += e.movementY;
                    else endTime = 0;

                    break;
                } else {
                    dragging = Drag.TOP;
                    onMouseMove(e);
                }
            
            case Drag.TOP:
                if ((endTime - (startTime + e.movementY)) >= quarter) {
                    if (startTime + e.movementY > 0)
                        startTime += e.movementY;
                    else startTime = 0;

                    break;
                } else {
                    dragging = Drag.BOTTOM;
                    onMouseMove(e);
                }
            
            case Drag.SELF:
                if (startTime + e.movementY > 0 && endTime + e.movementY < hour * 25) {
                    const height_ = endTime - startTime;
                    startTime += e.movementY;
                    endTime = startTime + height_;
                } else if (startTime + e.movementY < 0) {
                    startTime = 0;
                } else if (endTime + e.movementY > hour * 25) {
                    endTime = hour * 25;
                }

        }
    }

    const onMouseDown = (e: MouseEvent) => {
        mX = e.pageX;
        mY = e.pageY;

        dragging = Drag.SELF;
    }

    const onMouseUp = (e: MouseEvent) => {
        const dX = Math.abs(e.pageX - mX);
        const dY = Math.abs(e.pageY - mY);

        if (dX < 6 && dY < 6) { // click
            selected = !selected;
        }
    }

    $: $app.eventSelected = selected;
    $: finalEndTime = endTime - (endTime % 15)
    $: finalStartTime = startTime - (startTime % 15);

    app.subscribe(u => hour = 60 * (u.zoom / 100));
    $: quarter = hour / 4;
</script>

<main style:--color="var(--{color})" class:selected={selected} style:top="{hour/60 * finalStartTime}px" style:height="{hour/60 * (finalEndTime - finalStartTime)}px"on:contextmenu|preventDefault={event => {
    showing = true;
    mouse = [event.clientX, event.clientY];
}} >
    <div class="container" on:mouseup={onMouseUp} on:mousedown={onMouseDown} >
        <div class="color"></div>
        <div>
            <h1>Alex Vance</h1>
            <p>Meet with him for a project proposal</p>
            <p class="time">4—6PM</p>
        </div>
    </div>

    <div class="handle top" on:mousedown={() => dragging = Drag.TOP}></div>
    <div class="handle bottom" on:mousedown={() => dragging = Drag.BOTTOM}></div>
</main>

<svelte:window on:mouseup={() => {
    dragging = Drag.NONE;
}} on:mousemove={onMouseMove} />

{#if showing}
<div style="width:140px;height:fit-content;position:fixed;left:{mouse[0]}px;top:{mouse[1]}px;z-index:200;">
    <Menu onClickOutside={() => showing = false}>
        <MenuOption>Copy</MenuOption>
        <MenuOption>Cut</MenuOption>
        <MenuOption appearance="danger">Delete</MenuOption>
    </Menu>
</div>
{/if}

<style>
    main {
        display: flex;
        flex-direction: row;
        position: absolute;

        width: calc(100% - 6px);
        left: 6px;
        padding: 4px 8px 4px 4px;
        align-items: flex-start;
        gap: 4px;

        border-radius: 6px;
        background: color-mix(in srgb, var(--color) 15%, var(--gray0));
        z-index: 1;

        border: 1px solid transparent;
        transition: border 0.15s var(--ease);

        user-select: none;
        overflow: hidden;
    }

    main.selected {
        border: 1px solid var(--color);
    }

    div.container {
        display: flex;
        flex-direction: row;
        gap: 4px;

        width: 100%;
        height: 100%;
    }

    div.color {
        width: 4px;
        height: 100%;

        border-radius: 2px;
        background: var(--color);

        flex: none;
    }

    div:not(.color, .container) {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    h1 {
        color: var(--color);
        font-size: 13px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
    }

    p {
        color: var(--color);
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 118%;
        letter-spacing: 0.11px;
    }

    p.time {
        color: color-mix(in srgb, var(--color) 60%, var(--gray0));
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    div.handle {
        --padding: 6px;
        
        width: calc(100% - (var(--padding)*2));
        height: 6px;
        left: var(--padding);

        position: absolute;
        cursor: ns-resize;

        z-index: 5;
    }

    div.handle.top {
        top: 0px;
    }

    div.handle.bottom {
        bottom: 1px;
    }
</style>