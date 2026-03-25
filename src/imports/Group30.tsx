import svgPaths from "./svg-8w1utsxmgi";

function DialogOverlay() {
  return <div className="absolute bg-[rgba(0,0,0,0.5)] h-[944px] left-0 top-0 w-[1918px]" data-name="DialogOverlay" />;
}

function DialogTitle() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative" data-name="DialogTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-0 not-italic text-[20px] text-white top-0 whitespace-nowrap">Configure Derived Field</p>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="h-[30px] relative shrink-0 w-[223.688px]" data-name="div">
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

function Label() {
  return (
    <div className="content-stretch flex h-[19.5px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Field Name</p>
    </div>
  );
}

function Grid() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Grid">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Grid">
          <path d={svgPaths.p1bc1ff00} fill="var(--fill-0, #DA1E28)" id="Vector" />
          <path d={svgPaths.p3dc70100} fill="var(--fill-0, #DA1E28)" id="Vector_2" />
          <path d={svgPaths.p1abb3700} fill="var(--fill-0, #DA1E28)" id="Vector_3" />
          <path d={svgPaths.p211ed570} fill="var(--fill-0, #DA1E28)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Grid />
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[21px] relative shrink-0 w-[169.344px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Consolas:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-[-1px] whitespace-nowrap">transaction_risk_index</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container3 />
        <Span />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#e5e7eb] h-[20.5px] relative rounded-[4px] shrink-0 w-[70.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#4a5565] text-[11px] top-[2px] whitespace-nowrap">Read-only</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f4f4f4] h-[46px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[17px] py-px relative size-full">
          <Container2 />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[71.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Container1 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex h-[19.5px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Description</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[4px] not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">No description provided.</p>
    </div>
  );
}

function Container7() {
  return <div className="bg-[#f3f4f6] h-px shrink-0 w-full" data-name="Container" />;
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[53.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">PROFILE ASSIGNMENT</p>
    </div>
  );
}

function RadioGroupItem() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="RadioGroupItem">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[129.125px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#161616] text-[14px] whitespace-nowrap">Apply to All Profiles</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[470px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <RadioGroupItem />
        <Label2 />
      </div>
    </div>
  );
}

function CircleIcon() {
  return (
    <div className="absolute left-[5px] size-[8px] top-[-4px]" data-name="CircleIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g clipPath="url(#clip0_6037_3447)" id="CircleIcon">
          <path d={svgPaths.p3e71aa30} fill="var(--fill-0, #2A53A0)" id="Vector" stroke="var(--stroke-0, #2A53A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
        </g>
        <defs>
          <clipPath id="clip0_6037_3447">
            <rect fill="white" height="8" width="8" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RadioGroupPrimitiveIndicator() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="RadioGroupPrimitive.Indicator">
      <CircleIcon />
    </div>
  );
}

function RadioGroupItem1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="RadioGroupItem">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[10px] px-px relative size-full">
        <RadioGroupPrimitiveIndicator />
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[152.719px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#161616] text-[14px] whitespace-nowrap">Select Specific Profiles</p>
      </div>
    </div>
  );
}

function Div3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[470px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <RadioGroupItem1 />
        <Label3 />
      </div>
    </div>
  );
}

function RadioGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[56px] items-start relative shrink-0 w-full" data-name="RadioGroup">
      <Div2 />
      <Div3 />
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="CheckIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CheckIcon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxPrimitiveIndicator() {
  return (
    <div className="content-stretch flex h-[14px] items-center justify-center relative shrink-0 w-full" data-name="CheckboxPrimitive.Indicator">
      <CheckIcon />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-[#2a53a0] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#2a53a0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <CheckboxPrimitiveIndicator />
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[86.75px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Retail Banking</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Checkbox />
      <Label4 />
    </div>
  );
}

function CheckIcon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="CheckIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CheckIcon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxPrimitiveIndicator1() {
  return (
    <div className="content-stretch flex h-[14px] items-center justify-center relative shrink-0 w-full" data-name="CheckboxPrimitive.Indicator">
      <CheckIcon1 />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="bg-[#2a53a0] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#2a53a0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <CheckboxPrimitiveIndicator1 />
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[115.125px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Corporate Banking</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="col-2 content-stretch flex gap-[12px] items-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Checkbox1 />
      <Label5 />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[126.578px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Wealth Management</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-center justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Checkbox2 />
      <Label6 />
    </div>
  );
}

function CheckIcon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="CheckIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CheckIcon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxPrimitiveIndicator2() {
  return (
    <div className="content-stretch flex h-[14px] items-center justify-center relative shrink-0 w-full" data-name="CheckboxPrimitive.Indicator">
      <CheckIcon2 />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="bg-[#2a53a0] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#2a53a0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <CheckboxPrimitiveIndicator2 />
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[111.953px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Card Transactions</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="col-2 content-stretch flex gap-[12px] items-center justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Checkbox3 />
      <Label7 />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Label8() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[87.547px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Trade Finance</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-center justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Container">
      <Checkbox4 />
      <Label8 />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Label9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.297px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#161616] text-[13px] whitespace-nowrap">Treasury</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="col-2 content-stretch flex gap-[12px] items-center justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Container">
      <Checkbox5 />
      <Label9 />
    </div>
  );
}

function Div4() {
  return (
    <div className="bg-[#f9fafb] h-[124.5px] relative rounded-[8px] shrink-0 w-full" data-name="div">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="gap-x-[24px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] p-[17px] relative size-full">
        <Container10 />
        <Container11 />
        <Container12 />
        <Container13 />
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="content-stretch flex flex-col h-[132.5px] items-start overflow-clip pt-[8px] relative shrink-0 w-full" data-name="motion.div">
      <Div4 />
    </div>
  );
}

function Container16() {
  return <div className="bg-[#f3f4f6] h-px shrink-0 w-full" data-name="Container" />;
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[255.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <RadioGroup />
      <MotionDiv />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">DATA PRIVACY</p>
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Label10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[312.984px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#161616] text-[14px] whitespace-nowrap">Mark as PII (Personally Identifiable Information)</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[12px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Checkbox6 />
      <Label10 />
    </div>
  );
}

function Information() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Information">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-[43.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 5.625">
          <path d={svgPaths.p30681580} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.62%] left-[45.31%] right-[45.31%] top-1/4" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.6875 1.6875">
          <path d={svgPaths.p1613b480} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.75 15.75">
          <path d={svgPaths.p33f44e00} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] size-[18px] top-[15px]" data-name="Container">
      <Information />
    </div>
  );
}

function P() {
  return (
    <div className="absolute h-[42.25px] left-[43px] top-[13px] w-[414px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.125px] left-0 not-italic text-[#0043ce] text-[13px] top-0 w-[367px]">Enable if this derived field could reveal sensitive patterns or contains personal data.</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#edf5ff] h-[68.25px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0e2ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container21 />
      <P />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[139.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Div1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[510px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start pt-[24px] px-[20px] relative size-full">
        <Container />
        <Container5 />
        <Container8 />
        <Container17 />
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
    <div className="absolute left-[186.44px] size-[18px] top-[22.5px]" data-name="Checkmark">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Checkmark">
          <path d={svgPaths.p63e4a00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[49.44px] top-[21px]">
      <Checkmark />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[115.44px] not-italic text-[14px] text-center text-white top-[21px] whitespace-nowrap">{` Save Configuration`}</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2a53a0] flex-[1_0_0] h-[63px] min-h-px min-w-px relative" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Group />
      </div>
    </div>
  );
}

function Div5() {
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
        <Div5 />
      </div>
    </div>
  );
}

function DialogContent() {
  return (
    <div className="absolute bg-white h-[769.75px] left-[703px] rounded-[8px] top-[87.13px] w-[512px]" data-name="DialogContent">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <DialogHeader />
        <Form />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <DialogOverlay />
      <DialogContent />
    </div>
  );
}