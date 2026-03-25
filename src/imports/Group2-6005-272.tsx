import imgImage3 from "figma:asset/c7f2fb95f074ae4b35715b5993bd60d9c4a656fc.png";
import imgImage4 from "figma:asset/a9464dea62141888c00d322a5e22ca1aafce1de0.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[723px] left-px top-[762px] w-[1684px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
      <div className="absolute h-[772px] left-0 top-0 w-[1684px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
    </div>
  );
}