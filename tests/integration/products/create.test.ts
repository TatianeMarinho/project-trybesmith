import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { requestBodyMock, resCreateMock, resultCreateMock } from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app'

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () {
    sinon.restore(); 
  });

  it('Recebendo parametros certos e criando um novo produto', async function () {
    // cria um stub para a funçao create
    const createMock = ProductModel.build(resCreateMock);

    const createStub = sinon.stub(ProductModel, 'create'). resolves(createMock);

    // faz a solicitaçao http simulada para o endopoint
    const response = await chai.request(app)
    .post('/products')
    .send(requestBodyMock)

    // verifica se a resposta tem o status e os dados certos
    expect(response).to.have.status(201);
    expect(response.body).to.deep.equal(resultCreateMock);

    // verifica se o metodo create foi chamado com os argumentos corretos
    expect(createStub).to.have.been.calledWith(requestBodyMock);
  })
});
