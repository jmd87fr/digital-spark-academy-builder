
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from './textarea';

interface MarkdownEditorProps {
  value?: string;
  defaultValue?: string; // Add defaultValue prop
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
  ({ value, defaultValue, onChange, preview = true, className, ...props }, ref) => {
    // Use React.useState to handle internal state based on defaultValue
    const [internalValue, setInternalValue] = React.useState(defaultValue || value || '');
    
    // Update internal value when external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);
    
    // Handle changes to the textarea
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    return (
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            ref={ref}
            value={value !== undefined ? value : internalValue}
            onChange={handleChange}
            className={`min-h-[200px] font-mono ${className || ''}`}
            placeholder="Utilisez la syntaxe Markdown pour mettre en forme votre texte..."
            {...props}
          />
        </div>
        
        {preview && internalValue && (
          <div className="p-4 border rounded-md bg-background prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{internalValue || ''}</ReactMarkdown>
          </div>
        )}
      </div>
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';
