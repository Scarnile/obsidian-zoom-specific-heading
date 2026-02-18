import { Editor } from "obsidian";

import { Heading } from "src/Heading";

export function getHeadingsFromEditor(editor: Editor): Heading[] {
  const headings: Heading[] = [];
  const lineCount = editor.lineCount();

  for (let line = 0; line < lineCount; line++) {
    const lineText = editor.getLine(line);

    const match = lineText.match(/^(#{1,6})\s+(.*)/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        line,
      });
    }
  }

  return headings;
}
