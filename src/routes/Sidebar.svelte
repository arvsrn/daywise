<script lang="ts">
    import SingleLine from "./Components/SingleLineInput.svelte";
    import MultiLine from "./Components/MultiLineInput.svelte";
    import ClickableChip from "./Components/ClickableChip.svelte";
    import TodoItem from "./Components/TodoItem.svelte";
    import { app, monthNames } from "../state";    
    import Tooltip from "./Components/Tooltip.svelte";
    import Menu from "./Components/Menu.svelte";
    import MenuOption from "./Components/MenuOption.svelte";
    import Calendar from "./Components/Calendar.svelte";
    import Notification from "./Components/Notification.svelte";
    import TodoProgress from "./Components/TodoProgress.svelte";
    import TodoInput from "./Components/TodoInput.svelte";

    let showingNotifications: boolean = false;
    let showingAccountSettingsMenu: boolean = false;

    // editing event state variables
    let showingColors: boolean = false;
    let showingRecurrence: boolean = false;
    let showingCalendars: boolean = false;

    let busy: boolean = true;

    export let setDay: (date: Date) => void;
</script>

<main>
    <section class="heading">
        <p>{$app.currentMonth} <span>{$app.currentYear}</span></p>
        <div class="right">
            <Tooltip tooltip="Share availability">
                <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.01194 3.50538C9.68829 3.04591 10.5435 3.03691 11.1788 3.45416C11.3231 3.5489 11.4771 3.69927 11.889 4.11116C12.3009 4.52304 12.4513 4.67711 12.546 4.82138C12.9633 5.45672 12.9543 6.31189 12.4948 6.98824C12.3899 7.14261 12.2276 7.30808 11.8006 7.73508L11.1819 8.3538C10.9867 8.54906 10.9867 8.86564 11.1819 9.0609C11.3772 9.25617 11.6938 9.25617 11.889 9.0609L12.5077 8.44218L12.5507 8.39926C12.9203 8.02973 13.1568 7.79327 13.322 7.55017C13.9972 6.5562 14.0321 5.26249 13.3819 4.27245C13.2233 4.03099 12.9922 3.79998 12.6408 3.44868L12.5961 3.40405L12.5515 3.35939C12.2002 3.00797 11.9692 2.77686 11.7277 2.61829C10.7377 1.9681 9.44398 2.00296 8.45001 2.67819C8.20691 2.84333 7.97044 3.07988 7.6009 3.44952L7.558 3.49244L6.93928 4.11116C6.74401 4.30642 6.74401 4.623 6.93928 4.81826C7.13454 5.01352 7.45112 5.01352 7.64638 4.81826L8.2651 4.19954C8.6921 3.77254 8.85757 3.61024 9.01194 3.50538ZM4.81796 7.64669C5.01322 7.45143 5.01322 7.13484 4.81796 6.93958C4.62269 6.74432 4.30611 6.74432 4.11085 6.93958L3.49213 7.5583L3.44922 7.60121C3.07957 7.97074 2.84303 8.20721 2.67788 8.45032C2.00265 9.44429 1.9678 10.738 2.61799 11.7281C2.77656 11.9695 3.00766 12.2005 3.3591 12.5518L3.40374 12.5965L3.44837 12.6411C3.79967 12.9925 4.03068 13.2237 4.27214 13.3822C5.26219 14.0324 6.55589 13.9976 7.54986 13.3223C7.79296 13.1572 8.02943 12.9206 8.39896 12.551L8.44188 12.5081L9.0606 11.8894C9.25586 11.6941 9.25586 11.3775 9.0606 11.1823C8.86533 10.987 8.54875 10.987 8.35349 11.1823L7.73477 11.801C7.30777 12.228 7.1423 12.3903 6.98794 12.4951C6.31158 12.9546 5.45642 12.9636 4.82107 12.5464C4.67681 12.4516 4.52274 12.3012 4.11085 11.8894C3.69896 11.4775 3.5486 11.3234 3.45385 11.1791C3.03661 10.5438 3.04561 9.6886 3.50507 9.01224C3.60993 8.85788 3.77224 8.69241 4.19924 8.26541L4.81796 7.64669ZM10.1217 6.58555C10.317 6.39029 10.317 6.0737 10.1217 5.87844C9.92646 5.68318 9.60988 5.68318 9.41461 5.87844L5.87908 9.41398C5.68382 9.60924 5.68382 9.92582 5.87908 10.1211C6.07434 10.3163 6.39092 10.3163 6.58619 10.1211L10.1217 6.58555Z" fill="currentColor"/>
                    </svg>                    
                </button>
            </Tooltip>
            <Tooltip tooltip="Notifications">
                <button on:click={() => showingNotifications = !showingNotifications}>
                    <!--
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75 11.4H3.5V7C3.6875 5.53333 4.85 2.6 8 2.6C11.15 2.6 12.3125 5.53333 12.5 7V11.4H10.25M5.75 11.4C5.75 12.1333 6.2 13.6 8 13.6C9.8 13.6 10.25 12.1333 10.25 11.4M5.75 11.4H10.25" stroke="currentColor"/>
                    </svg> 
                    --> 
                    
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2.6C4.85 2.6 3.6875 5.53333 3.5 7V11.4H5.75M12.5 7V11.4H10.25M5.75 11.4C5.75 12.1333 6.2 13.6 8 13.6C9.8 13.6 10.25 12.1333 10.25 11.4M5.75 11.4H10.25" stroke="currentColor"/>
                        <circle cx="11" cy="4" r="2" fill="#FF0000"/>
                    </svg>                        
                </button>
            </Tooltip>
            <div style="position:relative;display:flex;align-items:center;justify-content:center;">
                <img on:click={() => showingAccountSettingsMenu = true} src="https://pbs.twimg.com/profile_images/1673927605781688324/kykzfeEY_400x400.jpg" alt="">
                {#if showingAccountSettingsMenu}
                    <div style="position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 4px);width:160px;">
                        <Menu onClickOutside={() => showingAccountSettingsMenu = false}>
                            <MenuOption submenu>
                                Visible days
                                <div style="position:absolute;left:100%;top:0px;width:100px;" slot="submenu">
                                    <Menu>
                                        <MenuOption label="1" action={() => $app.days = 1}>1 day</MenuOption>
                                        <MenuOption label="2" action={() => $app.days = 2}>2 days</MenuOption>
                                        <MenuOption label="3" action={() => $app.days = 3}>3 days</MenuOption>
                                        <MenuOption label="4" action={() => $app.days = 4}>4 days</MenuOption>
                                        <MenuOption label="5" action={() => $app.days = 5}>5 days</MenuOption>
                                        <MenuOption label="6" action={() => $app.days = 6}>6 days</MenuOption>
                                        <MenuOption label="7" action={() => $app.days = 7}>7 days</MenuOption>
                                        <MenuOption label="8" action={() => $app.days = 8}>8 days</MenuOption>
                                        <MenuOption label="9" action={() => $app.days = 9}>9 days</MenuOption>
                                    </Menu>
                                </div>
                            </MenuOption>
                            <MenuOption submenu>
                                Zoom
                                <div style="position:absolute;left:100%;top:0px;width:100px;" slot="submenu">
                                    <Menu>
                                        <MenuOption action={() => $app.zoom = 100}>100%</MenuOption>
                                        <MenuOption action={() => $app.zoom = 150}>150%</MenuOption>
                                        <MenuOption action={() => $app.zoom = 200}>200%</MenuOption>
                                    </Menu>
                                </div>
                            </MenuOption>
                            <MenuOption label="⌘K">Command Menu</MenuOption>
                            <MenuOption label="⌘S" action={() => $app.showingSettings = true}>Preferences</MenuOption>
                            <MenuOption appearance="danger">Logout</MenuOption>
                        </Menu>
                    </div>
                {/if}
            </div>
        </div>
    </section>
    
    {#if showingNotifications}
        <Notification title="Aarav commented in Team" description="Where is this? Can someone add a link?" buttons={[{
            text: 'See',
            action: () => {},
            primary: false,
        }]}></Notification>
        <Notification title="Aarav invited you to an event" description="" buttons={[
            {
                text: 'Accept',
                action: () => {},
                primary: true,
            },
            {
                text: 'See',
                action: () => {},
                primary: false,
            }
        ]}></Notification>
        <Notification title="No notifications 🍃" description="" buttons={[]}></Notification>
    {:else if !$app.eventSelected}
        <section>
            <Calendar {setDay}></Calendar>
        </section>
        <section>
            <p>Today's Tasks</p>
            <TodoItem>Meet with <i>Alex Vance</i> to <b>discuss</b> project proposal.</TodoItem>
            <TodoItem>Send out marketing emails.</TodoItem>
            <TodoItem checked>Research new marketing strategies.</TodoItem>
            <TodoItem checked>Plan a team-building event for next month, i.e. August.</TodoItem>
            <TodoProgress percentage={50}></TodoProgress>
        </section>
    {:else}
        <section style="flex-direction:row;align-items:center;">
            <p>1:30PM</p>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="var(--gray7)" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            <p>2:30PM</p>

            <p style="margin-left:auto;color:var(--gray7)">2 hours</p>
        </section>
        <section>
            <SingleLine placeholder="Name"></SingleLine>
            <MultiLine placeholder="Description"></MultiLine>
            <SingleLine placeholder="Location or call"></SingleLine>
        </section>
        <section>
            <div class="settings-row">
                <p>Color</p>
                <div style="position:relative;height:fit-content;width:fit-content;z-index:5;">
                    <ClickableChip action={() => showingColors = true}>
                        <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="3.5" cy="4" r="3.5" fill="#FD7941"/>
                        </svg>
                        Orange
                    </ClickableChip>

                    {#if showingColors}
                        <div style="position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 4px);width:150px">
                            <Menu onClickOutside={() => showingColors = false} appearance="light">
                                {#each ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Gray'] as color}
                                    <MenuOption>
                                        <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="4" r="3.5" fill="var(--{color.toLowerCase()})"/>
                                        </svg>
                                        {color}
                                    </MenuOption>
                                {/each}
                            </Menu>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="settings-row">
                <p>Availability</p>
                <ClickableChip action={() => busy = !busy}>{busy ? 'Busy' : 'Free'}</ClickableChip>
            </div>
            <div class="settings-row">
                <p>Recurrence</p>
                <div style="position:relative;height:fit-content;width:fit-content;z-index:3;">
                    <ClickableChip action={() => showingRecurrence = true}>
                        Never
                    </ClickableChip>

                    {#if showingRecurrence}
                        <div style="position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 4px);width:150px">
                            <Menu onClickOutside={() => showingRecurrence = false} appearance="light">
                                <MenuOption>Every day</MenuOption>
                                <MenuOption>Every weekday</MenuOption>
                                <MenuOption>Every weekend</MenuOption>
                                <MenuOption>Every Thursday</MenuOption>
                                <MenuOption>Every month on 11th</MenuOption>
                                <MenuOption>Every year on 6/11</MenuOption>
                            </Menu>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="settings-row">
                <p>Calendar</p>
                <div style="position:relative;height:fit-content;width:fit-content;z-index:2;">
                    <ClickableChip action={() => showingCalendars = true}>
                        <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="3.5" cy="4" r="3.5" fill="var(--purple)"/>
                        </svg>
                        Work
                    </ClickableChip>

                    {#if showingCalendars}
                        <div style="position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 4px);width:150px">
                            <Menu onClickOutside={() => showingCalendars = false} appearance="light">
                                <MenuOption>
                                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3.5" cy="4" r="3.5" fill="var(--green)"/>
                                    </svg>
                                    Life
                                </MenuOption>
                                <MenuOption>
                                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3.5" cy="4" r="3.5" fill="var(--blue)"/>
                                    </svg>
                                    Among Us
                                </MenuOption>
                                <MenuOption>
                                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3.5" cy="4" r="3.5" fill="var(--gray)"/>
                                    </svg>
                                    Team
                                </MenuOption>
                            </Menu>
                        </div>
                    {/if}
                </div>
            </div>
        </section>
        <section>
            <p>Tasks for this event</p>
            <TodoItem>Meet with Alex Vance to discuss project proposal.</TodoItem>
            <TodoInput></TodoInput>
        </section>
    {/if}
</main>

<style>
    main {
        display: flex;
        width: 240px;
        height: 100vh;
        flex-direction: column;
        align-items: flex-start;
        flex-shrink: 0;

        border-right: 1px solid var(--gray3);
        background: var(--gray0);

        overflow: visible;
    }

    section.heading {
        display: flex;
        height: 48px;
        width: 100%;
        padding: 10px 12px;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        align-self: stretch;

        border-bottom: 1px solid var(--gray3);
        z-index: 6;
    }

    section.heading > p {
        color: var(--gray8);
        font-size: 14px;
        font-family: Inter;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    section.heading > p > span {
        font-weight: normal;
        color: var(--gray7);
    }

    section:not(.heading) {
        display: flex;
        padding: 16px 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;

        border-bottom: 1px solid var(--gray3);
    }

    section:not(.heading) > p {
        color: var(--gray8);
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.055px;
    }

    img {
        width: 20px;
        height: 20px;
        border-radius: 10px;

        user-select: none;
        margin: 0px 4px;
        cursor: pointer;
    }

    div.right {
        margin-left: auto;

        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        align-self: stretch;
    }

    div.settings-row {
        display: flex;
        padding: 0px;
        align-items: center;
        gap: 6px;
        align-self: stretch;
    }

    div.settings-row > p {
        color: var(--gray7);
        width: 100%;
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0.055px;
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
</style>