import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { produit } from "./produit";
import { catchError } from 'rxjs/operators';
import { throwError}  from 'rxjs';

const URL = "http://localhost:1234/products/getProducts";
const URL_POST = "http://localhost:1234/products/create";
const URL_DELETE = "http://localhost:1234/products/";
const URL_UPDATE = "http://localhost:1234/products/";

@Injectable({
  providedIn: "root"
})
export class ProduitService {
  /*
  produits = [
    new produit(12345, 'fromage blanc', "assets/p1.png", 50.2 , true, new Date("2019-01-10") ),
    new produit(18345, 'fromage noir', "assets/p2.png", 450.2 , true, new Date("2019-01-10") ),
    new produit(12345, 'fromage blanc', "assets/p1.png", 50.2 , true, new Date("2019-01-10") ),
    new produit(18345, 'fromage noir', "assets/p2.png", 450.2 , true, new Date("2019-01-10") ),
    new produit(12345, 'fromage blanc', "assets/p1.png", 50.2 , true, new Date("2019-01-10") ),
    new produit(18345, 'fromage noir', "assets/p2.png", 450.2 , false, new Date("2019-01-10") )
  ];*/
  
  produits = [
    //id, name, description, image path, price, nb in stock, in stock or not, date
    new produit(
      12345,
      "The Chita Single Grain",
      "Japanese single grain whisky from the Chita distillery, one of the selection of fantastic distilleries owned by Suntory. This is their main expression - a whisky matured in a combination of Sherry, bourbon and (interestingly) wine casks. Good whisky for the summer months.",
      "assets/TheChitaSingleGrain.jpg",
      50.2,
      50,
      true,
      new Date("2019-01-10")
    ),
    new produit(
      18345,
      "The Hakushu Single Malt",
      "From the Hakushu distillery in the foothills of Mount Kaikomagatake comes their Distiller's Reserve single malt whisky, a no-age-statement expression, that captures the smoky, herbaceous characteristics of their whiskies. Both lightly-peated and heavily-peated malts were used for this complex and deeply enjoyable whisky. One of two Spring 2014 release from Suntory.",
      "assets/TheHakushuSingleMalt.jpg",
      50.52,
      60,
      true,
      new Date("2019-01-10")
    )
  ]; 

  
  constructor(private http:HttpClient) {}
  
  errorHandler(error:HttpErrorResponse){
    return throwError(error);
  }
  getProducts():Observable<produit[]>{
    return this.http.get<produit[]>(URL);
  }
  addProducts(product:produit):Observable<produit>{
    return this.http.post<produit>(URL_POST, product);
  }
  enroll(product:produit):Observable<produit>{
    return this.http.post<any>(URL_POST, product)
            .pipe(catchError(this.errorHandler))
  }
  deleteProduct(id:number){
    return this.http.delete(URL_DELETE+"/"+id+"/delete");
  }
  updateProduct(id:number, product:produit):Observable<produit>{
    return this.http.put<produit>(URL_UPDATE+"/"+id+"/delete", product);
  }


  //TO DELETE AFTER FINISHING SET UP WITH DATABASE METHODS 
  public getProduitId(id: number): produit {
    let i: number;
    for (i = 0; i < this.produits.length; i++) {
      if (id == this.produits[i].id) {
        return this.produits[i];
      }
    }
    return null;
  }

  public addProduit(id: number, libelle: string,description: string, image: string, prix: number,nbStock:number, stock: boolean, date: Date): boolean {
    if (this.getProduitId(id)==null) {
      const nouveau: produit = new produit(id, libelle,description, image, prix,nbStock, stock, date);
      this.produits.push(nouveau);
      return true;
    }
    return false;


  }
  DeleteProduit(id:number):produit[]
  {
    let i:number
    for(i=0;i<this.produits.length;i++)
    {
      if(id==this.produits[i].id)
      this.produits.splice(i,1);

    }
    return this.produits;

  }
  editerProduitserv(
    id: number,
    libelle: string,
    description:string,
    image: string,
    prix: number,
    nbStock:number,
    stock: boolean,
    date: Date
  ) {
    let obj: produit = this.getProduitId(id);

    if (id >= 100 && id < 1000) obj.id = id;

    if (libelle != null) obj.libelle = libelle;
    if  (description != null) obj.description = description;

    if (image.length != 0) obj.image = image;

    if (prix != null) obj.prix = prix;
    if (nbStock != null) obj.nbStock = nbStock;
    if (date != null) obj.date = date;


    if (stock == true || stock == false) obj.stock = stock;
  }
  getAllProduits():produit[]{
    return this.produits;
  }

}

/* LOGIN PART */
