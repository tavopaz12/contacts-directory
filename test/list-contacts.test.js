import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../list-contacts.js';

let elem;
let elemRoot;

beforeEach(async () => {
  elem = await fixture(html`<list-contacts></list-contacts>`);
  elemRoot = elem.shadowRoot;
});

describe('When the user wants add un contact to a list', () => {
  it('And fields are empty, Then emptys should not be added', () => {
    const form = elemRoot.querySelector('[data-testid="form"]');

    const add = elemRoot.querySelector('[data-testid="add"]');

    add.click();

    expect(form.checkValidity()).to.be.false;
  });
  it('Then the contact should be added', async () => {
    const contatc = {
      name: elemRoot.querySelector('[data-testid="name"]'),
      lastName: elemRoot.querySelector('[data-testid="lastName"]'),
      email: elemRoot.querySelector('[data-testid="email"]'),
      cellPhone: elemRoot.querySelector('[data-testid="cellphone"]'),
    };
    const contactsContainer = elemRoot.querySelector(
      '[data-testid="contactsContainer"]'
    );
    const add = elemRoot.querySelector('[data-testid="add"]');

    contatc.name.value = 'Octavio';
    contatc.lastName.value = 'Paz';
    contatc.email.value = 'tavo.paz12@hotmail.com';
    contatc.cellPhone.value = '2781205512';

    add.click();

    await elem.updateComplete;
    expect(contactsContainer.textContent).to.contains('Octavio');
    expect(contactsContainer.textContent).to.contains('Paz');
    expect(contactsContainer.textContent).to.contains('tavo.paz12@hotmail.com');
    expect(contactsContainer.textContent).to.contains('2781205512');
  });
});

describe('When the contact is added', () => {
  it('Then all the inputs should be cleared', async () => {
    const contatc = {
      name: elemRoot.querySelector('[data-testid="name"]'),
      lastName: elemRoot.querySelector('[data-testid="lastName"]'),
      email: elemRoot.querySelector('[data-testid="email"]'),
      cellPhone: elemRoot.querySelector('[data-testid="cellphone"]'),
    };
    const add = elemRoot.querySelector('[data-testid="add"]');

    contatc.name.value = 'Octavio';
    contatc.lastName.value = 'Paz';
    contatc.email.value = 'tavo.paz12@hotmail.com';
    contatc.cellPhone.value = '2781205512';

    add.click();

    await elem.updateComplete;
    expect(contatc.name.value).to.equal('');
    expect(contatc.lastName.value).to.equal('');
    expect(contatc.email.value).to.equal('');
    expect(contatc.cellPhone.value).to.equal('');
  });
});

describe('When the user wants delete a contact in the list', () => {
  it('Then the contact should be deleted', async () => {
    const contatc = {
      name: elemRoot.querySelector('[data-testid="name"]'),
      lastName: elemRoot.querySelector('[data-testid="lastName"]'),
      email: elemRoot.querySelector('[data-testid="email"]'),
      cellPhone: elemRoot.querySelector('[data-testid="cellphone"]'),
    };
    const add = elemRoot.querySelector('[data-testid="add"]');

    const contactsContainer = elemRoot.querySelector(
      '[data-testid="contactsContainer"]'
    );

    contatc.name.value = 'Octavio';
    contatc.lastName.value = 'Paz';
    contatc.email.value = 'tavo.paz12@hotmail.com';
    contatc.cellPhone.value = '2781205512';

    add.click();

    await elem.updateComplete;

    const btnRemove = elemRoot.querySelector('[data-testid="remove"]');
    btnRemove.click();

    await elem.updateComplete;

    expect(contactsContainer.textContent).not.to.contains('Octavio');
    expect(contactsContainer.textContent).not.to.contains('Paz');
    expect(contactsContainer.textContent).not.to.contains(
      'tavo.paz12@hotmail.com'
    );
    expect(contactsContainer.textContent).not.to.contains('2781205512');
  });

  describe('When more than one contact is added', () => {
    it('Then the contacts should be sorted by name', async () => {
      const name = elemRoot.querySelector('[data-testid="name"]');
      const lastName = elemRoot.querySelector('[data-testid="lastName"]');
      const email = elemRoot.querySelector('[data-testid="email"]');
      const cellPhone = elemRoot.querySelector('[data-testid="cellphone"]');
      const add = elemRoot.querySelector('[data-testid="add"]');

      name.value = 'alejandro';
      lastName.value = 'a';
      email.value = 'aa@as';
      cellPhone.value = '45';

      add.click();

      await elem.updateComplete;

      name.value = 'beto';
      lastName.value = 'a';
      email.value = 'aa@as';
      cellPhone.value = '45';

      add.click();
      await elem.updateComplete;

      const contactsContainer = elemRoot.querySelector(
        '[data-testid="contactsContainer"]'
      );

      const text = contactsContainer.textContent;
      const idxAlejandro = text.indexOf('alejandro');
      const idxBeto = text.indexOf('beto');

      expect(idxAlejandro).to.be.below(idxBeto);
    });
  });
});
