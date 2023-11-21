export type RetunRegistrationProduct = {
  id?: number,
  name: string,
  price: string,
};

export type Returns = {
  status: number,
  data: RetunRegistrationProduct | string
};