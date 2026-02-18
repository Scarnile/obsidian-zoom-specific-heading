import { editorInfoField } from "obsidian";

import { EditorState } from "@codemirror/state";

export function getDocumentTitle(state: EditorState) {
  const editorView = state.field(editorInfoField);
  // If editorView has a MarkdownFileInfo property
  return editorView.file?.basename || "Untitled";
}
