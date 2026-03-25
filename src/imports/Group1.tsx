import imgImage1 from "figma:asset/b2c4fda5404fd29c66f77547cb5927933d6de514.png";
import imgImage2 from "figma:asset/a38d0d2a8b2fd753a827564333087b907f6515a4.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[601px] left-0 top-[3158px] w-[1878px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[3035px] left-0 top-0 w-[1074px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
    </div>
  );
}