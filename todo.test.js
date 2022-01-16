/**
 * @jest-environment jsdom
 */
import  { addTask } from "./script";

test("Добавление задачи", () => {
  expect(addTask("Молоко")).toBe("Задача добавлена");
});

test("Добавление пустой задачи", () => {
  expect(addTask()).toBe("Должно содержать значение");
});