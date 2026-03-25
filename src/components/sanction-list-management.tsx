import { useState } from "react";
import { 
  Search, 
  Filter, 
  Add, 
  View, 
  Edit, 
  CheckmarkFilled,
  CheckboxChecked,
  List,
  SettingsAdjust,
  ArrowLeft,
  Save,
  Close
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { cn } from "./ui/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface WatchlistProfile {
  id: string;
  name: string;
  type: "Onboarding" | "Monitoring" | "Ad-hoc";
  description: string;
  isActive: boolean;
  includedLists: string[];
  matchCriteria: {
    primaryName: { threshold: number; weight: number };
    dob: { threshold: number; weight: number };
    address: { threshold: number; weight: number };
    nationality: { threshold: number; weight: number };
  };
  stats: {
    alertThreshold: number;
    totalScreenings: number;
    alertsGenerated: number;
  };
}

const AVAILABLE_LISTS = [
  "UN Consolidated List", 
  "US OFAC SDN", 
  "EU List", 
  "Interpol Red Notices",
  "UK HMT",
  "DFAT",
  "World Bank",
  "PEP List (Global)"
];

const MOCK_PROFILES: WatchlistProfile[] = [
  {
    id: "1",
    name: "Onboarding Screening",
    type: "Onboarding",
    description: "Comprehensive screening for new customer onboarding with UN, OFAC, and EU sanctions lists",
    isActive: true,
    includedLists: ["UN Consolidated List", "US OFAC SDN", "EU List"],
    matchCriteria: {
      primaryName: { threshold: 75, weight: 60 },
      dob: { threshold: 90, weight: 40 },
      address: { threshold: 70, weight: 30 },
      nationality: { threshold: 90, weight: 40 },
    },
    stats: {
      alertThreshold: 75,
      totalScreenings: 0,
      alertsGenerated: 0,
    }
  },
  {
    id: "2",
    name: "Continuous Monitoring for Transactions",
    type: "Monitoring",
    description: "Ongoing monitoring of customer transactions",
    isActive: true,
    includedLists: ["UN Consolidated List", "EU List", "Interpol Red Notices"],
    matchCriteria: {
      primaryName: { threshold: 90, weight: 9 },
      dob: { threshold: 85, weight: 8 },
      address: { threshold: 75, weight: 5 },
      nationality: { threshold: 92, weight: 8 },
    },
    stats: {
      alertThreshold: 80,
      totalScreenings: 18945,
      alertsGenerated: 423,
    }
  }
];

export function SanctionListManagement() {
  const [activeTab, setActiveTab] = useState<"Active" | "Inactive" | "All">("Active");
  const [profiles, setProfiles] = useState<WatchlistProfile[]>(MOCK_PROFILES);
  const [viewMode, setViewMode] = useState<"list" | "view" | "edit" | "create">("list");
  const [selectedProfile, setSelectedProfile] = useState<WatchlistProfile | null>(null);

  // Computed Counts
  const totalCount = profiles.length;
  const activeCount = profiles.filter(p => p.isActive).length;
  const inactiveCount = totalCount - activeCount;

  const filteredProfiles = activeTab === "All" 
    ? profiles 
    : profiles.filter(p => activeTab === "Active" ? p.isActive : !p.isActive);

  const handleEdit = (profile: WatchlistProfile) => {
    setSelectedProfile(profile);
    setViewMode("edit");
  };

  const handleView = (profile: WatchlistProfile) => {
    setSelectedProfile(profile);
    setViewMode("view");
  };

  const handleCreate = () => {
    setSelectedProfile({
      id: Math.random().toString(),
      name: "",
      type: "Ad-hoc",
      description: "",
      isActive: true,
      includedLists: [],
      matchCriteria: {
        primaryName: { threshold: 80, weight: 50 },
        dob: { threshold: 80, weight: 50 },
        address: { threshold: 80, weight: 50 },
        nationality: { threshold: 80, weight: 50 },
      },
      stats: {
        alertThreshold: 80,
        totalScreenings: 0,
        alertsGenerated: 0,
      }
    });
    setViewMode("create");
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedProfile(null);
  };

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Sanction / Custom List Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage screening watchlist profiles with custom list combinations and match thresholds
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-[#2A53A0] hover:bg-[#1f3f7d] text-white">
            <Add className="w-4 h-4 mr-2" />
            Create New Profile
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Watchlists</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <SettingsAdjust className="w-5 h-5" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active Watchlists</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
              <CheckboxChecked className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Available Lists</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{AVAILABLE_LISTS.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <List className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tabs & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {(["Active", "Inactive", "All"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  activeTab === tab
                    ? "bg-white dark:bg-gray-700 text-[#2A53A0] dark:text-blue-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                {tab} <span className="text-xs opacity-75 ml-1">
                  ({tab === "Active" ? activeCount : tab === "Inactive" ? inactiveCount : totalCount})
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search profiles..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 focus:border-[#2A53A0]"
              />
            </div>
            <Button variant="outline" className="px-3">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Profile Cards */}
        <div className="space-y-4">
          {filteredProfiles.map((profile) => (
            <div 
              key={profile.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {profile.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "font-medium",
                        profile.type === "Onboarding" ? "bg-green-100 text-green-700 border-green-200" :
                        profile.type === "Monitoring" ? "bg-blue-100 text-blue-700 border-blue-200" :
                        "bg-gray-100 text-gray-700 border-gray-200"
                      )}
                    >
                      {profile.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {profile.description}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1 mt-1.5">
                      Included Lists ({profile.includedLists.length})
                    </span>
                    {profile.includedLists.map((list) => (
                      <Badge 
                        key={list} 
                        variant="outline" 
                        className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                      >
                        {list}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-medium", profile.isActive ? "text-green-600" : "text-gray-500")}>
                      {profile.isActive ? "Active" : "Inactive"}
                    </span>
                    <Switch checked={profile.isActive} onCheckedChange={() => {
                      // Toggle active logic here
                    }} />
                  </div>
                </div>
              </div>

              {/* Match Logic Grid */}
              <div className="p-5 bg-gray-50/50 dark:bg-gray-900/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(profile.matchCriteria).map(([key, val]) => (
                  <div key={key}>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()} Match
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{val.threshold}%</span>
                      <span className="text-xs text-gray-500">(Weight: {val.weight})</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Stats & Actions */}
              <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Alert Threshold:</span>
                    <span className="font-semibold text-[#2A53A0] bg-blue-50 px-2 py-0.5 rounded text-xs">
                      &gt; {profile.stats.alertThreshold}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{profile.stats.totalScreenings.toLocaleString()}</span>
                    <span className="text-gray-500">total screenings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{profile.stats.alertsGenerated.toLocaleString()}</span>
                    <span className="text-gray-500">alerts generated</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={() => handleView(profile)} className="flex-1 sm:flex-none">
                    <View className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(profile)} className="flex-1 sm:flex-none">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Configuration
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Common Layout for View/Edit/Create
  const isEdit = viewMode === "edit" || viewMode === "create";
  const title = viewMode === "create" ? "Create New Profile" : viewMode === "edit" ? "Edit Configuration" : "View Profile Details";
  const profile = selectedProfile!;

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{profile.name || "New Profile"}</span>
            {viewMode !== "create" && (
              <Badge variant="outline" className="text-xs">{profile.type}</Badge>
            )}
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          {viewMode === "view" ? (
             <Button onClick={() => setViewMode("edit")} className="bg-[#2A53A0] hover:bg-[#1f3f7d] text-white">
               <Edit className="w-4 h-4 mr-2" />
               Edit
             </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack}>
                Cancel
              </Button>
              <Button className="bg-[#2A53A0] hover:bg-[#1f3f7d] text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Profile Name</Label>
                  {isEdit ? (
                    <Input defaultValue={profile.name} placeholder="e.g., Global Sanctions Check" />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border border-gray-100 text-sm">{profile.name}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Screening Type</Label>
                  {isEdit ? (
                    <select className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Onboarding</option>
                      <option>Monitoring</option>
                      <option>Ad-hoc</option>
                    </select>
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border border-gray-100 text-sm">{profile.type}</div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                {isEdit ? (
                  <Textarea defaultValue={profile.description} rows={3} />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border border-gray-100 text-sm min-h-[80px]">{profile.description}</div>
                )}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label>Active Status</Label>
                  <p className="text-xs text-gray-500">Enable this profile for active screening</p>
                </div>
                <Switch checked={profile.isActive} disabled={!isEdit} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Matching Logic Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(profile.matchCriteria).map(([key, val]) => (
                  <div key={key} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} Match</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-xs text-gray-500">Fuzzy Match Threshold</Label>
                          <span className="text-xs font-bold">{val.threshold}%</span>
                        </div>
                        {isEdit ? (
                          <input type="range" min="0" max="100" defaultValue={val.threshold} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2A53A0]" />
                        ) : (
                          <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
                            <div className="h-full bg-[#2A53A0]" style={{ width: `${val.threshold}%` }} />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-xs text-gray-500">Score Weight</Label>
                          <span className="text-xs font-bold">{val.weight}</span>
                        </div>
                        {isEdit ? (
                          <input type="range" min="0" max="100" defaultValue={val.weight} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                        ) : (
                          <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${val.weight}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Included Watchlists</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-y-auto pr-2">
              <div className="space-y-3">
                {AVAILABLE_LISTS.map((list) => {
                  const isChecked = profile.includedLists.includes(list);
                  return (
                    <div key={list} className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div className="pt-0.5">
                         {isEdit ? (
                           <input type="checkbox" defaultChecked={isChecked} className="h-4 w-4 rounded border-gray-300 text-[#2A53A0] focus:ring-[#2A53A0]" />
                         ) : (
                           <div className={cn("h-4 w-4 rounded border flex items-center justify-center", isChecked ? "bg-[#2A53A0] border-[#2A53A0] text-white" : "border-gray-300")}>
                             {isChecked && <CheckmarkFilled className="w-3 h-3" />}
                           </div>
                         )}
                      </div>
                      <div className="text-sm">
                        <label className={cn("font-medium block", isEdit ? "cursor-pointer" : "")}>{list}</label>
                        <p className="text-xs text-gray-500">Global regulatory compliance list</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
