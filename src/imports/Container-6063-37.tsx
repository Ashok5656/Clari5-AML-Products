import svgPaths from "./svg-aku17jvqll";

function Icon() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <path d={svgPaths.p2825d780} fill="var(--fill-0, #2A53A0)" id="Vector" />
      </svg>
      <div className="absolute inset-[31%_23%_29.5%_23%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.92 18.96">
          <path d={svgPaths.p31f76f00} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[156px] size-[48px] top-[33.91px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[30px] left-[139.33px] top-[97.91px] w-[81.328px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[30px] left-[41.5px] not-italic text-[#2a53a0] text-[20px] text-center top-0 whitespace-nowrap">Success</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[72.5px] not-italic text-[#767676] text-[16px] text-center top-[-2px] whitespace-nowrap">Event Successfully</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[72.06px] not-italic text-[#767676] text-[16px] text-center top-[-2px] whitespace-nowrap">Created</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[51.188px] items-start left-[108.38px] top-[135.91px] w-[143.25px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[205_0_0] min-h-px min-w-px relative w-[360px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container2 />
        <Heading />
        <Container3 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#2a53a0] h-[55px] relative shrink-0 w-[360px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Continue</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Container">
      <Container1 />
      <Button />
    </div>
  );
}