<script lang="ts">
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    onMount(() => window.location.assign('/'));
</script>