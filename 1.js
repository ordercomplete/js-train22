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
