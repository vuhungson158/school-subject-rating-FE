import {PopMode} from "../../../constant/featureLabel";
import {RouterLinkButton} from "../../../commonUI/Button";

export const SubjectAddButton = () => {
    return <RouterLinkButton label="Add New" to={PopMode.ADD} fullWidth/>
}

export const SubjectAddPopup = () => {
    return <></>
}