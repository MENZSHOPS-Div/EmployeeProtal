// ตัวอย่างฝั่งหน้าเว็บ: เรียก Apps Script Web App
// ใช้ Content-Type: text/plain เพื่อเลี่ยง CORS preflight (Apps Script ไม่รองรับ OPTIONS)
const API_URL = 'https://script.google.com/macros/s/AKfycbztIg1599ze8Me5dWArfpldc3vWFKQ9r2fCAbLLwD06Zm9xYbZuq1eTb59ouKFu34yJ/exec';

async function api(action, payload = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, payload, token: sessionStorage.getItem('hr_token') })
  });
  const d = await res.json();
  if (!d.ok) {
    if (d.code === 401) { sessionStorage.removeItem('hr_token'); /* กลับหน้า Login */ }
    throw new Error(d.error);
  }
  return d.data;
}

// ตัวอย่างการใช้งาน
// const { token, user } = await api('login', { username: 'admin', password: '...' });
// sessionStorage.setItem('hr_token', token);
// const emps   = await api('list',   { table: 'Employees' });
// await api('create', { table: 'Employees', data: { FirstName: 'สมชาย', LastName: 'ใจดี', BaseSalary: 32000 } });
// await api('otCreate', { employeeId: 'EMP001', otDate: '2026-11-04', startTime: '18:00', endTime: '20:00', otRateId: 'OT1' });
// await api('payrollCalc', { period: '2026-10' });
// const slip   = await api('payslip', { employeeId: 'EMP001', period: '2026-10' });
