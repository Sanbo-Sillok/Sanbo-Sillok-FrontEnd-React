interface SaveButtonProps {
  disabled: boolean;
}

export default function SaveButton({ disabled }: SaveButtonProps) {
  return disabled ? (
    <span className="rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300">Loading</span>
  ) : (
    <button type="submit" className="rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300">
      Save
    </button>
  );
}
