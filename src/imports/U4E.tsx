import svgPaths from "./svg-poqy48pkdn";

function Text() {
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
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-410.531px] pr-[467.531px] pt-[-879.5px] top-[-0.5px] w-[57px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
    </div>
  );
}

function Icon() {
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

function Container2() {
  return (
    <div className="absolute h-[47px] left-[133.53px] top-0 w-[57px]" data-name="Container">
      <Dropdown />
      <Icon />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text />
        <Container2 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#161616] text-[0px] text-[16px] top-[-2px] whitespace-nowrap">
          <span className="leading-[24px]">1–13</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` of `}</span>
          <span className="leading-[24px]">13</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` items`}</span>
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[47px] relative shrink-0 w-[142.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <Text1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[47px] relative shrink-0 w-[350.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container1 />
        <Container3 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[47px] items-center left-[64px] pr-[17px] top-0 w-[90.906px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#525252] text-[16px] whitespace-nowrap">of 1 pages</p>
    </div>
  );
}

function Option4() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-1651.094px] pr-[1714.094px] pt-[-879.5px] top-[-0.5px] w-[63px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[35px] size-[16px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[47px] left-px top-0 w-[63px]" data-name="Container">
      <Dropdown1 />
      <Icon1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text2 />
        <Container6 />
      </div>
    </div>
  );
}

function Icon2() {
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

function Button() {
  return (
    <div className="h-[47px] opacity-25 relative shrink-0 w-[48px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
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

function Button1() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px opacity-25 relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[47px] relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[47px] relative shrink-0 w-[250.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container5 />
        <Container7 />
      </div>
    </div>
  );
}

function Sn() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-between left-0 pt-px top-[591px] w-[1624px]" data-name="Sn">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-solid border-t inset-0 pointer-events-none" />
      <Container />
      <Container4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[60.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">tenant_id</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container9 />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container10 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#198038] text-[14px] top-0 whitespace-nowrap">{`"ICICI"`}</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text5 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text6 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container11 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-0 w-[1609px]" data-name="Table Row">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[79.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">event_name</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container12 />
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge1 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container13 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#198038] text-[14px] top-0 whitespace-nowrap">{`"FT_AcctTxn"`}</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text9 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text10 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button4 />
      <Button5 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container14 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[46px] w-[1609px]" data-name="Table Row">
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[21px] relative shrink-0 w-[55.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">event_id</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text11 />
      <Text12 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container15 />
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge2 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container16 />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">eventID</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text13 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text14 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button6 />
      <Button7 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container17 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[92px] w-[1609px]" data-name="Table Row">
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[112.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">event_timestamp</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container18 />
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge3 />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container19 />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">event_TS</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text17 />
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text18 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button8 />
      <Button9 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container20 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[138px] w-[1609px]" data-name="Table Row">
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[21px] relative shrink-0 w-[159.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">event_arrival_timestamp</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text19 />
      <Text20 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container21 />
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge4 />
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container22 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">AUTO:TIMESTAMP</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text21 />
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text22 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button10 />
      <Button11 />
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container23 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[184px] w-[1609px]" data-name="Table Row">
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[21px] relative shrink-0 w-[129.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">transaction_amount</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text23 />
      <Text24 />
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container24 />
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge5 />
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container25 />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">payload.transaction.amount</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text25 />
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text26 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button12 />
      <Button13 />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container26 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[230px] w-[1609px]" data-name="Table Row">
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[21px] relative shrink-0 w-[105.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">merchant_name</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text27 />
      <Text28 />
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container27 />
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge6 />
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container28 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">merchant.name</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text29 />
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text30 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button14 />
      <Button15 />
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container29 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[276px] w-[1609px]" data-name="Table Row">
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p3c5f5f00} fill="var(--fill-0, #99A1AF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[21px] relative shrink-0 w-[145.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">card_number_masked</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text31 />
      <Text32 />
    </div>
  );
}

function TableCell42() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container30 />
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[#f4f4f4] h-[22px] relative rounded-[4px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#525252] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">System</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge7 />
    </div>
  );
}

function TableCell43() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container31 />
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">{`{card_number}`}</p>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text33 />
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text34 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #E5E7EB)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #E5E7EB)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #E5E7EB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button16 />
      <Button17 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container32 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[322px] w-[1609px]" data-name="Table Row">
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[18.75%_56.25%_56.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path d={svgPaths.p3f8bf7b2} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p3086c900} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon28 />
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[21px] relative shrink-0 w-[95.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">custom_status</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text35 />
      <Text36 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container33 />
    </div>
  );
}

function Badge8() {
  return (
    <div className="bg-[#d0e2ff] h-[22px] relative rounded-[4px] shrink-0 w-[64.922px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#0043ce] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">Custom</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge8 />
    </div>
  );
}

function TableCell49() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container34 />
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">status_code</p>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text37 />
    </div>
  );
}

function TableCell51() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text38 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #8A3FFC)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-[#f6f2ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #DA1E28)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #DA1E28)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #DA1E28)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #DA1E28)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-[#fff1f1] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon30 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button18 />
      <Button19 />
    </div>
  );
}

function TableCell53() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container35 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[368px] w-[1609px]" data-name="Table Row">
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[22.04%_6.25%_7.73%_59.72%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.44501 11.236">
          <path d={svgPaths.p3aac7f00} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[9.38%] left-1/4 right-1/4 top-[9.38%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 13">
          <path d={svgPaths.p2a507600} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[7.73%_59.71%_22.04%_6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.44702 11.2366">
          <path d={svgPaths.p15166d00} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon31 />
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[21px] relative shrink-0 w-[147.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">transaction_risk_index</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text39 />
      <Text40 />
    </div>
  );
}

function TableCell54() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container36 />
    </div>
  );
}

function Badge9() {
  return (
    <div className="bg-[#e8daff] h-[22px] relative rounded-[4px] shrink-0 w-[63.156px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#8a3ffc] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">Derived</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge9 />
    </div>
  );
}

function TableCell55() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container37 />
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">(base_score) * (multiplier)</p>
    </div>
  );
}

function TableCell56() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text41 />
    </div>
  );
}

function TableCell57() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">Calculated risk metric</p>
    </div>
  );
}

function TableCell58() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text42 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2acbe800} fill="var(--fill-0, #8A3FFC)" id="Vector" />
          <path d={svgPaths.pb1a8400} fill="var(--fill-0, #8A3FFC)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-[#f6f2ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #DA1E28)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #DA1E28)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #DA1E28)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #DA1E28)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-[#fff1f1] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button20 />
      <Button21 />
    </div>
  );
}

function TableCell59() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container38 />
    </div>
  );
}

function TableRow9() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[414px] w-[1609px]" data-name="Table Row">
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[22.04%_6.25%_7.73%_59.72%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.44501 11.236">
          <path d={svgPaths.p3aac7f00} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[9.38%] left-1/4 right-1/4 top-[9.38%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 13">
          <path d={svgPaths.p2a507600} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[7.73%_59.71%_22.04%_6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.44702 11.2366">
          <path d={svgPaths.p15166d00} fill="var(--fill-0, #8A3FFC)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon34 />
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[21px] relative shrink-0 w-[144.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">avg_transaction_value</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text43 />
      <Text44 />
    </div>
  );
}

function TableCell60() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container39 />
    </div>
  );
}

function Badge10() {
  return (
    <div className="bg-[#e8daff] h-[22px] relative rounded-[4px] shrink-0 w-[63.156px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#8a3ffc] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">Derived</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge10 />
    </div>
  );
}

function TableCell61() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container40 />
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">sum(amount) / count(*)</p>
    </div>
  );
}

function TableCell62() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text45 />
    </div>
  );
}

function TableCell63() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">Double</p>
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">30-day rolling average</p>
    </div>
  );
}

function TableCell64() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text46 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2acbe800} fill="var(--fill-0, #8A3FFC)" id="Vector" />
          <path d={svgPaths.pb1a8400} fill="var(--fill-0, #8A3FFC)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-[#f6f2ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon35 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #DA1E28)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #DA1E28)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #DA1E28)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #DA1E28)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-[#fff1f1] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon36 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button22 />
      <Button23 />
    </div>
  );
}

function TableCell65() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container41 />
    </div>
  );
}

function TableRow10() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[460px] w-[1609px]" data-name="Table Row">
      <TableCell60 />
      <TableCell61 />
      <TableCell62 />
      <TableCell63 />
      <TableCell64 />
      <TableCell65 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[18.75%_56.25%_56.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path d={svgPaths.p3f8bf7b2} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p3086c900} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon37 />
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[21px] relative shrink-0 w-[63.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">full_name</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.5px] w-[289.797px]" data-name="Container">
      <Text47 />
      <Text48 />
    </div>
  );
}

function TableCell66() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container42 />
    </div>
  );
}

function Badge11() {
  return (
    <div className="bg-[#d0e2ff] h-[22px] relative rounded-[4px] shrink-0 w-[64.922px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#0043ce] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">Custom</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12px] w-[209.344px]" data-name="Container">
      <Badge11 />
    </div>
  );
}

function TableCell67() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container43 />
    </div>
  );
}

function Text49() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">first_name</p>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text49 />
    </div>
  );
}

function TableCell69() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text50() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.5px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell70() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text50 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #8A3FFC)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="bg-[#f6f2ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon38 />
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #DA1E28)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #DA1E28)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #DA1E28)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #DA1E28)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button25() {
  return (
    <div className="bg-[#fff1f1] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon39 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9px] w-[177.188px]" data-name="Container">
      <Button24 />
      <Button25 />
    </div>
  );
}

function TableCell71() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container44 />
    </div>
  );
}

function TableRow11() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[506px] w-[1609px]" data-name="Table Row">
      <TableCell66 />
      <TableCell67 />
      <TableCell68 />
      <TableCell69 />
      <TableCell70 />
      <TableCell71 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[18.75%_56.25%_56.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path d={svgPaths.p3f8bf7b2} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p3086c900} fill="var(--fill-0, #0043CE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon40 />
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[21px] relative shrink-0 w-[80.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">amount_usd</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[21px] items-center left-[16px] top-[12.75px] w-[289.797px]" data-name="Container">
      <Text51 />
      <Text52 />
    </div>
  );
}

function TableCell72() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[321.797px]" data-name="Table Cell">
      <Container45 />
    </div>
  );
}

function Badge12() {
  return (
    <div className="bg-[#d0e2ff] h-[22px] relative rounded-[4px] shrink-0 w-[64.922px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#0043ce] text-[11px] tracking-[-0.275px] uppercase whitespace-nowrap">Custom</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-center left-[16px] top-[12.25px] w-[209.344px]" data-name="Container">
      <Badge12 />
    </div>
  );
}

function TableCell73() {
  return (
    <div className="absolute h-[46px] left-[321.8px] top-0 w-[241.344px]" data-name="Table Cell">
      <Container46 />
    </div>
  );
}

function Text53() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.75px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#2a53a0] text-[14px] top-0 whitespace-nowrap">amount</p>
    </div>
  );
}

function TableCell74() {
  return (
    <div className="absolute h-[46px] left-[563.14px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text53 />
    </div>
  );
}

function TableCell75() {
  return (
    <div className="absolute h-[46px] left-[884.94px] top-0 w-[193.078px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[#161616] text-[14px] top-[12.25px] whitespace-nowrap">String</p>
    </div>
  );
}

function Text54() {
  return (
    <div className="absolute h-[21px] left-[16px] overflow-clip top-[12.75px] w-[289.797px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#525252] text-[14px] top-0 whitespace-nowrap">-</p>
    </div>
  );
}

function TableCell76() {
  return (
    <div className="absolute h-[46px] left-[1078.02px] top-0 w-[321.797px]" data-name="Table Cell">
      <Text54 />
    </div>
  );
}

function Icon41() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M1 13H15V14H1V13Z" fill="var(--fill-0, #8A3FFC)" id="Vector" />
          <path d={svgPaths.p279f5270} fill="var(--fill-0, #8A3FFC)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="bg-[#f6f2ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon41 />
      </div>
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 6H7V12H6V6Z" fill="var(--fill-0, #DA1E28)" id="Vector" />
          <path d="M9 6H10V12H9V6Z" fill="var(--fill-0, #DA1E28)" id="Vector_2" />
          <path d={svgPaths.p1b095900} fill="var(--fill-0, #DA1E28)" id="Vector_3" />
          <path d="M6 1H10V2H6V1Z" fill="var(--fill-0, #DA1E28)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Button27() {
  return (
    <div className="bg-[#fff1f1] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon42 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[28px] items-center left-[16px] top-[9.25px] w-[177.188px]" data-name="Container">
      <Button26 />
      <Button27 />
    </div>
  );
}

function TableCell77() {
  return (
    <div className="absolute h-[46px] left-[1399.81px] top-0 w-[209.188px]" data-name="Table Cell">
      <Container47 />
    </div>
  );
}

function TableRow12() {
  return (
    <div className="absolute h-[46px] left-0 top-[552px] w-[1609px]" data-name="Table Row">
      <TableCell72 />
      <TableCell73 />
      <TableCell74 />
      <TableCell75 />
      <TableCell76 />
      <TableCell77 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[598px] left-0 top-[48px] w-[1609px]" data-name="Table Body">
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
      <TableRow10 />
      <TableRow11 />
      <TableRow12 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[646px] left-0 top-0 w-[1609px]" data-name="Table">
      <TableBody />
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[13px] relative shrink-0 w-[70.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[35px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Field Name</p>
      </div>
    </div>
  );
}

function Icon43() {
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

function Be() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[289.797px]" data-name="be">
      <Text55 />
      <Icon43 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[321.797px]" data-name="Header Cell">
      <Be />
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[13px] relative shrink-0 w-[31.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[16px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Type</p>
      </div>
    </div>
  );
}

function Icon44() {
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

function Be1() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[209.344px]" data-name="be">
      <Text56 />
      <Icon44 />
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[48px] left-[321.8px] top-0 w-[241.344px]" data-name="Header Cell">
      <Be1 />
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[13px] relative shrink-0 w-[114.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[57.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Source / Category</p>
      </div>
    </div>
  );
}

function Icon45() {
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

function Be2() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[289.797px]" data-name="be">
      <Text57 />
      <Icon45 />
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[48px] left-[563.14px] top-0 w-[321.797px]" data-name="Header Cell">
      <Be2 />
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[13px] relative shrink-0 w-[63.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[32px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Data Type</p>
      </div>
    </div>
  );
}

function Icon46() {
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

function Be3() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[161.078px]" data-name="be">
      <Text58 />
      <Icon46 />
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[48px] left-[884.94px] top-0 w-[193.078px]" data-name="Header Cell">
      <Be3 />
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[13px] relative shrink-0 w-[72.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[36.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Description</p>
      </div>
    </div>
  );
}

function Icon47() {
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

function Be4() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[289.797px]" data-name="be">
      <Text59 />
      <Icon47 />
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute h-[48px] left-[1078.02px] top-0 w-[321.797px]" data-name="Header Cell">
      <Be4 />
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute h-[48px] left-[1399.81px] top-0 w-[209.188px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[16px] not-italic text-[#2a53a0] text-[13px] top-[14px] whitespace-nowrap">Actions</p>
    </div>
  );
}

function TableRow13() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[1609px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute bg-[#f4f4f4] border-[#d0d0d0] border-b border-solid h-[48px] left-0 top-0 w-[1609px]" data-name="Table Header">
      <TableRow13 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white h-[591px] left-0 overflow-clip top-0 w-[1624px]" data-name="Container">
      <Table />
      <TableHeader />
    </div>
  );
}

export default function U4E() {
  return (
    <div className="bg-white border border-[#e5e7eb] border-solid overflow-clip relative rounded-[4px] size-full" data-name="u4e">
      <Sn />
      <Container8 />
    </div>
  );
}