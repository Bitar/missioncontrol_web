import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";

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

        toast.success('Successful')
        to();
    } catch (exception) {
        if (axios.isAxiosError(exception)) {
            if (exception.response?.status == 422) {
                let validation_errors = exception.response?.data.error.validation
                // console.log(exception.response?.data.error.validation)

                toast.error('Validation Error')
            }
            console.log(exception.response?.status)
            // Access to config, request, and response
        } else {
            console.log(exception)
            // Just a stock error
        }


        // TODO: Return Error and handle Error Ness.
    }
}

export {updateData, submitForm};