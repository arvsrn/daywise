<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { setContext } from 'svelte'

    export function clickOutside(
        node: HTMLElement,
        handler: () => void
    ): { destroy: () => void } {
        const onClick = (event: MouseEvent) =>
            node &&
            !node.contains(event.target as HTMLElement) &&
            !event.defaultPrevented &&
            handler();

            document.addEventListener('click', onClick, true);
            document.addEventListener('contextmenu', onClick, true);

        return {
            destroy() {
                document.removeEventListener('click', onClick, true);
                document.removeEventListener('contextmenu', onClick, true);
            },
        };
    }

    export let onClickOutside: () => void = () => {};
    export let fixedHeight: string | null = null;
    export let style: string = "";
    export let appearance: 'default' | 'light' = 'default';

    setContext('appearance', appearance);
</script> 

<main class={appearance} class:scroll={fixedHeight} style={fixedHeight ? `height: ${fixedHeight}; ${style}` : style} out:fade={{ duration: 150 }} use:clickOutside={onClickOutside}>
    <slot></slot>
</main>

<style>
    main {
        overflow: visible;
        outline: none;
        background: var(--gray1);
        
        border: 1px solid var(--gray3);
        box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, 
            rgba(15, 15, 15, 0.2) 0px 3px 6px, 
            rgba(15, 15, 15, 0.4) 0px 9px 24px;
        border-radius: 6px;

        width: 100%;
        height: fit-content;
        padding: 6px 0px;

        display: flex;
        flex-direction: column;

        animation: enter 0.1s var(--ease) 1;
        z-index: 6;
        cursor: default;
    }

    main.light {
        box-shadow: none;
        background: var(--gray3);
    }

    main.scroll {
        overflow: scroll;
    }

    @keyframes enter {
        0% {
            transform: translateY(-4px);
            opacity: 80%;  
            box-shadow: none;
        }

        100% {
            transform: translateY(0px);
            opacity: 100%;
            box-shadow: 0px 13px 5px rgba(0, 0, 0, 0.01), 
                0px 7px 4px rgba(0, 0, 0, 0.05), 
                0px 3px 3px rgba(0, 0, 0, 0.09), 
                0px 1px 2px rgba(0, 0, 0, 0.1), 
                0px 0px 0px rgba(0, 0, 0, 0.1);
        }
    }
</style>