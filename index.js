// 1. Одиночка (Singleton) — це патерн програмування, який забезпечує,
// що клас має тільки один екземпляр і надає глобальну точку доступу до цього екземпляра.

// Клас OrderTracker відповідає за відстеження замовлень
class OrderTracker {
  static #instance = null; // Приватне статичне поле для збереження єдиного екземпляра класу
  orders = []; // Поле для збереження списку замовлень

  static create() {
    // Статичний метод для створення єдиного екземпляра класу
    if (!OrderTracker.#instance) {
      OrderTracker.#instance = new OrderTracker();
    }
    return OrderTracker.#instance;
  }

  add(item) {
    // Метод для додавання замовлення до списку
    this.orders.push(item);
  }

  get() {
    // Метод для отримання списку замовлень
    return this.orders;
  }
}
console.log("Завдання 1 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо єдиний екземпляр класу OrderTracker
const tracker = OrderTracker.create();

// Додаємо замовлення до списку
tracker.add("Телефон");
tracker.add("Ноутбук");

// Отримуємо список замовлень
const orders = tracker.get();

// Виводимо список замовлень в консоль
console.log(orders);

// 2. Фабрика (Factory) — це патерн програмування, який надає загальний клас для створення об'єктів, який враховує
// передані аргументи та вирішує який клас повинен мати об’єкт при створенні
// Клас Book описує книгу в магазині

class Book {
  constructor({ title, author, coverColor }) {
    this.title = title;
    this.author = author;
    this.coverColor = coverColor;
  }

  describe() {
    return `Книга: '${this.title}', автор: '${this.author}', колір обкладинки: '${this.coverColor}'`;
  }
}

class AudioBook {
  constructor({ title, author, audioLength }) {
    this.title = title;
    this.author = author;
    this.audioLength = audioLength;
  }

  describe() {
    return `Аудіокнига: '${this.title}', автор: '${this.author}', тривалість: '${this.audioLength}'`;
  }
}

class ProductFactory {
  static TYPE = {
    BOOK: "book",
    AUDIOBOOK: "audiobook",
  };

  static createProduct(type, options) {
    if (type === ProductFactory.TYPE.BOOK) {
      return new Book(options);
    } else if (type === ProductFactory.TYPE.AUDIOBOOK) {
      return new AudioBook(options);
    } else {
      throw new Error(`Такого типу продукту не існує: ${type}`);
    }
  }
}

console.log("Завдання 2 ====================================");

// Використовуємо ProductFactory для створення нової книги
const factoryBook = ProductFactory.createProduct(ProductFactory.TYPE.BOOK, {
  title: "Назва книги",
  author: "Автор книги",
  coverColor: "Синій",
});

// Виводимо в консоль опис нової книги
console.log(factoryBook.describe());

// Використовуємо ProductFactory для створення нової аудіокниги
const factoryAudiobook = ProductFactory.createProduct(
  ProductFactory.TYPE.AUDIOBOOK,
  {
    title: "Назва аудіокниги",
    author: "Автор аудіокниги ",
    audioLength: "5 годин",
  }
);

// Виводимо в консоль опис нової аудіокниги
console.log(factoryAudiobook.describe());

// Спробуємо створити продукт непідтримуваного типу
try {
  const factoryUnknown = ProductFactory.createProduct("comics", {});
} catch (error) {
  // Виводимо помилку в консоль
  console.error(error.message);
}

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

// 4. Декоратор (Decorator) — це патерн програмування, який додає нову функціональність до існуючих об'єктів, не змінюючи їхньої структури.
// Іншими словами, він дозволяє розширити функціональність об'єкта, не змінюючи сам об'єкт.

// Клас Drink представляє основний напій, який можна приготувати.
// Цей клас містить базову вартість напою (price=10) та його ім'я (name="Чай").

class Drink {
  constructor() {
    this.price = 10;
    this.name = "Чай";
  }

  prepare() {
    console.log(`Приготування ${this.name}`);
  }
}

class HoneyDecorator {
  constructor(drink, amount) {
    this.drink = drink;
    this.amount = amount;
  }

  get name() {
    return `${this.drink.name} з ${this.amount} г меду`;
  }

  get price() {
    return this.drink.price + 0.5 * this.amount;
  }

  prepare() {
    console.log(`Приготування ${this.name} з медом`);
  }
}

console.log("Завдання 4 ====================================");

// Створення об'єкту базового напою (чаю)
let tea = new Drink();
console.log(tea.name); // Виводить ім'я напою
console.log(tea.price); // Виводить вартість напою
tea.prepare(); // Готує напій

// Додавання декоратора меду до чаю
let honeyTea = new HoneyDecorator(tea, 2); // Додаємо 2 грами меду
console.log(honeyTea.name); // Виводить нову назву напою
console.log(honeyTea.price); // Виводить нову вартість напою
honeyTea.prepare(); // Готує напій з медом

// 5. Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

// Клас Writer відповідає за роботу з текстом.

class Writer {
  #content = ""; // Поточний текст
  #versions = []; // Масив збережених версій тексту

  set content(newContent) {
    this.#store(); // Зберігаємо поточний стан тексту перед зміною
    this.#content = newContent;
  }

  get content() {
    return this.#content;
  }

  #store() {
    this.#versions.push(new Version(this.#content));
  }

  restore() {
    if (this.#versions.length > 0) {
      this.#content = this.#versions.pop().content;
    } else {
      console.log("Немає збережених версій тексту");
    }
  }
}

class Version {
  constructor(content) {
    this.content = content;
  }

  static create(content) {
    return new Version(content);
  }

  static restore(versions) {
    if (versions.length > 0) {
      return versions[versions.length - 1].content;
    }
    return "";
  }
}

console.log("Завдання 5 ====================================");
// Сторюємо новий екземпляр клас Writer
const writer = new Writer();

// Присвоюємо за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюєо попередній текст
writer.restore();
console.log(writer.content);

// 6. Ланцюжок відповідальності (Chain of Responsibility) — це паттерн програмування, який дозволяє передавати запити послідовно через ланцюжок обробників, кожен з яких може обробити або передати запит далі.

//AuthProcessor клас для обробки аутентифікації.

// Клас AuthProcessor для обробки аутентифікації.
class AuthProcessor {
  setNextProcessor(nextProcessor) {
    this.nextProcessor = nextProcessor;
    return nextProcessor;
  }

  validate(username, passkey) {
    if (this.nextProcessor) {
      return this.nextProcessor.validate(username, passkey);
    }
    console.log("Вхід заборонено");
    return false;
  }
}

// Клас TwoStepProcessor, що перевіряє двофакторний код. Наслідує базовий клас AuthProcessor.
class TwoStepProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (
      username === "john" &&
      passkey === "password" &&
      this.isValidTwoStepCode()
    ) {
      console.log("Вхід дозволено з двофакторною аутентифікацією");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }

  isValidTwoStepCode() {
    // реалізуйте перевірку двофакторного коду
    return true;
  }
}

// Клас RoleProcessor, що перевіряє ролі користувача. Наслідує базовий клас AuthProcessor.
class RoleProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (username === "guest") {
      console.log("Вхід дозволено з роллю гостя");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
}

// Клас CredentialsProcessor, що перевіряє облікові дані користувача. Наслідує базовий клас AuthProcessor.
class CredentialsProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (username === "admin" && passkey === "admin123") {
      console.log("Вхід дозволено за обліковими даними");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
}

// Клас Builder для створення об'єкта ланцюжка обробників.
class ProcessorBuilder {
  constructor() {
    this.firstProcessor = null;
    this.lastProcessor = null;
  }

  add(processor) {
    if (!this.firstProcessor) {
      this.firstProcessor = processor;
      this.lastProcessor = processor;
    } else {
      this.lastProcessor.setNextProcessor(processor);
      this.lastProcessor = processor;
    }
    return this;
  }

  create() {
    return this.firstProcessor;
  }
}

console.log("Завдання 6 ====================================");

// Створюємо Builder для ланцюга обробників.
const processorBuilder = new ProcessorBuilder();

// Додаємо обробники в ланцюг за допомогою builder'а.
const processor = processorBuilder
  .add(new CredentialsProcessor())
  .add(new TwoStepProcessor())
  .add(new RoleProcessor())
  .create();

// Перевіряємо користувачів за допомогою нашого ланцюга обробників.
console.log(processor.validate("admin", "admin123")); // Вхід дозволено за обліковими даними
console.log(processor.validate("john", "password")); // Вхід дозволено з двофакторною аутентифікацією
console.log(processor.validate("guest", "guest123")); // Вхід дозволено з роллю гостя
console.log(processor.validate("user", "password")); // Вхід заборонено

// 7. Міст (Bridge) — це паттерн програмування, який дозволяє розмістити абстракцію і реалізацію в окремі класи, дозволяючи їм мати незалежний функціонал

// Клас Participant представляє користувача, який може відправляти повідомлення.

class Participant {
  constructor(alias, communicator) {
    this.alias = alias;
    this.communicator = communicator;
  }

  // Метод dispatchMessage відправляє повідомлення за допомогою відповідного засобу комунікації.
  dispatchMessage(text) {
    const message = this.prepareMessage(text);
    this.communicator.transmit(message);
  }

  // Метод prepareMessage приймає текст повідомлення та повертає готове повідомлення для відправки.
  prepareMessage(text) {
    return `[${this.alias}]: ${text}`;
  }
}

// Клас SMSCommunicator відповідає за відправку повідомлень через SMS.
class SMSCommunicator {
  static transmit(message) {
    console.log(`Відправлено SMS: ${message}`);
  }
}

// Клас EmailCommunicator відповідає за відправку повідомлень через Email.
class EmailCommunicator {
  static transmit(message) {
    console.log(`Відправлено Email: ${message}`);
  }
}

console.log("Завдання 7 ====================================");

// Створюємо двох користувачів - Max та Linda - які відправляють повідомлення за допомогою різних засобів комунікації.
const max = new Participant("Max", SMSCommunicator);
const linda = new Participant("Linda", EmailCommunicator);

// Max відправляє повідомлення через SMS.
max.dispatchMessage("Hello!"); // Виведе: Відправлено SMS: [Max]: Hello!

// Linda відправляє повідомлення через Email.
linda.dispatchMessage("Hello!"); // Виведе: Відправлено Email: [Linda]: Hello!
