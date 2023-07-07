<script lang="ts">
    import { app, monthDays, monthIndices, monthNames, type Month } from "../../state";
    import ClickableChip from "./ClickableChip.svelte";

    export let setDay: (to: Date) => void;

    let currentYear: number = 2023;    
    let currentMonth: number = new Date().getMonth();
    let monthsOfTheYear: Array<Array<boolean>> = [];

    for (const days of monthDays) {
        monthsOfTheYear.push([]);

        for (let i = 0; i < days; i++) 
            monthsOfTheYear[monthsOfTheYear.length - 1].push(false);
    }
    
    let offset = 2;

    const onCurrentMonthUpdate = () => {
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }

        offset = new Date(currentYear, currentMonth, 1).getDay();
        $app.currentMonth = monthNames[currentMonth];
        $app.currentYear = currentYear;
    };

    $: currentMonth, onCurrentMonthUpdate();
    app.subscribe(u => currentMonth = monthIndices[u.currentMonth]);
</script>

<div class="calendar-container">
    <div class="row">
        <p></p>
        <button on:click={() => setDay(new Date())}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 6.5C4.5 6.5 7 6.5 9 6.5C11 6.5 11.5 8.16667 11.5 9V9.5C11.5 10.1667 11.1 11.5 9.5 11.5H8.5M3.5 6.5L6.5 3.5M3.5 6.5L6.5 9.5" stroke="currentColor"/>
            </svg>        
        </button>
        <button on:click={() => {
            currentMonth -= 1;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear -= 1;
            }
        }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 5.5L6.5 8.5L9.5 11.5" stroke="currentColor"/>
            </svg>        
        </button>
        <button on:click={() => {
            currentMonth += 1;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear += 1;
            }
        }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 10.5L9.5 7.5L6.5 4.5" stroke="currentColor"/>
            </svg>        
        </button>
    </div>
    <main>
        <div class="row">
            <div class="label dark static">Su</div>
            <div class="label dark static">Mo</div>
            <div class="label dark static">Tu</div>
            <div class="label dark static">We</div>
            <div class="label dark static">Th</div>
            <div class="label dark static">Fr</div>
            <div class="label dark static">Sa</div>
        </div>
        {#each [...Array(Math.ceil(monthDays[currentMonth]/7) + 1).keys()] as _, i}
        <div class="row">
            {#if i == 0 && offset} 
                {#each [...Array(offset).keys()] as _, x}
                    <div class="label dark" on:click={() => currentMonth -= 1}>{31 - offset + x}</div>
                {/each}
                {#each [...Array(7-offset).keys()] as _, j}
                {@const currentDay = new Date()}
                <div class="label" on:click={() => setDay(new Date(currentYear, currentMonth, 7 * i + j + 1))}>
                        {#if (7 * i + j + 1) == currentDay.getDate() && currentMonth == currentDay.getMonth()}
                            <ClickableChip>{7 * i + j + 1}</ClickableChip>
                        {:else}
                            {7 * i + j + 1}    
                        {/if}
                    </div>
                {/each}
            {:else}
                {#each [...Array(7).keys()] as _, j}
                    {@const currentDay = new Date()}
                    {#if ((7 * (i - 1)) + (7 - offset) + j + 1) <= monthDays[currentMonth]}
                        <div class="label" on:click={() => setDay(new Date(currentYear, currentMonth, (7 * (i - 1)) + (7 - offset) + j + 1))}>
                            {#if ((7 * (i - 1)) + (7 - offset) + j + 1) == currentDay.getDate() && currentMonth == currentDay.getMonth()}
                                <ClickableChip>{(7 * (i - 1)) + (7 - offset) + j + 1}</ClickableChip>
                            {:else}
                                {(7 * (i - 1)) + (7 - offset) + j + 1}
                            {/if}
                            
                        </div>
                    {:else}
                        <div class="label dark" on:click={() => currentMonth += 1}>{((7 * (i - 1)) + (7 - offset) + j + 1) - monthDays[currentMonth]}</div>
                    {/if}
                {/each}
            {/if}
        </div>
        {/each}
    </main>
</div>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 3px;
        width: 100%;
        height: fit-content;
    }

    div.row {
        display: flex;
        flex-direction: row;
        gap: 2px;
    }

    div.label {
        width: 100%;
        aspect-ratio: 1/1;

        font-size: 11px;
        font-family: Menlo;
        font-weight: 400;
        color: var(--gray8);

        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border-radius: 6px;
    }

    div.label.dark {
        color: var(--gray6);
    }

    div.label.static {
        cursor: default;
        color: var(--gray6);
    }

    div.label:not(.static):hover {
        background: var(--gray3);
    }

    div.label:not(.static).active {
        background: rgba(255, 255, 255, 0.1);
        width: calc(100%);
        font-weight: bold;
    }

    div.calendar-container {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    button {
        display: flex;
        width: 20px;
        height: 20px;
        justify-content: center;
        align-items: center;
        gap: 10px;

        border-radius: 6px;
        background: none;
        border: none;
        outline: none;
        color: var(--gray7);
        
        transition: background 0.15s var(--ease),
            color 0.15s var(--ease);
    }

    button:hover {
        color: var(--gray8);
        background: var(--gray3);
    }

    p {
        font-size: 11px;
        font-weight: normal;
        line-height: 16px;
        color: var(--gray8);
        font-family: Inter;

        margin-right: auto;
        margin-left: 8px;
    }
</style>