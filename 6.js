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
