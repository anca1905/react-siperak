import { useState } from 'react';
import { Search, Plus, MoreVertical, Star } from 'lucide-react';
import { employees } from '../../data/employees';

export default function Employees() {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter pegawai berdasarkan nama atau role
    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header Halaman */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Data Pegawai</h2>
                    <p className="text-slate-500 text-sm">Kelola tim dan pantau kinerja mereka.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-600/20 transition-all">
                    <Plus size={18} /> Tambah Pegawai
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama atau jabatan..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabel Pegawai */}
            <div className="bg-white rounded-b-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                                <th className="p-4 font-semibold border-b border-slate-200">Nama Pegawai</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Jabatan</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Tanggal Gabung</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Status</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Kinerja</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                    {emp.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">{emp.name}</p>
                                                    <p className="text-xs text-slate-500">ID: #{String(emp.id).padStart(4, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600 text-sm">{emp.role}</td>
                                        <td className="p-4 text-slate-600 text-sm">{emp.joinDate}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                        ${emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                    emp.status === 'Inactive' ? 'bg-red-100 text-red-700' :
                                                        'bg-amber-100 text-amber-700'
                                                }`}
                                            >
                                                <span className={`w-2 h-2 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' :
                                                        emp.status === 'Inactive' ? 'bg-red-500' : 'bg-amber-500'
                                                    }`}></span>
                                                {emp.status === 'Active' ? 'Aktif' : emp.status === 'Inactive' ? 'Nonaktif' : 'Cuti'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-slate-700 font-medium">
                                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                {emp.performance}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">
                                        Tidak ada data pegawai yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Dummy */}
                <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
                    <p>Menampilkan {filteredEmployees.length} dari {employees.length} data</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50" disabled>Sebelumnya</button>
                        <button className="px-3 py-1 border rounded hover:bg-slate-50">Selanjutnya</button>
                    </div>
                </div>
            </div>
        </div>
    );
}