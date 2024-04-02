export default function ScrollTop() {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      className="fixed bottom-10 right-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-base-800 text-base-200 duration-100 ease-in active:bg-base-400 dark:bg-base-600 dark:active:bg-base-800"
    >
      ⋀
    </button>
  );
}
