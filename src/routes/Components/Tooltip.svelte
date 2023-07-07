<script lang="ts">
    export let tooltip: string = "";
    export let hovering: boolean = false;
    export let hideIf: boolean = false;

    let self: HTMLElement;
    let tip: HTMLElement;
</script>

<main bind:this={self} on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
    <slot></slot>
    <div class:show={hovering && !hideIf} bind:this={tip} class="tooltip">
        <p>{tooltip}</p>
    </div>
</main>

<style>
    main {
        width: fit-content;
        height: fit-content;

        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    div.tooltip {
        position: absolute;

        border: 1px solid var(--gray3);
        background: var(--gray1);

        display: none;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 4px 8px;

        height: fit-content;
        width: fit-content;

        border-radius: 6px;
        color: var(--gray8);

        animation: enter 0.15s var(--ease);
        position: absolute;

        left: 50%;
        transform: translateX(-50%);
        top: calc(100% + 4px);
    }

    div.tooltip > p {
        width: fit-content;
        white-space: nowrap;
        font-size: 11px;

        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0.055px;
    }

    div.tooltip.show {
        display: inline-flex;
    }

    @keyframes enter {
        from {
            transform: translate(-50%, 5px);
            opacity: 40%;
        }

        to {
            transform: translate(-50%, 0px);
            opacity: 100%;
        }
    }
</style>