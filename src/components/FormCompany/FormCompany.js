/* Importing the useEffect hook from the react library. */
import { useEffect } from "react";

/* Importing the components from the antd library. */
import { Button, Form, Input, message } from "antd";

/* Importing the useHttp hook from the use-http.js file. */
import useHttp from "../../hooks/use-http";

/* Importing the Loading component from the Loading folder. */
import Loading from "../Loading/Loading";

/* Importing the css file for the component. */
import './FormCompany.css'

/* A constant that is used to initialize the form. */
const initialStateForm = { company_name: '', company_address: '', company_nic: '', company_phone: '' }

const FormCompany = ({ company, method = 'POST', handleEvent }) => {

    /* Destructuring the useHttp hook. */
    const { isLoading, error, requestData } = useHttp()

    /* Initializing the form. */
    const [form] = Form.useForm()

    /**
     * If the company object has a length greater than 0, then set the form's values to the company
     * object. Otherwise, set the form's values to the initialStateForm object
     */
    const fillForm = () => {
        if (Object.keys(company).length > 0) {
            console.log(company)
            form.setFieldsValue(company)
        } else {
            form.setFieldsValue(initialStateForm)
        }
    }

    /* This is a react hook that is used to run a function when the component is mounted. */
    useEffect(() => {
        fillForm()
    }, [])

    /**
     * It takes in a data object, checks if the status code is not 200, and if it is not, it displays
     * an error message. If the status code is 200, it displays a success message, calls the
     * handleEvent function, and resets the form
     * @param data - The data returned by the server
     * @returns the data.
     */
    const requestCompanyDataProcess = (data) => {

        /* Checking if the status code is not 200, and if it is not, it displays an error message. */
        if (data.statusCode !== 200) {
            message.error(data.message)
            return;
        }

        /* Displaying a success message. */
        message.success(data.message)

        /* A function that is passed as a prop to the FormCompany component. It is used to update the
        state of the parent component. */
        handleEvent()

        /* Used to reset the form. */
        form.resetFields()
    }

    /**
     * It takes the values from the form and sends a request to the server with the values
     * @param values - The values of the form
     */
    const requestCompany = (values) => {

        requestData({
            path: '/company',
            method: method,
            body: {
                "id": values.company_nic,
                "company_name": values.company_name,
                "company_address": values.company_address,
                "company_nic": values.company_nic,
                "company_phone": values.company_phone
            }
        }, requestCompanyDataProcess)

    }

    /**
     * It takes the values from the form and sends them to the requestCompany function
     * @param values - The values of the form
     */
    const handleCreateCompany = (values) => {
        requestCompany(values)
    }

    return (
        <>

            {isLoading && < Loading />}

            <Form
                onFinish={handleCreateCompany}
                name="control-hooks"
                form={form}
                onFinishFailed={() => { }}
                autoComplete="off"
                layout="vertical"
            >

                <Form.Item
                    label="Name Company"
                    name="company_name"
                    rules={[
                        { required: true, message: 'Please input address company' },
                        { min: 3, message: 'Please enter a name min 3 characters' }
                    ]}
                    className="input-company">
                    <Input type="text" />
                </Form.Item>

                <Form.Item
                    label="Address Company"
                    name="company_address"
                    rules={[
                        { required: true, message: 'Please input address company' },
                        { min: 3, message: 'Please enter a address min 3 characters' }
                    ]} className="input-company">
                    <Input type="text" />
                </Form.Item>

                <Form.Item
                    label="NIC Company"
                    name="company_nic"
                    rules={[
                        { required: true, message: 'Please input NIC company' },
                        { len: 10, message: 'Please NIC must be 10 characters' },
                    ]}
                    className="input-company">
                    <Input type="number" disabled={method === 'PUT'} />
                </Form.Item>

                <Form.Item
                    label="Phone Company"
                    name="company_phone"
                    rules={[
                        { required: true, message: 'Please input phone company' },
                        { len: 10, message: 'Please phone must be 10 characters' },
                    ]}
                    className="input-company">
                    <Input type="number" />
                </Form.Item>

                <div className="button-company">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}

/* Exporting the component to be used in other files. */
export default FormCompany;