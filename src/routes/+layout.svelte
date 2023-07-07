<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { app } from "../state";
    
    let mounted: boolean = false;
    onMount(() => mounted = true);
</script>

{#if mounted}
    <div in:fade={{ duration: 150 }}>
        <slot></slot>
    </div>
{/if}