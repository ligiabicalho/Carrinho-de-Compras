require('../mocks/fetchSimulator');
// const { expect } = requirwe('chai');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts === 'function').toBeTruthy();
  });

  it('Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada', () => {
    expect(fetchProducts('computador')).toHaveBeenCalled();
  });

  // it('Teste se fetchProducts é uma função', () => {
  //   expect().toBe();
  // });

  // it('Teste se fetchProducts é uma função', () => {
  //   expect().toBe();
  // });

  // it('Teste se fetchProducts é uma função', () => {
  //   expect().toBe();
  // });

});
