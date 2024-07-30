import { Link } from "react-router-dom";

type CustomLinkProps = {
  to: string;
  linkName: string;
  customStyle: string;
};

export const CustomLink = ({ customStyle, to, linkName }: CustomLinkProps) => {
  return (
    <Link
      className={`py-2 px-4 capitalize  ${customStyle} text-white  hover:scale-105 transition-transform font-semibold`}
      to={to}
    >
      {linkName}
    </Link>
  );
};
