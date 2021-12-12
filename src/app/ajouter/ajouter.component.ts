import { Component, OnInit, Input, Output } from "@angular/core";
import { ProduitService } from "../produit.service";
import { produit } from "../produit";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-ajouter",
  templateUrl: "./ajouter.component.html",
  styleUrls: ["./ajouter.component.css"]
})
export class AjouterComponent implements OnInit {
  produits = [];
  title = "Ajouter Article :";

  _id: number;
  _libelle = "";
  _description = "";
  _image = "";
  _prix: number;
  _nbStock: number;
  _date: Date = new Date("2021-01-01");
  _stock: boolean;

  indeterminate = false;
  labelPosition = "after";
  disabled = false;

  message: string = "From has been reset";
  action2: string = "";
  submit = false;
  //pr = new produit(this.id, this.libelle,this.description, this.image, this.prix ,this.nbStock, this.stock, this.date )
  productF= new produit(0,'','','',0,0,false,this._date);
  errorMsg = '';

  constructor(
    private produitsservice: ProduitService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    //this.produits = this._produits.produits;
  }

  onSubmit() {
    console.log(this.productF);
    this.produitsservice.enroll(this.productF).subscribe(
      data => console.log('Success ! ', data),
      error => {
        this.errorMsg = error.statusText
      }
    )


    /*
    const verif: boolean = this.produitsservice.addProduit(
      this._id,
      this._libelle,
      this._description,
      "assets/" + this._image,
      this._prix,
      this._nbStock,
      this._stock,
      this._date
    );
    if (verif) {
      this.message = "Votre nouveau produit a bien été ajouté";
    } else {
      this.message = "Le produit  existe déjà »";
    }
    this.submit = true;*/
  }

  openSnackBar(message: string, action2: string) {
    this._snackBar.open(message + " Has been added Successfully!", action2, {
      duration: 2000
    });
  }
  openSnackBarError(message: string, ) {
    this._snackBar.open( "errorrr", message, {
      duration: 2000
    });
  }
  openSnackBarReset(message: string, action: string) {
    this._snackBar.open(this.message, action, {
      duration: 2000
    });
  }

  /*
  add() {
    this.produits.push(this.pr);
  }
*/
}
