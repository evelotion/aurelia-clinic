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
    // 1. Buat Header CSV
    const headers = ["Transaction Date,Patient Name,Treatment,Branch,Amount (Rp)"];
    
    // 2. Mapping data menjadi baris CSV
    const rows = data.map(row => 
      // Pakai tanda kutip ganda (") untuk mencegah error jika ada koma di dalam nama/teks
      `"${row.date}","${row.patient}","${row.treatment}","${row.branch}","${row.amount}"`
    );

    // 3. Gabungkan header dan isi
    const csvContent = headers.concat(rows).join("\n");
    
    // 4. Buat file Blob dan trigger URL Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    // Format nama file: Aurelia_Finance_Report_YYYY-MM-DD.csv
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