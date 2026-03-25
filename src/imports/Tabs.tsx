import svgPaths from "./svg-o7xtztnvnf";

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option1() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option2() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[46px] items-start left-0 pb-px pl-[-592px] pr-[752px] pt-[-160px] rounded-[8px] top-0 w-[160px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Option />
      <Option1 />
      <Option2 />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="ChevronDown">
      <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
          <path d={svgPaths.p32d32200} fill="var(--fill-0, #6A7282)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[132px] size-[16px] top-[15px]" data-name="Container">
      <ChevronDown />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[160px]" data-name="Container">
      <Select />
      <Container4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[46px] left-[316px] top-px w-[160px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-white h-[46px] left-0 rounded-[8px] top-0 w-[300px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Search events...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Search() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Search">
      <div className="absolute inset-[6.58%_6.25%_6.25%_6.58%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9473 13.9473">
          <path d={svgPaths.p3f16a480} fill="var(--fill-0, #6A7282)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[16px] top-[15px]" data-name="Container">
      <Search />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[46px] left-0 top-px w-[300px]" data-name="Container">
      <Input />
      <Container6 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[48px] relative shrink-0 w-[476px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container2 />
        <Container5 />
      </div>
    </div>
  );
}

function Add() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[16px]" data-name="Add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p349d7700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#2a53a0] flex-[1_0_0] h-[48px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Add />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[102.5px] not-italic text-[14px] text-center text-white top-[13.5px] whitespace-nowrap">{` Add Custom Event`}</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48px] relative shrink-0 w-[179.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-[1626px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container1 />
        <Container7 />
      </div>
    </div>
  );
}

function Thead() {
  return <div className="absolute h-[48px] left-0 top-0 w-[1624px]" data-name="thead" />;
}

function Span() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Account Opening</p>
    </div>
  );
}

function Td() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span />
    </div>
  );
}

function Span1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">New account creation events with customer onboarding data</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span1 />
    </div>
  );
}

function Td1() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div2 />
    </div>
  );
}

function Span2() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td2() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span2 />
    </div>
  );
}

function Td3() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[61.28px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">4</p>
    </div>
  );
}

function View() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View />
      </div>
    </div>
  );
}

function Div3() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button1 />
    </div>
  );
}

function Td4() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div3 />
    </div>
  );
}

function Tr() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-0 w-[1624px]" data-name="tr">
      <Td />
      <Td1 />
      <Td2 />
      <Td3 />
      <Td4 />
    </div>
  );
}

function Span3() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">ACH Payment</p>
    </div>
  );
}

function Td5() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span3 />
    </div>
  );
}

function Span4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Automated Clearing House payment processing events</p>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span4 />
    </div>
  );
}

function Td6() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div4 />
    </div>
  );
}

function Span5() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td7() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span5 />
    </div>
  );
}

function Td8() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[60.47px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">3</p>
    </div>
  );
}

function View1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View1 />
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button2 />
    </div>
  );
}

function Td9() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div5 />
    </div>
  );
}

function Tr1() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[46px] w-[1624px]" data-name="tr">
      <Td5 />
      <Td6 />
      <Td7 />
      <Td8 />
      <Td9 />
    </div>
  );
}

function Span6() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">ATM Withdrawal</p>
    </div>
  );
}

function Td10() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span6 />
    </div>
  );
}

function Span7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">ATM cash withdrawal events with location information</p>
      </div>
    </div>
  );
}

function Div6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span7 />
    </div>
  );
}

function Td11() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div6 />
    </div>
  );
}

function Span8() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td12() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span8 />
    </div>
  );
}

function Td13() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[61.28px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">4</p>
    </div>
  );
}

function View2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View2 />
      </div>
    </div>
  );
}

function Div7() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button3 />
    </div>
  );
}

function Td14() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div7 />
    </div>
  );
}

function Tr2() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[92px] w-[1624px]" data-name="tr">
      <Td10 />
      <Td11 />
      <Td12 />
      <Td13 />
      <Td14 />
    </div>
  );
}

function Span9() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Beneficiary Addition</p>
    </div>
  );
}

function Td15() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span9 />
    </div>
  );
}

function Span10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">New beneficiary registration events for fund transfers</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span10 />
    </div>
  );
}

function Td16() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div8 />
    </div>
  );
}

function Span11() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td17() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span11 />
    </div>
  );
}

function Td18() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[60.47px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">3</p>
    </div>
  );
}

function View3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View3 />
      </div>
    </div>
  );
}

function Div9() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button4 />
    </div>
  );
}

function Td19() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div9 />
    </div>
  );
}

function Tr3() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[138px] w-[1624px]" data-name="tr">
      <Td15 />
      <Td16 />
      <Td17 />
      <Td18 />
      <Td19 />
    </div>
  );
}

function Span12() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Card Activation</p>
    </div>
  );
}

function Td20() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span12 />
    </div>
  );
}

function Span13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Card activation and issuance events</p>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span13 />
    </div>
  );
}

function Td21() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div10 />
    </div>
  );
}

function Span14() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td22() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span14 />
    </div>
  );
}

function Td23() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[61.28px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">4</p>
    </div>
  );
}

function View4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View4 />
      </div>
    </div>
  );
}

function Div11() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button5 />
    </div>
  );
}

function Td24() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div11 />
    </div>
  );
}

function Tr4() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[184px] w-[1624px]" data-name="tr">
      <Td20 />
      <Td21 />
      <Td22 />
      <Td23 />
      <Td24 />
    </div>
  );
}

function Span15() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Card Transaction</p>
    </div>
  );
}

function Td25() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span15 />
    </div>
  );
}

function Span16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Captures all card-based transaction events</p>
      </div>
    </div>
  );
}

function Div12() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span16 />
    </div>
  );
}

function Td26() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div12 />
    </div>
  );
}

function Span17() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td27() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span17 />
    </div>
  );
}

function Td28() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[60.53px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">2</p>
    </div>
  );
}

function View5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View5 />
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button6 />
    </div>
  );
}

function Td29() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div13 />
    </div>
  );
}

function Tr5() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[230px] w-[1624px]" data-name="tr">
      <Td25 />
      <Td26 />
      <Td27 />
      <Td28 />
      <Td29 />
    </div>
  );
}

function Span18() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Check Deposit</p>
    </div>
  );
}

function Td30() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span18 />
    </div>
  );
}

function Span19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Check deposit events including remote capture</p>
      </div>
    </div>
  );
}

function Div14() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span19 />
    </div>
  );
}

function Td31() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div14 />
    </div>
  );
}

function Span20() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td32() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span20 />
    </div>
  );
}

function Td33() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[61.28px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">4</p>
    </div>
  );
}

function View6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View6 />
      </div>
    </div>
  );
}

function Div15() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button7 />
    </div>
  );
}

function Td34() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div15 />
    </div>
  );
}

function Tr6() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[276px] w-[1624px]" data-name="tr">
      <Td30 />
      <Td31 />
      <Td32 />
      <Td33 />
      <Td34 />
    </div>
  );
}

function Span21() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[168px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Limit Modification</p>
    </div>
  );
}

function Td35() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[200px]" data-name="td">
      <Span21 />
    </div>
  );
}

function Span22() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1011.391px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Transaction and daily limit modification events</p>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29px] items-start left-[16px] py-[4px] top-[8.5px] w-[1011.391px]" data-name="div">
      <Span22 />
    </div>
  );
}

function Td36() {
  return (
    <div className="absolute h-[46px] left-[200px] top-0 w-[1043.391px]" data-name="td">
      <Div16 />
    </div>
  );
}

function Span23() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[28px] left-[16px] rounded-[6px] top-[9.13px] w-[70.875px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#004144] text-[11px] top-[5.75px] whitespace-nowrap">Financial</p>
    </div>
  );
}

function Td37() {
  return (
    <div className="absolute h-[46px] left-[1243.39px] top-0 w-[140px]" data-name="td">
      <Span23 />
    </div>
  );
}

function Td38() {
  return (
    <div className="absolute h-[46px] left-[1383.39px] top-0 w-[120.609px]" data-name="td">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[60.47px] not-italic text-[#161616] text-[14px] text-center top-[12px] underline whitespace-nowrap">3</p>
    </div>
  );
}

function View7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="View">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="View">
          <path d={svgPaths.pd42ac80} fill="var(--fill-0, #0043CE)" id="Vector" />
          <path d={svgPaths.p7b9d980} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#edf5ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <View7 />
      </div>
    </div>
  );
}

function Div17() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[16px] top-[9px] w-[88px]" data-name="div">
      <Button8 />
    </div>
  );
}

function Td39() {
  return (
    <div className="absolute h-[46px] left-[1504px] top-0 w-[120px]" data-name="td">
      <Div17 />
    </div>
  );
}

function Tr7() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[322px] w-[1624px]" data-name="tr">
      <Td35 />
      <Td36 />
      <Td37 />
      <Td38 />
      <Td39 />
    </div>
  );
}

function Tbody() {
  return (
    <div className="absolute bg-white h-[368px] left-0 top-[48px] w-[1624px]" data-name="tbody">
      <Tr />
      <Tr1 />
      <Tr2 />
      <Tr3 />
      <Tr4 />
      <Tr5 />
      <Tr6 />
      <Tr7 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[416.5px] left-0 top-0 w-[1624px]" data-name="table">
      <Thead />
      <Tbody />
    </div>
  );
}

function Span24() {
  return (
    <div className="h-[13px] relative shrink-0 w-[75.5px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[38px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Event Name</p>
      </div>
    </div>
  );
}

function Icon() {
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

function SortableHeader() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[168px]" data-name="SortableHeader">
      <Span24 />
      <Icon />
    </div>
  );
}

function Th() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-0 top-0 w-[200px]" data-name="th">
      <SortableHeader />
    </div>
  );
}

function Th1() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[200px] top-0 w-[1043.391px]" data-name="th">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.75px] whitespace-nowrap">Description</p>
    </div>
  );
}

function Span25() {
  return (
    <div className="h-[13px] relative shrink-0 w-[31.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[16px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Type</p>
      </div>
    </div>
  );
}

function Icon1() {
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

function SortableHeader1() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[108px]" data-name="SortableHeader">
      <Span25 />
      <Icon1 />
    </div>
  );
}

function Th2() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[1243.39px] top-0 w-[140px]" data-name="th">
      <SortableHeader1 />
    </div>
  );
}

function Span26() {
  return (
    <div className="h-[13px] relative shrink-0 w-[68.609px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[34.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Linked Sec</p>
      </div>
    </div>
  );
}

function Icon2() {
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

function SortableHeader2() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center justify-center left-[16px] top-[16.75px] w-[88.609px]" data-name="SortableHeader">
      <Span26 />
      <Icon2 />
    </div>
  );
}

function Th3() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[1383.39px] top-0 w-[120.609px]" data-name="th">
      <SortableHeader2 />
    </div>
  );
}

function Th4() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[1504px] top-0 w-[120px]" data-name="th">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[20px] not-italic text-[#2a53a0] text-[14px] top-[12.75px] whitespace-nowrap">Actions</p>
    </div>
  );
}

function Tr8() {
  return (
    <div className="absolute bg-[#f0f0f0] h-[48px] left-0 shadow-[0px_1px_0px_0px_#e0e0e0] top-0 w-[1624px]" data-name="tr">
      <Th />
      <Th1 />
      <Th2 />
      <Th3 />
      <Th4 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-[1624px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Table />
        <Tr8 />
      </div>
    </div>
  );
}

function Span27() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[7.813px]" data-name="span">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#161616] text-[12px] top-0 whitespace-nowrap">8</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span27 />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[13.81px] not-italic text-[#525252] text-[12px] top-0 whitespace-nowrap">{` events found`}</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[87.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[18px] relative shrink-0 w-[146.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#99a1af] text-[12px] top-0 whitespace-nowrap">Last updated: 28/01/2026</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#f4f4f4] h-[48px] relative shrink-0 w-[1624px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d0d0] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-px px-[24px] relative size-full">
        <Container11 />
        <Container13 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[1626px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container9 />
        <Container10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Div1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-[1626px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Container />
        <Container8 />
      </div>
    </div>
  );
}

function TabsContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1658px]" data-name="TabsContent">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[16px] py-[16px] relative size-full">
          <Div1 />
        </div>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="absolute content-stretch flex flex-col h-[895px] items-start left-0 overflow-clip top-[49px] w-[1658px]" data-name="div">
      <TabsContent />
    </div>
  );
}

function Span28() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[44px] not-italic text-[#2a53a0] text-[14px] text-center top-0 whitespace-nowrap">OOTB Events</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#f3f4f6] h-[20px] relative rounded-[33554400px] shrink-0 w-[24px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] text-center whitespace-nowrap">8</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div className="h-[21px] relative shrink-0 w-[120.891px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span28 />
        <Badge />
      </div>
    </div>
  );
}

function TabsTrigger() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47px] items-center justify-center left-0 pb-[2px] pl-px pr-[1.016px] pt-px top-0 w-[813px]" data-name="TabsTrigger">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-l border-r border-solid border-t inset-0 pointer-events-none" />
      <Div19 />
    </div>
  );
}

function Span29() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[50px] not-italic text-[#525252] text-[14px] text-center top-0 whitespace-nowrap">Custom Events</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#f3f4f6] h-[20px] relative rounded-[33554400px] shrink-0 w-[24px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] text-center whitespace-nowrap">8</p>
      </div>
    </div>
  );
}

function Div20() {
  return (
    <div className="h-[21px] relative shrink-0 w-[132.531px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span29 />
        <Badge1 />
      </div>
    </div>
  );
}

function TabsTrigger1() {
  return (
    <div className="absolute content-stretch flex h-[47px] items-center justify-center left-[813px] pb-[2px] pt-px px-px top-0 w-[813px]" data-name="TabsTrigger">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-l border-r border-solid border-t inset-0 pointer-events-none" />
      <Div20 />
    </div>
  );
}

function TabsList() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="TabsList">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <TabsTrigger />
      <TabsTrigger1 />
    </div>
  );
}

function Div18() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[49px] items-start left-0 pb-px px-[16px] top-0 w-[1658px]" data-name="div">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TabsList />
    </div>
  );
}

export default function Tabs() {
  return (
    <div className="relative size-full" data-name="Tabs">
      <Div />
      <Div18 />
    </div>
  );
}