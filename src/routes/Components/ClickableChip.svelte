<script lang="ts">
    export let action: () => void = () => {};
    export let primary: boolean = false;
</script>

<button on:click={action} class:primary={primary}>
    <slot></slot>
</button>

<style>
    button {
        display: flex;
        padding: 0px 6px;
        justify-content: center;
        align-items: center;
        gap: 4px;

        border-radius: 6px;
        background: var(--gray3);

        color: var(--gray8);
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;

        cursor: pointer;
        outline: none;
        border: none;

        transition: transform 0.15s var(--ease);
    }

    button.primary {
        background: var(--gray8);
        color: var(--gray0);
    }

    button:active {
        transform: scale(0.95);
    }
</style>