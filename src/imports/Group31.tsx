import svgPaths from "./svg-1uamvo5vyh";

function DialogOverlay() {
  return <div className="absolute bg-[rgba(0,0,0,0.5)] h-[944px] left-0 top-0 w-[1918px]" data-name="DialogOverlay" />;
}

function DialogTitle() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[145.641px]" data-name="DialogTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[16px] text-white top-[-1px] whitespace-nowrap">Add Derived Fields</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <DialogTitle />
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="h-[24px] relative shrink-0 w-[145.641px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Close">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Close">
          <path d={svgPaths.pad04580} fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Close />
      </div>
    </div>
  );
}

function DialogHeader() {
  return (
    <div className="bg-[#2a53a0] h-[64px] relative shrink-0 w-[1200px]" data-name="DialogHeader">
      <div aria-hidden="true" className="absolute border-[rgba(42,83,160,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
        <Div />
        <Button />
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[13px] relative shrink-0 w-[8.578px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-0 not-italic text-[#2a53a0] text-[13px] top-0 whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[12px] text-[rgba(42,83,160,0.8)] top-0 whitespace-nowrap">Fields Selected</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#edf5ff] content-stretch flex gap-[8px] h-[36px] items-center left-[1037.94px] px-[17px] py-px rounded-[8px] top-[21px] w-[138.063px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0e2ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Span />
      <Span1 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-white h-[46px] left-0 rounded-[8px] top-0 w-[320px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Search derived fields...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Search() {
  return (
    <div className="absolute left-[12px] size-[18px] top-[14px]" data-name="Search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Search">
          <path d={svgPaths.p3121e300} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[46px] left-[24px] top-[16px] w-[320px]" data-name="Container">
      <Input />
      <Search />
    </div>
  );
}

function Div1() {
  return (
    <div className="bg-white h-[79px] relative shrink-0 w-[1200px]" data-name="div">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronDown">
      <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 7.125">
          <path d={svgPaths.p23048b80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronDown />
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">Customer Behavior - New Entity Detection (Field count: 4)</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[423.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container6 />
        <Span2 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[79.641px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">Select All</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#f4f7fb] h-[54px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Container5 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[90.094px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_device_new</p>
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span3 />
        <Span4 />
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if device has not been seen before for this customer</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container10 />
        <Span5 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[75.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_cpty_new</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span6 />
        <Span7 />
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if counterparty is new for this customer</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container13 />
        <Span8 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox1 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[118.422px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_beneficiary_new</p>
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span9 />
        <Span10 />
      </div>
    </div>
  );
}

function Span11() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if beneficiary is new for this customer</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container16 />
        <Span11 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox2 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span12() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[60.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_ip_new</p>
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span12 />
        <Span13 />
      </div>
    </div>
  );
}

function Span14() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if IP address is new for customer</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container19 />
        <Span14 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox3 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[290px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[8px] px-[8px] relative size-full">
        <Container8 />
        <Container11 />
        <Container14 />
        <Container17 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white h-[346px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container4 />
          <Container7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(42,83,160,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronDown">
      <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 7.125">
          <path d={svgPaths.p23048b80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronDown1 />
      </div>
    </div>
  );
}

function Span15() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">Geographic - New Location Detection (Field count: 3)</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[21px] relative shrink-0 w-[391.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container23 />
        <Span15 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[79.641px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">Select All</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#f4f7fb] h-[54px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Container22 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span16() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[168.063px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_origination_country_new</p>
      </div>
    </div>
  );
}

function Span17() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span16 />
        <Span17 />
      </div>
    </div>
  );
}

function Span18() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if transaction origin country is new</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container27 />
        <Span18 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox4 />
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span19() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[128.578px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_cpty_country_new</p>
      </div>
    </div>
  );
}

function Span20() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span19 />
        <Span20 />
      </div>
    </div>
  );
}

function Span21() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if counterparty country is new</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container30 />
        <Span21 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox5 />
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span22() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[135.891px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">cross_border_velocity</p>
      </div>
    </div>
  );
}

function Span23() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[54.672px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Integer</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span22 />
        <Span23 />
      </div>
    </div>
  );
}

function Span24() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Number of cross-border transactions in last 24 hours</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container33 />
        <Span24 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox6 />
          <Container32 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white h-[220.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[8px] px-[8px] relative size-full">
        <Container25 />
        <Container28 />
        <Container31 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[276.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container21 />
          <Container24 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(42,83,160,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronDown">
      <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 7.125">
          <path d={svgPaths.p23048b80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronDown2 />
      </div>
    </div>
  );
}

function Span25() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">Transaction Pattern - New Type Detection (Field count: 2)</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[21px] relative shrink-0 w-[420.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container37 />
        <Span25 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[79.641px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">Select All</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-[#f4f7fb] h-[54px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Container36 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Checkbox7() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span26() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[102.125px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_txn_type_new</p>
      </div>
    </div>
  );
}

function Span27() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span26 />
        <Span27 />
      </div>
    </div>
  );
}

function Span28() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if transaction type is new for customer</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container41 />
        <Span28 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox7 />
          <Container40 />
        </div>
      </div>
    </div>
  );
}

function Checkbox8() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Span29() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[101.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">is_trantype_new</p>
      </div>
    </div>
  );
}

function Span30() {
  return (
    <div className="bg-[#f3f4f6] h-[22.5px] relative rounded-[33554400px] shrink-0 w-[60.25px]" data-name="span">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[9px] not-italic text-[#6a7282] text-[11px] top-[3px] whitespace-nowrap">Boolean</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1065px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span29 />
        <Span30 />
      </div>
    </div>
  );
}

function Span31() {
  return (
    <div className="h-[15px] relative shrink-0 w-[1065px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">TRUE if transaction sub-type is new</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="flex-[1_0_0] h-[39.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container44 />
        <Span31 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[65.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-px relative size-full">
          <Checkbox8 />
          <Container43 />
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-white h-[151px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[8px] px-[8px] relative size-full">
        <Container39 />
        <Container42 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-white h-[207px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container35 />
          <Container38 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(42,83,160,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronRight">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.125 12.5">
          <path d={svgPaths.p75c6800} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronRight />
      </div>
    </div>
  );
}

function Span32() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Amount Analysis (Field count: 2)</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[21px] relative shrink-0 w-[252.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container48 />
        <Span32 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[79.641px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">Select All</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Container47 />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container46 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronRight">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.125 12.5">
          <path d={svgPaths.p75c6800} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronRight1 />
      </div>
    </div>
  );
}

function Span33() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Velocity Analysis (Field count: 1)</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[21px] relative shrink-0 w-[251.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container52 />
        <Span33 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[79.641px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">Select All</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Container51 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container50 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ChevronRight2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronRight">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.125 12.5">
          <path d={svgPaths.p75c6800} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronRight2 />
      </div>
    </div>
  );
}

function Span34() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Temporal Patterns (Field count: 2)</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[21px] relative shrink-0 w-[261.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container56 />
        <Span34 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[79.641px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">Select All</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Container55 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container54 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ChevronRight3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronRight">
      <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.125 12.5">
          <path d={svgPaths.p75c6800} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronRight3 />
      </div>
    </div>
  );
}

function Span35() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Security - Device Health (Field count: 1)</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[21px] relative shrink-0 w-[299.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container60 />
        <Span35 />
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[79.641px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">Select All</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Container59 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container58 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Div2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-[1200px]" data-name="div">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pl-[24px] pr-[39px] pt-[24px] relative size-full">
          <Container3 />
          <Container20 />
          <Container34 />
          <Container45 />
          <Container49 />
          <Container53 />
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#f4f4f4] col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[16px] pr-[17px] py-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#161616] text-[14px] text-center whitespace-nowrap">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[16px] pr-[17px] py-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#161616] text-[14px] text-center whitespace-nowrap">Reset Selection</p>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#2a53a0] col-3 justify-self-stretch opacity-50 relative row-1 self-stretch shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Add Derived Fields</p>
        </div>
      </div>
    </div>
  );
}

function Div3() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-[1200px]" data-name="div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] pt-px relative size-full">
        <Button8 />
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function DialogContent() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[755.188px] items-start left-[359px] overflow-clip rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[94.41px] w-[1200px]" data-name="DialogContent">
      <DialogHeader />
      <Div1 />
      <Div2 />
      <Div3 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <DialogOverlay />
      <DialogContent />
    </div>
  );
}