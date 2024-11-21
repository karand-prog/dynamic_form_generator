import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
//import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const App: React.FC = () => {
  const [json, setJson] = useState<string>(JSON.stringify(sampleSchema, null, 2));
  const [schema, setSchema] = useState<FormSchema | null>(sampleSchema);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Form Submitted:', data);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form_submission.json';
    a.click();
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson(value);
    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
    } catch {
      setSchema(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
    alert('JSON copied to clipboard!');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Left Panel: JSON Editor */}
        <div className="w-full lg:w-1/2 p-4 border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
          <textarea
            className="w-full h-96 p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
            value={json}
            onChange={handleJsonChange}
          />
          {!schema && <p className="text-red-500 mt-2">Invalid JSON</p>}
          <div className="flex items-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={copyToClipboard}
            >
              Copy JSON
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>

        {/* Right Panel: Form Preview */}
        <div className="w-full lg:w-1/2 p-4">
          {schema ? (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-xl font-bold">{schema.formTitle}</h2>
              <p className="text-gray-600 dark:text-gray-300">{schema.formDescription}</p>
              {schema.fields.map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label className="font-medium">{field.label}</label>
                  {field.type === 'text' || field.type === 'email' ? (
                    <input
                      type={field.type}
                      {...register(field.id, {
                        required: field.required ? 'This field is required' : false,
                        pattern: field.validation?.pattern
                          ? { value: new RegExp(field.validation.pattern), message: field.validation.message }
                          : undefined,
                      })}
                      placeholder={field.placeholder}
                      className="border p-2 rounded dark:bg-gray-800"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      {...register(field.id, { required: field.required ? 'This field is required' : false })}
                      className="border p-2 rounded dark:bg-gray-800"
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'radio' ? (
                    field.options?.map((option) => (
                      <label key={option.value} className="inline-flex items-center space-x-2">
                        <input
                          type="radio"
                          value={option.value}
                          {...register(field.id, { required: field.required ? 'This field is required' : false })}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))
                  ) : field.type === 'textarea' ? (
                    <textarea
                      {...register(field.id, { required: field.required ? 'This field is required' : false })}
                      placeholder={field.placeholder}
                      className="border p-2 rounded dark:bg-gray-800"
                    />
                  ) : null}
                  {errors[field.id] && (
                    <p className="text-red-500 text-sm">{String(errors[field.id]?.message)}</p>
                  )}
                </div>
              ))}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </form>
          ) : (
            <p className="text-red-500">Invalid JSON schema</p>
          )}
        </div>
      </div>
    </div>
  );
};

const sampleSchema: FormSchema = {
  formTitle: "Enhanced Dynamic Form",
  formDescription: "Please fill out this enhanced form below.",
  fields: [
    { id: "name", type: "text", label: "Name", required: true, placeholder: "Enter your name" },
    {
      id: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "example@example.com",
      validation: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message: "Invalid email address" },
    },
    {
      id: "role",
      type: "select",
      label: "Role",
      required: true,
      options: [
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Designer" },
      ],
    },
  ],
};

export default App;
