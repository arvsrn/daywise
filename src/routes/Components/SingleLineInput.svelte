<script lang="ts">
    export let placeholder: string = "";
</script>

<input type="text" {placeholder}>

<style>
    input[type="text"] {
        height: 32px;
        width: 100%;
        
        padding: 10px;

        border-radius: 6px;
        border: 1px solid var(--gray3);

        outline: none;
        background: none;
        
        transition: background 0.15s var(--ease);

        color: var(--gray7);
        font-size: 12px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;

        cursor: default;
    }

    input[type="text"]:hover, input[type="text"]:focus {
        background: var(--gray3);
    }

    input[type="text"]::placeholder {
        color: var(--gray6);
    }
</style>