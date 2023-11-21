import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { requestBodyMock } from '../../mocks/products.mock';
import productService from '../../../src/services/product.service'
import productController from '../../../src/controllers/product.controller'

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  })

  it('Criando um novo produto com sucesso', async function () {
    // arrange
    req.body = requestBodyMock;

    const registrationStub = sinon.stub(productService, 'registration').resolves({
      status: 201,
      data: { id:10, ...requestBodyMock },
    });

    const nextStub = sinon.stub();

    // act
    await productController.createProduct(req, res, nextStub);

    // assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({id: 10, ...requestBodyMock });
    expect(registrationStub).to.have.been.calledWith(requestBodyMock);
  });

  it('Criando um novo produto sem sucesso', async function () {
    // arrange
    req.body = {};

    const error = new Error('Internal Server Error');
    sinon.stub(productService, 'registration').rejects(error);

    const nextStub = sinon.stub();

    // act
    await productController.createProduct(req, res, nextStub);

    // assert
    expect(nextStub).to.have.been.calledWith(error);
  });

});
