import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, dir, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const isLtrType = ['email', 'password', 'url', 'tel'].includes(type);
    const resolvedDir = dir || (isLtrType ? 'ltr' : undefined);

    return (
        <input
            {...props}
            type={type}
            dir={resolvedDir}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                (isLtrType ? 'ltr-content text-start ' : 'text-start ') +
                className
            }
            ref={localRef}
        />
    );
});
