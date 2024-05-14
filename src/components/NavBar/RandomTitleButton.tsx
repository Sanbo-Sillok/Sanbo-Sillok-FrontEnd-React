import RandomSVG from '@/assets/RandomSVG';

export default function RandomTitleButton() {
  return (
    <button
      type="button"
      aria-label="random wiki"
      className="flex h-10 w-10 items-center justify-center rounded-lg duration-200 hover:bg-base-600 hover:bg-opacity-30"
    >
      <RandomSVG />
    </button>
  );
}
