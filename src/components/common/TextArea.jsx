const TextArea = ({
  value,
  onChange,
  placeholder,
  label = "",
  rows = 2,
  className = "",
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-xs font-semibold text-blue-800 mb-1">
        {label}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`border border-blue-200 rounded px-2 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white placeholder-gray-300
        print:border-0 print:border-b print:border-gray-400 print:rounded-none print:bg-transparent print:text-[10px]
        ${className}`}
    />
  </div>
);

export default TextArea;
