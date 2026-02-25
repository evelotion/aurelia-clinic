"use client";

import { Download } from "lucide-react";

interface ReportData {
  date: string;
  patient: string;
  treatment: string;
  branch: string;
  amount: number;
}

export default function DownloadReportButton({ data }: { data: ReportData[] }) {
  const handleDownload = () => {
   
    const headers = ["Transaction Date,Patient Name,Treatment,Branch,Amount (Rp)"];
    
   
    const rows = data.map(row => 
     
      `"${row.date}","${row.patient}","${row.treatment}","${row.branch}","${row.amount}"`
    );

   
    const csvContent = headers.concat(rows).join("\n");
    
   
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
   
    link.setAttribute("download", `Aurelia_Finance_Report_${new Date().toISOString().split('T')[0]}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload}
      className="mt-4 flex items-center justify-center gap-2 px-6 py-2.5 bg-champagne text-midnight rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
    >
      <Download size={16} />
      Download CSV
    </button>
  );
}