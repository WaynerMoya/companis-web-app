import { useEffect, useState } from "react";



import useHttp from "../../hooks/use-http";
import { Button, Form, Input } from "antd";

import './FormCompany.css'

const initialStateForm = { company_name: '', company_address: '', company_nic: '', company_phone: '' }

const FormCompany = ({ company, method = 'POST' }) => {

    console.log(company)

    const { isLoading, error, requestData } = useHttp()

    const [message, setMessage] = useState(null)

    const [formCompanyInputValues, setFormCompanyInputValues] = useState(
        company ? company : initialStateForm)

    const requestCompanyDataProcess = (data) => {

        setMessage(data.message)

        if (data.statusCode !== 200) {
            // show error
            return;
        }

        //setFormCompanyInputValues(initialStateForm)
    }

    const requestCompany = () => {

        requestData({
            path: '/company',
            method: method,
            body: {
                "id": formCompanyInputValues.company_phone,
                "company_name": formCompanyInputValues.company_name,
                "company_address": formCompanyInputValues.company_address,
                "company_nic": formCompanyInputValues.company_nic,
                "company_phone": formCompanyInputValues.company_phone
            }
        }, requestCompanyDataProcess)

    }

    const handleCreateCompany = (e) => {

        requestCompany()
    }

    const onChangeValueInputs = (e) => setFormCompanyInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <>
            {message && <div>{message}</div>}
            <Form onFinish={handleCreateCompany} onFinishFailed={() => { }} autoComplete="off" layout="vertical">

                <Form.Item
                    label="Name Company"
                    name="company_name"
                    rules={[
                        { required: true, message: 'Please input address company' },
                        { min: 3, message: 'Please enter a name min 3 characters' }
                    ]}
                    className="input-company">
                    <Input type="text" name="company_name" defaultValue={formCompanyInputValues?.company_name} onChange={onChangeValueInputs} />
                </Form.Item>

                <Form.Item
                    label="Address Company"
                    name="company_address"
                    rules={[
                        { required: true, message: 'Please input address company' },
                        { min: 3, message: 'Please enter a address min 3 characters' }
                    ]} className="input-company">
                    <Input type="text" name="company_address" defaultValue={formCompanyInputValues?.company_address} onChange={onChangeValueInputs} />
                </Form.Item>

                <Form.Item
                    label="NIC Company"
                    name="company_nic"
                    rules={[
                        { required: true, message: 'Please input NIC company' },
                        { min: 10, message: 'Please NIC must be 10 characters' },
                        { max: 10, message: 'Please NIC must be 10 characters' },
                        //    { type: 'number', message: 'Please the characters must be numbers' }
                    ]}
                    className="input-company">
                    <Input type="number" name="company_nic" defaultValue={formCompanyInputValues?.company_nic} onChange={onChangeValueInputs} />
                </Form.Item>

                <Form.Item
                    label="Phone Company"
                    name="company_phone"
                    rules={[
                        { required: true, message: 'Please input phone company' },
                        { min: 10, message: 'Please phone must be 10 characters' },
                        { max: 10, message: 'Please phone must be 10 characters' },
                        //{ type: 'number', message: 'Please the characters must be numbers' }
                    ]}
                    className="input-company">
                    <Input type="number" name="company_phone" defaultValue={formCompanyInputValues?.company_phone} onChange={onChangeValueInputs} />
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

export default FormCompany;