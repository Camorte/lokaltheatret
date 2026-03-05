const LoadingSpinner = ({ colorBlack }: { colorBlack?: boolean }) => {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div
        className={`text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${colorBlack ? 'text-black' : 'text-white'}`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
