interface SaveButtonProps {
  disabled: boolean;
}

const saveButtonClassName = 'rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300';

export default function SaveButton({ disabled }: SaveButtonProps) {
  if (disabled) return <span className={saveButtonClassName}>Loading</span>;

  return (
    <button type="submit" className={saveButtonClassName}>
      Save
    </button>
  );
}
