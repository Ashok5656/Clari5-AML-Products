import { useState } from "react";
import { 
  Filter, 
  Add,
  Edit,
  TrashCan,
  Search,
  ArrowLeft,
  Download,
  Upload
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface HighRiskCountriesProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

interface CountryData {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  synonyms: string;
}

const rawData: CountryData[] = [
  { id: "1", name: "Afghanistan", iso2: "AF", iso3: "AFG", synonyms: "" },
  { id: "2", name: "Bahrain", iso2: "BH", iso3: "BHR", synonyms: "" },
  { id: "3", name: "Bangladesh", iso2: "BD", iso3: "BGD", synonyms: "" },
  { id: "4", name: "Burundi", iso2: "BI", iso3: "BDI", synonyms: "" },
  { id: "5", name: "Cambodia", iso2: "KH", iso3: "KHM", synonyms: "" },
  { id: "6", name: "Central African Republic", iso2: "CF", iso3: "CAF", synonyms: "" },
  { id: "7", name: "Colombia", iso2: "CO", iso3: "COL", synonyms: "" },
  { id: "8", name: "Democratic Republic of Congo", iso2: "CD", iso3: "COD", synonyms: "" },
  { id: "9", name: "Eritrea", iso2: "ER", iso3: "ERI", synonyms: "" },
  { id: "10", name: "Ethiopia", iso2: "ET", iso3: "ETH", synonyms: "" },
  { id: "11", name: "Haiti", iso2: "HT", iso3: "HTI", synonyms: "" },
  { id: "12", name: "India", iso2: "IN", iso3: "IND", synonyms: "" },
  { id: "13", name: "Indonesia", iso2: "ID", iso3: "IDN", synonyms: "" },
  { id: "14", name: "Iran", iso2: "IR", iso3: "IRN", synonyms: "Islamic Republic of Iran" },
  { id: "15", name: "Iraq", iso2: "IQ", iso3: "IRQ", synonyms: "" },
  { id: "16", name: "Kenya", iso2: "KE", iso3: "KEN", synonyms: "" },
  { id: "17", name: "Kuwait", iso2: "KW", iso3: "KWT", synonyms: "" },
  { id: "18", name: "Lebanon", iso2: "LB", iso3: "LBN", synonyms: "" },
  { id: "19", name: "Libya", iso2: "LY", iso3: "LBY", synonyms: "" },
  { id: "20", name: "Malaysia", iso2: "MY", iso3: "MYS", synonyms: "" },
  { id: "21", name: "Mali", iso2: "ML", iso3: "MLI", synonyms: "" },
  { id: "22", name: "Mauritania", iso2: "MR", iso3: "MRT", synonyms: "" },
  { id: "23", name: "Mexico", iso2: "MX", iso3: "MEX", synonyms: "" },
  { id: "24", name: "Moldova", iso2: "MD", iso3: "MDA", synonyms: "Republic of Moldova" },
  { id: "25", name: "Myanmar", iso2: "MM", iso3: "MMR", synonyms: "" },
  { id: "26", name: "Nepal", iso2: "NP", iso3: "NPL", synonyms: "" },
  { id: "27", name: "Niger", iso2: "NE", iso3: "NER", synonyms: "" },
  { id: "28", name: "Nigeria", iso2: "NG", iso3: "NGA", synonyms: "" },
  { id: "29", name: "North Korea", iso2: "KP", iso3: "PRK", synonyms: "Democratic People's Republic of Korea" },
  { id: "30", name: "Pakistan", iso2: "PK", iso3: "PAK", synonyms: "" },
  { id: "31", name: "Panama", iso2: "PA", iso3: "PAN", synonyms: "" },
  { id: "32", name: "Paraguay", iso2: "PY", iso3: "PRY", synonyms: "" },
  { id: "33", name: "Philippines", iso2: "PH", iso3: "PHL", synonyms: "" },
  { id: "34", name: "Qatar", iso2: "QA", iso3: "QAT", synonyms: "" },
  { id: "35", name: "Russia", iso2: "RU", iso3: "RUS", synonyms: "The Russian Federation" },
  { id: "36", name: "Saudi Arabia", iso2: "SA", iso3: "SAU", synonyms: "" },
  { id: "37", name: "Somalia", iso2: "SO", iso3: "SOM", synonyms: "" },
  { id: "38", name: "South Sudan", iso2: "SS", iso3: "SSD", synonyms: "" },
  { id: "39", name: "Sudan", iso2: "SD", iso3: "SDN", synonyms: "" },
  { id: "40", name: "Syria", iso2: "SY", iso3: "SYR", synonyms: "Syrian Arab Republic" },
  { id: "41", name: "Türkiye", iso2: "TR", iso3: "TUR", synonyms: "Turkey" },
  { id: "42", name: "Turkmenistan", iso2: "TM", iso3: "TKM", synonyms: "" },
  { id: "43", name: "Uganda", iso2: "UG", iso3: "UGA", synonyms: "" },
  { id: "44", name: "Ukraine", iso2: "UA", iso3: "UKR", synonyms: "" },
  { id: "45", name: "United Arab Emirates", iso2: "AE", iso3: "ARE", synonyms: "UAE" },
  { id: "46", name: "Uzbekistan", iso2: "UZ", iso3: "UZB", synonyms: "" },
  { id: "47", name: "Venezuela", iso2: "VE", iso3: "VEN", synonyms: "Bolivarian Republic of Venezuela" },
  { id: "48", name: "Yemen", iso2: "YE", iso3: "YEM", synonyms: "" }
];

export function HighRiskCountries({ breadcrumbs, onBreadcrumbNavigate }: HighRiskCountriesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  const filteredData = rawData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.iso2.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.iso3.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.synonyms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { items: sortedData, requestSort, sortConfig } = useSortableData(filteredData);

  const totalItems = sortedData.length;
  const startItem = (currentPage - 1) * pageSize;
  const currentItems = sortedData.slice(startItem, startItem + pageSize);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 p-4">
      {/* Header Actions */}
      <div className="flex-none pb-4">
        <div className="flex flex-col gap-4">
           {/* Title Banner */}
           <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-center justify-between">
              <h2 className="text-sm font-bold text-yellow-800 uppercase tracking-wide">
                 High Risk Countries / Nationalities - Human Trafficking ( Score 7.5 and above )
              </h2>
           </div>

           <div className="flex items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search countries, codes..." 
                className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            
            <div className="flex items-center gap-3 ml-4">
              <Button variant="outline" className="gap-2 bg-white dark:bg-gray-900 h-[46px]">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="outline" className="gap-2 bg-white dark:bg-gray-900 h-[46px]">
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button className="gap-2 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px]">
                <Add className="w-4 h-4" />
                Add Country
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="flex-1 overflow-auto">
          <Table>
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[300px]">
                  <SortableHeader column="name" label="Country Name" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[150px]">
                  <SortableHeader column="iso2" label="ISO 2 - alpha code" sortConfig={sortConfig} onSort={requestSort} className="justify-center" />
                </th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[150px]">
                  <SortableHeader column="iso3" label="ISO 3 - alpha code" sortConfig={sortConfig} onSort={requestSort} className="justify-center" />
                </th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">
                  <SortableHeader column="synonyms" label="Synonyms" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[120px]">Actions</th>
              </tr>
            </thead>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 h-[46px]">
                    <TableCell className="px-4 align-middle text-[15px] font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </TableCell>
                    <TableCell className="px-4 align-middle text-[15px] font-mono text-gray-600 text-center">
                      <Badge variant="outline" className="bg-gray-50 font-normal">
                         {item.iso2}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 align-middle text-[15px] font-mono text-gray-600 text-center">
                      <Badge variant="outline" className="bg-gray-50 font-normal">
                         {item.iso3}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 align-middle text-[15px] text-gray-600">
                      {item.synonyms || "-"}
                    </TableCell>
                    <TableCell className="px-4 align-middle text-left">
                       <div className="flex items-center justify-start gap-2">
                          <button 
                             className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2A53A0]/10 hover:bg-[#2A53A0]/20 text-[#2A53A0] transition-colors"
                             title="Edit"
                          >
                             <Edit className="w-4 h-4" />
                          </button>
                          <button 
                             className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors"
                             title="Delete"
                          >
                             <TrashCan className="w-4 h-4" />
                          </button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-gray-500 text-[15px]">
                    No countries found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex-none">
          <CarbonPaginationFooter 
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
}
