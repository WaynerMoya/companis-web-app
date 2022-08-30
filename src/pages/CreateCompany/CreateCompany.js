
import { useState } from "react";
import ModalCompany from "../../components/Modal/ModalCompany";
import Button from "../../components/Button/Button";
import FormCompany from "../../components/FormCompany/FormCompany";

const CreateCompany = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <div className="create-company">
            {/** 
            <FormCompany />
            */}
            <Button type="button" onClick={showModal}> Create </Button>

            <ModalCompany isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} title="Create Company" >
                <FormCompany company={{}} />
            </ModalCompany>
        </div>
    )

}

export default CreateCompany;