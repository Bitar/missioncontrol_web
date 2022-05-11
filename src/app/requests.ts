import axios from 'axios'
import Swal from 'sweetalert2'

// const API_URL = process.env.REACT_APP_MC_WEBAPP_THEME_API_URL
const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'


const deleteObject = async (link: string): Promise<void> => {

    const {isConfirmed} = await Swal.fire({
        title: 'Are you sure?',
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,

    })

    if (isConfirmed) {
        return axios.delete(`${API_URL}/${link}`).then(() => {
        })
    }

    // if (email) {
    //     Swal.fire(`Entered email: ${email}`)
    // }

    // SweetAlertOptions
    // MySwal.fire('Are you sure?','','');
}

export {deleteObject}
