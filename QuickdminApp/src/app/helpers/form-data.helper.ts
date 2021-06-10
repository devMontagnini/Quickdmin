export class FormDataHelper {
  static fromObject(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (!object[key]) { return; }
      const value = object[key];
      const hasFile = key.match(/upload_(.*)/g);
      formData.append(key, value, hasFile ? value.name : null);
    });
    return formData;
  }
}