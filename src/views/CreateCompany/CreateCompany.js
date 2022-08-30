
/* Importing the useState hook from the react library. */
import { useState } from "react";

/* Importing the Button component from the antd library. */
import { Button } from "antd";

/* Importing the ModalCompany and FormCompany components from the components folder. */
import ModalCompany from "../../components/Modal/ModalCompany";
import FormCompany from "../../components/FormCompany/FormCompany";

const CreateCompany = ({ getCompanies }) => {

    /* Creating a state variable called isModalVisible and setting it to false. */
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    /**
     * When the modal is closed, the modal is set to invisible and the companies are fetched again
     */
    const handleClose = () => {
        setIsModalVisible(false)
        getCompanies()
    }

    return (
        <div className="create-company">

            <Button
                htmlType="button"
                type="primary"
                onClick={showModal}
            >
                Create Company
            </Button>

            <ModalCompany
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                title="Create Company"
            >
                <FormCompany
                    company={{}}
                    handleEvent={handleClose}
                />
            </ModalCompany>
        </div>
    )

}

/* Exporting the CreateCompany component. */
export default CreateCompany;