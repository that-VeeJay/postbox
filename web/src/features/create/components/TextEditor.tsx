import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { MenuBar } from './MenuBar';
import Highlight from '@tiptap/extension-highlight';

export function TextEditor() {
   const editor = useEditor({
      content: '',
      extensions: [
         StarterKit.configure({
            bulletList: {
               HTMLAttributes: {
                  class: 'list-disc ml-10',
               },
            },
            orderedList: {
               HTMLAttributes: {
                  class: 'list-decimal ml-10',
               },
            },
            blockquote: {
               HTMLAttributes: {
                  class: 'border-l-4 border-blue-500 bg-neutral-800 p-4 my-4 italic text-neutral-300',
               },
            },
            codeBlock: {
               HTMLAttributes: {
                  class: 'bg-neutral-800 text-neutral-100 font-mono text-sm rounded-md p-4 my-4 overflow-x-auto',
               },
            },
         }),
         TextAlign.configure({
            types: ['heading', 'paragraph'],
         }),
         Highlight.configure({
            HTMLAttributes: {
               class: '',
            },
         }),
      ],
      editorProps: {
         attributes: {
            class: 'scrollbar-hidden h-170 resize-none border rounded-md bg-neutral-900 p-3 overflow-y-auto',
         },
      },
      onUpdate: ({ editor }) => {
         console.log(editor.getHTML());
      },
   });

   return (
      <>
         <MenuBar editor={editor} />
         <EditorContent editor={editor} />
      </>
   );
}
