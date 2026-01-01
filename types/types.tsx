export interface TextItem {
  id: string;
  text: string;
}

export type DifficultyProps = "easy" | "medium" | "hard";

export interface DifficultyData {
  easy: TextItem[];
  medium: TextItem[];
  hard: TextItem[];
}