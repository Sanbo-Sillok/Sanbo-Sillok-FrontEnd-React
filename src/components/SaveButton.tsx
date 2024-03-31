interface SaveButtonProps {
  isLoading: boolean;
}

export default function SaveButton({ isLoading }: SaveButtonProps) {
  return isLoading ? (
    <span className="rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300">Loading</span>
  ) : (
    <button type="button" className="rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300">
      Save
    </button>
  );
}
