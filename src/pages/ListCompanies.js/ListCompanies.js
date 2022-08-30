import { Table } from "antd";
import { useEffect, useState } from "react";
import FormCompany from "../../components/FormCompany/FormCompany";
import ModalCompany from "../../components/Modal/ModalCompany";
import useHttp from "../../hooks/use-http";
import CreateCompany from "../CreateCompany/CreateCompany";

import './ListCompanies.css'

const ListCompanies = () => {

    const { isLoading, error, requestData } = useHttp()

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [companySelected, setCompanySelected] = useState(null)

    const [companies, setCompanies] = useState([])

    const handleEdit = (company) => {
        setIsModalVisible(true);
        setCompanySelected(company)
    }


    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'action',
            key: 'action',
            render: (_, company) => (
                <>
                    <button onClick={() => handleEdit(company)}>Edit</button>
                    <button onClick={() => handleDelete(company.id)}>Delete</button>
                </>
            )
        }
    ];


    const getCompaniesProcess = (data) => {
        setCompanies(data ? data.companies?.Items : [])
    }

    const requestGetCompanies = () => {
        requestData({ path: '/companies', method: 'get' }, getCompaniesProcess)
    }

    const deleteCompanyDataProcess = (data) => {

        if (data.statusCode !== 200) {
            // process and show message error
            return;
        }

        requestGetCompanies();
    }

    const handleDelete = (id) => {
        requestData({
            path: '/company',
            method: 'DELETE',
            body: {
                id: id
            }
        }, deleteCompanyDataProcess)
    }

    useEffect(() => {

        requestGetCompanies()

    }, [])

    return (
        <div className="list-companies">

            <div className="create-company-component">
                < CreateCompany />
            </div>

            <Table columns={columns} dataSource={companies} />

            {
                companySelected && (
                    <ModalCompany isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} title="Edit Company" >
                        <FormCompany company={companySelected} method='PUT' />
                    </ModalCompany>
                )
            }

        </div>
    )

}

export default ListCompanies;