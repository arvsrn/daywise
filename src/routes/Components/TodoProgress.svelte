<script lang="ts">
    export let percentage: number = 0;
</script>

<main style:margin-top="6px" style:margin-left="20px">
    <container>
        <div style:width="{percentage}%"></div>
    </container>
    <p>{percentage}% done {percentage === 100 ? '🥳' : ''}</p>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2.5px;

        width: calc(100% - 20px);
        height: fit-content;
    }
    
    container {
        width: 100%;
        height: 3px;
        
        border-radius: 5px;
        background: var(--gray4);
    }

    p {
        font-size: 10px;
        color: var(--gray7);
        user-select: none;
        line-height: 16px;
        font-family: Inter;
    }

    container > div {
        height: 100%;
        background: var(--gray7);

        border-radius: 5px;

        transition: width 0.15s var(--ease);
    }
</style>