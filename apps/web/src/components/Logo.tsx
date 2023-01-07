import Image from "next/image";

interface LogoProps {
  size: number;
}

export const Logo = (props: LogoProps) => {
  const { size } = props;
  return (
    <>
      <span className="sr-only">Motionify</span>
      <Image
        className="m-2"
        height={size}
        width={size}
        src="/logo.png"
        alt="Logo"
      />
    </>
  );
};
