import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { listOrderMock, modelMock } from '../../mocks/orders.mock';
import OrderModel from '../../../src/database/models/order.model';
import orderService from '../../../src/services/order.service'
import app from '../../../src/app'
import { error } from '../../mocks/orders.mock'
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Recebendo uma lista de pedidos', async function () {
  const listOrders = modelMock.map((order) => OrderModel.build(order, {
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }], 
}));
  const findAllStub = sinon.stub(OrderModel, 'findAll').resolves(listOrders);
    // faz a solicitaçao http simulada para o endopoint
    const response = await chai.request(app)
    .get('/orders')

    // verifica se a resposta tem o status e os dados certos
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(listOrderMock);
    expect(response).to.have.property('status').that.is.a('number');
    expect(response).to.have.property('body').that.is.a('array');

    // verifica se o metodo findAll foi chamado
    expect(findAllStub).to.have.been.calledOnce;
  })

  it('Não conseguindo receber uma lista de pedidos', async function () {
    sinon.stub(OrderModel, 'findAll').rejects(error);

    // faz uma solicitaçao Http simulado para o endopoint
    const response = await chai.request(app)
    .get('/orders');

    // verifica se a resposta tem o status e a mensagem correta
    expect(response).to.have.status(500);
    expect(response.body).to.deep.include('Internal Server Error');
  });
});
