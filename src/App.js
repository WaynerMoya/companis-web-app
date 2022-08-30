/* Importing the components from the other files. */
import ListCompanies from "./views/ListCompanies.js/ListCompanies";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

/**
 * It returns a div with a Header, ListCompanies, and Footer component
 * @returns The Header, ListCompanies, and Footer components are being returned.
 */
const App = () => {

  return (
    <div className="container">

      <Header />

      <ListCompanies />

      <Footer />

    </div>
  )

}


/* Exporting the App component to be used in other files. */
export default App;
