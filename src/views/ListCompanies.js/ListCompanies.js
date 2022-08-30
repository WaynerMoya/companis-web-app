/* Importing the useEffect and useState hooks from the react library. */
import { useEffect, useState } from "react";

/* Importing the Button, Space and Table components from the antd library. */
import { Button, Space, Table, message } from "antd";

/* Importing the components from the components folder. */
import FormCompany from "../../components/FormCompany/FormCompany";
import Loading from "../../components/Loading/Loading";
import ModalCompany from "../../components/Modal/ModalCompany";
import useHttp from "../../hooks/use-http";
import CreateCompany from "../CreateCompany/CreateCompany";

/* Importing the css file for the component. */
import './ListCompanies.css'

const ListCompanies = () => {

    /* Destructuring the useHttp hook. */
    const { isLoading, error, requestData } = useHttp()

    /* A state variable that is used to control the visibility of the modal. */
    const [isModalVisible, setIsModalVisible] = useState(false);

    /* A state variable that is used to control the visibility of the modal. */
    const [companySelected, setCompanySelected] = useState(null)

    /* A state variable that is used to store the companies. */
    const [companies, setCompanies] = useState([])

    const handleEdit = (company) => {
        setIsModalVisible(true);
        setCompanySelected(company)
    }

    /* This is the columns of the table. */
    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'company_name',
            key: 'company_name',
        },
        {
            title: 'Company Phone',
            dataIndex: 'company_phone',
            key: 'company_phone',
        },
        {
            title: 'Company NIC',
            dataIndex: 'company_nic',
            key: 'company_nic',
        },
        {
            title: 'Company Address',
            dataIndex: 'company_address',
            key: 'company_address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, company) => (
                <Space>
                    <Button htmlType="button" type="primary" onClick={() => handleEdit(company)}>Edit</Button>
                    <Button htmlType="button" type="primary" danger onClick={() => handleDelete(company.id)}>Delete</Button>
                </Space>
            )
        }
    ];

    /**
     * It sets the companies state to the data returned from the API.
     * @param data - The response from the API call.
     */
    const getCompaniesProcess = (data) => {
        setCompanies(data ? data.companies?.Items : [])
    }

    /**
     * It's a function that makes a request to the server for a list of companies, and then calls the
     * function `getCompaniesProcess` to process the response
     */
    const requestGetCompanies = () => {
        requestData({ path: '/companies', method: 'get' }, getCompaniesProcess)
    }

    /**
     * It takes the data returned from the server and checks if the status code is 200. If it is, it
     * displays a success message and calls the requestGetCompanies function. If it isn't, it displays
     * an error message
     * @param data - The data returned from the server.
     * @returns The data is being returned from the server.
     */
    const deleteCompanyDataProcess = (data) => {

        /* It's checking if the status code is 200. If it is, it displays a success message and calls
        the requestGetCompanies function. If it isn't, it displays an error message */
        if (data.statusCode !== 200) {
            message.error(data.message)
            return;
        }

        /* It's displaying a success message. */
        message.success(data.message)

        /* It's calling the requestGetCompanies function. */
        requestGetCompanies();
    }

    /**
     * It takes an id, and then sends a request to the server to delete the company with that id
     * @param id - the id of the company to be deleted
     */
    const handleDelete = (id) => {
        requestData({
            path: '/company',
            method: 'DELETE',
            body: {
                id: id
            }
        }, deleteCompanyDataProcess)
    }

    /**
     * It sets the state of the modal to false, and then calls the requestGetCompanies function
     */
    const handleClose = () => {
        setIsModalVisible(false)
        setCompanySelected(null)
        requestGetCompanies()
    }

    /* It's a hook that is called when the component is mounted. */
    useEffect(() => {
        requestGetCompanies()
    }, [])

    return (
        <div className="container-company">
            <div className="list-companies">

                <div className="create-company-component">
                    < CreateCompany getCompanies={requestGetCompanies} />
                </div>

                <Table columns={columns} dataSource={companies} pagination={{ pageSize: 5 }} />

                {
                    companySelected && isModalVisible && (
                        <ModalCompany isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} title="Edit Company" >
                            <FormCompany company={companySelected} method='PUT' handleEvent={handleClose} />
                        </ModalCompany>
                    )
                }

                {isLoading && <Loading />}

            </div>
        </div>
    )

}

/* It's exporting the component. */
export default ListCompanies;