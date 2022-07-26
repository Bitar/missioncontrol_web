const updateData = (fieldsToUpdate: Partial<any>, setFunction: any, model: any) => {
    const updatedData = {...model, ...fieldsToUpdate};
    setFunction(updatedData);
};

const submitForm = async (fun: any, model: any, to: any, id?: any) => {
    try {
        if (id) {
            await fun(id, model);
        } else {
            await fun(model);
        }

        to();
    } catch (ex) {
        // TODO: Return Error and handle Error Ness.
        console.error(ex);
    }
};


export {updateData, submitForm};