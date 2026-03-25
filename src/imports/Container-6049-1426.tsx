import svgPaths from "./svg-p74lqgukn0";

function Icon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p35945c80} fill="var(--fill-0, #2A53A0)" id="Vector" />
          <g id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#f0fdf4] content-stretch flex items-center justify-center left-[168px] rounded-[33554400px] size-[64px] top-[32px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-[167.92px] not-italic text-[#161616] text-[20px] text-center top-0 whitespace-nowrap">Success!</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-[168.27px] not-italic text-[#6a7282] text-[0px] text-[14px] text-center top-0 w-[304px]">
        <span className="leading-[22.75px]">{`Your Custom Event `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[22.75px]">{`"Sample Event"`}</span>
        <span className="leading-[22.75px]">{` has been created and sent for Approval.`}</span>
      </p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[83.5px] items-start left-[32px] top-[112px] w-[336px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#2a53a0] h-[48px] left-[32px] rounded-[8px] top-[219.5px] w-[336px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[168.31px] not-italic text-[14px] text-center text-white top-[13.5px] whitespace-nowrap">Continue</p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white overflow-clip relative rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Container">
      <Container1 />
      <Container2 />
      <Button />
    </div>
  );
}