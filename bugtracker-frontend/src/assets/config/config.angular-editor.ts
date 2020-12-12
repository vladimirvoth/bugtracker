import { AngularEditorConfig } from '@kolkov/angular-editor';

export const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '250px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter description here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'undo',
      'redo',
      'strikeThrough',
      'subscript',
      'superscript',
      'indent',
      'outdent',
      'insertUnorderedList',
      'insertOrderedList'
    ],
    [
      'backgroundColor',
      'customClasses',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode'
    ]
  ]
};
