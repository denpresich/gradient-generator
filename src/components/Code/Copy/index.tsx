import React from "react";

import Image from "next/image";

export interface CopyProps {
  className?: string;
  value: string;
}

const CopyIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3.5" y="3.5" width="9" height="9" rx="1.5" stroke="white" />
    <path d="M9 1H2C1.44772 1 1 1.44772 1 2V9" stroke="white" />
  </svg>
);

export const Copy: React.FC<CopyProps> = ({ className, value }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Image
      className={className}
      onClick={handleClick}
      height={24}
      width={24}
      alt="Copy css code"
      src="/copy.svg"
    />
  );
};
