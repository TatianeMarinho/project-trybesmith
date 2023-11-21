import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import { error, listProductsMock } from '../../mocks/products.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Recebendo uma lista de produtos cadastrados', async function () {
    // cria um stub para a funçao findAll
    const productsMock = listProductsMock.map((product) => ProductModel.build(product));
    const listMock = sinon.stub(ProductModel, 'findAll').resolves(productsMock);

    // faz a solicitaçao http simulada para o endopoint
    const response = await chai.request(app)
    .get('/products');

    // verifica se a resposta tem o status e os dados certos
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(listProductsMock);

    // verifica se o metodo findAll foi chamado
    expect(listMock).to.have.been.calledOnce;
  })

  it('Não conseguindo receber uma lista de produtos', async function () {
    // cria stub para a funçao findAll
    sinon.stub(ProductModel, 'findAll').rejects(error);

    // faz uma solicitaçao Http simulado para o endopoint
    const response = await chai.request(app)
    .get('/products');

    // verifica se a resposta tem o status e a mensagem correta
    expect(response).to.have.status(500);
    expect(response.body).to.deep.include('Internal Server Error');
  });
});
