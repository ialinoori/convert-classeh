const Input = ({
  label,
  type="text",
  value,
  onChange,
  name,
  required,
  multiple,
  error,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      const regex = /^[a-zA-Z0-9]+$/; // Allow only alphanumeric characters

      if (!regex.test(value)) {
        setUsernameError("نام کاربری فقط می تواند شامل حروف و اعداد باشد.");
      } else {
        setUsernameError("");
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

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