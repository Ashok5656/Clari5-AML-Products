import svgPaths from "./svg-cnznrt52yp";

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p63e4a00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#00c950] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#00c950] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#525252] text-[13px] top-0 whitespace-nowrap">Event Information</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[155.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container3 />
        <Text />
      </div>
    </div>
  );
}

function Container4() {
  return <div className="bg-[#e5e7eb] flex-[1_0_0] h-[2px] min-h-px min-w-px" data-name="Container" />;
}

function Container6() {
  return (
    <div className="bg-[#2a53a0] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#2a53a0] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_0px_0px_0px_#eff6ff,0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#2a53a0] text-[13px] top-0 whitespace-nowrap">Field Configuration</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[32px] relative shrink-0 w-[163.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container6 />
        <Text1 />
      </div>
    </div>
  );
}

function Container7() {
  return <div className="bg-[#e5e7eb] flex-[1_0_0] h-[2px] min-h-px min-w-px" data-name="Container" />;
}

function Container9() {
  return (
    <div className="bg-white relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#99a1af] text-[13px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#525252] text-[13px] top-0 whitespace-nowrap">Review and Create Event</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[32px] relative shrink-0 w-[199.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container9 />
        <Text2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[1658px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center pl-[48px] pr-[47.984px] relative size-full">
        <Container2 />
        <Container4 />
        <Container5 />
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex h-[73px] items-center justify-center left-0 pb-px top-0 w-[1658px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#161616] text-[15px] top-[-2px] whitespace-nowrap">Field Configuration</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-0 whitespace-nowrap">Define the data structure for this custom event.</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[44.5px] relative shrink-0 w-[267.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Upload">
          <path d={svgPaths.p37835300} fill="var(--fill-0, #2A53A0)" id="Vector" />
          <path d={svgPaths.p1afb4000} fill="var(--fill-0, #2A53A0)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-[102.344px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#2a53a0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[63px] not-italic text-[#2a53a0] text-[13px] text-center top-[13.25px] whitespace-nowrap">{` Upload`}</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1c30a680} fill="var(--fill-0, #4A5565)" id="Vector" />
          <path d="M2 9.5H7V10.5H2V9.5Z" fill="var(--fill-0, #4A5565)" id="Vector_2" />
          <path d="M2 12H7V13H2V12Z" fill="var(--fill-0, #4A5565)" id="Vector_3" />
          <path d="M9 4H14V5H9V4Z" fill="var(--fill-0, #4A5565)" id="Vector_4" />
          <path d={svgPaths.p38ca8400} fill="var(--fill-0, #4A5565)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[46px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[96.5px] not-italic text-[#4a5565] text-[13px] text-center top-[13.25px] whitespace-nowrap">{` Add Derived Field`}</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[46px] relative rounded-[8px] shrink-0 w-[116.547px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#2a53a0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[70.5px] not-italic text-[#2a53a0] text-[13px] text-center top-[13.25px] whitespace-nowrap">{` Add Field`}</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[46px] relative shrink-0 w-[410.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[438.047px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.5px] whitespace-nowrap">Field / Display Name</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[46px] left-[438.05px] top-0 w-[169.094px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.5px] whitespace-nowrap">Type</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[46px] left-[607.14px] top-0 w-[282.391px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.5px] whitespace-nowrap">Constraints</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[46px] left-[889.53px] top-0 w-[160.828px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.5px] whitespace-nowrap">Req.</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute h-[46px] left-[1050.36px] top-0 w-[126.094px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.5px] whitespace-nowrap">PII</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute h-[46px] left-[1176.45px] top-0 w-[243.547px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.5px] whitespace-nowrap">Category</p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute h-[46px] left-[1420px] top-0 w-[140px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] not-italic text-[#2a53a0] text-[14px] top-[12.5px] whitespace-nowrap">Actions</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[1560px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute bg-[#f4f4f4] h-[46px] left-0 top-0 w-[1560px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3f50d070} fill="var(--fill-0, #99A1AF)" id="Vector" />
          <path d={svgPaths.p2bc3f80} fill="var(--fill-0, #99A1AF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[450px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[225px] not-italic text-[#99a1af] text-[13px] text-center top-0 whitespace-nowrap">{`No fields defined yet. Click "Add Field" or "Load Reference Data" to start.`}</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[63.5px] items-center justify-center left-0 opacity-50 top-[64.25px] w-[1560px]" data-name="Container">
      <Icon4 />
      <Paragraph1 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute bg-white h-[192px] left-0 top-0 w-[1560px]" data-name="Table Cell">
      <Container16 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[1560px]" data-name="Table Row">
      <TableCell />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[192px] left-0 top-[46px] w-[1560px]" data-name="Table Body">
      <TableRow1 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[238px] relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white h-[240px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Table />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[20px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p382b1100} fill="var(--fill-0, #2A53A0)" id="Vector" />
          <path d={svgPaths.p1e3d5f00} fill="var(--fill-0, #2A53A0)" id="Vector_2" />
          <path d={svgPaths.p30b0600} fill="var(--fill-0, #2A53A0)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#2a53a0] text-[13px] top-0 whitespace-nowrap">Heads up!</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#193cb8] text-[12px] top-0 whitespace-nowrap">All events automatically include standard audit fields like `tenant_id`, `event_id`, and `timestamp`. You only need to define custom business attributes here.</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[43px] items-start left-[52px] top-[16px] w-[872.281px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#eff6ff] h-[75px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2a53a0] border-l-4 border-solid inset-0 pointer-events-none rounded-br-[8px] rounded-tr-[8px]" />
      <Icon5 />
      <Container18 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[457px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[24px] px-[48px] relative size-full">
        <Container12 />
        <Container15 />
        <Container17 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[662px] items-start left-0 overflow-clip top-[73px] w-[1658px]" data-name="Container">
      <Container11 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[48px] relative rounded-[8px] shrink-0 w-[91.406px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon6 />
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[58.5px] not-italic text-[#525252] text-[14px] text-center top-[13.5px] whitespace-nowrap">{` Back`}</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[33px] py-[13px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#525252] text-[14px] text-center whitespace-nowrap">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[48px] relative shrink-0 w-[211.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[25px] py-[13px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-center whitespace-nowrap">Save as Draft</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#e5e7eb] h-[48px] opacity-50 relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[130.203px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[32px] py-[12px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-center whitespace-nowrap">Next Step</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[48px] relative shrink-0 w-[280.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#f4f4f4] content-stretch flex h-[72px] items-center justify-between left-0 pt-px px-[48px] top-[735px] w-[1658px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Container20 />
      <Container21 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Container />
      <Container10 />
      <Container19 />
    </div>
  );
}