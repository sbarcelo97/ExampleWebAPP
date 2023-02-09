import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddproductComponent } from 'src/app/addproduct/addproduct.component';
import { Compra } from 'src/app/models/compra';
import { ComprasService } from 'src/app/services/compras.service';



@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})



export class ComprasComponent implements OnInit, AfterViewInit  {
    compra :Compra = new Compra(0,"",0,0,[{codigo:0, monto:0}]);
    compras: Compra[] = [];
    comprasSource: MatTableDataSource<Compra>;
    comprasFiltradas:Compra[]= [];
    nuevaCompra: boolean = false; 
    displayedColumns = ['nroCompra','formaDePago','nroTarjeta','montoTotal','action'];
    formasdepago:  { [key: string]: string; } = {'ef':'Efectivo', 'credito':'Credito', 'debito':'Debito'}
    product_dialog: MatDialogRef<AddproductComponent> | undefined;
    selectedIndex: number;
    buscar:boolean = false;
    busqueda:string ='';
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) matSort!: MatSort;

  constructor(public comprasService: ComprasService,
    private router: Router, public dialog:MatDialog ) {
      this.getSiguienteNroCompra()
      this.compra.productos.pop();
      this.selectedIndex=0;
      this.comprasFiltradas=this.compras;
      this.comprasSource = new MatTableDataSource(this.comprasFiltradas);
     }

  ngOnInit(): void {
    this.getCompras();
    this.comprasSource.data = this.comprasFiltradas;
    this.comprasSource.sort = this.matSort;
    this.comprasSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.comprasSource.paginator = this.paginator;
    this.comprasSource.paginator._intl.itemsPerPageLabel ='';
    this.comprasSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

  newCompra(){
    this.compra =new Compra(0,"",0,0,[{codigo:0, monto:0}]);
    this.getSiguienteNroCompra();
  }

  submitCompra(){
    if(this.selectedIndex){
      this.updateCompra();
    }else{
      this.createCompra();
    }
  }

  updateCompra(){
    this.comprasService.updateCompra(this.compra).subscribe(
      res=>{
        this.router.navigate(['/'])
        window.location.reload();
      },
      err=>{console.log(err)}
    )
  }

  createCompra(){
    this.comprasService.createCompra(this.compra).subscribe(
      res=>{
        this.router.navigate(['/'])
        window.location.reload();
      },
      err=>{console.log(err)}
    )
  }


  getCompras(){
    this.comprasService.getCompras().subscribe(
      res=>{
        this.compras = res;
        this.comprasFiltradas =this.compras;
        this.comprasSource.data =this.comprasFiltradas;
        this.getSiguienteNroCompra();
      },
    )
  }

 

  public addProduct(){
    this.product_dialog = this.dialog.open(AddproductComponent,{});
    this.product_dialog.beforeClosed().subscribe(result =>{
      if(result){
        this.compra.productos.push(result);
        this.compra.montoTotal = this.compra.montoTotal + result.monto;
      }
    })
  }

  public deleteproduct(codigo:number,monto:number){
    var index=0;
    for (let i=0; i< this.compra.productos.length; i++){
      if (this.compra.productos[i]['monto']==monto && this.compra.productos[i]['codigo']==codigo)
        index = i;
    }
    this.compra.productos.splice(index,1);
    this.compra.montoTotal = this.compra.montoTotal - monto;
  }

  public deleteCompra(nroCompra:number){
    this.comprasService.deleteCompra(nroCompra).subscribe(() => this.getCompras());
    let index=this.compras.findIndex((compra)=> compra.nroCompra == nroCompra);
    this.compras.splice(index,1);
    this.getSiguienteNroCompra();
  }

  public getSiguienteNroCompra() {
    if(this.compras.length > 0){
      this.compra.nroCompra = this.compras[this.compras.length-1].nroCompra+1;
    }else{
      this.compra.nroCompra=1;
    }
  }

  public editCompra(compra:Compra){
    this.compra = compra;
    this.selectedIndex=1;
  }

  public filtrarCompras(event: KeyboardEvent){
    this.comprasSource.filter = this.busqueda;
  }

  public setBuscar(){
    this.buscar = !this.buscar;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
