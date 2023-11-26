import Swal from "sweetalert2";

export function SwalFireSuccess(title, text){
    return (Swal.fire({
        title: `${title}`,
        text: `${text}`,
        imageUrl: "https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is",
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
        imageUrl: "https://drive.google.com/uc?id=1np1kEmk_C5Mn6c64uvWPak8OcfIzhS7I",
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: "Custom image",
        background: "#ffc800",
        customClass: {
            image: 'swalImageError shadow-lg'
        }
    }))
}