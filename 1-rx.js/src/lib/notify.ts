import Swal from "sweetalert2";
type SwalIcons = 'success' | 'error' | 'warning' | 'info' | 'question';


export function notifyUser(title: string, message: string, icon: SwalIcons) : void {
    if(!message || !title) { return; }
    if(!icon) { icon = 'question'; }

    Swal.fire({ title: title, text: message, icon: icon, showConfirmButton: false, toast: true, timer: 1200, position: 'bottom'});
}