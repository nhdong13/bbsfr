import Image from "next/image";

export const renderStart = (rate) => {
  let element;
  switch (rate) {
    case 1:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
        </div>
      );
      break;
    case 1.5:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-path.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
        </div>
      );
      break;
    case 2:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
        </div>
      );
      break;
    case 2.5:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-path.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
        </div>
      );
      break;
    case 3:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
        </div>
      );
      break;
    case 3.5:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-path.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
        </div>
      );
      break;
    case 4:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-empty.svg" />
        </div>
      );
      break;
    case 4.5:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-path.svg" />
        </div>
      );
      break;
    case 5:
      element = (
        <div style={{ display: "flex" }}>
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
          <Image width={24} height={24} src="/icons/start-full.svg" />
        </div>
      );
      break;
    default:
      break;
  }
  return element;
};
