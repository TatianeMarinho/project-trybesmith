import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { listOrderMock } from '../../mocks/orders.mock';
import OrderModel from '../../../src/database/models/order.model';
import orderService from '../../../src/services/order.service'
import app from '../../../src/app'
import { error } from '../../mocks/orders.mock'

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Recebendo uma lista de pedidos', async function () {
    // cria um stub para a funçao findAll
    const liststub = sinon.stub(orderService, 'getAllOrder').resolves({
      status: 200, data: listOrderMock
    });
    
    // faz a solicitaçao http simulada para o endopoint
    const response = await chai.request(app)
    .get('/orders')

    // verifica se a resposta tem o status e os dados certos
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(listOrderMock);

    // verifica se o metodo findAll foi chamado
    expect(liststub).to.have.been.calledOnce;
  })

  it('Não conseguindo receber uma lista de pedidos', async function () {
    // cria stub para a funçao findAll
    sinon.stub(OrderModel, 'findAll').rejects(error);

    // faz uma solicitaçao Http simulado para o endopoint
    const response = await chai.request(app)
    .get('/orders');

    // verifica se a resposta tem o status e a mensagem correta
    expect(response).to.have.status(500);
    expect(response.body).to.deep.include('Internal Server Error');
  });
});
