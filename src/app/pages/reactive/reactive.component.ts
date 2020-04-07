import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {



  form: FormGroup;


  constructor(private fb: FormBuilder, private validadores:ValidadoresService) {
    this.createForm();
  /*   this.loadForm(); */
  }

  ngOnInit(): void {
  }



// this get is for return the array of pasatiempos
get pasatiemposArray()
{
  return this.form.get('pasatiempos') as FormArray;
}

  get nombreValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched
  }
  get apellidoValido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched
  }
  get correoValido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched
  }
  get distritoValido() {
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched
  }
  get ciudadValido() {
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched
  }

  get pass1valido(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched
  }
  get pass2valido(){
    
    const pass1=this.form.get('pass1').value;
    const pass2=this.form.get('pass2').value;

return (pass1===pass2)?false:true;
  }
  createForm() {
    this.form = this.fb.group({

      //array 1-default value 2-syncro 3-async
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5),this.validadores.noCervantes]],
      correo: ['ecemo@hotmail.com', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass1:['',Validators.required],
      pass2:['',Validators.required],
      direccion: this.fb.group(
        {
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required]

        }
      ),
      pasatiempos:this.fb.array([])
    }, {
        validators:this.validadores.passwordIguales('pass1','pass2')
      
    });
  }



  loadForm() {
    this.form.setValue({
      nombre: "",
      apellido: "",
      correo: "ecemo@hotmail.com",
      direccion: {
        distrito: "",
        ciudad: "",
      },
    },
     
      
      
      )
  }

  //after submit
  guardar() {
    console.log(this.form);
    if (this.form.invalid) {

      return Object.values(this.form.controls).forEach(control => {
        // sirve ara verificar si hay hijos en este formgroup
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());

        }

        else {
          control.markAsTouched();
        }

      });
    }



    //porteo

    this.form.reset();
  }


//se agrega el elemento en el arreglo de pasatiempos
  agregarPasatiempo(){
    this.pasatiemposArray.push(this.fb.control(''));
  }
// se borra elemento deacuerdo al indice
  borrarElemento(i:number){

    this.pasatiemposArray.removeAt(i);
  }
}