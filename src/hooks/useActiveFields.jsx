import { useState } from "react";

const useActiveFields = (initialState) => {
    const [activeFields, setActiveFields] = useState(initialState);

    const onActivation  = (form) => {
        const fields = Object.keys(form);
        
        const copyActiveFields = {...activeFields};
        fields.map(field => {
            copyActiveFields[field] = (form[field] !== "");
        })

        setActiveFields(copyActiveFields);
    }

    return [activeFields, onActivation];
}

export default useActiveFields;