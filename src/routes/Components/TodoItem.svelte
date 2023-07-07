<script lang="ts">
    export let checked: boolean = false;
</script>

<main class:checked={checked}>
    <div on:click={() => checked = !checked}>
        {#if checked}
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.4905 4.63529L5.25 8.87579L2.7345 6.36029L3.2655 5.83004L5.25 7.81454L8.96025 4.10504L9.4905 4.63529Z" fill="#A0A0A0"/>
            </svg>
        {/if}
    </div>
    <p on:click={() => checked = !checked}>
        <slot></slot>
    </p>
</main>

<style>
    main {
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: flex-start;
        gap: 6px;
    }

    div {
        width: 14px;
        height: 14px;
        flex-shrink: 0;

        border-radius: 5px;
        border: 1px solid var(--gray3);

        cursor: pointer;

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
    }

    main.checked > div {
        border: 1px solid var(--gray4);
        background: var(--gray3);
    }

    main.checked > p {
        color: var(--gray7);
        text-decoration: line-through;
    }
</style>