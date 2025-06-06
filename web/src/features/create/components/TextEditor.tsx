import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { MenuBar } from './MenuBar';
import Highlight from '@tiptap/extension-highlight';
import { useEffect } from 'react';

type PropsType = {
   content: string;
   onChange: (content: string) => void;
};

export function TextEditor({ content, onChange }: PropsType) {
   const editor = useEditor({
      content: content,
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
                  class: 'border-l-4 border-neutral-700 bg-neutral-200 dark:bg-neutral-900 p-4 my-4 italic ',
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
            class: 'scrollbar-hidden h-160 resize-none border rounded-md bg-neutral-100 dark:bg-neutral-900 p-3 overflow-y-auto',
         },
      },
      onUpdate: ({ editor }) => {
         onChange(editor.getHTML());
      },
   });

   useEffect(() => {
      if (editor && content !== editor.getHTML()) {
         editor.commands.setContent(content || '', false);
      }
   }, [content, editor]);

   return (
      <>
         <MenuBar editor={editor} />
         <EditorContent editor={editor} />
      </>
   );
}
