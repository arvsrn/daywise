<script lang="ts">
    import ClickableChip from "./ClickableChip.svelte";

    interface Button {
        text: string,
        action: () => void,
        primary: boolean,
    }

    export let title: string;
    export let description: string;
    export let buttons: Array<Button> = [];
</script>

<main>
    <p>{title}</p>
    {#if description} <p class="dark">{description}</p> {/if}
    {#if buttons.length > 0} 
        <div class="buttons">
            {#each buttons as button}
            <ClickableChip primary={button.primary} action={button.action}>{button.text}</ClickableChip>
            {/each}
        </div>
    {/if}   
</main>

<style>
    main {
        width: 100%;
        height: fit-content;
        
        padding: 12px;

        border-bottom: 1px solid var(--gray3);
        
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    div.buttons {
        display: flex;
        flex-direction: row;
        height: fit-content;
        width: fit-content;
        gap: 4px;
        flex: none;
        align-items: center;
    }

    p {
        font-size: 11px;
        line-height: 16px;
        color: var(--gray8);
        font-family: Inter;
    }

    p.dark {
        color: var(--gray7);
    }
</style>