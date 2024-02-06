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
