export class produit {
  constructor(
    private _id: number,
    private _libelle: string,
    private _description: string,
    private _image: string,
    private _prix: number,
    private _nbStock: number,
    private _stock: boolean,
    private _date: Date
  ) {}
  /* 
   _id: [123],
      _libelle: ["testAJOUT"],
      _description: ["descriptTest"],
      _image: ["imageimage"],
      _prix: [123],
      _nbStock: [123],
      _stock:[true],
      _date:[this.date]
      */
  public get id(): number {
    return this._id;
  }
  public set id(mat: number) {
    this.id = mat;
  }
//LIBELLE
  public get libelle(): string {
    return this._libelle;
  }
  public set libelle(ch: string) {
    this._libelle = ch;
  }
//DESCRIPTION 
  public get description(): string {
    return this._description;
  }
  public set description(ch: string) {
    this._description = ch;
  }
//IMAGE
  public get image(): string {
    return this._image;
  }
  public set image(img: string) {
    this._image = img;
  }
//PRIX
  public get prix(): number {
    return this._prix;
  }
  public set prix(p: number) {
    this._prix = p;
  }
//NOMBRE STOCK
  public get nbStock(): number {
    return this._nbStock;
  }
  public set nbStock(s: number) {
    this._nbStock = s;
  }
//STOCK BOOLEAN
  public get stock(): boolean {
    return this._stock;
  }
  /*pour dire s'il est en stock ou non*/
  public set stock(b: boolean) {
    this._stock = b;
  }

//DATE
  /* champ de date */

  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }
}
