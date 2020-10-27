import { Accessoire } from "./accessoire";
import { Description } from "./description";
import { Feature } from "./feature";
export class Product {
  ProductId: number;
  name: string;
  categoryid: number;
  CategoryName: string;

  prix: number;
  stock: number;
  marque: string;

  isInPromo: boolean;
  promoPercentage: number;
  prixPromotion: number;

  isSponsor: boolean;

  image: string;

  features: Feature[];
  descriptions: Description[];
  accessoires: Accessoire[];
}
