import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { error, listProductsMock, requestBodyMock } from '../../mocks/products.mock';
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

    sinon.stub(productService, 'registration').rejects(error);

    const nextStub = sinon.stub();

    // act
    await productController.createProduct(req, res, nextStub);

    // assert
    expect(nextStub).to.have.been.calledWith(error);
  });

  it('Buscando todos os produtos com sucesso', async function () {
    // arrange
    const returnListProducts = sinon.stub(productService, 'getAllProducts').resolves({
      status: 200,
      data: listProductsMock,
    });

    const nextStub = sinon.stub();

    // act
    await productController.allProducts(req, res, nextStub);

    // assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listProductsMock);
    //valida se ao chamar a funçao allproducts ela interage com a camada de service corretamente apenas uma vez
    expect(returnListProducts).to.have.been.calledOnce;
  });

  it('Buscando a lista de produtos sem sucesso', async function () {
    // arrange
    
    const listProductsSinon = sinon.stub(productService, 'getAllProducts').resolves({
      status: 500,
      data: 'Internal Server Error',
    });

    const nextStub = sinon.stub();

    // act
    await productController.allProducts(req, res, nextStub);

    // assert
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith('Internal Server Error')

    expect(listProductsSinon).to.have.been.calledOnce;
  });

});
