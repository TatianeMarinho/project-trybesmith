export type RetunRegistrationProduct = {
  id?: number,
  name: string,
  price: string,
};

export type ReturnProductsAll = {
  id?: number,
  name: string,
  price: string,
  orderId: number,
};

export type Returns = {
  status: number,
  data: RetunRegistrationProduct | string | ReturnProductsAll[]
};