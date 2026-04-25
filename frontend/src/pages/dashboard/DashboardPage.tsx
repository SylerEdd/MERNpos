import { useState } from "react";
import { Sidebar } from "../../components/layout/Sidebar";
import { TopBar } from "../../components/layout/TopBar";
import { TableGrid } from "../../components/dashboard/TableGrid";

interface Tab {
  id: number;
  tableNumber: string;
  tableStatus: string;
  createdAt: string;
}

export function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <TableGrid
              selectedTableId={selectedTab?.id ?? null}
              onTableSelect={(tab) => setSelectedTab(tab)}
            />
          </div>

          <div className="w-80 bg-white border-l border-gray-100 flex items-center justify-center">
            {selectedTab ? (
              <p className="text-gray-500 text-sm">
                Loading order for Table #{selectedTab.tableNumber}...
              </p>
            ) : (
              <p className="text-gray-400 text-sm text-center px-6">
                Choose a table to see the order.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
