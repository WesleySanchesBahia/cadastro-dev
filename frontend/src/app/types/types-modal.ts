export type config = {
  title:string | null,
  content:any | null,
  width: 'max-content' | 'min-content' | 'fit-content' | 'auto' | string,
  maxWidth: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  minWidth: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  height: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  maxHeight: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  minHeight: "max-content" | "min-content" | "fit-content" | 'auto' | string,
}
