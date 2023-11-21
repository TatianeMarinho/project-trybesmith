import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderService from '../../../src/services/order.service';
import orderController from '../../../src/controllers/order.controller';
import { listOrderMock } from '../../mocks/orders.mock';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Buscando a lista de pedidos com sucesso', async function () {
    // arrange
    const returnListOrders= sinon.stub(orderService, 'getAllOrder').resolves({
      status: 200,
      data: listOrderMock,
    });

    const nextStub = sinon.stub();

    // act
    await orderController.allOrders(req, res, nextStub);

    // assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listOrderMock);
    //valida se ao chamar a funçao allproducts ela interage com a camada de service corretamente apenas uma vez
    expect(returnListOrders).to.have.been.calledOnce;
  });

  it('Buscando a lista de pedidos sem sucesso', async function () {
    // arrange
    
    const listOrdersSinon = sinon.stub(orderService, 'getAllOrder').resolves({
      status: 500,
      data: 'Internal Server Error',
    });

    const nextStub = sinon.stub();

    // act
    await orderController.allOrders(req, res, nextStub);

    // assert
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith('Internal Server Error')

    expect(listOrdersSinon).to.have.been.calledOnce;
  });
});
