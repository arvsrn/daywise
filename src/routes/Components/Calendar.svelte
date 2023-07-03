<script lang="ts">
    export let setDay: (to: Date) => void;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
    };

    $: currentMonth, onCurrentMonthUpdate();
</script>

<div class="calendar-container">
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
                    <div class="label" on:click={() => setDay(new Date(currentYear, currentMonth, 7 * i + j + 1))}>{7 * i + j + 1}</div>
                {/each}
            {:else}
                {#each [...Array(7).keys()] as _, j}
                    {#if ((7 * (i - 1)) + (7 - offset) + j + 1) <= monthDays[currentMonth]}
                        <div class="label" on:click={() => setDay(new Date(currentYear, currentMonth, (7 * (i - 1)) + (7 - offset) + j + 1))}>{(7 * (i - 1)) + (7 - offset) + j + 1}</div>
                    {:else}
                        <div class="label dark" on:click={() => currentMonth += 1}>{(7 * i + j + 1) - monthDays[currentMonth]}</div>
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
        color: var(--gray7);

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
        font-weight: 600;
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
        outline: none;
        border: none;
        border-radius: 4px;

        width: 20px;
        height: 20px;

        background: transparent;
        cursor: pointer;
        color: var(--gray6);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        background: var(--gray3);
    }
</style>