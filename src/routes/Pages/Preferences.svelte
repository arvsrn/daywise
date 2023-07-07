<script lang="ts">
    import { fade } from "svelte/transition";
    import { app } from "../../state";
    import ClickableChip from "../Components/ClickableChip.svelte";

    let selected: number = 0;
</script>

<main transition:fade={{ duration: 150 }}>
    <section class="sidebar">
        <div class="top">
            Preferences
            <div style:margin-left="auto">
                <ClickableChip action={() => $app.showingSettings = false}>Back</ClickableChip>
            </div>
        </div>
        <div class="options">
            <div class="option" class:selected={selected === 0} on:click={() => selected = 0}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5C5.5 3 7.16667 2.5 8 2.5C8.83333 2.5 10.5 3 10.5 5C10.5 7 8.83333 7.5 8 7.5C7.16667 7.5 5.5 7 5.5 5Z" stroke="currentColor"/>
                    <path d="M2.5 14.5C2.5 10.5 5.5 9.5 8 9.5C10.5 9.5 13.5 10.5 13.5 14.5H2.5Z" stroke="currentColor"/>
                </svg>
                Account
            </div>
            <div class="option" class:selected={selected === 1} on:click={() => selected = 1}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2C8 6.43077 3.84615 8 2 8C6.43077 8 8 12.1538 8 14C8 9.56923 12.1538 8 14 8C9.56923 8 8 3.84615 8 2Z" stroke="currentColor"/>
                </svg>
                Appearance
            </div>
            <div class="option" class:selected={selected === 2} on:click={() => selected = 2}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 3.5H3.5C2.39543 3.5 1.5 4.39543 1.5 5.5V11.5C1.5 12.6046 2.39543 13.5 3.5 13.5H12.5C13.6046 13.5 14.5 12.6046 14.5 11.5V5.5C14.5 4.39543 13.6046 3.5 12.5 3.5H11.5M4.5 3.5V1M4.5 3.5H11.5M11.5 3.5V1M3.5 5.5H12.5" stroke="currentColor"/>
                </svg>
                Calendars
            </div>
            <div class="option" class:selected={selected === 3} on:click={() => selected = 3}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 9.5C11.5 9.5 9 9.5 7 9.5C5 9.5 4.5 7.83333 4.5 7L4.5 6.5C4.5 5.83333 4.9 4.5 6.5 4.5L7.5 4.5M12.5 9.5L9.5 12.5M12.5 9.5L9.5 6.5" stroke="currentColor"/>
                </svg>
                Shortcuts
            </div>
            <div class="option" class:selected={selected === 4} on:click={() => selected = 4}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 7.5V5.5C2.5 4.94772 2.94771 4.5 3.5 4.5L5.8 4.5M2.5 7.5V11.5C2.5 12.6046 3.39543 13.5 4.5 13.5H8M2.5 7.5H13.5M13.5 7.5V11.5C13.5 12.6046 12.6046 13.5 11.5 13.5H8M13.5 7.5V5.5C13.5 4.94772 13.0523 4.5 12.5 4.5H10.2M8 4.5V13.5M8 4.5V2.29704M8 4.5L5.8 4.5M8 4.5H10.2M8 2.29704C6.9 1.19556 3.6 0.0940788 5.8 4.5M8 2.29704C9.1 1.19556 11.85 0.0940781 10.2 4.5" stroke="currentColor"/>
                </svg>
                Invite Friends
            </div>
        </div>
    </section>
    <section class="main">
        <!--TODO-->
    </section>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        position: absolute;
        left: 0px;
        top: 0px;

        background: var(--gray0);
        z-index: 100;

        display: flex;
        flex-direction: row;
    }

    section.sidebar {
        width: 240px;
        height: 100%;
        flex: none;
        border-right: 1px solid var(--gray3);

        display: flex;
        flex-direction: column;
    }

    section.sidebar > div.top {
        width: 100%;
        height: 48px;

        color: var(--gray8);
        font-family: Inter;
        font-size: 14px;
        font-weight: 600;

        display: flex;
        padding: 10px 12px;
        align-items: center;
        flex-direction: row;
        gap: 4px;
        flex-shrink: 0;
        align-self: stretch;

        border-bottom: 1px solid var(--gray3);
    }

    div.options {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        padding: 12px 4px;
        gap: 2px;
    }

    div.options > div.option {
        width: 100%;
        border-radius: 6px;

        display: flex;
        flex-direction: row;
        gap: 6px;
        align-items: center;
        padding: 8px 8px;

        font-family: Inter;
        font-size: 11px;
        color: var(--gray8);

        cursor: pointer;
        height: 28px;
    }

    div.options > div.option:hover {
        background: var(--gray3);
    }

    div.option > svg {
        color: var(--gray7);
    }

    div.option.selected {
        background: var(--gray3);
    }

    section.main {
        width: 100%;
        height: 100%;

        padding: 0px calc((100vw - 500px) / 2);
        padding-top: 64px;
    }
</style>