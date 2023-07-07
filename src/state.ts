import { writable, type Writable } from "svelte/store";

export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

interface State {
    currentYear: number;
    currentMonth: Month;
    eventSelected: boolean;

    zoom: number; // percentage
    days: number;
    showingSettings: boolean;
}

export let app: Writable<State> = writable({
    currentYear: 2023,
    currentMonth: 'July',
    eventSelected: false,
    zoom: 100,
    days: 5,
    showingSettings: false,
});

export const monthNames: Array<Month> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export const monthIndices = {
    January: 0,
    February: 1,
    March: 2,
    April: 3, 
    May: 4,
    June: 5, 
    July: 6, 
    August: 7, 
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};
export const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];