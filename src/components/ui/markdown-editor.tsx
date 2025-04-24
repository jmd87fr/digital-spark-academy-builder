
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from './textarea';

interface MarkdownEditorProps extends React.ComponentPropsWithoutRef<'textarea'> {
  value?: string;
  onChange?: (value: string) => void;
  preview?: boolean;
}

export const MarkdownEditor = React.forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  ({ value, onChange, preview = true, ...props }, ref) => {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="min-h-[200px] font-mono"
            placeholder="Utilisez la syntaxe Markdown pour mettre en forme votre texte..."
            {...props}
          />
        </div>
        
        {preview && value && (
          <div className="p-4 border rounded-md bg-background prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{value || ''}</ReactMarkdown>
          </div>
        )}
      </div>
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';
