import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { hostMock } from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';
import jwtUtil from '../../../src/util/jwt.util';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Realizando login com sucesso', async function () {
    // arrange
    const loginStub = sinon.stub(loginService, 'verifyLogin').resolves({
      status: 200,
      data: 'mocked_token',
    });

    const nextStub = sinon.stub();

    // act
    await loginController.login(req, res, nextStub);

    // assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith('mocked_token');
    //valida se ao chamar a funçao allproducts ela interage com a camada de service corretamente apenas uma vez
    expect(loginStub).to.have.been.calledOnce;
  });

  it('Realizando login sem sucesso', async function () {
    // arrange
    const loginStub = sinon.stub(loginService, 'verifyLogin').resolves({
      status: 500,
      data: 'Internal Server Error',
    });

    const nextStub = sinon.stub();

    // act
    await loginController.login(req, res, nextStub);

    // assert
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith('Internal Server Error')

    expect(loginStub).to.have.been.calledOnce;
  });
});
