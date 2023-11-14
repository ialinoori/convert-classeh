interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: any;
  multiple?: boolean; // Make it optional by adding a question mark
  error?: string;
}


const Input: React.FC<InputProps> = ({
  label,
  type="text",
  value,
  onChange,
  name,
  required,
  multiple,
  error,
}) => {


  return (
    <div className="input-container">
      <div className="entryarea">
        <input
          className={`input ${error ? "error" : ""}`}
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          required={required}
          multiple={multiple}
        />
        <div className={`labelline ${error ? "error" : ""}`}>{label}</div>
      </div>

      {error && (
        <p className="error-message mt-2 text-[#FF4F4F] text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input;