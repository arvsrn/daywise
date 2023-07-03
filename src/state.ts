import { writable, type Writable } from "svelte/store";

interface State {
    currentYear: number;
    currentMonth: string;
    eventSelected: boolean;

    zoom: number; // percentage
    days: number;
}

export let app: Writable<State> = writable({
    currentYear: 2023,
    currentMonth: 'July',
    eventSelected: false,
    zoom: 100,
    days: 5,
});