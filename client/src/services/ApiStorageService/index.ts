import { LOCAL_STORAGE_DATE_KEY } from "../../const";
import { LocalStorageService } from "./LocalStorageService";
import { IRefreshResponse, ITodo } from "../../store/types";
import type { AppDispatch } from "../../store";

export class ApiStorageService {
  static async saveTodo(todo: ITodo): Promise<ITodo> {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data: ITodo = await response.json();
        return data;
      } else {
        throw new Error("Error saving");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error saving");
      }
    }
  }

  static async getTodos(): Promise<ITodo[]> {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data: ITodo[] = await response.json();
        return data;
      } else {
        throw new Error("Error getting todos");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error getting todos");
      }
    }
  }

  static async updateTodo(todo: ITodo): Promise<ITodo> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${todo._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data: ITodo = await response.json();
        return data;
      } else {
        throw new Error("Error updating");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error updating");
      }
    }
  }

  static async removeTodo(id: string): Promise<string> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data: string = await response.json();
        return data;
      } else {
        throw new Error("Error deleting");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error deleting");
      }
    }
  }

  static async saveDateFilterState(state: string): Promise<void> {
    try {
      const key = LOCAL_STORAGE_DATE_KEY;
      LocalStorageService.saveData<string>(key, state);
    } catch (error) {
      throw new Error("some error");
    }
  }

  static async getDateFilterState(): Promise<string> {
    try {
      const key = LOCAL_STORAGE_DATE_KEY;
      const state = await LocalStorageService.getDateData(key);
      return state;
    } catch (error) {
      throw new Error("some error");
    }
  }

  static async subscribeRefreshTodoOnServer(callback: (arg: IRefreshResponse, func: AppDispatch) => void, func: AppDispatch) {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/connection`
    );
    eventSource.onmessage = (event: MessageEvent) => {
      const data: IRefreshResponse = JSON.parse(event.data);
      callback(data, func)
    };
  }
}
