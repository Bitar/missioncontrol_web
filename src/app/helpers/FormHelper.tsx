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
    } catch (ex) {
        console.error(ex);
    } finally {
        to();
    }
};


export {updateData, submitForm};