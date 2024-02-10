import Swal from "sweetalert2";
import successIcon from '../images/RESIZEDnavbaricon.jpg';
import errorIcon from '../images/RESIZEDErrorlog.jpg';


export function SwalFireSuccess(title, text){
    return (Swal.fire({
        title: `${title}`,
        text: `${text}`,
        imageUrl: successIcon,
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: "Custom image",
        background: "#ffc800",
        customClass: {
            image: 'swalImage shadow-lg'
        }
    }))
}

export function SwalFireError(title, text){
    return (Swal.fire({
        title: `${title}`,
        text: `${text}'`,
        imageUrl: errorIcon,
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: "Custom image",
        background: "#ffc800",
        customClass: {
            image: 'swalImageError shadow-lg'
        }
    }))
}