const InputField = ({
  value,
  onChange,
  placeholder,
  className = "",
  type = "text",
  readOnly = false,
  label = "",
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-xs font-semibold text-blue-800 mb-1">
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`border border-blue-200 rounded px-2 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white placeholder-gray-300 print:border-gray-300 print:rounded-none ${
        readOnly ? "bg-blue-50 font-semibold text-blue-900" : ""
      } ${className}`}
    />
  </div>
);

export default InputField;
