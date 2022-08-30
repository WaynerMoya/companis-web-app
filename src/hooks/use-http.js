/* Importing the useState hook from the react library. */
import { useState } from "react"

/* Importing the companyApi object from the companyApi.js file. */
import { companyApi } from "../api/companyApi"

/**
 * It's a function that returns an object with three properties: isLoading, error, and requestData
 */
const useHttp = () => {

    /* variable to control the status of requests */
    const [isLoading, setIsLoading] = useState('')

    /* variable to control the message error of request */
    const [error, setError] = useState(null)

    /**
     * It takes a config object and a function as arguments, and then makes a request to the API using
     * the config object, and then applies the data to the function
     * @param config - This is an object that contains the following properties:
     * @param applyData - This is a function that will be called with the data that is returned from
     * the API.
     */
    const requestData = async (config, applyData) => {

        /* It's setting the isLoading state to true. */
        setIsLoading(true)

        /* It's setting the error state to null. */
        setError(null)

        try {

            var myHeaders = new Headers();

            /* It's making a request to the API using the config object. */
            const response = await fetch(process.env.REACT_APP_API_URL + config.path, {
                method: config.method ? config.method : 'GET',
                headers: config.headers ? config.headers : myHeaders,
                body: config.body ? JSON.stringify(config.body) : null
            })

            /* It's converting the response to JSON. */
            const data = await response.json()

            /* It's calling the companyApi object with the config.method property, and then passing the
            config.path property to the method. */
            // const { data } = await companyApi[config.method](config.path)

            /* It's setting the isLoading state to false. */
            setIsLoading(false)

            /* It's calling the applyData function with the data that is returned from the API. */
            applyData(data)

        } catch (e) {

            /* It's setting the error state to the error message that is returned from the API, or if
            there is no error message, it's setting the error state to 'Something wrong'. */
            setError(e || 'Something wrong')
        }
    }

    /* It's returning an object with three properties: isLoading, error, and requestData. */
    return {
        isLoading,
        error,
        requestData
    }
}

/* Exporting the useHttp function. */
export default useHttp