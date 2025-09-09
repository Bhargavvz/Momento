import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { motion } from 'framer-motion';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../ui/Button';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  isWritingMode: boolean;
  onToggleWritingMode: () => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  onSave,
  isWritingMode,
  onToggleWritingMode,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'What\'s on your mind today?',
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const ToolbarButton: React.FC<{
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
  }> = ({ onClick, isActive, children }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        p-2 rounded-lg transition-colors
        ${isActive 
          ? 'bg-primary-100 text-primary-700' 
          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
        }
      `}
    >
      {children}
    </motion.button>
  );

  return (
    <div className={`${isWritingMode ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      <div className={`${isWritingMode ? 'max-w-4xl mx-auto h-full flex flex-col p-8' : ''}`}>
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-4">
          <div className="flex items-center space-x-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
            >
              <Bold size={18} />
            </ToolbarButton>
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
            >
              <Italic size={18} />
            </ToolbarButton>

            <div className="w-px h-6 bg-neutral-200 mx-2" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
            >
              <List size={18} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
            >
              <ListOrdered size={18} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
            >
              <Quote size={18} />
            </ToolbarButton>

            <div className="w-px h-6 bg-neutral-200 mx-2" />

            <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
              <Undo size={18} />
            </ToolbarButton>

            <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
              <Redo size={18} />
            </ToolbarButton>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleWritingMode}
            >
              {isWritingMode ? <EyeOff size={16} /> : <Eye size={16} />}
              <span className="ml-1">{isWritingMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </Button>

            <Button onClick={onSave} size="sm">
              <Save size={16} className="mr-1" />
              Save
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className={`flex-1 ${isWritingMode ? 'overflow-y-auto' : ''}`}>
          <EditorContent editor={editor} className="h-full" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 text-sm text-neutral-500">
          <div>
            {editor.storage.characterCount.characters()} characters, {editor.storage.characterCount.words()} words
          </div>
          <div>
            Auto-save enabled
          </div>
        </div>
      </div>
    </div>
  );
};