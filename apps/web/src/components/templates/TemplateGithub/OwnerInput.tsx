interface OwnerInputProps {
  onChange: (input: string) => void;
}

export const OwnerInput = (props: OwnerInputProps) => {
  const { onChange } = props;

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Owner Name
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="owner"
          id="owner"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Kubessandra"
        />
      </div>
    </div>
  );
};
