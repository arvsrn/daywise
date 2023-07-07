<script lang="ts">
    import { app } from "../state";
    import SingleLine from "./Components/SingleLineInput.svelte";
    import Preferences from "./Pages/Preferences.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Timezones from "./Timezones.svelte";
    import ViewportContainer from "./ViewportContainer.svelte";

    let scroll: number;
    let setDay: (date: Date) => void;
</script>

<main>
    <Sidebar {setDay}></Sidebar>
    <Timezones bind:scroll={scroll}></Timezones>
    <ViewportContainer bind:setDay={setDay} bind:scroll={scroll}></ViewportContainer>
</main>

{#if $app.showingSettings}
    <Preferences></Preferences>
{/if}

<style>
    main {
        display: flex;
        width: 100vw;
        height: 100vh;
        align-items: flex-start;
        flex-shrink: 0;
    }
</style>