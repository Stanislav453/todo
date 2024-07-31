type ButtonProps = {
  buttonName: string;
  customStyle?: string;
  action?: () => void;
};

export const CustomButton = ({
    buttonName,
  customStyle,
  action,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={action}
      className={`py-2 px-4 capitalize ${customStyle} text-white  hover:scale-110 transition-transform font-semibold`}
    >
      {buttonName}
    </button>
  );
};
