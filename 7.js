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
