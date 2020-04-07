import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }



  getContries() {

    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      map((resp: any[]) =>  resp.map(pais => (  {  nombre: pais.name, codigo: pais.alpha3Code})))
    );

  }

}
