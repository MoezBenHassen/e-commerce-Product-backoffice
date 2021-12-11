import { Component, OnInit, ViewEncapsulation, Inject, Directive } from '@angular/core';
import { produit } from '../produit';
import { ProduitService } from '../produit.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormsModule} from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  image: string;
  infos: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', price: 1.0079, image: 'H', infos: 'H' }
];

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListProduitComponent implements OnInit {
  pr: produit[];
  products: produit[]=[];
  
  e: produit;
  id:number;
  panelOpenState = false;
  idChose: number;

  displayedColumns: string[] = ['position', 'name', 'price', 'image', 'infos'];
  dataSource = ELEMENT_DATA;

  constructor(
    private produitservice: ProduitService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar ,private activatedroute:ActivatedRoute,
  ) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  //Delete Snack Bar
  action2:string="";
  openSnackBar(message: number, action2: string) {
    this._snackBar.open( message+" Has been Deleted Successfully! ", this.action2, {
      duration: 2000,
    });
  }

  LibelleArticle:String="";
  ngOnInit() {
    //this.pr = this.produitservice.produits;
    this.produitservice.getProducts().subscribe(
      data => this.products = data
    )
  }
  deleteProduct(id:number){
    this.produitservice.deleteProduct(id).subscribe(
      () => this.products = this.products.filter(p => p.id != id),
      ()=> this.ngOnInit()
    )
  }
    /*Delete(id:number)
    {

      this.pr = this.produitservice.DeleteProduit(id);

    }*/
    //console.log(this.idChose);
  }


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html'
})
// tslint:disable-next-line: component-class-suffix
export class BottomSheetOverviewExampleSheet {
  constructor( private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
  ) {}
  pr: produit[];
  e: produit;

  chose = 'CHOSla dingeueE ';
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }


}
