export class LocalStorageService {

  static async getDateData(key: string): Promise<string> {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      } else {
        return "";
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  static async saveData<T>(key: string, data: T): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error("some error");
    }
  }
}
