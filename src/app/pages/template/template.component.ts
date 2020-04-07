import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(private servicePaises:PaisesService) { }
  /* usuario:User; */
  usuario={
    nombre:'',
    apellido:'',
    correo:'',
    pais:''
  }
  countries:any[]=[];


  ngOnInit(): void {
    //Calling contries
    this.servicePaises.getContries().subscribe(data=>{
      this.countries=data;
      this.countries.unshift({
        nombre:'seleccione un pais',
        codigo:'',
   
      })
      console.log(this.countries)
     })
  }


  saveForm(form:NgForm){

    if (form.invalid) {

Object.values(form.controls).forEach(control=>{
  control.markAsTouched();
});

      return;

    }
    console.log(form);
    console.log(form.value);
  }

 
}
