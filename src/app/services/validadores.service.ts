import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  noCervantes(control:FormControl):{[s:string]:boolean}{
if(control.value?.toLowerCase()==='cervantes'){
return {
  noCervantes:true
}
}
return null;


  }


  passwordIguales(pass1Name:string,pass2Name:string){

    return(formGroup:FormGroup)=>{


      const pass1control= formGroup.controls[pass1Name];
      const pass2control=formGroup.controls[pass2Name];
      if (pass1control.value===pass2control.value) {
        return pass2control.setErrors(null)
        
      } else {
        return pass2control.setErrors({
          noIguales:true
        })
      }
    }

  }
}
