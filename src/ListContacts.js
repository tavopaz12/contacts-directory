/* eslint-disable arrow-body-style */
import { html, LitElement, css } from 'lit';

export class ListContacts extends LitElement {
  static get properties() {
    return {
      contacts: { type: Array },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.contacts = [];
  }

  render() {
    return html`
      <form @submit=${this.onSubmit} data-testid="form">
        <input
          type="text"
          name="nombre"
          required
          data-testid="name"
          placeholder="Nombre"
        />

        <input
          type="text"
          name="apellido"
          required
          data-testid="lastName"
          placeholder="Apellido"
        />

        <input
          type="email"
          name="correo"
          required
          data-testid="email"
          placeholder="Correo Electronico"
        />

        <input
          type="tel"
          name="telefono"
          required
          data-testid="cellphone"
          placeholder="Telefono"
        />

        <button data-testid="add">+ Agegar contacto</button>
        <pre></pre>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody data-testid="contactsContainer">
          ${this.contacts.map(contact => {
            return html`
              <tr>
                <td>${contact.name}</td>
                <td>${contact.lastName}</td>
                <td>${contact.email}</td>
                <td>${contact.cellPhone}</td>
                <td>
                  <button
                    @click=${() => this.remove(contact)}
                    data-testid="remove"
                  >
                    X
                  </button>
                </td>
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const newContact = {
      name: data.get('nombre'),
      lastName: data.get('apellido'),
      email: data.get('correo'),
      cellPhone: data.get('telefono'),
    };
    this.contacts = [...this.contacts, newContact];
    form.reset();

    function sortArray(x, y) {
      const compareName = x.name.localeCompare(y.name);
      const compareLastName = x.lastName.localeCompare(y.lastName);

      if (compareName === 0) {
        return compareLastName;
      }
      return compareName;
    }

    this.contacts.sort(sortArray);
  }

  remove(contact) {
    this.contacts = this.contacts.filter(items => {
      if (items === contact) {
        return false;
      }
      return true;
    });
  }
}
