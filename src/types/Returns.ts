export type ReturnRegistrationProduct = {
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

export type MessageReturn = { message: string };

export type ErrorResp = {
  status: number,
  data: MessageReturn,
};

export type Returns = {
  status: number,
  data: ReturnRegistrationProduct | string | ReturnProductsAll[]
};
