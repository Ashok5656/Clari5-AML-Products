import svgPaths from "./svg-r4oodxq4jz";

function DialogOverlay() {
  return <div className="absolute bg-[rgba(0,0,0,0.5)] h-[944px] left-0 top-0 w-[1918px]" data-name="DialogOverlay" />;
}

function DialogTitle() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative" data-name="DialogTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-0 not-italic text-[20px] text-white top-0 whitespace-nowrap">Add New Field</p>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="h-[30px] relative shrink-0 w-[137.688px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <DialogTitle />
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Close">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Close">
          <path d={svgPaths.pc0cc3f0} fill="var(--fill-0, white)" id="Vector" />
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
    <div className="bg-[#2a53a0] h-[64px] relative shrink-0 w-[510px]" data-name="DialogHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px px-[30px] relative size-full">
        <Div />
        <Button />
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="absolute h-[19.5px] left-[78.25px] top-0 w-[7.016px]" data-name="span">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#fb2c36] text-[13px] top-0 whitespace-nowrap">*</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">{`Field Name `}</p>
      <Span />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">e.g., transaction_amt</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute h-[19.5px] left-[94.36px] top-0 w-[7.016px]" data-name="span">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#fb2c36] text-[13px] top-0 whitespace-nowrap">*</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">{`Display Name `}</p>
      <Span1 />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">e.g., Transaction Amount</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Container() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[71.5px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex h-[19.5px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Description</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white h-[80px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Briefly describe the purpose of this field...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[105.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Textarea />
    </div>
  );
}

function Span2() {
  return (
    <div className="absolute h-[19.5px] left-[71.47px] top-0 w-[7.016px]" data-name="span">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#fb2c36] text-[13px] top-0 whitespace-nowrap">*</p>
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">{`Data Type `}</p>
      <Span2 />
    </div>
  );
}

function SelectValue() {
  return (
    <div className="h-[21px] relative shrink-0 w-[39.219px]" data-name="SelectValue">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center whitespace-nowrap">String</p>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="ChevronDownIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDownIcon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function SelectTrigger() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-full" data-name="SelectTrigger">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <SelectValue />
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[71.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <SelectTrigger />
    </div>
  );
}

function Information() {
  return (
    <div className="absolute left-0 size-[14px] top-[2px]" data-name="Information">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_6036_3213)" id="Information">
          <path d={svgPaths.pa166400} fill="var(--fill-0, #6A7282)" id="Vector" />
          <path d={svgPaths.p35058d00} fill="var(--fill-0, #6A7282)" id="Vector_2" />
          <path d={svgPaths.p2087300} fill="var(--fill-0, #6A7282)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_6036_3213">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Information />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[22px] not-italic text-[#6a7282] text-[12px] top-0 tracking-[0.6px] uppercase whitespace-nowrap">Type Specific Constraints</p>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex h-[19.5px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Max Length</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">255</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label4 />
      <Input2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[71.5px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white h-[139.5px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[316.797px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#161616] text-[14px] whitespace-nowrap">Mark as PII (Personally Identifiable Information)</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[12px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Checkbox />
      <Label5 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start pt-[9px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Container10 />
    </div>
  );
}

function Div1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[510px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pt-[16px] px-[20px] relative size-full">
        <Container />
        <Container3 />
        <Container4 />
        <Container5 />
        <Container9 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f4f4f4] h-[63px] relative shrink-0 w-[255px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[127.75px] not-italic text-[#2a53a0] text-[14px] text-center top-[21px] whitespace-nowrap">Cancel</p>
      </div>
    </div>
  );
}

function Checkmark() {
  return (
    <div className="absolute left-[160.25px] size-[18px] top-[22.5px]" data-name="Checkmark">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Checkmark">
          <path d={svgPaths.p63e4a00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#d1d5dc] flex-[1_0_0] h-[63px] min-h-px min-w-px relative" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Checkmark />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[109.75px] not-italic text-[14px] text-center text-white top-[21px] whitespace-nowrap">{` Create Field`}</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="bg-[#f4f4f4] h-[64px] relative shrink-0 w-[510px]" data-name="div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-px relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-[510px]" data-name="form">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Div1 />
        <Div2 />
      </div>
    </div>
  );
}

function DialogContent() {
  return (
    <div className="absolute bg-white h-[644px] left-[703px] rounded-[8px] top-[150px] w-[512px]" data-name="DialogContent">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <DialogHeader />
        <Form />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
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