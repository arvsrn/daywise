<script lang="ts">
    export let placeholder: string = "";
    let self: HTMLInputElement;

    // if the first and second characters are typed in a row,
    // the two characters are replaced by the third character
    export let triplets = [
        ['-', '-', '—'],
        ['-', '>', '→'],
        ['<', '-', '←'],
        ['!', '=', '≠'],
    ];

    // replace a character at `index` in a string `str`
    const setCharAt = (str: string, index: number, chr: string): string => {
        if(index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    };
</script>

<input bind:this={self} type="text" {placeholder} on:keydown={event => {
    if (!self.selectionStart) return;
    
    for (const [a, b, c] of triplets) {
        if (event.key === b && self.value[self.selectionStart - 1] === a) {
            event.preventDefault();
            self.value = setCharAt(self.value, self.selectionStart - 1, c);
            self.value.slice(self.selectionStart, 1);

            break;
        }
    }
}}>

<style>
    input[type="text"] {
        height: 32px;
        width: 100%;
        
        padding: 10px;

        border-radius: 6px;
        border: 1px solid var(--gray3);

        outline: none;
        background: none;
        
        transition: background 0.15s var(--ease);

        color: var(--gray8);
        font-size: 12px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;

        cursor: default;
    }

    input[type="text"]:hover, input[type="text"]:focus {
        background: var(--gray3);
    }

    input[type="text"]::placeholder {
        color: var(--gray7);
    }
</style>