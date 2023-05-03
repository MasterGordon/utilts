export const stringTemplate = (template: string, data: any) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const func = new Function(...keys, `return \`${template}\``);
  return func(...values);
}
