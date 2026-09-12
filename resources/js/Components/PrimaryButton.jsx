export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-xl border border-transparent bg-brand px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-brand/20 transition duration-150 ease-in-out hover:bg-brand-hover focus:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:bg-brand-hover ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
