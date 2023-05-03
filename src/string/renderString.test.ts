import { describe, it, expect, assertType } from "vitest";
import { renderString } from "./renderString";

describe("renderString", () => {
  it("should render a string", () => {
    const template = "Hello {name}, you are {age} years old";
    const data = { name: "John", age: "42" };
    const expected = "Hello John, you are 42 years old";
    const result = renderString(template, data);

    expect(result).toEqual(expected);
  });

  it("should only accept string keys", () => {
    const template = "Hello {name}, you are {age} years old";
    renderString(template, {
      name: "John",
      age: "42",
      // @ts-expect-error should not accept not string keys
      foo: "bar",
    });
  });

  it("should return template typed string", () => {
    const template = "Hello {name}, you are {age} years old";
    const data = { name: "John", age: "42" };
    const result = renderString(template, data);

    assertType<`Hello ${string}, you are ${string} years old`>(result);
  });
});
