/** Server action'ların ortak dönüş tipi. "use server" dosyaları yalnızca
 * async fonksiyon dışa aktarabildiği için sabitler burada tutulur. */
export interface ActionState {
  status: "idle" | "success" | "error";
  message?: string;
}

export const idleState: ActionState = { status: "idle" };
