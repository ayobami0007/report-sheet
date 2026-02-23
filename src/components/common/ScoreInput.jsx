const ScoreInput = ({
  value,
  onChange,
  max = 100,
  placeholder = "–",
  className = "",
}) => (
  <input
    type="number"
    min="0"
    max={max}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full border-b border-blue-200 text-sm text-center px-1 py-0.5 focus:outline-none focus:border-blue-500 bg-transparent
      print:border-gray-400 print:text-[10px]
      ${className}`}
  />
);

export default ScoreInput;
