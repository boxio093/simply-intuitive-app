export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: "new" | "qualified" | "proposal" | "won" | "lost";
  value: number;
  updatedAt: string;
};

export type Invoice = {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  issued: string;
  due: string;
};

export const NGN = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export const mockLeads: Lead[] = [
  { id: "l1", name: "Adaeze Okafor", company: "Bloom Agro Ltd", email: "adaeze@bloomagro.ng", phone: "+234 803 111 2233", stage: "qualified", value: 1_250_000, updatedAt: "2025-06-09" },
  { id: "l2", name: "Tunde Bello", company: "Bello & Sons Logistics", email: "tunde@belloandsons.com", phone: "+234 802 998 7766", stage: "proposal", value: 3_800_000, updatedAt: "2025-06-08" },
  { id: "l3", name: "Ngozi Eze", company: "Lumen Studio", email: "ngozi@lumen.studio", phone: "+234 814 442 1010", stage: "new", value: 650_000, updatedAt: "2025-06-10" },
  { id: "l4", name: "Femi Adewale", company: "Quanta Fintech", email: "femi@quanta.fi", phone: "+234 909 555 2244", stage: "won", value: 5_400_000, updatedAt: "2025-06-04" },
  { id: "l5", name: "Halima Yusuf", company: "Sahel Health", email: "halima@sahelhealth.org", phone: "+234 706 332 1188", stage: "qualified", value: 2_100_000, updatedAt: "2025-06-07" },
  { id: "l6", name: "Chuka Nwosu", company: "Naija Mobility", email: "chuka@naijamob.co", phone: "+234 815 776 4422", stage: "lost", value: 900_000, updatedAt: "2025-05-30" },
  { id: "l7", name: "Aisha Bala", company: "Bala Textiles", email: "aisha@balatextiles.ng", phone: "+234 803 221 0099", stage: "proposal", value: 1_700_000, updatedAt: "2025-06-09" },
];

export const mockInvoices: Invoice[] = [
  { id: "i1", number: "INV-1042", client: "Quanta Fintech", amount: 1_400_000, status: "paid", issued: "2025-05-12", due: "2025-05-26" },
  { id: "i2", number: "INV-1043", client: "Bello & Sons Logistics", amount: 850_000, status: "sent", issued: "2025-06-01", due: "2025-06-15" },
  { id: "i3", number: "INV-1044", client: "Sahel Health", amount: 620_000, status: "overdue", issued: "2025-05-18", due: "2025-06-01" },
  { id: "i4", number: "INV-1045", client: "Lumen Studio", amount: 320_000, status: "draft", issued: "2025-06-10", due: "2025-06-24" },
  { id: "i5", number: "INV-1046", client: "Bloom Agro Ltd", amount: 1_050_000, status: "paid", issued: "2025-05-22", due: "2025-06-05" },
];

export const revenueSeries = [
  { month: "Jan", revenue: 2_100_000, expenses: 1_200_000 },
  { month: "Feb", revenue: 2_800_000, expenses: 1_350_000 },
  { month: "Mar", revenue: 3_400_000, expenses: 1_500_000 },
  { month: "Apr", revenue: 3_100_000, expenses: 1_700_000 },
  { month: "May", revenue: 4_200_000, expenses: 1_900_000 },
  { month: "Jun", revenue: 4_950_000, expenses: 2_050_000 },
];

export const pipelineSeries = [
  { stage: "New", count: 12 },
  { stage: "Qualified", count: 8 },
  { stage: "Proposal", count: 5 },
  { stage: "Won", count: 4 },
];

export const stageMeta: Record<Lead["stage"], { label: string; tone: string }> = {
  new: { label: "New", tone: "bg-muted text-foreground" },
  qualified: { label: "Qualified", tone: "bg-accent text-accent-foreground" },
  proposal: { label: "Proposal", tone: "bg-chart-3/15 text-chart-3" },
  won: { label: "Won", tone: "bg-success/15 text-success" },
  lost: { label: "Lost", tone: "bg-destructive/15 text-destructive" },
};

export const invoiceStatusMeta: Record<Invoice["status"], { label: string; tone: string }> = {
  draft: { label: "Draft", tone: "bg-muted text-muted-foreground" },
  sent: { label: "Sent", tone: "bg-accent text-accent-foreground" },
  paid: { label: "Paid", tone: "bg-success/15 text-success" },
  overdue: { label: "Overdue", tone: "bg-destructive/15 text-destructive" },
};
