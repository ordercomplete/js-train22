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
