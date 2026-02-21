import { Editor, EditorPosition } from "obsidian";

export function findHeadingPosition(
  editor: Editor,
  headingText: string
): EditorPosition | null {
  const lineCount = editor.lineCount();

  for (let line = 0; line < lineCount; line++) {
    const text = editor.getLine(line);

    const match = text.match(/^(#{1,6})\s+(.*)/);
    if (match && match[2].trim() === headingText) {
      return { line, ch: 0 };
    }
  }

  return null;
}
