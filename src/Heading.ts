import { EditorPosition, EditorRange } from "obsidian";

export interface Heading {
  level: number;
  text: string;
  line: number;
  position: EditorPosition;
  range: EditorRange;
  offset: number;
}
