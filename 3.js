// 3. Спостерігач (Observer) — це патерн програмування, який визначає залежність "один-багато" між об'єктами, так що зміна стану одного об'єкта
// призводить до автоматичного оновлення всіх залежних об'єктів
/**
 * Клас Customer представляє клієнта, що має можливість отримувати повідомлення по електронній пошті.
 * Клієнт ідентифікується своєю електронною адресою, яку використовується для відправки повідомлень.
 */
class Customer {
  constructor(email) {
    this.email = email;
  }

  receiveEmail(message) {
    console.log(`Email відправлено ${this.email}: ${message}`);
  }
}

class Product {
  constructor(name) {
    this.name = name;
  }
}

class Store {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }

  subscribe(customer) {
    this.customers.push(customer);
  }

  unsubscribe(customer) {
    this.customers = this.customers.filter((c) => c !== customer);
  }

  createProduct(productName) {
    const product = new Product(productName);
    this.sendNotify(product);
  }

  sendNotify(product) {
    this.customers.forEach((customer) => {
      customer.receiveEmail(
        `Новий продукт "${product.name}" в магазині ${this.name}!`
      );
    });
  }
}

console.log("Завдання 3 ====================================");

const store = new Store("IT Supermarket");

const customer1 = new Customer("john@example.com");
const customer2 = new Customer("jane@example.com");
const customer3 = new Customer("alice@example.com");

store.subscribe(customer1);
store.subscribe(customer2);
store.subscribe(customer3);

store.createProduct("Новий ноутбук");

store.unsubscribe(customer1);

store.createProduct("Бездротові навушники");
