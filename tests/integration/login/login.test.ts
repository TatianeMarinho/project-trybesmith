import bcrypt from 'bcryptjs';

import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginService from '../../../src/services/login.service';
import { hostMock, userErrorMock, userMock, userTableMock } from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import jwtUtil from '../../../src/util/jwt.util';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Retornando o token ao fazer login com as informações corretas', async function () {
    const token = { token: 'fake-jwt-token' };
    const userLogin = UserModel.build(userTableMock);
    const modelStub = sinon.stub(UserModel, 'findOne').resolves(userLogin);
    const bcryptStub = sinon.stub(bcrypt, 'compareSync').returns(true);
    const jwtStub = sinon.stub(jwtUtil, 'sign').returns(token);

    // chamando endopoint login
    const response = await chai.request(app)
    .post('/login')
    .send(userMock);

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equals(token);
    expect(modelStub).to.have.been.calledOnce;
    expect(bcryptStub).to.have.been.calledOnce;
    expect(jwtStub).to.have.been.calledOnce;
  })

  it('Retornando um erro ao fazer login com informaçoes incorretas', async function () {
    const userLogin = UserModel.build(userTableMock);
    const modelStub = sinon.stub(UserModel, 'findOne').resolves(userLogin);
    const bcryptStub = sinon.stub(bcrypt, 'compareSync').returns(false);
    const jwtStub = sinon.stub(jwtUtil, 'sign');

    // chamando endopoint login
    const response = await chai.request(app)
    .post('/login')
    .send(userErrorMock);

    expect(response).to.have.status(401);
    expect(response.body).to.have.property('message', 'Username or password invalid');
    expect(modelStub).to.have.been.calledOnce;
    expect(bcryptStub).to.have.been.calledOnce;
    expect(jwtStub).to.not.have.been.called;// se a funçao nao foi chamada
  })

});
