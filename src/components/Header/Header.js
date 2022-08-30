
/* Importing the logo image from the assets folder. */
import LogoLiteThinking from '../../assets/logo/logo-lite-thinking.png'

/* Importing the CSS file for the Header component. */
import './Header.css'

/**
 * It returns a header element with an image element inside of it
 * @returns A header with an image of the logo.
 */
const Header = () => {
    return (
        /* Creating a header element with an image element inside of it. */
        <header className="header">
            <img src={LogoLiteThinking} alt="lite-thinking-logo" />
        </header>
    )
}

/* Exporting the Header component so that it can be used in other files. */
export default Header;