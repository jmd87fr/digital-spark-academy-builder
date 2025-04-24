
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from './textarea';

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  preview?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
}

export const MarkdownEditor = React.forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  ({ value, onChange, preview = true, className, ...props }, ref) => {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`min-h-[200px] font-mono ${className || ''}`}
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
