export const listOrderMock = [
    {
      "id": 1,
      "userId": 2,
      "productIds": [1, 2]
    },
    {
      "id": 2,
      "userId": 1,
      "productIds": [3, 4]
    }
  ];

export const modelMock = [
    {
      "id": 1,
      "userId": 2,
      "productIds": [
        { id: 1 },
        { id: 2 },
      ]
    },
    {
      "id": 2,
      "userId": 1,
      "productIds": [
        { id: 3 },
        { id: 4 },
      ]
    }
  ];

export const error = new Error('Internal Server Error');