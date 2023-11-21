export const requestBodyMock = { name: 'Manopla de Thanus', price: '50 peças de ouro', orderId: 1 };

export const resCreateMock = { id: 10, ...requestBodyMock };

export const resultCreateMock = { id: 10, name: 'Manopla de Thanus', price: '50 peças de ouro' };

export const listProductsMock = [
    {
      "id": 1,
      "name": "Excalibur",
      "price": "10 peças de ouro",
      "orderId": 1
    },
    {
      "id": 2,
      "name": "Espada Justiceira",
      "price": "20 peças de ouro",
      "orderId": 1
    },
  ];

  export const error = new Error('Internal Server Error');