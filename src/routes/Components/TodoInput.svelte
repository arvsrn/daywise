<script lang="ts">
    let self: HTMLElement;
</script>

<main on:click={() => self.focus()}>
    <div></div>
    <p bind:this={self} contenteditable></p>
</main>

<style>
    main {
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: flex-start;
        gap: 6px;

        cursor: text;
    }

    div {
        width: 14px;
        height: 14px;
        flex-shrink: 0;

        border-radius: 5px;
        border: 1px solid var(--gray3);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        color: var(--gray8);
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0.055px;

        user-select: none;

        width: 100%;
        height: fit-content;
        word-wrap: break-word;

        outline: none;
        cursor: text;
    }

    p:empty::before {
        content: 'New todo...';
        color: var(--gray7);
    }
</style>