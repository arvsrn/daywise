<script lang="ts">
    import { onMount } from "svelte";
    import { app } from "../state";
    import Tooltip from "./Components/Tooltip.svelte";

    export let scroll: number;
    let self: HTMLElement;
    let mounted: boolean = false;

    const onScroll = () => {
        if (mounted && self) self.scroll(0, scroll);
    }

    onMount(() => mounted = true);

    $: scroll, onScroll();
</script>

<main bind:this={self} style:gap="{(60 * ($app.zoom / 100)) - 16}px" on:mousewheel|preventDefault={() => {}}>
    <div style:margin-bottom="8px">
        <Tooltip tooltip="Kolkata">
            <p>Kol..</p>
        </Tooltip>
    </div>
    {#each [...Array(24).keys()] as i}
        <p>{(i < 12 ? i : i - 12) || 12}{i < 12 ? 'AM' : 'PM'}</p>
    {/each}
</main>

<style>
    main {
        width: fit-content;
        border-right: 1px solid var(--gray3);

        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 8px;

        height: 100vh;

        overflow: scroll;
        overflow-x: visible;
    }

    main::-webkit-scrollbar {
        display: none;
    }

    p {
        font-size: 11px;
        font-family: Inter;
        line-height: 16px;
        color: var(--gray7);

        user-select: none;
    }

    div {
        width: 100%;
        height: 48px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background: var(--gray0);

        position: sticky;
        top: 0;

        flex: none;
        overflow: visible;
    }
</style>