export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-start text-sm text-red-600 ' + className}
        >
            {message}
        </p>
    ) : null;
}
