export type Host = {
  id: number;
  username: string;
};

export type UserParams = {
  username: string;
  password: string;
};

interface SuccessResponse {
  status: number;
  data: { token: string; }; // Assumindo que 'data' é uma string representando o token
}

interface ErrorResponse {
  status: number;
  data: { message: string };
}

export type LoginResponse = SuccessResponse | ErrorResponse;