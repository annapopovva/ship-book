import { AbstractControl } from "@angular/forms";

export function ValidateImo(control: AbstractControl) {
    if(control.value.match("^IMO <\\d{7}>$") || control.value.match("^imo <\\d{7}>$") || control.value.match("^IMO<\\d{7}>$") ||
    control.value.match("^Imo<\\d{7}>$") || control.value.match("^<\\d{7}>$")) {
        return null
    }
    return { invalidImo: true }
}