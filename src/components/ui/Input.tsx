type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="border px-3 py-2 rounded w-full mb-4"
    />
  );
};

export default Input;
