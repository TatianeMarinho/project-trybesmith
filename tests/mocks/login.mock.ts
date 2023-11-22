import bcrypt from 'bcryptjs';

export const userMock = { username: 'Pedro', password: 'senhapedro' };

export const hostMock = { dataValues: { id: 15, username: 'Pedro', password: bcrypt.hashSync('senhapedro', 10) } };

export const userTableMock = { id: 15, username: 'Pedro', vocation: 'Guerreiro', level: 26, password: bcrypt.hashSync('senhapedro', 10) }

export const userErrorMock = { username: 'Pedro', password: 'errado' };