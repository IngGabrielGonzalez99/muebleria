import { Component } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { Proveedores } from 'src/app/Models/proveedores.modelo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogo-proveedores',
  templateUrl: './catalogo-proveedores.component.html',
  styleUrls: ['./catalogo-proveedores.component.css']
})
export class CatalogoProveedoresComponent {
  listaProveedores: any [] = []
  isLoading: boolean = true;
  
  objProveedor: any = {
    nombre: "",
    rfc: "",
    telefono: ""
  }


  constructor(private ProveedoresService: ProveedoresService, private router: Router){}

  ngOnInit (): void{
    this.llamarProveedores();
  }
  llamarProveedores(){
    this.ProveedoresService.obtenerProveedores()
    .subscribe(data =>{
      console.log(data);
      this.listaProveedores = data;
      this.isLoading = false

    });
  }
  eliminarProveedores(id: string){
    const resultado = window.confirm("¿Estás seguro que quieres eliminar el proveedor?")
    if(resultado){
      this.ProveedoresService.eliminarProveedor(id)
      .subscribe((data) =>{
        window.location.reload();
      })
    }
  }
    navegarProveedor(id: string){
      this.router.navigate(['/actualizarProveedor', id])
    }
}
