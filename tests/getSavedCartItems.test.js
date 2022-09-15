const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('ao executar getSavedCartItems, o método localStorage.getItem é chamado',  () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro',  () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })

  it('ao executar getSavedCartItems, retorna o que está salvo no Local Storage',  () => {
    saveCartItems('teste');
    expect(getSavedCartItems()).toEqual('');
  })

});
