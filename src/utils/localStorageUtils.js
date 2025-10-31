const initializeData = () => {
  const initialData = {
    users: [
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Staff", email: "staff@entnt.in", password: "staff123" },
      { id: "3", role: "Customer", email: "customer@entnt.in", password: "cust123" },
    ],
    equipment: [
      { id: "eq1", name: "Excavator", category: "Heavy Machinery", condition: "Good", status: "Available" },
      { id: "eq2", name: "Concrete Mixer", category: "Construction", condition: "Excellent", status: "Rented" },
    ],
    rentals: [
      { id: "r1", equipmentId: "eq2", customerId: "3", startDate: "2025-06-01", endDate: "2025-06-05", status: "Reserved" },
    ],
    maintenance: [
      { id: "m1", equipmentId: "eq1", date: "2025-05-20", type: "Routine Check", notes: "No issues found" },
    ],
    notifications: [],
  };

  if (!localStorage.getItem("entntData")) {
    localStorage.setItem("entntData", JSON.stringify(initialData));
  }
};

const getData = (key) => {
  const data = JSON.parse(localStorage.getItem("entntData")) || {};
  return data[key] || [];
};

const setData = (key, newData) => {
  const data = JSON.parse(localStorage.getItem("entntData")) || {};
  data[key] = newData;
  localStorage.setItem("entntData", JSON.stringify(data));
};

const addNotification = (message) => {
  const data = JSON.parse(localStorage.getItem("entntData")) || {};
  const notifications = data.notifications || [];
  const newNotification = { id: `n${notifications.length + 1}`, message, timestamp: new Date().toISOString() };
  data.notifications = [...notifications, newNotification];
  localStorage.setItem("entntData", JSON.stringify(data));
  return newNotification;
};

const dismissNotification = (id) => {
  const data = JSON.parse(localStorage.getItem("entntData")) || {};
  data.notifications = data.notifications.filter(n => n.id !== id);
  localStorage.setItem("entntData", JSON.stringify(data));
};

const exportToCSV = (type) => {
  const data = getData(type);
  let headers = [];
  let rows = [];

  if (type === 'equipment') {
    headers = ['ID', 'Name', 'Category', 'Condition', 'Status'];
    rows = data.map(item => [item.id, item.name, item.category, item.condition, item.status]);
  } else if (type === 'rentals') {
    headers = ['ID', 'Equipment ID', 'Customer ID', 'Start Date', 'End Date', 'Status'];
    rows = data.map(item => [item.id, item.equipmentId, item.customerId, item.startDate, item.endDate, item.status]);
  } else if (type === 'maintenance') {
    headers = ['ID', 'Equipment ID', 'Date', 'Type', 'Notes'];
    rows = data.map(item => [item.id, item.equipmentId, item.date, item.type, item.notes]);
  }

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${type}-report-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { initializeData, getData, setData, addNotification, dismissNotification, exportToCSV };