export type Guitarra = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type GuitarraId = Guitarra["id"];

export type CartItem = Guitarra & {
  quantity: number;
};