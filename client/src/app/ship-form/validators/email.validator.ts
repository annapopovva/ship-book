import { AbstractControl } from "@angular/forms";

export function ValidateEmail(control: AbstractControl) {
    if(control.value.includes('@icb.bg') || control.value.includes('@gmail.com') || control.value.includes('@hotmail.com')) {
        return null
    }
    return { invalidEmail: true }
}