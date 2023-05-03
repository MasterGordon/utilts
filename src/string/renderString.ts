type Template<
  T extends string,
  Data extends Record<string, string> = {}
> = T extends `${string}{${infer Key}}${infer Rest}`
  ? Template<Rest, { [K in Key | keyof Data]: string }>
  : Data;

type RenderString<T extends string> =
  T extends `${infer Start}{${infer Key}}${infer Rest}`
    ? `${Start}${string}${RenderString<Rest>}`
    : T;

export const renderString = <T extends string>(
  template: T,
  data: Template<T>
) => {
  const entries = Object.entries(data);
  return entries.reduce<string>((acc, [key, value]) => {
    return acc.replace(new RegExp(`{${key}}`, "g"), String(value));
  }, template) as RenderString<T>;
};
