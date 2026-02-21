import { Editor, EditorPosition, EditorRange } from "obsidian";

import { Heading } from "src/Heading";

export function getHeadingsFromEditor(editor: Editor): Heading[] {
  const headings: Heading[] = [];
  const lineCount = editor.lineCount();

  for (let line = 0; line < lineCount; line++) {
    const lineText = editor.getLine(line);

    const match = lineText.match(/^(#{1,6})\s+(.*)/);
    if (match) {
      const from: EditorPosition = { line, ch: 0 };
      const to: EditorPosition = { line, ch: lineText.length };

      const range: EditorRange = { from, to };
      console.log(editor.posToOffset({ line, ch: 0 }));
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        line,
        position: from,
        range,
        offset: editor.posToOffset({ line, ch: 0 }),
      });
    }
  }

  return headings;
}
