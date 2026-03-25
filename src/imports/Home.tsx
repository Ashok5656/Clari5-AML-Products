import svgPaths from "./svg-dfmn00rjlh";
import imgWae from "figma:asset/6dfdb4c1a68d250267231b32de1f1a07e05b6acf.png";

function Wae1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[92.281px]" data-name="Wae">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgWae} />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Wae1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white h-[46px] left-0 top-0 w-[259px]" data-name="Container">
      <div className="content-stretch flex items-center overflow-clip pb-px px-[20px] relative rounded-[inherit] size-full">
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16.5px] left-[20px] not-italic text-[#525252] text-[11px] top-[8px] tracking-[0.55px] uppercase whitespace-nowrap">Main menu</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="menu.icon">
          <path d="M12 10.5H13V13H12V10.5Z" fill="var(--fill-0, #2A53A0)" id="Vector" />
          <path d="M10 8H11V13H10V8Z" fill="var(--fill-0, #2A53A0)" id="Vector_2" />
          <path d={svgPaths.p287dc200} fill="var(--fill-0, #2A53A0)" id="Vector_3" />
          <path d={svgPaths.p15fb9780} fill="var(--fill-0, #2A53A0)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Wae2() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[#2a53a0] text-[15px] top-[-2px] whitespace-nowrap">Dashboard</p>
      </div>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="bg-[#eaf2ff] h-[46px] relative shrink-0 w-full" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#2a53a0] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] relative size-full">
          <Icon />
          <Wae2 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="menu.icon">
          <path d={svgPaths.p2acbe800} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.pb1a8400} fill="var(--fill-0, #161616)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Wae3() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#161616] text-[15px] top-[-2px] whitespace-nowrap">Data Maintenance</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.7 10">
          <path d={svgPaths.p1f22e100} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Wae4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function SlotClone1() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] relative size-full">
          <Icon1 />
          <Wae3 />
          <Wae4 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p250c5780} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Wae5() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#161616] text-[15px] top-[-2px] whitespace-nowrap">Scenarios</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.7 10">
          <path d={svgPaths.p1f22e100} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Wae6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function SlotClone2() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] relative size-full">
          <Icon3 />
          <Wae5 />
          <Wae6 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pfa7b3c0} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.p34a49900} fill="var(--fill-0, #161616)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Wae7() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#161616] text-[15px] top-[-2px] whitespace-nowrap">System Configuration</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.7 10">
          <path d={svgPaths.p1f22e100} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Wae8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function SlotClone3() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] relative size-full">
          <Icon5 />
          <Wae7 />
          <Wae8 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p5895080} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Wae9() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#161616] text-[15px] top-[-2px] whitespace-nowrap">My Work</p>
      </div>
    </div>
  );
}

function SlotClone4() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] relative size-full">
          <Icon7 />
          <Wae9 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3ed87700} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.p32c1b80} fill="var(--fill-0, #161616)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Wae10() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#161616] text-[15px] top-[-2px] whitespace-nowrap">Pending Verification</p>
      </div>
    </div>
  );
}

function SlotClone5() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] relative size-full">
          <Icon8 />
          <Wae10 />
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pfa7b3c0} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.p34a49900} fill="var(--fill-0, #161616)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Wae11() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#161616] text-[15px] top-[-2px] whitespace-nowrap">Settings</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.7 10">
          <path d={svgPaths.p1f22e100} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Wae12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Wae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function SlotClone6() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] relative size-full">
          <Icon9 />
          <Wae11 />
          <Wae12 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[382px] items-start relative shrink-0 w-full" data-name="Navigation">
      <Container4 />
      <SlotClone />
      <SlotClone1 />
      <SlotClone2 />
      <SlotClone3 />
      <SlotClone4 />
      <SlotClone5 />
      <SlotClone6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[259px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Navigation />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[992px] items-start left-0 overflow-clip top-[46px] w-[259px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Wae() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-r border-solid h-[1038px] left-0 overflow-clip top-0 w-[260px]" data-name="Wae">
      <Container />
      <Container2 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p31d60200} fill="var(--fill-0, #6A7282)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SlotClone7() {
  return (
    <div className="bg-[#f9fafb] flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[4px]" data-name="SlotClone">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex items-center left-[20px] size-[28px] top-[8.5px]" data-name="Container">
      <SlotClone7 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p39ac08b0} fill="var(--fill-0, #6A7282)" id="Vector" />
          <path d={svgPaths.p19c75c80} fill="var(--fill-0, #6A7282)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function SlotClone8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[4px] size-[28px] top-[3px]" data-name="SlotClone">
      <Icon12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p368818f0} fill="var(--fill-0, #6A7282)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SlotClone9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[40px] rounded-[4px] size-[28px] top-[3px]" data-name="SlotClone">
      <Icon13 />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[#e5e7eb] h-[28px] left-[122px] top-[3px] w-px" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[15px] relative shrink-0 w-[6.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[3.5px] not-italic text-[10px] text-center text-white top-0 whitespace-nowrap">R</p>
      </div>
    </div>
  );
}

function Hae1() {
  return (
    <div className="bg-[#2a53a0] relative rounded-[33554400px] shrink-0 size-[24px]" data-name="Hae">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[2px] pr-[2.016px] py-[2px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[11px] relative shrink-0 w-[74px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[11px] left-[37px] not-italic text-[#0a0a0a] text-[11px] text-center top-[-1px] whitespace-nowrap">Rajesh Kumar</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[109.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[55.5px] not-italic text-[#6a7282] text-[8px] text-center top-0 tracking-[0.4px] uppercase whitespace-nowrap">System Administrator</p>
      </div>
    </div>
  );
}

function Hae2() {
  return (
    <div className="h-[25px] relative shrink-0 w-[109.313px]" data-name="Hae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function SlotClone10() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[34px] items-center left-[137px] pl-[7px] pr-px py-px rounded-[4px] top-0 w-[161.313px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Hae1 />
      <Hae2 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[5px] size-[18px] top-[5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p273de970} fill="var(--fill-0, #6A7282)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return <div className="absolute bg-[#fb2c36] border-2 border-solid border-white left-0 rounded-[33554400px] size-[8px] top-0" data-name="Text" />;
}

function Hae3() {
  return (
    <div className="absolute left-[12px] size-[8px] top-[8px]" data-name="Hae">
      <Text3 />
    </div>
  );
}

function SlotClone11() {
  return (
    <div className="absolute left-[80px] rounded-[4px] size-[28px] top-[3px]" data-name="SlotClone">
      <Icon14 />
      <Hae3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[34px] left-[1339.69px] top-[5.5px] w-[298.313px]" data-name="Container">
      <SlotClone8 />
      <SlotClone9 />
      <Container8 />
      <SlotClone10 />
      <SlotClone11 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3121e300} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[13px] whitespace-nowrap">Search Genie</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex gap-[12px] h-[34px] items-center left-[669px] px-[17px] py-px rounded-[8px] top-[5.5px] w-[320px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon15 />
      <TextInput />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
      <Container9 />
    </div>
  );
}

function Hae() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[46px] items-start pb-px right-0 top-0 w-[1660px]" data-name="Hae">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[30px] left-0 not-italic text-[#161616] text-[20px] top-0 whitespace-nowrap">Dashboard Overview</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[30px] relative shrink-0 w-[200.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading1 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[36.5px] not-italic text-[#2a53a0] text-[14px] text-center top-0 whitespace-nowrap">Dashboard</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[72.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[5.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1px] whitespace-nowrap">/</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[31.5px] not-italic text-[#161616] text-[14px] text-center top-0 whitespace-nowrap">Overview</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text4 />
        <Button1 />
      </div>
    </div>
  );
}

function XR() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="xR">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[156.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <XR />
      </div>
    </div>
  );
}

function St() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46px] items-center justify-between pb-px px-[16px] right-0 top-[46px] w-[1660px]" data-name="St">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[16px] top-[12.5px] w-[628.656px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Your license will expire on June 12, 2026</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_6013_13245)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p33e56000} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_6013_13245">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[209.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Clari5 - A Perfios Software Company</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[16px] items-center justify-center left-[644.66px] pr-[0.016px] top-[12.5px] w-[628.672px]" data-name="Container">
      <Icon16 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[87.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Important Links</p>
      </div>
    </div>
  );
}

function Headset() {
  return (
    <div className="absolute contents inset-[6.37%_6.25%_6.23%_6.25%]" data-name="Headset">
      <div className="absolute inset-[6.37%_6.25%_6.23%_6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13.9846">
          <path d={svgPaths.p3939ba00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Headset />
    </div>
  );
}

function LAe() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4px] size-[16px] top-[4px]" data-name="LAe">
      <Icon17 />
    </div>
  );
}

function VAe() {
  return (
    <div className="absolute bg-[#393939] left-0 rounded-[24px] size-[24px] top-[2px]" data-name="VAe">
      <LAe />
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute contents inset-[0_9.37%_9.38%_9.35%]" data-name="Vector">
      <div className="absolute bottom-[59.38%] left-[59.38%] right-1/4 top-1/4" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.49999 2.5">
          <path d={svgPaths.p1948cf0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[12.5%_12.5%_59.38%_59.38%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49999 4.5">
          <path d={svgPaths.p3f6f2f80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_9.37%_9.38%_9.35%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0044 14.5">
          <path d={svgPaths.p33219e00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function PhoneVoice() {
  return (
    <div className="absolute contents inset-[0_9.37%_9.38%_9.35%]" data-name="Phone--voice">
      <Vector />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <PhoneVoice />
    </div>
  );
}

function BAe() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4px] size-[16px] top-[4px]" data-name="BAe">
      <Icon18 />
    </div>
  );
}

function Ae() {
  return (
    <div className="absolute bg-[#393939] left-[32px] rounded-[24px] size-[24px] top-[2px]" data-name="$Ae">
      <BAe />
    </div>
  );
}

function ZAe() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[56px]" data-name="zAe">
      <VAe />
      <Ae />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[28px] relative shrink-0 w-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ZAe />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center justify-end left-[1273.33px] top-[6.5px] w-[628.672px]" data-name="Container">
      <Text6 />
      <Container17 />
    </div>
  );
}

function HAe() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] border-[#e5e7eb] border-solid border-t bottom-0 h-[42px] left-0 w-[1918px]" data-name="HAe">
      <Container14 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p22a1e670} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-0 p-px rounded-[8px] size-[48px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon19 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[25px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[25px] min-h-px min-w-px not-italic relative text-[20px] text-white">Welcome Back, Rajesh Kumar</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16.5px] opacity-90 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#dbeafe] text-[11px] top-0 tracking-[0.275px] whitespace-nowrap">Advance your fraud detection with high-density scenario authoring.</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col h-[41.5px] items-start left-[64px] top-[3.25px] w-[374.516px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Container23() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[40px] left-[462.52px] top-[4px] w-px" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#bedbff] text-[10px] top-0 tracking-[0.5px] uppercase whitespace-nowrap">Current Time</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[18px] text-white top-0 whitespace-nowrap">08:23 AM</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] h-[35px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#bedbff] text-[10px] top-0 tracking-[0.5px] uppercase whitespace-nowrap">{`Today's Date`}</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[18px] text-white top-0 whitespace-nowrap">Mar 2</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[35px] relative shrink-0 w-[79.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[35px] items-start left-[487.52px] top-[6.5px] w-[190.578px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[48px] relative shrink-0 w-[678.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container21 />
        <Container22 />
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p33c7d000} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-[170.55px] size-[16px] top-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon20 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[102.5px] not-italic text-[14px] text-center text-white top-[11px] whitespace-nowrap">Select Date Range</p>
        <Icon21 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p149a0d80} fill="var(--fill-0, #2A53A0)" id="Vector" />
          <path d={svgPaths.p2975fe00} fill="var(--fill-0, #2A53A0)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[42px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[133.516px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon22 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[79.5px] not-italic text-[#2a53a0] text-[14px] text-center top-[11px] whitespace-nowrap">Export Data</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[42px] relative shrink-0 w-[345.063px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-gradient-to-b col-1 content-stretch flex from-[#3e71cd] h-[90px] items-center justify-between ml-0 mt-0 px-[24px] relative rounded-[12px] row-1 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] to-[#2a53a0] w-[1616px]" data-name="Container">
      <Container20 />
      <Container27 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_12.46%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0162 15">
          <path d={svgPaths.p251a4680} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[rgba(42,83,160,0.1)] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#eaf2ff] h-[20px] relative rounded-[33554400px] shrink-0 w-[31.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#2a53a0] text-[12px] whitespace-nowrap">+3</p>
      </div>
    </div>
  );
}

function Kae() {
  return (
    <div className="h-[36px] relative shrink-0 w-[276.391px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container30 />
        <Text7 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-[-1px] whitespace-nowrap">24</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-0 whitespace-nowrap">Active Scenarios</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Currently live or approved</p>
    </div>
  );
}

function Kae1() {
  return (
    <div className="h-[76px] relative shrink-0 w-[276.391px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading2 />
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[10px] h-[154px] items-start left-0 pb-px pl-[17px] pr-px pt-[17px] rounded-[8px] top-0 w-[310.391px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Kae />
      <Kae1 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 17.5">
          <path d={svgPaths.p2f81c380} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-[31.25%] right-[31.25%] top-[68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 1.25">
          <path d="M0 0H7.5V1.25H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[43.75%] left-[31.25%] right-[31.25%] top-1/2" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 1.25">
          <path d="M0 0H7.5V1.25H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[rgba(138,63,252,0.1)] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[#f6f2ff] h-[20px] relative rounded-[33554400px] shrink-0 w-[31.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#8a3ffc] text-[12px] whitespace-nowrap">+2</p>
      </div>
    </div>
  );
}

function Kae2() {
  return (
    <div className="h-[36px] relative shrink-0 w-[276.406px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container32 />
        <Text8 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-[-1px] whitespace-nowrap">18</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-0 whitespace-nowrap">Draft Scenarios</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Being authored or updated</p>
    </div>
  );
}

function Kae3() {
  return (
    <div className="h-[76px] relative shrink-0 w-[276.406px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[10px] h-[154px] items-start left-[326.39px] pb-px pl-[17px] pr-px pt-[17px] rounded-[8px] top-0 w-[310.406px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Kae2 />
      <Kae3 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
          <path d={svgPaths.p81fa900} fill="var(--fill-0, #007D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[21.88%_31.25%_31.25%_46.88%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.375 9.375">
          <path d={svgPaths.p3b9a2b00} fill="var(--fill-0, #007D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[rgba(0,125,121,0.1)] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[#d9fbfb] h-[20px] relative rounded-[33554400px] shrink-0 w-[29.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#007d79] text-[12px] whitespace-nowrap">+1</p>
      </div>
    </div>
  );
}

function Kae4() {
  return (
    <div className="h-[36px] relative shrink-0 w-[276.391px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container34 />
        <Text9 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-[-1px] whitespace-nowrap">7</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-0 whitespace-nowrap">Scenarios Pending Approval</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Awaiting maker/checker review</p>
    </div>
  );
}

function Kae5() {
  return (
    <div className="h-[76px] relative shrink-0 w-[276.391px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading4 />
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[10px] h-[154px] items-start left-[652.8px] pb-px pl-[17px] pr-px pt-[17px] rounded-[8px] top-0 w-[310.391px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Kae4 />
      <Kae5 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.66%_15.38%_12.5%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.174 14.9688">
          <path d={svgPaths.p3098db00} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[rgba(42,83,160,0.1)] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="bg-[#eaf2ff] h-[20px] relative rounded-[33554400px] shrink-0 w-[29.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#2a53a0] text-[12px] whitespace-nowrap">+1</p>
      </div>
    </div>
  );
}

function Kae6() {
  return (
    <div className="h-[36px] relative shrink-0 w-[276.406px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container36 />
        <Text10 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-[-1px] whitespace-nowrap">4</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-0 whitespace-nowrap">Running Simulations</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Scenarios under test in SAT Simulator</p>
    </div>
  );
}

function Kae7() {
  return (
    <div className="h-[76px] relative shrink-0 w-[276.406px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading5 />
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[10px] h-[154px] items-start left-[979.19px] pb-px pl-[17px] pr-px pt-[17px] rounded-[8px] top-0 w-[310.406px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Kae6 />
      <Kae7 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
          <path d={svgPaths.p34c2ae00} fill="var(--fill-0, #DA1E28)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[rgba(218,30,40,0.1)] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="bg-[#fff1f1] h-[20px] relative rounded-[33554400px] shrink-0 w-[23.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#da1e28] text-[12px] whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function Kae8() {
  return (
    <div className="h-[36px] relative shrink-0 w-[276.391px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container38 />
        <Text11 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-[-1px] whitespace-nowrap">3</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-0 whitespace-nowrap">Failed / Killed Simulations</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Stopped due to issues</p>
    </div>
  );
}

function Kae9() {
  return (
    <div className="h-[76px] relative shrink-0 w-[276.391px]" data-name="Kae">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading6 />
        <Paragraph13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[10px] h-[154px] items-start left-[1305.59px] pb-px pl-[17px] pr-px pt-[17px] rounded-[8px] top-0 w-[310.391px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Kae8 />
      <Kae9 />
    </div>
  );
}

function Container28() {
  return (
    <div className="col-1 h-[154px] ml-0 mt-[106px] relative row-1 w-[1616px]" data-name="Container">
      <Container29 />
      <Container31 />
      <Container33 />
      <Container35 />
      <Container37 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-0 whitespace-nowrap">Quick Actions</p>
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[96px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_12.46%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.0779 72">
          <path d={svgPaths.p212c2000} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Gae() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-5 relative size-[96px]" data-name="Gae">
      <Icon28 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_12.46%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0162 15">
          <path d={svgPaths.p251a4680} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#eaf2ff] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] px-[10px] relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[108.313px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">New Scenario</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Heading8 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[1.4] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">Author a new fraud rule or logic.</p>
    </div>
  );
}

function Gae1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[71px] items-start left-[17px] top-[17px] w-[358px]" data-name="Gae">
      <Container41 />
      <Paragraph15 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[8px] row-1 self-stretch shrink-0" data-name="Button">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[302.07px] size-[113.862px] top-[22.07px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
          <div className="flex-none rotate-12">
            <Gae />
          </div>
        </div>
        <Gae1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[96px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.66%_15.38%_12.5%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63.2354 71.85">
          <path d={svgPaths.p3d258000} fill="var(--fill-0, #007D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Gae2() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-5 relative size-[96px]" data-name="Gae">
      <Icon30 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.66%_15.38%_12.5%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.174 14.9688">
          <path d={svgPaths.p3098db00} fill="var(--fill-0, #007D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#d9fbfb] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] px-[10px] relative size-full">
        <Icon31 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[121.875px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">New Simulation</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Heading9 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[1.4] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">Test scenarios on historical data.</p>
    </div>
  );
}

function Gae3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[17px] top-[17px] w-[358px]" data-name="Gae">
      <Container43 />
      <Paragraph16 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[8px] row-1 self-stretch shrink-0" data-name="Button">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[302.07px] size-[113.862px] top-[22.07px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
          <div className="flex-none rotate-12">
            <Gae2 />
          </div>
        </div>
        <Gae3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[96px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 84">
          <path d={svgPaths.p1453a800} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[68.75%] left-[43.75%] right-[31.25%] top-1/4" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 6">
          <path d="M0 0H24V6H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[46.88%_31.25%_46.88%_43.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 6">
          <path d="M0 0H24V6H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-[43.75%] right-[31.25%] top-[68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 6">
          <path d="M0 0H24V6H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Gae4() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-5 relative size-[96px]" data-name="Gae">
      <Icon32 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 17.5">
          <path d={svgPaths.p3c962880} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[68.75%] left-[43.75%] right-[31.25%] top-1/4" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.25">
          <path d="M0 0H5V1.25H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[46.88%_31.25%_46.88%_43.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.25">
          <path d="M0 0H5V1.25H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-[43.75%] right-[31.25%] top-[68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.25">
          <path d="M0 0H5V1.25H0V0Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#f6f2ff] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] px-[10px] relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[128.656px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Scenario Library</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Heading10 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[1.4] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">Browse, search, and manage all scenarios.</p>
    </div>
  );
}

function Gae5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[73px] items-start left-[17px] top-[17px] w-[358px]" data-name="Gae">
      <Container45 />
      <Paragraph17 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[8px] row-1 self-stretch shrink-0" data-name="Button">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[302.07px] size-[113.862px] top-[22.07px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "84" } as React.CSSProperties}>
          <div className="flex-none rotate-12">
            <Gae4 />
          </div>
        </div>
        <Gae5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon34() {
  return (
    <div className="h-[96px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute flex inset-[47.8%_47.81%_22.79%_22.77%] items-center justify-center">
        <div className="-rotate-45 flex-none h-[6px] w-[33.93px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.93 6">
              <path d="M0 0H33.93V6H0V0Z" fill="var(--fill-0, #198038)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[6.25%_6.25%_6.25%_6.24%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.0055 84.0002">
          <path d={svgPaths.p102e1200} fill="var(--fill-0, #198038)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Gae6() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-5 relative size-[96px]" data-name="Gae">
      <Icon34 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute flex inset-[47.8%_47.81%_22.79%_22.77%] items-center justify-center">
        <div className="-rotate-45 flex-none h-[1.25px] w-[7.069px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.06875 1.25">
              <path d="M0 0H7.06875V1.25H0V0Z" fill="var(--fill-0, #198038)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[6.25%_6.25%_6.25%_6.24%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5011 17.5">
          <path d={svgPaths.p26684080} fill="var(--fill-0, #198038)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-[#defbe6] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] px-[10px] relative size-full">
        <Icon35 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[166.844px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Publish to Production</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Heading11 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[1.4] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">Promote approved scenarios to live EFRM.</p>
    </div>
  );
}

function Gae7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[68px] items-start left-[17px] top-[17px] w-[358px]" data-name="Gae">
      <Container47 />
      <Paragraph18 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white col-4 justify-self-stretch relative rounded-[8px] row-1 self-stretch shrink-0" data-name="Button">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[302.07px] size-[113.862px] top-[22.07px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="flex-none rotate-12">
            <Gae6 />
          </div>
        </div>
        <Gae7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[112px] relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Container39() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] h-[156px] items-start ml-0 mt-[276px] relative row-1 w-[1616px]" data-name="Container">
      <Heading7 />
      <Container40 />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Container19 />
      <Container28 />
      <Container39 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[28px] relative shrink-0 w-[282.469px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#161616] text-[20px] top-0 whitespace-nowrap">Scenario Simulation Overview</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#2a53a0] h-[46px] relative shrink-0 w-[80.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">All (56)</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#e0e0e0] h-[46px] relative shrink-0 w-[161.984px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] text-center whitespace-nowrap">Scenarios Only (31)</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#e0e0e0] flex-[1_0_0] h-[46px] min-h-px min-w-px relative" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] text-center whitespace-nowrap">Simulations Only (25)</p>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex h-[46px] items-center left-0 overflow-clip rounded-[8px] top-0 w-[417.594px]" data-name="Container">
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[46px] relative shrink-0 w-[417.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container52 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-white h-[79px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Heading12 />
          <Container51 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-white top-0 whitespace-nowrap">Total:</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[13.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-white top-0 whitespace-nowrap">20</p>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="bg-[#2a53a0] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.016px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[16px] relative size-full">
        <Text12 />
        <Text13 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#2a53a0] text-[11px] top-0 whitespace-nowrap">Running:</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[6.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#2a53a0] text-[11px] top-0 whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="bg-[#eaf2ff] h-[28px] relative rounded-[33554400px] shrink-0 w-[91.438px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[16px] relative size-full">
        <Text14 />
        <Text15 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#525252] text-[11px] top-0 whitespace-nowrap">Scheduled:</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[6.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#525252] text-[11px] top-0 whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="bg-[#f4f4f4] h-[28px] relative rounded-[33554400px] shrink-0 w-[103.969px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[16px] relative size-full">
        <Text16 />
        <Text17 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#198038] text-[11px] top-0 whitespace-nowrap">Completed:</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[11.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#198038] text-[11px] top-0 whitespace-nowrap">10</p>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="bg-[#defbe6] flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[33554400px]" data-name="_">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[16px] relative size-full">
          <Text18 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#b28600] text-[11px] top-0 whitespace-nowrap">Queue:</p>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[6.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#b28600] text-[11px] top-0 whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Component4() {
  return (
    <div className="bg-[#fff9e5] h-[28px] relative rounded-[33554400px] shrink-0 w-[82.75px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[16px] relative size-full">
        <Text20 />
        <Text21 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[28px] relative shrink-0 w-[517.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center overflow-clip relative rounded-[inherit] size-full">
        <Component />
        <Component1 />
        <Component2 />
        <Component3 />
        <Component4 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p282f5d00} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon37() {
  return (
    <div className="absolute left-[122.84px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white flex-[1_0_0] h-[46px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon36 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[73.5px] not-italic text-[#161616] text-[14px] text-center top-[13px] whitespace-nowrap">Workspace</p>
        <Icon37 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p282f5d00} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon39() {
  return (
    <div className="absolute left-[89.56px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-[116.563px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon38 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[56px] not-italic text-[#161616] text-[14px] text-center top-[13px] whitespace-nowrap">Status</p>
        <Icon39 />
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p282f5d00} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon41() {
  return (
    <div className="absolute left-[80.2px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-[107.203px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon40 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[52px] not-italic text-[#161616] text-[14px] text-center top-[13px] whitespace-nowrap">Type</p>
        <Icon41 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[46px] relative shrink-0 w-[389.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button11 />
        <Button12 />
        <Button13 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Container54 />
          <Container55 />
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">23,450</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container57 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container58 />
    </div>
  );
}

function Text22() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[11px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text22 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Jan - 31 Jan</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container60 />
    </div>
  );
}

function Container63() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container62() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container63 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container62 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container61 />
    </div>
  );
}

function Text23() {
  return (
    <div className="bg-[#fff9e5] h-[28px] relative rounded-[33554400px] shrink-0 w-[65.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#b28600] text-[11px] whitespace-nowrap">Queued</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text23 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container64 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-0 w-[1614px]" data-name="Table Row">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">18,720</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">12,480</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container66 />
    </div>
  );
}

function Text24() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[11px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text24 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">15 Dec - 31 Dec</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container68 />
    </div>
  );
}

function Container71() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container70() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[34.156px] relative rounded-[inherit] size-full">
        <Container71 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container70 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container69 />
    </div>
  );
}

function Text25() {
  return (
    <div className="bg-[#eaf2ff] h-[28px] relative rounded-[33554400px] shrink-0 w-[67.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#2a53a0] text-[11px] whitespace-nowrap">Running</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text25 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container72 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[46px] w-[1614px]" data-name="Table Row">
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">42,100</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container73 />
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">42,100</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container74 />
    </div>
  );
}

function Text26() {
  return (
    <div className="bg-[#fff1f2] h-[28px] relative rounded-[6px] shrink-0 w-[130.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#c70036] text-[11px] whitespace-nowrap">Champion/Challenger</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text26 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container75 />
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Nov - 30 Nov</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container76 />
    </div>
  );
}

function Container78() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container77() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container78 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container77 />
    </div>
  );
}

function Text27() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[11px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text27 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container79 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[92px] w-[1614px]" data-name="Table Row">
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">31,200</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container80 />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container81 />
    </div>
  );
}

function Text28() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[11px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text28 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container82 />
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">10 Dec - 20 Dec</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container83 />
    </div>
  );
}

function Container86() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container85() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container86 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container85 />
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container84 />
    </div>
  );
}

function Text29() {
  return (
    <div className="bg-[#f4f4f4] h-[28px] relative rounded-[33554400px] shrink-0 w-[79.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">Scheduled</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text29 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container87 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[138px] w-[1614px]" data-name="Table Row">
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">15,600</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container88 />
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">15,600</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container89 />
    </div>
  );
}

function Text30() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[11px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text30 />
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container90 />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Nov - 15 Nov</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container91 />
    </div>
  );
}

function Container93() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container92() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container93 />
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container92 />
    </div>
  );
}

function Text31() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[11px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text31 />
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container94 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[184px] w-[1614px]" data-name="Table Row">
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">8,900</p>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container95 />
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">8,900</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container96 />
    </div>
  );
}

function Text32() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[11px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text32 />
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container97 />
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Oct - 31 Oct</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container98 />
    </div>
  );
}

function Container100() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container99() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container100 />
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container99 />
    </div>
  );
}

function Text33() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[11px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text33 />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container101 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[230px] w-[1614px]" data-name="Table Row">
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">27,300</p>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container102 />
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container103 />
    </div>
  );
}

function Text34() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[11px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text34 />
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container104 />
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Dec - 15 Dec</p>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container105 />
    </div>
  );
}

function Container108() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container107() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container108 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container107 />
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container106 />
    </div>
  );
}

function Text35() {
  return (
    <div className="bg-[#fff9e5] h-[28px] relative rounded-[33554400px] shrink-0 w-[65.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#b28600] text-[11px] whitespace-nowrap">Queued</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text35 />
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container109 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[276px] w-[1614px]" data-name="Table Row">
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
    </div>
  );
}

function Container110() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">5,400</p>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container110 />
    </div>
  );
}

function Container111() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">5,400</p>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container111 />
    </div>
  );
}

function Text36() {
  return (
    <div className="bg-[#fff1f2] h-[28px] relative rounded-[6px] shrink-0 w-[130.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#c70036] text-[11px] whitespace-nowrap">Champion/Challenger</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text36 />
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container112 />
    </div>
  );
}

function Container113() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Sep - 30 Sep</p>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container113 />
    </div>
  );
}

function Container115() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container114() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container115 />
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container114 />
    </div>
  );
}

function Text37() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[11px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text37 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container116 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[322px] w-[1614px]" data-name="Table Row">
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">12,100</p>
    </div>
  );
}

function TableCell48() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container117 />
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell49() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container118 />
    </div>
  );
}

function Text38() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[11px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text38 />
    </div>
  );
}

function TableCell50() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container119 />
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Jan - 31 Dec</p>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container120 />
    </div>
  );
}

function Container123() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container122() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container123 />
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container122 />
    </div>
  );
}

function TableCell52() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container121 />
    </div>
  );
}

function Text39() {
  return (
    <div className="bg-[#f4f4f4] h-[28px] relative rounded-[33554400px] shrink-0 w-[79.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">Scheduled</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text39 />
    </div>
  );
}

function TableCell53() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container124 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[368px] w-[1614px]" data-name="Table Row">
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[97.109px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">33,500</p>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[629.45px] top-0 w-[129.109px]" data-name="Table Cell">
      <Container125 />
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center justify-end left-[16px] overflow-clip top-[13.25px] w-[129.391px]" data-name="Container">
      <p className="font-['Consolas:Regular',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">11,200</p>
    </div>
  );
}

function TableCell55() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[758.56px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container126 />
    </div>
  );
}

function Text40() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[11px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[177.813px]" data-name="Container">
      <Text40 />
    </div>
  );
}

function TableCell56() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[919.95px] top-0 w-[209.813px]" data-name="Table Cell">
      <Container127 />
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-center left-[16px] overflow-clip top-[14px] w-[129.391px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">01 Nov - 30 Nov</p>
    </div>
  );
}

function TableCell57() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1129.77px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container128 />
    </div>
  );
}

function Container131() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container130() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[69.359px] relative rounded-[inherit] size-full">
        <Container131 />
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[16px] top-[20px] w-[129.391px]" data-name="Container">
      <Container130 />
    </div>
  );
}

function TableCell58() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell">
      <Container129 />
    </div>
  );
}

function Text41() {
  return (
    <div className="bg-[#eaf2ff] h-[28px] relative rounded-[33554400px] shrink-0 w-[67.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#2a53a0] text-[11px] whitespace-nowrap">Running</p>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[129.453px]" data-name="Container">
      <Text41 />
    </div>
  );
}

function TableCell59() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell">
      <Container132 />
    </div>
  );
}

function TableRow9() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[414px] w-[1614px]" data-name="Table Row">
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute bg-white h-[460px] left-0 top-[46px] w-[1614px]" data-name="Table Body">
      <TableRow />
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
      <TableRow6 />
      <TableRow7 />
      <TableRow8 />
      <TableRow9 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[506.5px] left-0 top-0 w-[1614px]" data-name="Table">
      <TableBody />
    </div>
  );
}

function Icon42() {
  return (
    <div className="absolute left-[739px] size-[16px] top-[17px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute h-[13px] left-[659px] top-[14.5px] w-[63.813px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[32.5px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Total Txns</p>
    </div>
  );
}

function Text43() {
  return <div className="col-1 h-[13px] ml-0 mt-[0.5px] row-1 w-[30.828px]" data-name="Text" />;
}

function Icon43() {
  return (
    <div className="col-1 ml-[36.83px] mt-0 relative row-1 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcae83e0} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.91667 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1bc99400} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 2.33333V11.6667" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Text43 />
      <Icon43 />
    </div>
  );
}

function Ve() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="ve">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Group5 />
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="absolute content-stretch flex items-center left-[943px] top-[11px] w-[35px]" data-name="Container">
      <Ve />
    </div>
  );
}

function Text44() {
  return (
    <div className="absolute h-[13px] left-[1152px] top-[13px] w-[52.938px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[26.5px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Duration</p>
    </div>
  );
}

function Icon44() {
  return (
    <div className="absolute left-[1217.94px] size-[14px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcae83e0} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.91667 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1bc99400} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 2.33333V11.6667" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function TableRow10() {
  return (
    <div className="absolute bg-[#f0f0f0] h-[46px] left-0 top-0 w-[1614px]" data-name="Table Row">
      <Icon42 />
      <Text42 />
      <Container133 />
      <Text44 />
      <Icon44 />
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute h-[13px] left-[200.33px] top-[17.5px] w-[94.875px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[47px] not-italic text-[#2a53a0] text-[16px] text-center top-[-4px] tracking-[0.16px] whitespace-nowrap">Scenario Name</p>
    </div>
  );
}

function Icon45() {
  return (
    <div className="absolute left-[312px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute h-[13px] left-[17px] top-[16.5px] w-[40.203px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[26px] not-italic text-[#2a53a0] text-[16px] text-center top-[-3px] tracking-[0.16px] whitespace-nowrap">SIM ID</p>
    </div>
  );
}

function Icon46() {
  return (
    <div className="absolute left-[74px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text47() {
  return (
    <div className="absolute h-[13px] left-[507px] top-[12.5px] w-[70.422px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[35.5px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Workspace</p>
    </div>
  );
}

function Icon47() {
  return (
    <div className="absolute left-[593px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcae83e0} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.91667 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1bc99400} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 2.33333V11.6667" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[13px] relative shrink-0 w-[95.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[48px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Simulated Txns</p>
      </div>
    </div>
  );
}

function Ve1() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center justify-end left-[768px] top-[12px] w-[129.391px]" data-name="ve">
      <Icon48 />
      <Text48 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[1614px]" data-name="Table Header">
      <TableRow10 />
      <Text45 />
      <Icon45 />
      <Text46 />
      <Icon46 />
      <Text47 />
      <Icon47 />
      <Ve1 />
    </div>
  );
}

function Text49() {
  return (
    <div className="absolute h-[18px] left-[1312px] top-[13px] w-[56px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[28px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Progress</p>
    </div>
  );
}

function Icon49() {
  return (
    <div className="absolute left-[1379.61px] size-[14px] top-[15.75px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcae83e0} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.91667 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1bc99400} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 2.33333V11.6667" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Ve2() {
  return <div className="absolute h-[14px] left-[1309.16px] top-[11.75px] w-[129.391px]" data-name="ve" />;
}

function Container56() {
  return (
    <div className="h-[506.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Table />
      <TableHeader />
      <Text49 />
      <Icon49 />
      <Ve2 />
    </div>
  );
}

function Text50() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[11.5px] w-[109.531px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#525252] text-[16px] top-[-2px] whitespace-nowrap">Items per page:</p>
    </div>
  );
}

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option1() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option2() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option3() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-410.531px] pr-[467.531px] pt-[-1209px] top-[-0.5px] w-[57px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="absolute left-[33px] size-[16px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container136() {
  return (
    <div className="absolute h-[47px] left-[133.53px] top-0 w-[57px]" data-name="Container">
      <Dropdown />
      <Icon50 />
    </div>
  );
}

function Container135() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text50 />
        <Container136 />
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#161616] text-[0px] text-[16px] top-[-2px] whitespace-nowrap">
          <span className="leading-[24px]">1–10</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` of `}</span>
          <span className="leading-[24px]">20</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` items`}</span>
        </p>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="h-[47px] relative shrink-0 w-[145.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <Text51 />
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[47px] relative shrink-0 w-[352.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container135 />
        <Container137 />
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="absolute content-stretch flex h-[47px] items-center left-[66px] pr-[17px] top-0 w-[90.906px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#525252] text-[16px] whitespace-nowrap">of 2 pages</p>
    </div>
  );
}

function Option4() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option5() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-1639.094px] pr-[1704.094px] pt-[-1209px] top-[-0.5px] w-[65px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option4 />
      <Option5 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="absolute left-[37px] size-[16px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container140() {
  return (
    <div className="absolute h-[47px] left-px top-0 w-[65px]" data-name="Container">
      <Dropdown1 />
      <Icon51 />
    </div>
  );
}

function Container139() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text52 />
        <Container140 />
      </div>
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M12.5 15L6.25 10L12.5 5V15Z" fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[47px] opacity-25 relative shrink-0 w-[48px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 5L13.75 10L7.5 15V5Z" fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px relative size-full">
        <Icon53 />
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[47px] relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Button14 />
        <Button15 />
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[47px] relative shrink-0 w-[252.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container139 />
        <Container141 />
      </div>
    </div>
  );
}

function Cn() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-between pt-px relative shrink-0 w-full" data-name="Cn">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-solid border-t inset-0 pointer-events-none" />
      <Container134 />
      <Container138 />
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-white col-1 h-[699.5px] ml-0 mt-0 relative rounded-[8px] row-1 w-[1616px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container50 />
        <Container53 />
        <Container56 />
        <Cn />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_6013_13012)" id="Icon">
          <path d="M3 3H3.75V4.5H3V3Z" fill="var(--fill-0, #004144)" id="Vector" />
          <path d="M3 5.25H3.75V6.75H3V5.25Z" fill="var(--fill-0, #004144)" id="Vector_2" />
          <path d="M5.25 3H6V4.5H5.25V3Z" fill="var(--fill-0, #004144)" id="Vector_3" />
          <path d="M5.25 5.25H6V6.75H5.25V5.25Z" fill="var(--fill-0, #004144)" id="Vector_4" />
          <path d="M3 7.5H3.75V9H3V7.5Z" fill="var(--fill-0, #004144)" id="Vector_5" />
          <path d="M5.25 7.5H6V9H5.25V7.5Z" fill="var(--fill-0, #004144)" id="Vector_6" />
          <path d={svgPaths.p3f2e3900} fill="var(--fill-0, #004144)" id="Vector_7" />
        </g>
        <defs>
          <clipPath id="clip0_6013_13012">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text53() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#004144] text-[11px] top-0 whitespace-nowrap">Organization</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="absolute bg-[#d9fbfb] content-stretch flex gap-[8px] h-[28px] items-center left-[2px] px-[12px] rounded-[6px] top-[323px] w-[111.109px]" data-name="Container">
      <Icon54 />
      <Text53 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text54() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#491d8b] text-[11px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="bg-[#e8daff] h-[28px] relative rounded-[6px] shrink-0 w-[95.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
        <Icon55 />
        <Text54 />
      </div>
    </div>
  );
}

function Container145() {
  return <div className="h-[28px] shrink-0 w-[80.969px]" data-name="Container" />;
}

function Container143() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-0 top-[138px] w-[96px]" data-name="Container">
      <Container144 />
      <Container145 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text55() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#491d8b] text-[11px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Container147() {
  return (
    <div className="bg-[#e8daff] h-[28px] relative rounded-[6px] shrink-0 w-[95.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
        <Icon56 />
        <Text55 />
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-0 top-[184px] w-[96px]" data-name="Container">
      <Container147 />
    </div>
  );
}

function Icon57() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text56() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#491d8b] text-[11px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="bg-[#e8daff] h-[28px] relative rounded-[6px] shrink-0 w-[95.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
        <Icon57 />
        <Text56 />
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-0 top-[276px] w-[96px]" data-name="Container">
      <Container149 />
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text57() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#491d8b] text-[11px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="bg-[#e8daff] h-[28px] relative rounded-[6px] shrink-0 w-[95.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
        <Icon58 />
        <Text57 />
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-0 top-[414px] w-[96px]" data-name="Container">
      <Container151 />
    </div>
  );
}

function Icon59() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text58() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#491d8b] text-[11px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="bg-[#e8daff] h-[28px] relative rounded-[6px] shrink-0 w-[95.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
        <Icon59 />
        <Text58 />
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-0 top-0 w-[96px]" data-name="Container">
      <Container153 />
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p167cb080} fill="var(--fill-0, #002D9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text59() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#002d9c] text-[11px] top-0 whitespace-nowrap">Account</p>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="absolute bg-[#d0e2ff] content-stretch flex gap-[8px] h-[28px] items-center left-0 px-[12px] rounded-[6px] top-0 w-[88.047px]" data-name="Container">
      <Icon60 />
      <Text59 />
    </div>
  );
}

function Container154() {
  return (
    <div className="absolute h-[28px] left-0 top-[46px] w-[88.047px]" data-name="Container">
      <Container155 />
    </div>
  );
}

function Icon61() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p167cb080} fill="var(--fill-0, #002D9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text60() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#002d9c] text-[11px] top-0 whitespace-nowrap">Account</p>
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="absolute bg-[#d0e2ff] content-stretch flex gap-[8px] h-[28px] items-center left-0 px-[12px] rounded-[6px] top-0 w-[88.047px]" data-name="Container">
      <Icon61 />
      <Text60 />
    </div>
  );
}

function Container156() {
  return (
    <div className="absolute h-[28px] left-0 top-[231px] w-[88.047px]" data-name="Container">
      <Container157 />
    </div>
  );
}

function Icon62() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p167cb080} fill="var(--fill-0, #002D9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text61() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#002d9c] text-[11px] top-0 whitespace-nowrap">Account</p>
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="absolute bg-[#d0e2ff] content-stretch flex gap-[8px] h-[28px] items-center left-0 px-[12px] rounded-[6px] top-0 w-[88.047px]" data-name="Container">
      <Icon62 />
      <Text61 />
    </div>
  );
}

function Container158() {
  return (
    <div className="absolute h-[28px] left-0 top-[368px] w-[88.047px]" data-name="Container">
      <Container159 />
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.pe260480} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.p34e02c80} fill="var(--fill-0, #161616)" id="Vector_2" />
          <path d="M2.25 5.25H3.75V6H2.25V5.25Z" fill="var(--fill-0, #161616)" id="Vector_3" />
          <path d={svgPaths.p6a8e300} fill="var(--fill-0, #161616)" id="Vector_4" />
          <path d={svgPaths.p10408700} fill="var(--fill-0, #161616)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Text62() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#161616] text-[11px] top-0 whitespace-nowrap">Non-Customer</p>
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="absolute bg-[#e0e0e0] content-stretch flex gap-[8px] h-[28px] items-center left-0 px-[12px] rounded-[6px] top-[92px] w-[122.047px]" data-name="Container">
      <Icon63 />
      <Text62 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-0">
      <Container143 />
      <Container146 />
      <Container148 />
      <Container150 />
      <Container152 />
      <Container154 />
      <Container156 />
      <Container158 />
      <Container160 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-0">
      <Container142 />
      <Group3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="col-1 h-[120px] ml-[508px] mt-[198px] relative row-1 w-[122.047px]">
      <Group4 />
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Container49 />
      <Frame1 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[28px] relative shrink-0 w-[282.469px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#161616] text-[20px] top-0 whitespace-nowrap">Scenario Simulation Overview</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-[#2a53a0] h-[46px] relative shrink-0 w-[80.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">All (56)</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-[#e0e0e0] h-[46px] relative shrink-0 w-[161.984px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] text-center whitespace-nowrap">Scenarios Only (31)</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-[#e0e0e0] flex-[1_0_0] h-[46px] min-h-px min-w-px relative" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] text-center whitespace-nowrap">Simulations Only (25)</p>
        </div>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="absolute content-stretch flex h-[46px] items-center left-0 overflow-clip rounded-[8px] top-0 w-[417.594px]" data-name="Container">
      <Button16 />
      <Button17 />
      <Button18 />
    </div>
  );
}

function Container163() {
  return (
    <div className="h-[46px] relative shrink-0 w-[417.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container164 />
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="bg-white h-[79px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Heading13 />
          <Container163 />
        </div>
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="absolute h-[16.5px] left-[13px] top-[5.75px] w-[29.125px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[12px] text-white top-0 whitespace-nowrap">Total :</p>
    </div>
  );
}

function Text64() {
  return (
    <div className="absolute h-[16.5px] left-[52.13px] top-[5.75px] w-[13.891px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[12px] text-white top-0 whitespace-nowrap">20</p>
    </div>
  );
}

function Component5() {
  return (
    <div className="bg-[#2a53a0] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.016px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text63 />
        <Text64 />
      </div>
    </div>
  );
}

function Text65() {
  return (
    <div className="h-[17px] relative shrink-0 w-[53px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#2a53a0] text-[12px] top-[-1px] whitespace-nowrap">Running :</p>
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[6.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#2a53a0] text-[12px] top-0 whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Component6() {
  return (
    <div className="bg-[#eaf2ff] h-[28px] relative rounded-[33554400px] shrink-0 w-[91.438px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[16px] relative size-full">
        <Text65 />
        <Text66 />
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="absolute h-[16.5px] left-[16px] top-[5.75px] w-[59.328px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[-3px] not-italic text-[#525252] text-[12px] top-0 whitespace-nowrap">Scheduled :</p>
    </div>
  );
}

function Text68() {
  return (
    <div className="absolute h-[16.5px] left-[82.33px] top-[6.75px] w-[6.641px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#525252] text-[12px] top-0 whitespace-nowrap">5</p>
    </div>
  );
}

function Component7() {
  return (
    <div className="bg-[#f4f4f4] h-[28px] relative rounded-[33554400px] shrink-0 w-[103.969px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text67 />
        <Text68 />
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="absolute h-[16.5px] left-[13px] top-[5.75px] w-[60.766px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#198038] text-[12px] top-0 whitespace-nowrap">Completed :</p>
    </div>
  );
}

function Text70() {
  return (
    <div className="absolute h-[16.5px] left-[84.77px] top-[5.75px] w-[11.672px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#198038] text-[12px] top-0 whitespace-nowrap">10</p>
    </div>
  );
}

function Component8() {
  return (
    <div className="bg-[#defbe6] flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[33554400px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text69 />
        <Text70 />
      </div>
    </div>
  );
}

function Text71() {
  return (
    <div className="absolute h-[16.5px] left-[16px] top-[5.75px] w-[37.969px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[-3px] not-italic text-[#b28600] text-[12px] top-[-1px] whitespace-nowrap">Queue :</p>
    </div>
  );
}

function Text72() {
  return (
    <div className="absolute h-[16.5px] left-[59.97px] top-[5.75px] w-[6.781px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#b28600] text-[12px] top-0 whitespace-nowrap">2</p>
    </div>
  );
}

function Component9() {
  return (
    <div className="bg-[#fff9e5] h-[28px] relative rounded-[33554400px] shrink-0 w-[82.75px]" data-name="_">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text71 />
        <Text72 />
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[28px] relative shrink-0 w-[517.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center overflow-clip relative rounded-[inherit] size-full">
        <Component5 />
        <Component6 />
        <Component7 />
        <Component8 />
        <Component9 />
      </div>
    </div>
  );
}

function Container165() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Container166 />
        </div>
      </div>
    </div>
  );
}

function TableCell60() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell" />;
}

function TableRow11() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-0 w-[1614px]" data-name="Table Row">
      <TableCell60 />
    </div>
  );
}

function TableCell61() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell" />;
}

function TableCell62() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1452.55px] top-0 w-[161.453px]" data-name="Table Cell" />;
}

function TableRow12() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[46px] w-[1614px]" data-name="Table Row">
      <TableCell61 />
      <TableCell62 />
    </div>
  );
}

function TableCell63() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell" />;
}

function TableRow13() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[92px] w-[1614px]" data-name="Table Row">
      <TableCell63 />
    </div>
  );
}

function TableCell64() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-[1291.16px] top-0 w-[161.391px]" data-name="Table Cell" />;
}

function TableRow14() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[138px] w-[1614px]" data-name="Table Row">
      <TableCell64 />
    </div>
  );
}

function TableRow15() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[184px] w-[1614px]" data-name="Table Row" />;
}

function TableRow16() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[230px] w-[1614px]" data-name="Table Row" />;
}

function TableRow17() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[276px] w-[1614px]" data-name="Table Row" />;
}

function TableRow18() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[322px] w-[1614px]" data-name="Table Row" />;
}

function TableRow19() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[368px] w-[1614px]" data-name="Table Row" />;
}

function TableRow20() {
  return <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[414px] w-[1614px]" data-name="Table Row" />;
}

function TableBody1() {
  return (
    <div className="absolute bg-white h-[460px] left-0 top-[46px] w-[1614px]" data-name="Table Body">
      <TableRow11 />
      <TableRow12 />
      <TableRow13 />
      <TableRow14 />
      <TableRow15 />
      <TableRow16 />
      <TableRow17 />
      <TableRow18 />
      <TableRow19 />
      <TableRow20 />
    </div>
  );
}

function Table1() {
  return (
    <div className="absolute h-[506.5px] left-0 top-0 w-[1614px]" data-name="Table">
      <TableBody1 />
    </div>
  );
}

function Icon64() {
  return (
    <div className="absolute left-[739px] size-[16px] top-[17px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text73() {
  return (
    <div className="absolute h-[13px] left-[659px] top-[14.5px] w-[63.813px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[32.5px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Total Txns</p>
    </div>
  );
}

function Text74() {
  return <div className="col-1 h-[13px] ml-0 mt-0 row-1 w-[30.828px]" data-name="Text" />;
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Text74 />
    </div>
  );
}

function Ve3() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="ve">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Group7 />
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="absolute content-stretch flex items-center left-[943px] top-[11px] w-[35px]" data-name="Container">
      <Ve3 />
    </div>
  );
}

function Text75() {
  return <div className="absolute h-[13px] left-[1152px] top-[13px] w-[52.938px]" data-name="Text" />;
}

function Icon65() {
  return (
    <div className="absolute left-[1217.94px] size-[14px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcae83e0} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.91667 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1bc99400} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 2.33333V11.6667" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[1145px] top-[13px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[1178.5px] not-italic text-[#2a53a0] text-[16px] text-center top-[13px] tracking-[0.16px] whitespace-nowrap">Duration</p>
      <Icon65 />
    </div>
  );
}

function Icon66() {
  return (
    <div className="absolute left-[46px] size-[16px] top-px" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[18px] left-[970px] top-[14px] w-[54.828px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[19.5px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Type</p>
      <Icon66 />
    </div>
  );
}

function Icon67() {
  return (
    <div className="absolute left-[914px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[790px] top-[14px]">
      <Icon67 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[850px] not-italic text-[#2a53a0] text-[16px] text-center top-[14px] tracking-[0.16px] whitespace-nowrap">Simulated Txns</p>
    </div>
  );
}

function TableRow21() {
  return (
    <div className="absolute bg-[#f0f0f0] h-[46px] left-0 top-0 w-[1614px]" data-name="Table Row">
      <Icon64 />
      <Text73 />
      <Container168 />
      <Text75 />
      <Group8 />
      <Frame2 />
      <Group9 />
    </div>
  );
}

function Text76() {
  return (
    <div className="absolute h-[13px] left-[200.33px] top-[17.5px] w-[94.875px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[47px] not-italic text-[#2a53a0] text-[16px] text-center top-[-4px] tracking-[0.16px] whitespace-nowrap">Scenario Name</p>
    </div>
  );
}

function Icon68() {
  return (
    <div className="absolute left-[312px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text77() {
  return (
    <div className="absolute h-[13px] left-[17px] top-[16.5px] w-[40.203px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[26px] not-italic text-[#2a53a0] text-[16px] text-center top-[-3px] tracking-[0.16px] whitespace-nowrap">SIM ID</p>
    </div>
  );
}

function Icon69() {
  return (
    <div className="absolute left-[74px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text78() {
  return (
    <div className="absolute h-[13px] left-[517px] top-[12.5px] w-[70.422px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[35.5px] not-italic text-[#2a53a0] text-[16px] text-center top-0 tracking-[0.16px] whitespace-nowrap">Workspace</p>
    </div>
  );
}

function Icon70() {
  return (
    <div className="absolute left-[602px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[1614px]" data-name="Table Header">
      <TableRow21 />
      <Text76 />
      <Icon68 />
      <Text77 />
      <Icon69 />
      <Text78 />
      <Icon70 />
    </div>
  );
}

function Text79() {
  return <div className="absolute h-[18px] left-[1307px] top-[13px] w-[61px]" data-name="Text" />;
}

function Icon71() {
  return (
    <div className="absolute left-[1401.61px] size-[14px] top-[15.75px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcae83e0} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.91667 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1bc99400} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 2.33333V11.6667" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[1322px] top-[13px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[1357px] not-italic text-[#2a53a0] text-[16px] text-center top-[13px] tracking-[0.16px] whitespace-nowrap">Progress</p>
      <Icon71 />
    </div>
  );
}

function Icon72() {
  return (
    <div className="absolute left-[1551.61px] size-[14px] top-[15.75px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.pcae83e0} id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.91667 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1bc99400} id="Vector_3" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 2.33333V11.6667" id="Vector_4" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[1494px] top-[13px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[1519.5px] not-italic text-[#2a53a0] text-[16px] text-center top-[13px] tracking-[0.16px] whitespace-nowrap">Status</p>
      <Icon72 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] not-italic text-[#2a53a0] text-[16px] top-[59px] tracking-[0.16px] whitespace-nowrap">
      <p className="absolute left-[20px] top-[59px]">SIM-SAT-0016</p>
      <p className="absolute left-[20px] top-[106px]">SIM-SAT-0015</p>
      <p className="absolute left-[20px] top-[151px]">SIM-SAT-0014</p>
      <p className="absolute left-[20px] top-[197px]">SIM-SAT-0013</p>
      <p className="absolute left-[20px] top-[244px]">SIM-SAT-0012</p>
      <p className="absolute left-[20px] top-[290px]">SIM-SAT-0011</p>
      <p className="absolute left-[20px] top-[335px]">SIM-SAT-0010</p>
      <p className="absolute left-[20px] top-[381px]">SIM-SAT-0009</p>
      <p className="absolute left-[20px] top-[427px]">SIM-SAT-0008</p>
      <p className="absolute left-[20px] top-[473px]">SIM-SAT-0007</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[694px] not-italic text-[#161616] text-[16px] top-[59px] tracking-[0.16px] whitespace-nowrap">
      <p className="absolute left-[694px] top-[59px]">23,450</p>
      <p className="absolute left-[694px] top-[106px]">18,720</p>
      <p className="absolute left-[694px] top-[151px]">42,100</p>
      <p className="absolute left-[694px] top-[197px]">31,200</p>
      <p className="absolute left-[694px] top-[244px]">15,600</p>
      <p className="absolute left-[694px] top-[290px]">8,900</p>
      <p className="absolute left-[694px] top-[335px]">27,300</p>
      <p className="absolute left-[694px] top-[381px]">5,400</p>
      <p className="absolute left-[694px] top-[427px]">12,100</p>
      <p className="absolute left-[694px] top-[473px]">33,500</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[1146px] not-italic text-[#161616] text-[16px] top-[59px] tracking-[0.16px] whitespace-nowrap">
      <p className="absolute left-[1146px] top-[59px]">01 Jan - 31 Jan</p>
      <p className="absolute left-[1146px] top-[106px]">15 Dec - 31 Dec</p>
      <p className="absolute left-[1146px] top-[151px]">01 Nov - 30 Nov</p>
      <p className="absolute left-[1146px] top-[197px]">10 Dec - 20 Dec</p>
      <p className="absolute left-[1146px] top-[244px]">01 Nov - 15 Nov</p>
      <p className="absolute left-[1146px] top-[290px]">01 Oct - 31 Oct</p>
      <p className="absolute left-[1146px] top-[335px]">01 Dec - 15 Dec</p>
      <p className="absolute left-[1146px] top-[381px]">01 Sep - 30 Sep</p>
      <p className="absolute left-[1146px] top-[427px]">01 Jan - 31 Dec</p>
      <p className="absolute left-[1146px] top-[473px]">01 Nov - 30 Nov</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[869px] not-italic text-[#161616] text-[16px] top-[59px] tracking-[0.16px] whitespace-nowrap">
      <p className="absolute left-[869px] top-[59px]">-</p>
      <p className="absolute left-[869px] top-[106px]">12,480</p>
      <p className="absolute left-[869px] top-[151px]">42,100</p>
      <p className="absolute left-[869px] top-[197px]">-</p>
      <p className="absolute left-[869px] top-[244px]">15,600</p>
      <p className="absolute left-[869px] top-[290px]">8,900</p>
      <p className="absolute left-[869px] top-[335px]">-</p>
      <p className="absolute left-[869px] top-[381px]">5,400</p>
      <p className="absolute left-[869px] top-[427px]">-</p>
      <p className="absolute left-[869px] top-[473px]">11,200</p>
    </div>
  );
}

function Container169() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-px w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">High Value UPI Velocity - Customer WS</p>
    </div>
  );
}

function Container170() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[47.5px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">Suspicious Cross-Border Transfers</p>
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[93px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">ATM Withdrawal Anomaly Detection</p>
    </div>
  );
}

function Container172() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[140.5px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">Card Not Present Fraud Pattern</p>
    </div>
  );
}

function Container173() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[186px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">Structuring under $10k Threshold</p>
    </div>
  );
}

function Container174() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[232.5px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">New Account Dormancy Spike</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[280px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">Rapid Movement of Funds</p>
    </div>
  );
}

function Container176() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[326.5px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">Shell Company Identification</p>
    </div>
  );
}

function Container177() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-center left-0 overflow-clip top-[370px] w-[290.813px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#161616] text-[16px] tracking-[0.16px] whitespace-nowrap">Mule Account Detection</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[441.75px] left-[188px] top-[55.25px] w-[290.813px]">
      <Container169 />
      <Container170 />
      <Container171 />
      <Container172 />
      <Container173 />
      <Container174 />
      <Container175 />
      <Container176 />
      <Container177 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#161616] text-[16px] top-[416.75px] tracking-[0.16px] whitespace-nowrap">High Risk Jurisdiction Wire</p>
    </div>
  );
}

function Icon73() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text80() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#491d8b] text-[12px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Icon74() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text81() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#491d8b] text-[12px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Icon75() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text82() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#491d8b] text-[12px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Icon76() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text83() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#491d8b] text-[12px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Icon77() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p320c5a80} fill="var(--fill-0, #491D8B)" id="Vector" />
          <path d={svgPaths.p3a68c080} fill="var(--fill-0, #491D8B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text84() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#491d8b] text-[12px] top-0 whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function Icon78() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p167cb080} fill="var(--fill-0, #002D9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text85() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#002d9c] text-[12px] top-0 whitespace-nowrap">Account</p>
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="absolute bg-[#d0e2ff] content-stretch flex gap-[8px] h-[28px] items-center left-[507px] px-[12px] rounded-[6px] top-[100px] w-[88.047px]" data-name="Container">
      <Icon78 />
      <Text85 />
    </div>
  );
}

function Icon79() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p167cb080} fill="var(--fill-0, #002D9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text86() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#002d9c] text-[12px] top-0 whitespace-nowrap">Account</p>
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="absolute bg-[#d0e2ff] content-stretch flex gap-[8px] h-[28px] items-center left-[507px] px-[12px] rounded-[6px] top-[284px] w-[88.047px]" data-name="Container">
      <Icon79 />
      <Text86 />
    </div>
  );
}

function Icon80() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p167cb080} fill="var(--fill-0, #002D9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text87() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#002d9c] text-[12px] top-0 whitespace-nowrap">Account</p>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="absolute bg-[#d0e2ff] content-stretch flex gap-[8px] h-[28px] items-center left-[507px] px-[12px] rounded-[6px] top-[422px] w-[88.047px]" data-name="Container">
      <Icon80 />
      <Text87 />
    </div>
  );
}

function Icon81() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.pe260480} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.p34e02c80} fill="var(--fill-0, #161616)" id="Vector_2" />
          <path d="M2.25 5.25H3.75V6H2.25V5.25Z" fill="var(--fill-0, #161616)" id="Vector_3" />
          <path d={svgPaths.p6a8e300} fill="var(--fill-0, #161616)" id="Vector_4" />
          <path d={svgPaths.p10408700} fill="var(--fill-0, #161616)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Text88() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#161616] text-[12px] top-0 whitespace-nowrap">Non-Customer</p>
      </div>
    </div>
  );
}

function Icon82() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_6013_13012)" id="Icon">
          <path d="M3 3H3.75V4.5H3V3Z" fill="var(--fill-0, #004144)" id="Vector" />
          <path d="M3 5.25H3.75V6.75H3V5.25Z" fill="var(--fill-0, #004144)" id="Vector_2" />
          <path d="M5.25 3H6V4.5H5.25V3Z" fill="var(--fill-0, #004144)" id="Vector_3" />
          <path d="M5.25 5.25H6V6.75H5.25V5.25Z" fill="var(--fill-0, #004144)" id="Vector_4" />
          <path d="M3 7.5H3.75V9H3V7.5Z" fill="var(--fill-0, #004144)" id="Vector_5" />
          <path d="M5.25 7.5H6V9H5.25V7.5Z" fill="var(--fill-0, #004144)" id="Vector_6" />
          <path d={svgPaths.p3f2e3900} fill="var(--fill-0, #004144)" id="Vector_7" />
        </g>
        <defs>
          <clipPath id="clip0_6013_13012">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text89() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#004144] text-[12px] top-0 whitespace-nowrap">Organization</p>
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="absolute bg-[#d9fbfb] content-stretch flex gap-[6px] h-[28px] items-center left-[508px] px-[12px] rounded-[6px] top-[376px] w-[111.109px]" data-name="Container">
      <Icon82 />
      <Text89 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[188px] top-[53px]">
      <Frame />
      <div className="absolute bg-[#e8daff] content-stretch flex gap-[5px] h-[28px] items-center left-[507px] px-[12px] rounded-[8px] top-[53px] w-[95.375px]" data-name="Customer Entity">
        <Icon73 />
        <Text80 />
      </div>
      <div className="absolute bg-[#e8daff] content-stretch flex gap-[5px] h-[28px] items-center left-[507px] px-[12px] rounded-[8px] top-[193px] w-[95.375px]" data-name="Customer Entity">
        <Icon74 />
        <Text81 />
      </div>
      <div className="absolute bg-[#e8daff] content-stretch flex gap-[5px] h-[28px] items-center left-[507px] px-[12px] rounded-[8px] top-[238px] w-[95.375px]" data-name="Customer Entity">
        <Icon75 />
        <Text82 />
      </div>
      <div className="absolute bg-[#e8daff] content-stretch flex gap-[5px] h-[28px] items-center left-[507px] px-[12px] rounded-[8px] top-[329px] w-[95.375px]" data-name="Customer Entity">
        <Icon76 />
        <Text83 />
      </div>
      <div className="absolute bg-[#e8daff] content-stretch flex gap-[5px] h-[28px] items-center left-[507px] px-[12px] rounded-[8px] top-[468px] w-[95.375px]" data-name="Customer Entity">
        <Icon77 />
        <Text84 />
      </div>
      <Container178 />
      <Container179 />
      <Container180 />
      <div className="absolute bg-[#e0e0e0] content-stretch flex gap-[8px] h-[28px] items-center left-[508px] px-[12px] rounded-[8px] top-[146px] w-[127px]" data-name="Non Customer Entity">
        <Icon81 />
        <Text88 />
      </div>
      <Container181 />
    </div>
  );
}

function Text90() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[12px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[100px]" data-name="Container">
      <Text90 />
    </div>
  );
}

function Text91() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[12px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container183() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[238px]" data-name="Container">
      <Text91 />
    </div>
  );
}

function Text92() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[12px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[468px]" data-name="Container">
      <Text92 />
    </div>
  );
}

function Text93() {
  return (
    <div className="bg-[#fff7ed] h-[28px] relative rounded-[6px] shrink-0 w-[61.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#ca3500] text-[12px] whitespace-nowrap">Backtest</p>
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[284px]" data-name="Container">
      <Text93 />
    </div>
  );
}

function Text94() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[12px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container186() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[55px]" data-name="Container">
      <Text94 />
    </div>
  );
}

function Text95() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[12px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container187() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[193px]" data-name="Container">
      <Text95 />
    </div>
  );
}

function Text96() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[12px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container188() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[422px]" data-name="Container">
      <Text96 />
    </div>
  );
}

function Text97() {
  return (
    <div className="bg-[#ecfeff] h-[28px] relative rounded-[6px] shrink-0 w-[55.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#007595] text-[12px] whitespace-nowrap">What-If</p>
      </div>
    </div>
  );
}

function Container189() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[330px]" data-name="Container">
      <Text97 />
    </div>
  );
}

function Text98() {
  return (
    <div className="bg-[#fff1f2] h-[28px] relative rounded-[6px] shrink-0 w-[139px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#c70036] text-[12px] whitespace-nowrap">Champion/Challenger</p>
      </div>
    </div>
  );
}

function Container190() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[146px]" data-name="Container">
      <Text98 />
    </div>
  );
}

function Text99() {
  return (
    <div className="bg-[#fff1f2] h-[28px] relative rounded-[6px] shrink-0 w-[130.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#c70036] text-[12px] whitespace-nowrap">Champion/Challenger</p>
      </div>
    </div>
  );
}

function Container191() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[968px] top-[376px] w-[134px]" data-name="Container">
      <Text99 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents left-[968px] top-[55px]">
      <Container182 />
      <Container183 />
      <Container184 />
      <Container185 />
      <Container186 />
      <Container187 />
      <Container188 />
      <Container189 />
      <Container190 />
      <Container191 />
    </div>
  );
}

function Container194() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container193() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container194 />
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1322px] top-[64px] w-[104.927px]" data-name="Container">
      <Container193 />
    </div>
  );
}

function Container197() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container196() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[34.156px] relative rounded-[inherit] size-full">
        <Container197 />
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1322px] top-[111px] w-[104.927px]" data-name="Container">
      <Container196 />
    </div>
  );
}

function Container199() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container198() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1322px] top-[159px] w-[104.927px]" data-name="Container">
      <Container199 />
    </div>
  );
}

function Container201() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container200() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1322px] top-[251px] w-[104.927px]" data-name="Container">
      <Container201 />
    </div>
  );
}

function Container203() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container202() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1322px] top-[294px] w-[104.927px]" data-name="Container">
      <Container203 />
    </div>
  );
}

function Container205() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container204() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1322px] top-[388px] w-[104.927px]" data-name="Container">
      <Container205 />
    </div>
  );
}

function Container207() {
  return <div className="bg-[#2a53a0] h-[6px] rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container" />;
}

function Container206() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1322px] top-[480px] w-[104.927px]" data-name="Container">
      <Container207 />
    </div>
  );
}

function Container210() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container209() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container210 />
      </div>
    </div>
  );
}

function Container208() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1324.84px] top-[204px] w-[104.927px]" data-name="Container">
      <Container209 />
    </div>
  );
}

function Container213() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container212() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container213 />
      </div>
    </div>
  );
}

function Container211() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1324.84px] top-[344px] w-[104.927px]" data-name="Container">
      <Container212 />
    </div>
  );
}

function Container216() {
  return <div className="bg-[#2a53a0] h-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container215() {
  return (
    <div className="bg-[#e5e7eb] h-[6px] relative rounded-[33554400px] shrink-0 w-[103.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[103.5px] relative rounded-[inherit] size-full">
        <Container216 />
      </div>
    </div>
  );
}

function Container214() {
  return (
    <div className="absolute content-stretch flex h-[6px] items-center left-[1324.84px] top-[433px] w-[104.927px]" data-name="Container">
      <Container215 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents left-[1322px] top-[64px]">
      <Container192 />
      <Container195 />
      <Container198 />
      <Container200 />
      <Container202 />
      <Container204 />
      <Container206 />
      <Container208 />
      <Container211 />
      <Container214 />
    </div>
  );
}

function Text100() {
  return (
    <div className="bg-[#fff9e5] h-[28px] relative rounded-[33554400px] shrink-0 w-[65.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#b28600] text-[12px] whitespace-nowrap">Queued</p>
      </div>
    </div>
  );
}

function Container217() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[55px] w-[78px]" data-name="Container">
      <Text100 />
    </div>
  );
}

function Text101() {
  return (
    <div className="bg-[#fff9e5] h-[28px] relative rounded-[33554400px] shrink-0 w-[65.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#b28600] text-[12px] whitespace-nowrap">Queued</p>
      </div>
    </div>
  );
}

function Container218() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[330px] w-[78px]" data-name="Container">
      <Text101 />
    </div>
  );
}

function Text102() {
  return (
    <div className="bg-[#eaf2ff] h-[28px] relative rounded-[33554400px] shrink-0 w-[67.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#2a53a0] text-[12px] whitespace-nowrap">Running</p>
      </div>
    </div>
  );
}

function Container219() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[100px] w-[78px]" data-name="Container">
      <Text102 />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents left-[1490px] top-[55px]">
      <Container217 />
      <Container218 />
      <Container219 />
    </div>
  );
}

function Text103() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[12px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container220() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[146px] w-[78px]" data-name="Container">
      <Text103 />
    </div>
  );
}

function Text104() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[12px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container221() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[238px] w-[78px]" data-name="Container">
      <Text104 />
    </div>
  );
}

function Text105() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[12px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container222() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[469px] w-[78px]" data-name="Container">
      <Text105 />
    </div>
  );
}

function Text106() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[12px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container223() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[376px] w-[78px]" data-name="Container">
      <Text106 />
    </div>
  );
}

function Text107() {
  return (
    <div className="bg-[#defbe6] h-[28px] relative rounded-[33554400px] shrink-0 w-[81.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#198038] text-[12px] whitespace-nowrap">Completed</p>
      </div>
    </div>
  );
}

function Container224() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[285px] w-[78px]" data-name="Container">
      <Text107 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents left-[1490px] top-[55px]">
      <Group22 />
      <Container220 />
      <Container221 />
      <Container222 />
      <Container223 />
      <Container224 />
    </div>
  );
}

function Text108() {
  return (
    <div className="bg-[#f4f4f4] h-[28px] relative rounded-[33554400px] shrink-0 w-[79.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">Scheduled</p>
      </div>
    </div>
  );
}

function Container225() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[192px] w-[78px]" data-name="Container">
      <Text108 />
    </div>
  );
}

function Text109() {
  return (
    <div className="bg-[#f4f4f4] h-[28px] relative rounded-[33554400px] shrink-0 w-[79.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[12px] whitespace-nowrap">Scheduled</p>
      </div>
    </div>
  );
}

function Container226() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[1490px] top-[422px] w-[78px]" data-name="Container">
      <Text109 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[1490px] top-[55px]">
      <Group20 />
      <Container225 />
      <Container226 />
    </div>
  );
}

function Container167() {
  return (
    <div className="h-[506.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Table1 />
      <TableHeader1 />
      <Text79 />
      <Group10 />
      <Group11 />
      <Group12 />
      <Group13 />
      <Group14 />
      <Group15 />
      <Group2 />
      <Group16 />
      <Group17 />
      <Group18 />
    </div>
  );
}

function Text110() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[11.5px] w-[109.531px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#525252] text-[16px] top-[-2px] whitespace-nowrap">Items per page:</p>
    </div>
  );
}

function Option6() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option7() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option8() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option9() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-410.531px] pr-[467.531px] pt-[-1209px] top-[-0.5px] w-[57px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option6 />
      <Option7 />
      <Option8 />
      <Option9 />
    </div>
  );
}

function Icon83() {
  return (
    <div className="absolute left-[33px] size-[16px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container229() {
  return (
    <div className="absolute h-[47px] left-[133.53px] top-0 w-[57px]" data-name="Container">
      <Dropdown2 />
      <Icon83 />
    </div>
  );
}

function Container228() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text110 />
        <Container229 />
      </div>
    </div>
  );
}

function Text111() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#161616] text-[0px] text-[16px] top-[-2px] whitespace-nowrap">
          <span className="leading-[24px]">1–10</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` of `}</span>
          <span className="leading-[24px]">20</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` items`}</span>
        </p>
      </div>
    </div>
  );
}

function Container230() {
  return (
    <div className="h-[47px] relative shrink-0 w-[145.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <Text111 />
      </div>
    </div>
  );
}

function Container227() {
  return (
    <div className="h-[47px] relative shrink-0 w-[352.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container228 />
        <Container230 />
      </div>
    </div>
  );
}

function Text112() {
  return (
    <div className="absolute content-stretch flex h-[47px] items-center left-[66px] pr-[17px] top-0 w-[90.906px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#525252] text-[16px] whitespace-nowrap">of 2 pages</p>
    </div>
  );
}

function Option10() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option11() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-1639.094px] pr-[1704.094px] pt-[-1209px] top-[-0.5px] w-[65px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option10 />
      <Option11 />
    </div>
  );
}

function Icon84() {
  return (
    <div className="absolute left-[37px] size-[16px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container233() {
  return (
    <div className="absolute h-[47px] left-px top-0 w-[65px]" data-name="Container">
      <Dropdown3 />
      <Icon84 />
    </div>
  );
}

function Container232() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text112 />
        <Container233 />
      </div>
    </div>
  );
}

function Icon85() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M12.5 15L6.25 10L12.5 5V15Z" fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="h-[47px] opacity-25 relative shrink-0 w-[48px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon85 />
      </div>
    </div>
  );
}

function Icon86() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 5L13.75 10L7.5 15V5Z" fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px relative size-full">
        <Icon86 />
      </div>
    </div>
  );
}

function Container234() {
  return (
    <div className="h-[47px] relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Button19 />
        <Button20 />
      </div>
    </div>
  );
}

function Container231() {
  return (
    <div className="h-[47px] relative shrink-0 w-[252.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container232 />
        <Container234 />
      </div>
    </div>
  );
}

function Cn1() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-between pt-px relative shrink-0 w-full" data-name="Cn">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-solid border-t inset-0 pointer-events-none" />
      <Container227 />
      <Container231 />
    </div>
  );
}

function Container161() {
  return (
    <div className="bg-white col-1 h-[699.5px] ml-0 mt-0 relative rounded-[8px] row-1 w-[1616px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container162 />
        <Container165 />
        <Container167 />
        <Cn1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[18px] items-start min-h-px min-w-px overflow-clip relative z-[2]" data-name="Text overflow">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#161616] text-[16px] text-ellipsis text-left tracking-[0.16px] whitespace-nowrap">All</p>
    </div>
  );
}

function AiIcons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative shrink-0 z-[1]" data-name="AI + Icons">
      <div className="relative shrink-0 size-[16px]" data-name="_Dropdown chevron">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 overflow-clip" data-name="Chevron--down">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
              <path d={svgPaths.p32d32200} fill="var(--fill-0, #161616)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownInputTrigger() {
  return (
    <div className="h-[48px] relative shrink-0 w-full z-[4]" data-name="Dropdown input trigger">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative size-full">
          <TextOverflow />
          <AiIcons />
        </div>
      </div>
    </div>
  );
}

function DropdownInput() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative rounded-[8px] shrink-0 w-full z-[2]" data-name="Dropdown input">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <DropdownInputTrigger />
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[18px] items-start min-h-px min-w-px overflow-clip relative z-[2]" data-name="Text overflow">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#474444] text-[16px] text-ellipsis text-left tracking-[0.16px] whitespace-nowrap">All</p>
    </div>
  );
}

function AiIcons1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative shrink-0 z-[1]" data-name="AI + Icons">
      <div className="relative shrink-0 size-[16px]" data-name="_Dropdown chevron">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 overflow-clip" data-name="Chevron--down">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
              <path d={svgPaths.p32d32200} fill="var(--fill-0, #161616)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownInputTrigger1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full z-[4]" data-name="Dropdown input trigger">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative size-full">
          <TextOverflow1 />
          <AiIcons1 />
        </div>
      </div>
    </div>
  );
}

function DropdownInput1() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative rounded-[8px] shrink-0 w-full z-[2]" data-name="Dropdown input">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <DropdownInputTrigger1 />
    </div>
  );
}

function TextOverflow2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[18px] items-start min-h-px min-w-px overflow-clip relative z-[2]" data-name="Text overflow">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#474444] text-[16px] text-ellipsis text-left tracking-[0.16px] whitespace-nowrap">All</p>
    </div>
  );
}

function AiIcons2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative shrink-0 z-[1]" data-name="AI + Icons">
      <div className="relative shrink-0 size-[16px]" data-name="_Dropdown chevron">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 overflow-clip" data-name="Chevron--down">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
              <path d={svgPaths.p32d32200} fill="var(--fill-0, #161616)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownInputTrigger2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full z-[4]" data-name="Dropdown input trigger">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative size-full">
          <TextOverflow2 />
          <AiIcons2 />
        </div>
      </div>
    </div>
  );
}

function DropdownInput2() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative rounded-[8px] shrink-0 w-full z-[2]" data-name="Dropdown input">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <DropdownInputTrigger2 />
    </div>
  );
}

function Group6() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Container161 />
      <button className="col-1 content-stretch cursor-pointer flex flex-col items-start ml-[1066px] mt-[78px] p-[10px] relative row-1 w-[180px]" data-name="Clari5 Dropdown">
        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Dropdown - Default">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <DropdownInput />
        </div>
      </button>
      <button className="col-1 content-stretch cursor-pointer flex flex-col items-start ml-[1242px] mt-[78px] p-[10px] relative row-1 w-[180px]" data-name="Clari5 Dropdown">
        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Dropdown - Default">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <DropdownInput1 />
        </div>
      </button>
      <button className="col-1 content-stretch cursor-pointer flex flex-col items-start ml-[1418px] mt-[78px] p-[10px] relative row-1 w-[190px]" data-name="Clari5 Dropdown">
        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Dropdown - Default">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <DropdownInput2 />
        </div>
      </button>
    </div>
  );
}

function Group19() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[448px] place-items-start relative row-1">
      <Group1 />
      <Group6 />
    </div>
  );
}

function Group21() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group />
      <Group19 />
      <div className="bg-[rgba(217,217,217,0)] col-1 h-[10px] ml-0 mt-[1148px] row-1 w-[1616px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col h-[947px] items-start overflow-x-clip overflow-y-auto pl-[16px] pr-[26px] pt-[16px] right-px top-[91px] w-[1658px]" data-name="Container">
      <Group21 />
    </div>
  );
}

function Icon87() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 4.16667V15.8333" id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p27b7cd00} id="Vector_2" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function El() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[9px] size-[20px] top-[9px]" data-name="EL">
      <Icon87 />
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute bg-white border border-[#f3f4f6] border-solid left-[1849px] rounded-[33554400px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[40px] top-[982px]" data-name="Button">
      <El />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white relative size-full" data-name="Home">
      <Wae />
      <Hae />
      <St />
      <HAe />
      <Container18 />
      <Button21 />
    </div>
  );
}