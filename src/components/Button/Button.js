
/**
 * It's a function that takes in a bunch of props, and returns a button with the props passed in
 * @returns A button with the children, type, and className props.
 */
const Button = ({
    /* It's destructuring the props that are passed into the Button component. */
    children,
    type,
    className,
    ...rest
}) => {

    return (
        <div className="custom-button">
            <button
                type={type}
                className={className}
                {...rest}
            >
                {children}
            </button>
        </div>
    )
}

/* It's exporting the Button component so that it can be imported into other files. */
export default Button;