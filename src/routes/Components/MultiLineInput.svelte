<script lang="ts">
    export let placeholder: string = "";
    let self: HTMLElement;

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

<div contenteditable bind:this={self} {placeholder} on:keydown={event => {
    for (const [a, b, c] of triplets) {
        const selection = window.getSelection();
        if (!selection) return;
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(self);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        let selectionStart = preCaretRange.toString().length;
        if (!selectionStart) return;
        console.log('us');
        
        if (event.key === b && self.innerText[selectionStart - 1] === a) {
            event.preventDefault();
            self.innerText = setCharAt(self.innerText, selectionStart - 1, c);
            self.innerText.slice(selectionStart, 1);

            let range = document.createRange();
            let sel = window.getSelection();

            if (!sel) return;
            
            range.setStart(self.childNodes[0], selectionStart);
            range.collapse(true);
            
            sel.removeAllRanges()
            sel.addRange(range)

            break;
        }
    }
}} />

<style>
    div {
        width: 100%;
        
        padding: 7px 10px;

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

        height: fit-content;
        min-height: 32px;

        resize: none;
    }

    div:hover, div:focus {
        background: var(--gray3);
    }

    div::placeholder {
        color: var(--gray7);
    }

    div:empty::before {
        color: var(--gray7);
        content: attr(placeholder);
    }
</style>