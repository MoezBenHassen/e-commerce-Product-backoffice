import { Component, OnInit } from "@angular/core";
import { produit } from "../produit";
import { ProduitService } from "../produit.service";
import { ActivatedRoute, Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: "app-editer-produit",
  templateUrl: "./editer-produit.component.html",
  styleUrls: ["./editer-produit.component.css"]
})
export class EditerProduitComponent implements OnInit {
  produit: produit;
  _id: number;
  _libelle: string;
  _description: string;
  _image: string = "";
  _prix: number;
  _nbStock: number;
  _stock: boolean ;
  submitted: boolean = false;

  _date: Date = new Date("1999-01-01");

  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  message: string="From has been reset";
  action2: string="";

  //productF= new produit(0,'','','',0,0,false,this._date);
  products: produit[]=[];
  constructor(
    private produitsservice: ProduitService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    console.log(this.route.snapshot.params["id"]);
    this._id = this.route.snapshot.params["id"];
    this.produitsservice.getById(this.route.snapshot.params["id"]).subscribe(
      data =>{ 
        this.products = data;
        console.log(this.products);
      }
    );
  }
  onEditProduct(id:number){
    //this.produitsservice.updateProduct(id, this.productF)
    this.produitsservice.updateProduct(id, this.products).subscribe(
      data => {
        console.log(data)
      },
      error => console.error('ERR: '+error)
    )
    this.router.navigate(["/list-produit"]);
  }

  /*
  editerProduit() {
    if (this.produitsservice.getProduitId(this._id) != null) {
      this.produitsservice.editerProduitserv(
        this._id,
        this._libelle,
        this._description,
        this._image,
        this._prix,
        this._nbStock,
        this._stock,
        this._date
      );
      this.router.navigate(["/list-produit"]);
    } else {
      this.message = "L'Id entré n'existe pas !";
      this.submitted = true;
    }
  }
  */

  openSnackBar(message: string, action2: string) {
    this._snackBar.open("Product has been Edited Successfully!", action2, {
      duration: 2000,
    });
  }
  openSnackBarReset(message: string, action: string) {
    this._snackBar.open(this.message, action, {
      duration: 2000,
    });
  }
  versProduit() {
    this.router.navigate(["/list-produit"]);
  }
}
