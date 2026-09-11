export type WorkerStatus = "Permanent" | "Temporary" | "Event-based";
export type AttendanceStatus = "present" | "absent" | "half";

export type Worker = {
  id: string;
  name: string;
  phone: string;
  role: "Cook" | "Helper" | "Waiter" | "Cleaner";
  status: WorkerStatus;
  paymentType: "Daily" | "Monthly" | "Event-based";
  rate: number;
  days: number;
  halfDays: number;
  earned: number;
  advance: number;
  paid: number;
};

export type Event = {
  id: string;
  name: string;
  type: "Wedding" | "Birthday" | "Pooja" | "Reception" | "Party" | "Other";
  date: string;
  location: string;
  guests: number;
  assigned: string[];
};

export const workers: Worker[] = [
  { id: "sunita", name: "सुनीता", phone: "98•••••421", role: "Cook", status: "Event-based", paymentType: "Daily", rate: 800, days: 12, halfDays: 2, earned: 10400, advance: 2000, paid: 5000 },
  { id: "rekha", name: "रेखा", phone: "97•••••118", role: "Helper", status: "Temporary", paymentType: "Daily", rate: 600, days: 9, halfDays: 0, earned: 5400, advance: 1000, paid: 3000 },
  { id: "maya", name: "माया", phone: "96•••••805", role: "Helper", status: "Event-based", paymentType: "Daily", rate: 600, days: 15, halfDays: 0, earned: 9000, advance: 1000, paid: 8000 },
  { id: "pooja", name: "पूजा", phone: "98•••••670", role: "Cook", status: "Temporary", paymentType: "Daily", rate: 800, days: 11, halfDays: 1, earned: 9200, advance: 2000, paid: 4000 },
  { id: "kavita", name: "कविता", phone: "95•••••213", role: "Cleaner", status: "Event-based", paymentType: "Event-based", rate: 500, days: 10, halfDays: 0, earned: 5000, advance: 0, paid: 0 },
  { id: "geeta", name: "गीता", phone: "99•••••744", role: "Waiter", status: "Temporary", paymentType: "Daily", rate: 550, days: 8, halfDays: 1, earned: 4675, advance: 500, paid: 3000 },
  { id: "laxmi", name: "लक्ष्मी", phone: "94•••••029", role: "Helper", status: "Event-based", paymentType: "Daily", rate: 600, days: 7, halfDays: 0, earned: 4200, advance: 1000, paid: 2000 },
  { id: "sarla", name: "सरला", phone: "93•••••556", role: "Cook", status: "Temporary", paymentType: "Event-based", rate: 850, days: 6, halfDays: 0, earned: 5100, advance: 1000, paid: 2000 },
  { id: "neha", name: "नेहा", phone: "98•••••341", role: "Waiter", status: "Event-based", paymentType: "Daily", rate: 550, days: 5, halfDays: 1, earned: 3025, advance: 0, paid: 1500 },
  { id: "kamla", name: "कमला", phone: "91•••••622", role: "Cleaner", status: "Temporary", paymentType: "Daily", rate: 500, days: 13, halfDays: 0, earned: 6500, advance: 1500, paid: 4000 },
  { id: "aarti", name: "आरती", phone: "97•••••450", role: "Helper", status: "Event-based", paymentType: "Daily", rate: 600, days: 4, halfDays: 0, earned: 2400, advance: 500, paid: 0 },
  { id: "shanti", name: "शांति", phone: "90•••••775", role: "Cook", status: "Permanent", paymentType: "Monthly", rate: 18000, days: 22, halfDays: 0, earned: 18000, advance: 3000, paid: 12000 },
  { id: "rani", name: "रानी", phone: "98•••••903", role: "Waiter", status: "Event-based", paymentType: "Daily", rate: 550, days: 9, halfDays: 0, earned: 4950, advance: 500, paid: 2500 },
  { id: "mamta", name: "ममता", phone: "96•••••236", role: "Helper", status: "Temporary", paymentType: "Daily", rate: 600, days: 12, halfDays: 1, earned: 7500, advance: 1000, paid: 5000 },
  { id: "jaya", name: "जया", phone: "95•••••841", role: "Cleaner", status: "Event-based", paymentType: "Event-based", rate: 550, days: 3, halfDays: 0, earned: 1650, advance: 0, paid: 0 },
];

export const events: Event[] = [
  { id: "amit-wedding", name: "अमित की शादी", type: "Wedding", date: "12 Sep 2026", location: "Hall 1", guests: 450, assigned: ["sunita", "rekha", "maya", "pooja", "geeta", "laxmi", "sarla", "neha", "rani", "mamta", "aarti", "kamla"] },
  { id: "priya-birthday", name: "प्रिया का जन्मदिन", type: "Birthday", date: "12 Sep 2026", location: "ग्राहक का घर", guests: 80, assigned: ["kavita", "jaya", "geeta", "neha", "rani", "mamta"] },
  { id: "sharma-pooja", name: "शर्मा परिवार पूजा", type: "Pooja", date: "13 Sep 2026", location: "Hall 2", guests: 140, assigned: ["shanti", "sunita", "pooja", "rekha", "maya"] },
  { id: "rohan-reception", name: "रोहन का रिसेप्शन", type: "Reception", date: "15 Sep 2026", location: "Hall 3", guests: 350, assigned: ["shanti", "sarla", "pooja", "kamla", "laxmi", "mamta"] },
  { id: "mehta-party", name: "मेहता फैमिली पार्टी", type: "Party", date: "17 Sep 2026", location: "ग्राहक का घर", guests: 65, assigned: ["kavita", "jaya", "aarti", "neha"] },
  { id: "raj-wedding", name: "राज की शादी", type: "Wedding", date: "18 Sep 2026", location: "Hall 1", guests: 600, assigned: ["sunita", "pooja", "shanti", "rekha", "maya", "geeta", "rani", "mamta"] },
  { id: "school-event", name: "स्कूल वार्षिक समारोह", type: "Other", date: "20 Sep 2026", location: "बाहर का कार्यक्रम", guests: 250, assigned: ["kamla", "laxmi", "aarti", "jaya"] },
  { id: "verma-birthday", name: "वर्मा जन्मदिन", type: "Birthday", date: "21 Sep 2026", location: "Hall 2", guests: 120, assigned: ["kavita", "geeta", "neha"] },
  { id: "navratri-pooja", name: "नवरात्रि पूजा", type: "Pooja", date: "24 Sep 2026", location: "Hall 3", guests: 200, assigned: ["shanti", "pooja", "sarla", "kamla"] },
  { id: "gupta-wedding", name: "गुप्ता परिवार शादी", type: "Wedding", date: "26 Sep 2026", location: "Hall 1", guests: 500, assigned: ["sunita", "shanti", "pooja", "rekha", "maya", "rani"] },
  { id: "home-catering", name: "सक्सेना होम कैटरिंग", type: "Other", date: "28 Sep 2026", location: "बाहर का कार्यक्रम", guests: 90, assigned: ["kavita", "aarti", "jaya", "laxmi"] },
  { id: "diwali-party", name: "दीपावली मिलन", type: "Party", date: "30 Sep 2026", location: "Hall 2", guests: 180, assigned: ["geeta", "neha", "mamta", "kamla", "rani"] },
];

export const workHistory = [
  { date: "2 Sep", event: "Wedding", location: "Hall 1", days: 1, rate: 800, earned: 800 },
  { date: "5 Sep", event: "Birthday", location: "Hall 2", days: 1, rate: 800, earned: 800 },
  { date: "8 Sep", event: "Pooja", location: "Customer Home", days: 1, rate: 900, earned: 900 },
  { date: "10 Sep", event: "Wedding", location: "Hall 1", days: 2, rate: 800, earned: 1600 },
];

export const advances = [
  { date: "5 Sep", amount: 1000, reason: "Personal", method: "Cash" },
  { date: "8 Sep", amount: 1000, reason: "Advance", method: "UPI" },
];

export const attendanceSeed: Record<string, AttendanceStatus> = {
  sunita: "present",
  rekha: "present",
  maya: "absent",
  pooja: "half",
};