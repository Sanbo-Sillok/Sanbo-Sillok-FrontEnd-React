interface MenuButtonProps {
  handleToggle: () => void;
}

export default function MenuButton({ handleToggle }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex h-10 w-10 flex-col justify-center rounded-md p-2 text-gray-200 transition-all duration-300 hover:bg-base-600 hover:bg-opacity-10"
      title="mobile-menu"
      aria-label="menuButton"
    >
      <span className="mb-2 block w-full border " />
      <span className="block w-full border" />
      <span className="mt-2 block w-full border " />
    </button>
  );
}
