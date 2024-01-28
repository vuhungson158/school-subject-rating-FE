import {RouterLinkButton} from "../../ui";
import {PopMode} from "../../common/enums";
import React from "react";

const AddButton = () => {
    return (
        <RouterLinkButton label="Add New" to={PopMode.ADD} fullWidth/>
    )
}

export default React.memo(AddButton);