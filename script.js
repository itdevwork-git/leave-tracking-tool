


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internal Leave Monitor</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .stats-card { transition: all 0.2s ease; }
        .stats-card:hover { transform: translateY(-2px); }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen p-4 md:p-8">

    <div class="max-w-5xl mx-auto space-y-6">
        
        <!-- HEADER -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div>
                <h1 class="text-2xl font-bold text-slate-800">Internal Leave Monitor</h1>
                <p class="text-slate-500">Track and manage employee time off</p>
            </div>
            <button id="toggleAddEmp" class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
                <span>Add Employee</span>
            </button>
        </header>

        <!-- ADD EMPLOYEE FORM (HIDDEN BY DEFAULT) -->
        <div id="addEmpSection" class="hidden bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
            <form id="newEmpForm" class="flex flex-col sm:flex-row gap-3">
                <input type="text" id="newEmpName" placeholder="Enter Full Employee Name" required
                    class="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none">
                <div class="flex gap-2">
                    <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium">Save</button>
                    <button type="button" id="cancelAddEmp" class="text-slate-500 px-4 py-2">Cancel</button>
                </div>
            </form>
        </div>

        <div class="grid lg:grid-cols-3 gap-6">
            
            <!-- SIDEBAR: Selection & Entry -->
            <div class="lg:col-span-1 space-y-6">
                <!-- Employee Selection -->
                <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <label class="block text-sm font-semibold text-slate-600 mb-2">Select Employee</label>
                    <select id="empDropdown" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                        <option value="">-- Choose Employee --</option>
                    </select>
                </section>

                <!-- Leave Input Form -->
                <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>
                        Log Leave
                    </h3>
                    
                    <form id="leaveForm" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                            <select id="leaveType" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                                <option value="Unpaid Leave">Unpaid Leave (Default)</option>
                                <option value="Vacation Leave">Vacation Leave (VL)</option>
                                <option value="Sick Leave">Sick Leave (SL)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Duration</label>
                            <div class="flex gap-2">
                                <button type="button" data-val="1.0" class="dur-btn flex-1 py-2 rounded-lg text-xs font-medium border bg-indigo-600 text-white border-indigo-600">Full Day (1.0)</button>
                                <button type="button" data-val="0.5" class="dur-btn flex-1 py-2 rounded-lg text-xs font-medium border bg-white text-slate-600 border-slate-200">Half Day (0.5)</button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                            <input type="date" id="leaveDate" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                        </div>

                        <div id="reasonContainer" class="hidden">
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Reason (Required)</label>
                            <textarea id="leaveReason" placeholder="Reason for sick leave..." 
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px] text-sm"></textarea>
                        </div>

                        <div id="errorMsg" class="hidden flex items-center gap-2 text-rose-600 bg-rose-50 p-3 rounded-xl text-xs border border-rose-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            <span id="errorText"></span>
                        </div>

                        <button type="submit" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors mt-2 text-sm">
                            Submit Record
                        </button>
                    </form>
                </section>
            </div>

            <!-- MAIN CONTENT: Dashboard & History -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Empty State -->
                <div id="emptyState" class="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400 p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4 opacity-20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <h3 class="text-xl font-semibold text-slate-600">No Employee Selected</h3>
                    <p class="text-sm">Select an employee to view their balances and leave history.</p>
                </div>

                <!-- Dashboard (Hidden by default) -->
                <div id="dashboard" class="hidden space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="stats-card bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
                            <p class="text-xs font-bold text-slate-500 uppercase">Vacation (VL)</p>
                            <div class="mt-2 flex items-baseline gap-2">
                                <span id="vlRemaining" class="text-3xl font-bold text-slate-800">5</span>
                                <span class="text-slate-400 text-xs">/ 5 left</span>
                            </div>
                            <div class="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div id="vlProgress" class="bg-blue-500 h-full transition-all duration-500" style="width: 100%"></div>
                            </div>
                        </div>

                        <div class="stats-card bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                            <p class="text-xs font-bold text-slate-500 uppercase">Sick (SL)</p>
                            <div class="mt-2 flex items-baseline gap-2">
                                <span id="slRemaining" class="text-3xl font-bold text-slate-800">5</span>
                                <span class="text-slate-400 text-xs">/ 5 left</span>
                            </div>
                            <div class="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div id="slProgress" class="bg-emerald-500 h-full transition-all duration-500" style="width: 100%"></div>
                            </div>
                        </div>

                        <div class="stats-card bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-slate-400">
                            <p class="text-xs font-bold text-slate-500 uppercase">Unpaid Total</p>
                            <div class="mt-2 flex items-baseline gap-2">
                                <span id="unpaidTotal" class="text-3xl font-bold text-slate-800">0</span>
                                <span class="text-slate-400 text-xs">days used</span>
                            </div>
                        </div>
                    </div>

                    <section class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div class="p-6 border-b border-slate-100">
                            <h3 id="historyTitle" class="font-bold flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                Recent Activity
                            </h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr class="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                                        <th class="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Duration</th>
                                        <th className="px-6 py-4">Details</th>
                                    </tr>
                                </thead>
                                <tbody id="historyBody" class="divide-y divide-slate-100">
                                    <!-- Rows added by JS -->
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- DATA ---
        let employees = [
            { id: '1', name: 'John Louie Mendoza', vl_total: 5, sl_total: 5 },
            { id: '2', name: 'Margrette Cascante', vl_total: 5, sl_total: 5 },
            { id: '3', name: 'Lorence Palisan', vl_total: 5, sl_total: 5 },
            { id: '4', name: 'Marcelino Yu Jr.', vl_total: 5, sl_total: 5 },
            { id: '5', name: 'Jerquin Bayudo', vl_total: 5, sl_total: 5 },
            { id: '6', name: 'Erich Von Vaguchay', vl_total: 5, sl_total: 5 },
            { id: '7', name: 'Joel Bautista JR.', vl_total: 5, sl_total: 5 },
            { id: '8', name: 'Nina Sarah Reyes', vl_total: 5, sl_total: 5 }
        ];
        
        let leaveRecords = [];
        let selectedEmpId = null;
        let selectedDuration = 1.0;

        // --- DOM ELEMENTS ---
        const empDropdown = document.getElementById('empDropdown');
        const leaveForm = document.getElementById('leaveForm');
        const leaveTypeSelect = document.getElementById('leaveType');
        const reasonContainer = document.getElementById('reasonContainer');
        const leaveReason = document.getElementById('leaveReason');
        const errorMsg = document.getElementById('errorMsg');
        const errorText = document.getElementById('errorText');
        const leaveDateInput = document.getElementById('leaveDate');
        const historyBody = document.getElementById('historyBody');
        const dashboard = document.getElementById('dashboard');
        const emptyState = document.getElementById('emptyState');
        const toggleAddEmp = document.getElementById('toggleAddEmp');
        const addEmpSection = document.getElementById('addEmpSection');
        const newEmpForm = document.getElementById('newEmpForm');

        // --- INITIALIZATION ---
        function init() {
            renderDropdown();
            leaveDateInput.value = new Date().toISOString().split('T')[0];
        }

        function renderDropdown() {
            empDropdown.innerHTML = '<option value="">-- Choose Employee --</option>';
            employees.forEach(emp => {
                const opt = document.createElement('option');
                opt.value = emp.id;
                opt.textContent = emp.name;
                empDropdown.appendChild(opt);
            });
        }

        // --- CORE LOGIC ---
        function calculateStats(empId) {
            const records = leaveRecords.filter(r => r.empId === empId);
            const vlUsed = records.filter(r => r.type === 'Vacation Leave').reduce((s, r) => s + r.duration, 0);
            const slUsed = records.filter(r => r.type === 'Sick Leave').reduce((s, r) => s + r.duration, 0);
            const unpaidUsed = records.filter(r => r.type === 'Unpaid Leave').reduce((s, r) => s + r.duration, 0);

            return {
                vl_remaining: 5 - vlUsed,
                sl_remaining: 5 - slUsed,
                unpaid_total: unpaidUsed
            };
        }

        function updateUI() {
            if (!selectedEmpId) {
                emptyState.classList.remove('hidden');
                dashboard.classList.add('hidden');
                return;
            }

            emptyState.classList.add('hidden');
            dashboard.classList.remove('hidden');

            const stats = calculateStats(selectedEmpId);
            const emp = employees.find(e => e.id === selectedEmpId);

            // Update Cards
            document.getElementById('vlRemaining').textContent = stats.vl_remaining;
            document.getElementById('slRemaining').textContent = stats.sl_remaining;
            document.getElementById('unpaidTotal').textContent = stats.unpaid_total;
            document.getElementById('vlProgress').style.width = (stats.vl_remaining / 5 * 100) + '%';
            document.getElementById('slProgress').style.width = (stats.sl_remaining / 5 * 100) + '%';
            document.getElementById('historyTitle').innerHTML = `Recent Activity: ${emp.name}`;

            // Render History
            historyBody.innerHTML = '';
            const filteredRecords = leaveRecords.filter(r => r.empId === selectedEmpId);
            
            if (filteredRecords.length === 0) {
                historyBody.innerHTML = '<tr><td colspan="4" class="px-6 py-10 text-center text-slate-400">No records yet.</td></tr>';
            } else {
                filteredRecords.forEach(rec => {
                    const typeClass = rec.type === 'Vacation Leave' ? 'bg-blue-100 text-blue-700' : 
                                     rec.type === 'Sick Leave' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600';
                    const row = `
                        <tr class="hover:bg-slate-50 transition-colors">
                            <td class="px-6 py-4 font-medium">${rec.date}</td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeClass}">${rec.type}</span>
                            </td>
                            <td class="px-6 py-4 text-xs">${rec.duration === 1 ? 'Full Day' : 'Half Day'}</td>
                            <td class="px-6 py-4 text-xs text-slate-500 italic max-w-xs truncate">${rec.reason || '-'}</td>
                        </tr>
                    `;
                    historyBody.insertAdjacentHTML('afterbegin', row);
                });
            }
        }

        // --- EVENT LISTENERS ---
        empDropdown.addEventListener('change', (e) => {
            selectedEmpId = e.target.value;
            errorMsg.classList.add('hidden');
            updateUI();
        });

        leaveTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'Sick Leave') {
                reasonContainer.classList.remove('hidden');
            } else {
                reasonContainer.classList.add('hidden');
            }
        });

        document.querySelectorAll('.dur-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.dur-btn').forEach(b => {
                    b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600');
                    b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
                });
                btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
                btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
                selectedDuration = parseFloat(btn.dataset.val);
            });
        });

        leaveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            errorMsg.classList.add('hidden');

            if (!selectedEmpId) {
                showError("Select an employee first.");
                return;
            }

            const type = leaveTypeSelect.value;
            const stats = calculateStats(selectedEmpId);

            // Validation
            if (type === 'Sick Leave' && !leaveReason.value.trim()) {
                showError("A reason is required for Sick Leave.");
                return;
            }

            if (type === 'Vacation Leave' && stats.vl_remaining < selectedDuration) {
                showError("Insufficient VL balance.");
                return;
            }
            if (type === 'Sick Leave' && stats.sl_remaining < selectedDuration) {
                showError("Insufficient SL balance.");
                return;
            }

            // Create record
            leaveRecords.push({
                id: Date.now().toString(),
                empId: selectedEmpId,
                type: type,
                duration: selectedDuration,
                date: leaveDateInput.value,
                reason: type === 'Sick Leave' ? leaveReason.value : ''
            });

            // Reset Form but keep Employee selected
            leaveReason.value = '';
            updateUI();
        });

        function showError(msg) {
            errorMsg.classList.remove('hidden');
            errorText.textContent = msg;
        }

        // Employee Management
        toggleAddEmp.addEventListener('click', () => addEmpSection.classList.toggle('hidden'));
        document.getElementById('cancelAddEmp').addEventListener('click', () => addEmpSection.classList.add('hidden'));

        newEmpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('newEmpName').value;
            if (!name) return;

            const newId = Date.now().toString();
            employees.push({ id: newId, name: name, vl_total: 5, sl_total: 5 });
            
            renderDropdown();
            empDropdown.value = newId;
            selectedEmpId = newId;
            
            document.getElementById('newEmpName').value = '';
            addEmpSection.classList.add('hidden');
            updateUI();
        });

        init();
    </script>

</body>
</html>