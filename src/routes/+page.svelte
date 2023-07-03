<script lang="ts">
    import SingleLine from "./Components/SingleLineInput.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Timezones from "./Timezones.svelte";
    import ViewportContainer from "./ViewportContainer.svelte";

    let scroll: number;
</script>

<main>
    <Sidebar></Sidebar>
    <Timezones bind:scroll={scroll}></Timezones>
    <ViewportContainer bind:scroll={scroll}></ViewportContainer>
</main>

<style>
    main {
        display: flex;
        width: 100vw;
        height: 100vh;
        align-items: flex-start;
        flex-shrink: 0;
    }
</style>