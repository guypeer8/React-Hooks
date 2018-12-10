import { useState } from 'react';

export function useFormInput(initialInput = '') {
    const [value, setValue] = useState(initialInput);

    return {
        value,
        setValue,
        onChange(e) {
            setValue(e.target.value);
        },
    };
}
