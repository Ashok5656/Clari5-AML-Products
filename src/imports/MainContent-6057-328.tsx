import svgPaths from "./svg-ltuj9dm1km";

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[30px] left-0 not-italic text-[#161616] text-[20px] top-0 whitespace-nowrap">Pending Verification</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[30px] relative shrink-0 w-[193.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[67.5px] not-italic text-[#161616] text-[14px] text-center top-0 whitespace-nowrap">Pending Verification</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button />
      </div>
    </div>
  );
}

function MR() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="mR">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[133.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <MR />
      </div>
    </div>
  );
}

function St() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-[1658px]" data-name="St">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[46px] left-0 rounded-[8px] top-0 w-[280px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[44px] pr-[16px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6a7282] text-[13px] whitespace-nowrap">Search by name, ID or desc...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.58%_6.25%_6.25%_6.58%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9473 13.9473">
          <path d={svgPaths.p3f16a480} fill="var(--fill-0, #6A7282)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[16px] top-[15px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[46px] left-0 top-px w-[280px]" data-name="Container">
      <TextInput />
      <Container7 />
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

function Option4() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option5() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option6() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[46px] items-start left-0 pb-px pl-[-568px] pr-[728px] pt-[-111px] rounded-[8px] top-0 w-[160px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
      <Option4 />
      <Option5 />
      <Option6 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 4.9875">
          <path d={svgPaths.p849ae00} fill="var(--fill-0, #6A7282)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[134px] size-[14px] top-[16px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[46px] left-[292px] top-px w-[160px]" data-name="Container">
      <Dropdown />
      <Container9 />
    </div>
  );
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

function Option10() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option11() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option12() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option13() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option14() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option15() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[46px] items-start left-0 pb-px pl-[-740px] pr-[900px] pt-[-111px] rounded-[8px] top-0 w-[160px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Option7 />
      <Option8 />
      <Option9 />
      <Option10 />
      <Option11 />
      <Option12 />
      <Option13 />
      <Option14 />
      <Option15 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 4.9875">
          <path d={svgPaths.p849ae00} fill="var(--fill-0, #6A7282)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[134px] size-[14px] top-[16px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[46px] left-[464px] top-px w-[160px]" data-name="Container">
      <Dropdown1 />
      <Container11 />
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container6 />
        <Container8 />
        <Container10 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_6056_317)" id="Icon">
          <path d={svgPaths.pa166400} fill="var(--fill-0, #2A53A0)" id="Vector" />
          <path d={svgPaths.p35058d00} fill="var(--fill-0, #2A53A0)" id="Vector_2" />
          <path d={svgPaths.p2087300} fill="var(--fill-0, #2A53A0)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_6056_317">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#525252] text-[12px] top-0 whitespace-nowrap">4 Artifacts found</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[18px] relative shrink-0 w-[118.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon3 />
        <Text />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-[1626px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container5 />
        <Container12 />
      </div>
    </div>
  );
}

function TableHeader() {
  return <div className="absolute h-[48px] left-0 top-0 w-[1624px]" data-name="Table Header" />;
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1f170a80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[84.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">Sample Event</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[19.5px] items-center left-[16px] overflow-clip top-[13.25px] w-[292.797px]" data-name="Container">
      <Icon4 />
      <Text1 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[324.797px]" data-name="Table Cell">
      <Container15 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3c63ce00} fill="var(--fill-0, #005D5D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[16.5px] left-[28px] top-[3.75px] w-[29.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#005d5d] text-[11px] top-0 whitespace-nowrap">Event</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[#f1fbfa] border border-[#a7f0ba] border-solid h-[26px] left-[16px] rounded-[6px] top-[10px] w-[69.578px]" data-name="Container">
      <Icon5 />
      <Text2 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[46px] left-[324.8px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container16 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[7px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3c63ce00} fill="var(--fill-0, #004144)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[16.5px] left-[30px] top-[4.75px] w-[61.922px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#004144] text-[11px] top-0 whitespace-nowrap">Transaction</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[26px] left-[16px] rounded-[6px] top-[10px] w-[101.922px]" data-name="Container">
      <Icon6 />
      <Text3 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[46px] left-[552.16px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container17 />
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[325.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">Updated configuration</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.5px] items-start left-[16px] top-[13.25px] w-[325.266px]" data-name="Container">
      <Text4 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[46px] left-[779.52px] top-0 w-[357.266px]" data-name="Table Cell">
      <Container18 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.7">
          <path d={svgPaths.p1a611b80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[70.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#161616] text-[12px] top-0 whitespace-nowrap">2026-03-09</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[18px] items-center left-[16px] top-[14px] w-[130.391px]" data-name="Container">
      <Icon7 />
      <Text5 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[46px] left-[1136.78px] top-0 w-[162.391px]" data-name="Table Cell">
      <Container19 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#fff9e5] content-stretch flex h-[28px] items-center justify-center left-[16px] px-[13px] py-px rounded-[33554400px] top-[9px] w-[119.156px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#fdebb2] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#b28600] text-[11px] whitespace-nowrap">Pending Approval</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[46px] left-[1299.17px] top-0 w-[194.875px]" data-name="Table Cell">
      <Text6 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p9584ef0} fill="var(--fill-0, #6929C4)" id="Vector" />
          <path d={svgPaths.p39a3c700} fill="var(--fill-0, #6929C4)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f2f0ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e1dbff] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[16px] pr-[0.016px] top-[9px] w-[97.953px]" data-name="Container">
      <Button1 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[46px] left-[1494.05px] top-0 w-[129.953px]" data-name="Table Cell">
      <Container20 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-0 w-[1624px]" data-name="Table Row">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1f170a80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[160.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">High_Value_Wire_Transfer</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[19.5px] items-center left-[16px] overflow-clip top-[13.25px] w-[292.797px]" data-name="Container">
      <Icon9 />
      <Text7 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[324.797px]" data-name="Table Cell">
      <Container21 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3c63ce00} fill="var(--fill-0, #005D5D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[16.5px] left-[28px] top-[3.75px] w-[29.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#005d5d] text-[11px] top-0 whitespace-nowrap">Event</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#f1fbfa] border border-[#a7f0ba] border-solid h-[26px] left-[16px] rounded-[6px] top-[10px] w-[69.578px]" data-name="Container">
      <Icon10 />
      <Text8 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[46px] left-[324.8px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container22 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[7px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3c63ce00} fill="var(--fill-0, #004144)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[16.5px] left-[30px] top-[4.75px] w-[61.922px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#004144] text-[11px] top-0 whitespace-nowrap">Transaction</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[26px] left-[16px] rounded-[6px] top-[10px] w-[101.922px]" data-name="Container">
      <Icon11 />
      <Text9 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[46px] left-[552.16px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container23 />
    </div>
  );
}

function Text10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[325.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">Verification pending for international high-value transfer schema</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.5px] items-start left-[16px] top-[13.25px] w-[325.266px]" data-name="Container">
      <Text10 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[46px] left-[779.52px] top-0 w-[357.266px]" data-name="Table Cell">
      <Container24 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.7">
          <path d={svgPaths.p1a611b80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[67.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#161616] text-[12px] top-0 whitespace-nowrap">2025-02-13</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[18px] items-center left-[16px] top-[14px] w-[130.391px]" data-name="Container">
      <Icon12 />
      <Text11 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[46px] left-[1136.78px] top-0 w-[162.391px]" data-name="Table Cell">
      <Container25 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#fff9e5] content-stretch flex h-[28px] items-center justify-center left-[16px] px-[13px] py-px rounded-[33554400px] top-[9px] w-[119.156px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#fdebb2] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#b28600] text-[11px] whitespace-nowrap">Pending Approval</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[46px] left-[1299.17px] top-0 w-[194.875px]" data-name="Table Cell">
      <Text12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p9584ef0} fill="var(--fill-0, #6929C4)" id="Vector" />
          <path d={svgPaths.p39a3c700} fill="var(--fill-0, #6929C4)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f2f0ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e1dbff] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[16px] pr-[0.016px] top-[9px] w-[97.953px]" data-name="Container">
      <Button2 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[46px] left-[1494.05px] top-0 w-[129.953px]" data-name="Table Cell">
      <Container26 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[46px] w-[1624px]" data-name="Table Row">
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1f170a80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[155.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">Login_Location_Anomaly</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[19.5px] items-center left-[16px] overflow-clip top-[13.25px] w-[292.797px]" data-name="Container">
      <Icon14 />
      <Text13 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[324.797px]" data-name="Table Cell">
      <Container27 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3c63ce00} fill="var(--fill-0, #005D5D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[16.5px] left-[28px] top-[3.75px] w-[29.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#005d5d] text-[11px] top-0 whitespace-nowrap">Event</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[#f1fbfa] border border-[#a7f0ba] border-solid h-[26px] left-[16px] rounded-[6px] top-[10px] w-[69.578px]" data-name="Container">
      <Icon15 />
      <Text14 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[46px] left-[324.8px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container28 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[7px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_6056_310)" id="Icon">
          <path d={svgPaths.p2bd24200} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.p319c8200} fill="var(--fill-0, #161616)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_6056_310">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[16.5px] left-[30px] top-[4.75px] w-[45.359px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#161616] text-[11px] top-0 whitespace-nowrap">Terminal</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[#e0e0e0] h-[26px] left-[16px] rounded-[6px] top-[10px] w-[85.359px]" data-name="Container">
      <Icon16 />
      <Text15 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[46px] left-[552.16px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container29 />
    </div>
  );
}

function Text16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[325.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">New custom event for tracking geofencing alerts</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.5px] items-start left-[16px] top-[13.25px] w-[325.266px]" data-name="Container">
      <Text16 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[46px] left-[779.52px] top-0 w-[357.266px]" data-name="Table Cell">
      <Container30 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.7">
          <path d={svgPaths.p1a611b80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[18px] relative shrink-0 w-[67.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#161616] text-[12px] top-0 whitespace-nowrap">2025-02-13</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[18px] items-center left-[16px] top-[14px] w-[130.391px]" data-name="Container">
      <Icon17 />
      <Text17 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[46px] left-[1136.78px] top-0 w-[162.391px]" data-name="Table Cell">
      <Container31 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[#fff9e5] content-stretch flex h-[28px] items-center justify-center left-[16px] px-[13px] py-px rounded-[33554400px] top-[9px] w-[119.156px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#fdebb2] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#b28600] text-[11px] whitespace-nowrap">Pending Approval</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[46px] left-[1299.17px] top-0 w-[194.875px]" data-name="Table Cell">
      <Text18 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p9584ef0} fill="var(--fill-0, #6929C4)" id="Vector" />
          <path d={svgPaths.p39a3c700} fill="var(--fill-0, #6929C4)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f2f0ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e1dbff] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[16px] pr-[0.016px] top-[9px] w-[97.953px]" data-name="Container">
      <Button3 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[46px] left-[1494.05px] top-0 w-[129.953px]" data-name="Table Cell">
      <Container32 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[92px] w-[1624px]" data-name="Table Row">
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1f170a80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[155.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">Swift_Message_Modified</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[19.5px] items-center left-[16px] overflow-clip top-[13.25px] w-[292.797px]" data-name="Container">
      <Icon19 />
      <Text19 />
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[46px] left-0 top-0 w-[324.797px]" data-name="Table Cell">
      <Container33 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3c63ce00} fill="var(--fill-0, #005D5D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[16.5px] left-[28px] top-[3.75px] w-[29.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#005d5d] text-[11px] top-0 whitespace-nowrap">Event</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[#f1fbfa] border border-[#a7f0ba] border-solid h-[26px] left-[16px] rounded-[6px] top-[10px] w-[69.578px]" data-name="Container">
      <Icon20 />
      <Text20 />
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[46px] left-[324.8px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container34 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[7px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3c63ce00} fill="var(--fill-0, #004144)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[16.5px] left-[30px] top-[4.75px] w-[61.922px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#004144] text-[11px] top-0 whitespace-nowrap">Transaction</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-[#d9fbfb] h-[26px] left-[16px] rounded-[6px] top-[10px] w-[101.922px]" data-name="Container">
      <Icon21 />
      <Text21 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[46px] left-[552.16px] top-0 w-[227.359px]" data-name="Table Cell">
      <Container35 />
    </div>
  );
}

function Text22() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[325.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#161616] text-[13px] top-0 whitespace-nowrap">Review required for modified Swift message fields mapping</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.5px] items-start left-[16px] top-[13.25px] w-[325.266px]" data-name="Container">
      <Text22 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[46px] left-[779.52px] top-0 w-[357.266px]" data-name="Table Cell">
      <Container36 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.7">
          <path d={svgPaths.p1a611b80} fill="var(--fill-0, #2A53A0)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[18px] relative shrink-0 w-[67.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#161616] text-[12px] top-0 whitespace-nowrap">2025-02-13</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[18px] items-center left-[16px] top-[14px] w-[130.391px]" data-name="Container">
      <Icon22 />
      <Text23 />
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[46px] left-[1136.78px] top-0 w-[162.391px]" data-name="Table Cell">
      <Container37 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute bg-[#fff1f1] content-stretch flex h-[28px] items-center justify-center left-[16px] px-[13px] py-px rounded-[33554400px] top-[9px] w-[71.922px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#ffd7d9] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#da1e28] text-[11px] whitespace-nowrap">Rejected</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[46px] left-[1299.17px] top-0 w-[194.875px]" data-name="Table Cell">
      <Text24 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p9584ef0} fill="var(--fill-0, #6929C4)" id="Vector" />
          <path d={svgPaths.p39a3c700} fill="var(--fill-0, #6929C4)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f2f0ff] relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e1dbff] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[16px] pr-[0.016px] top-[9px] w-[97.953px]" data-name="Container">
      <Button4 />
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[46px] left-[1494.05px] top-0 w-[129.953px]" data-name="Table Cell">
      <Container38 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[46px] left-0 top-[138px] w-[1624px]" data-name="Table Row">
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute bg-white h-[184px] left-0 top-[48px] w-[1624px]" data-name="Table Body">
      <TableRow />
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[232.5px] left-0 top-0 w-[1624px]" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[13px] relative shrink-0 w-[36.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[18.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Name</p>
      </div>
    </div>
  );
}

function Icon24() {
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

function Ve() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[292.797px]" data-name="ve">
      <Text25 />
      <Icon24 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-0 top-0 w-[324.797px]" data-name="Header Cell">
      <Ve />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[13px] relative shrink-0 w-[31.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[16px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Type</p>
      </div>
    </div>
  );
}

function Icon25() {
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

function Ve1() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[195.359px]" data-name="ve">
      <Text26 />
      <Icon25 />
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[324.8px] top-0 w-[227.359px]" data-name="Header Cell">
      <Ve1 />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[13px] relative shrink-0 w-[71.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[36.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Workspace</p>
      </div>
    </div>
  );
}

function Icon26() {
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

function Ve2() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[195.359px]" data-name="ve">
      <Text27 />
      <Icon26 />
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[552.16px] top-0 w-[227.359px]" data-name="Header Cell">
      <Ve2 />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[13px] relative shrink-0 w-[72.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[36.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Description</p>
      </div>
    </div>
  );
}

function Icon27() {
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

function Ve3() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[325.266px]" data-name="ve">
      <Text28 />
      <Icon27 />
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[779.52px] top-0 w-[357.266px]" data-name="Header Cell">
      <Ve3 />
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[13px] relative shrink-0 w-[83.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[42.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Last Updated</p>
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M7 2.91667V11.0833" id="Vector" stroke="var(--stroke-0, #2A53A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p10793100} id="Vector_2" stroke="var(--stroke-0, #2A53A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Ve4() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[130.391px]" data-name="ve">
      <Text29 />
      <Icon28 />
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[1136.78px] top-0 w-[162.391px]" data-name="Header Cell">
      <Ve4 />
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[13px] relative shrink-0 w-[40.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] left-[20.5px] not-italic text-[#2a53a0] text-[13px] text-center top-0 whitespace-nowrap">Status</p>
      </div>
    </div>
  );
}

function Icon29() {
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

function Ve5() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[14px] items-center left-[16px] top-[16.75px] w-[162.875px]" data-name="ve">
      <Text30 />
      <Icon29 />
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[1299.17px] top-0 w-[194.875px]" data-name="Header Cell">
      <Ve5 />
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute border-[#e0e0e0] border-b border-solid h-[48px] left-[1494.05px] top-0 w-[129.953px]" data-name="Header Cell">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[65.05px] not-italic text-[#2a53a0] text-[13px] text-center top-[13.75px] whitespace-nowrap">Actions</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute bg-[#f0f0f0] h-[48px] left-0 shadow-[0px_1px_0px_0px_#e0e0e0] top-0 w-[1624px]" data-name="Table Row">
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

function Container14() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-[1624px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Table />
        <TableRow4 />
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[11.5px] w-[109.531px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#525252] text-[16px] top-[-2px] whitespace-nowrap">Items per page:</p>
    </div>
  );
}

function Option16() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option17() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option18() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option19() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-410.531px] pr-[467.531px] pt-[-837.5px] top-[-0.5px] w-[57px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option16 />
      <Option17 />
      <Option18 />
      <Option19 />
    </div>
  );
}

function Icon30() {
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

function Container41() {
  return (
    <div className="absolute h-[47px] left-[133.53px] top-0 w-[57px]" data-name="Container">
      <Dropdown2 />
      <Icon30 />
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text31 />
        <Container41 />
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#161616] text-[0px] text-[16px] top-[-2px] whitespace-nowrap">
          <span className="leading-[24px]">1–4</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` of `}</span>
          <span className="leading-[24px]">4</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#525252]">{` items`}</span>
        </p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[47px] relative shrink-0 w-[130.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] relative size-full">
        <Text32 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[47px] relative shrink-0 w-[338.188px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container40 />
        <Container42 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute content-stretch flex h-[47px] items-center left-[64px] pr-[17px] top-0 w-[90.906px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#525252] text-[16px] whitespace-nowrap">of 1 pages</p>
    </div>
  );
}

function Option20() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-px pl-[-1651.094px] pr-[1714.094px] pt-[-837.5px] top-[-0.5px] w-[63px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Option20 />
    </div>
  );
}

function Icon31() {
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

function Container45() {
  return (
    <div className="absolute h-[47px] left-px top-0 w-[63px]" data-name="Container">
      <Dropdown3 />
      <Icon31 />
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text33 />
        <Container45 />
      </div>
    </div>
  );
}

function Icon32() {
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

function Button5() {
  return (
    <div className="h-[47px] opacity-25 relative shrink-0 w-[48px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Icon33() {
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

function Button6() {
  return (
    <div className="flex-[1_0_0] h-[47px] min-h-px min-w-px opacity-25 relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[47px] relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[47px] relative shrink-0 w-[250.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container44 />
        <Container46 />
      </div>
    </div>
  );
}

function Sn() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-[1624px]" data-name="Sn">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-px relative size-full">
        <Container39 />
        <Container43 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-[1626px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container14 />
        <Sn />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1658px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pl-[16px] py-[16px] relative size-full">
          <Container4 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Ae() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[856px] items-start left-0 overflow-clip top-0 w-[1658px]" data-name="$Ae">
      <St />
      <Container3 />
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="relative size-full" data-name="Main Content">
      <Ae />
    </div>
  );
}