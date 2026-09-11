import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  FileSpreadsheet,
  FileText,
  IndianRupee,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  advances,
  attendanceSeed,
  events,
  type AttendanceStatus,
  type Event,
  type Worker,
  workHistory,
  workers,
} from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "डैशबोर्ड | सवालिया कैटरर्स" },
      { name: "description", content: "सवालिया कैटरर्स के कर्मचारियों, कार्यक्रम और भुगतान का सरल डैशबोर्ड।" },
      { property: "og:title", content: "डैशबोर्ड | सवालिया कैटरर्स" },
      { property: "og:description", content: "सवालिया कैटरर्स के कर्मचारियों, कार्यक्रम और भुगतान का सरल डैशबोर्ड।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

type View = "dashboard" | "employees" | "events" | "locations" | "attendance" | "payments" | "reports" | "settings";

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "डैशबोर्ड", icon: LayoutDashboard },
  { id: "employees", label: "कर्मचारी", icon: Users },
  { id: "events", label: "कार्यक्रम", icon: CalendarDays },
  { id: "locations", label: "हॉल / लोकेशन", icon: FileText },
  { id: "attendance", label: "उपस्थिति", icon: CheckCircle2 },
  { id: "payments", label: "पेमेंट", icon: WalletCards },
  { id: "reports", label: "रिपोर्ट", icon: BarChart3 },
  { id: "settings", label: "सेटिंग्स", icon: Settings },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const getPending = (worker: Worker) => Math.max(worker.earned - worker.advance - worker.paid, 0);

function App() {
  const [view, setView] = useState<View>("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedWorkerId, setSelectedWorkerId] = useState("sunita");
  const [selectedEventId, setSelectedEventId] = useState("amit-wedding");
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(attendanceSeed);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [workerOpen, setWorkerOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(2000);

  const selectedWorker = workers.find((worker) => worker.id === selectedWorkerId) ?? workers[0];
  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? events[0];
  const searchResults = useMemo(
    () => workers.filter((worker) => worker.name.includes(query.trim()) || worker.phone.includes(query.trim())),
    [query],
  );

  const goToWorker = (id: string) => {
    setSelectedWorkerId(id);
    setView("employees");
    setQuery("");
  };

  const savePayment = () => {
    toast.success("भुगतान सेव हो गया", { description: `${money(paymentAmount)} सुनीता के खाते में दर्ज हुआ।` });
    setPaymentOpen(false);
  };

  const saveAdvance = () => {
    toast.success("एडवांस दर्ज हो गया", { description: "सुनीता का हिसाब अपडेट हो गया।" });
    setAdvanceOpen(false);
  };

  return (
    <div className="app-shell min-h-screen text-ink">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -right-32 top-1/3 size-[28rem] rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-leaf/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen">
        <aside className="glass-panel hidden w-64 shrink-0 flex-col border-y-0 border-l-0 lg:flex">
          <Brand />
          <Navigation view={view} setView={setView} />
          <GreetingCard />
        </aside>
        <main className="min-w-0 flex-1">
          <header className="glass-panel sticky top-0 z-20 flex h-20 items-center gap-3 rounded-none border-x-0 border-t-0 px-5 sm:px-8">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(true)} aria-label="मेन्यू खोलें"><Menu /></Button>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="सुनीता खोजें..." className="h-11 rounded-xl border-glass-border bg-glass pl-10" />
                {query && searchResults.length > 0 && (
                  <div className="glass-panel absolute left-0 right-0 top-14 z-30 rounded-xl p-2">
                    {searchResults.slice(0, 4).map((worker) => (
                      <button key={worker.id} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-brand/10" onClick={() => goToWorker(worker.id)}>
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 font-bold text-brand-deep">{worker.name.slice(0, 1)}</span>
                        <span className="min-w-0"><span className="block font-semibold">{worker.name}</span><span className="text-xs text-ink/50">{worker.role} · बाकी {money(getPending(worker))}</span></span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex"><Button variant="outline" className="bg-glass"><CalendarDays /> 12 September</Button></div>
            <Button className="shrink-0 bg-brand text-primary-foreground shadow-lg shadow-brand/25 hover:bg-brand-deep" onClick={() => setEventOpen(true)}><Plus /> <span className="hidden sm:inline">नया कार्यक्रम</span></Button>
          </header>
          <div className="space-y-6 p-5 sm:p-8">
            {view === "dashboard" && <Dashboard setView={setView} setSelectedEventId={setSelectedEventId} goToWorker={goToWorker} setPaymentOpen={setPaymentOpen} />}
            {view === "employees" && <Employees selectedWorkerId={selectedWorkerId} setSelectedWorkerId={setSelectedWorkerId} setWorkerOpen={setWorkerOpen} goToWorker={goToWorker} />}
            {view === "events" && <EventsPage setSelectedEventId={setSelectedEventId} setView={setView} setEventOpen={setEventOpen} />}
            {view === "locations" && <Locations />}
            {view === "attendance" && <Attendance attendance={attendance} setAttendance={setAttendance} selectedEvent={selectedEvent} setSelectedEventId={setSelectedEventId} />}
            {view === "payments" && <Payments selectedWorker={selectedWorker} setSelectedWorkerId={setSelectedWorkerId} setPaymentOpen={setPaymentOpen} setAdvanceOpen={setAdvanceOpen} />}
            {view === "reports" && <Reports />}
            {view === "settings" && <SettingsPage />}
          </div>
        </main>
      </div>
      {mobileNav && <MobileNavigation view={view} setView={(next) => { setView(next); setMobileNav(false); }} close={() => setMobileNav(false)} />}
      {workerOpen && <WorkerModal close={() => setWorkerOpen(false)} />}
      {eventOpen && <EventModal close={() => setEventOpen(false)} />}
      {paymentOpen && <PaymentModal amount={paymentAmount} setAmount={setPaymentAmount} close={() => setPaymentOpen(false)} save={savePayment} />}
      {advanceOpen && <AdvanceModal close={() => setAdvanceOpen(false)} save={saveAdvance} />}
    </div>
  );
}

function Brand() {
  return <div className="flex h-20 items-center gap-3 border-b border-glass-border px-6"><div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-lg font-bold text-primary-foreground shadow-lg shadow-brand/30">स</div><div><p className="font-extrabold leading-tight tracking-tight">सवालिया कैटरर्स</p><p className="text-[11px] text-ink/50">Staff &amp; Payment</p></div></div>;
}

function Navigation({ view, setView }: { view: View; setView: (view: View) => void }) {
  return <nav className="space-y-1 p-4 text-[15px] font-medium">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setView(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${view === id ? "bg-brand text-primary-foreground shadow-lg shadow-brand/25" : "text-ink/70 hover:bg-glass"}`}><Icon className="size-4 shrink-0" />{label}</button>)}</nav>;
}

function GreetingCard() { return <div className="mt-auto m-4 rounded-2xl border border-glass-border bg-glass p-4 dev"><p className="text-sm font-semibold text-leaf">नमस्ते, बाबूलाल जी</p><p className="mt-1 text-xs text-ink/50">आज 3 कार्यक्रम चल रहे हैं</p></div>; }

function Dashboard({ setView, setSelectedEventId, goToWorker, setPaymentOpen }: { setView: (view: View) => void; setSelectedEventId: (id: string) => void; goToWorker: (id: string) => void; setPaymentOpen: (open: boolean) => void }) {
  const paid = workers.reduce((sum, worker) => sum + worker.paid, 0);
  const pending = workers.reduce((sum, worker) => sum + getPending(worker), 0);
  return <>
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="dev text-sm text-ink/50">नमस्ते, बाबूलाल जी</p><h1 className="serif text-3xl font-bold tracking-tight sm:text-4xl">Today's Ledger</h1></div><p className="dev text-sm text-ink/50">आज के कर्मचारी और भुगतान एक नज़र में</p></div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      <Metric label="आज के कार्यक्रम" value="3" foot="▲ 1 कल से" />
      <Metric label="आज कर्मचारी" value="18" foot="12 महिला श्रमिक" />
      <Metric label="इस महीने भुगतान" value={money(paid)} foot="सितम्बर · इस माह" />
      <Metric label="बाकी भुगतान" value={money(pending)} foot="14 श्रमिक बाकी" emphasis />
      <Metric label="आने वाले कार्यक्रम" value="7" foot="अगले 7 दिनों में" />
    </div>
    <div className="grid gap-5 lg:grid-cols-3">
      <section className="space-y-4 lg:col-span-2"><div className="flex items-center justify-between"><h2 className="dev text-lg font-bold">आज के कार्यक्रम</h2><Button variant="link" className="text-brand-deep" onClick={() => setView("events")}>सभी देखें <ArrowRight /></Button></div><div className="grid gap-4 sm:grid-cols-2"><EventCard event={events[0]} onOpen={() => { setSelectedEventId(events[0].id); setView("events"); }} /><EventCard event={events[1]} onOpen={() => { setSelectedEventId(events[1].id); setView("events"); }} /></div></section>
      <Deployment />
    </div>
    <div className="glass-panel overflow-hidden rounded-2xl"><div className="flex items-center justify-between border-b border-glass-border px-5 py-4"><h2 className="dev text-lg font-bold">कर्मचारी</h2><Button className="bg-brand text-primary-foreground hover:bg-brand-deep" onClick={() => setView("employees")}><Plus /> कर्मचारी जोड़ें</Button></div><WorkerTable rows={workers.slice(0, 5)} onSelect={goToWorker} /></div>
    <div className="grid gap-5 lg:grid-cols-3"><PaymentCalculation worker={workers[0]} onPay={() => setPaymentOpen(true)} /><div className="glass-panel rounded-2xl p-6 lg:col-span-1"><h2 className="dev font-bold">आज की उपस्थिति</h2><div className="mt-4 space-y-3">{["sunita", "rekha", "maya", "pooja"].map((id) => { const worker = workers.find((item) => item.id === id); return worker ? <div className="flex items-center justify-between text-sm" key={id}><span>{worker.name}</span><AttendanceBadge status={attendanceSeed[id] ?? "absent"} /></div> : null; })}</div><Button variant="outline" className="mt-5 w-full bg-glass" onClick={() => setView("attendance")}>पूरी उपस्थिति देखें <ArrowRight /></Button></div></div>
  </>;
}

function Metric({ label, value, foot, emphasis = false }: { label: string; value: string; foot: string; emphasis?: boolean }) { return <div className={`glass-panel rounded-2xl p-4 ${emphasis ? "border-brand/25 bg-brand/10" : ""}`}><p className={`dev text-xs ${emphasis ? "text-brand-deep" : "text-ink/50"}`}>{label}</p><p className={`serif mt-1 text-2xl font-bold sm:text-3xl ${emphasis ? "text-brand-deep" : ""}`}>{value}</p><p className={`dev mt-1 text-[11px] ${emphasis ? "text-brand-deep/70" : "text-leaf"}`}>{foot}</p></div>; }

function EventCard({ event, onOpen }: { event: Event; onOpen: () => void }) { return <div className="glass-panel rounded-2xl p-5"><div className="flex items-start justify-between gap-3"><span className="dev inline-flex rounded-full bg-leaf/10 px-2.5 py-1 text-[11px] font-semibold text-leaf">{event.type === "Wedding" ? "🎉 शादी समारोह" : "🎂 जन्मदिन"}</span><span className="text-[11px] text-ink/50">📅 {event.date.replace(" 2026", "")}</span></div><p className="mt-3 text-lg font-extrabold">{event.name}</p><div className="dev mt-3 space-y-1.5 text-sm text-ink/70"><p>📍 {event.location}</p><p>👥 {event.guests} मेहमान</p><p>👩‍🍳 {event.assigned.length} कर्मचारी</p></div><Button className="mt-4 w-full bg-ink text-primary-foreground hover:bg-ink/90" onClick={onOpen}>स्टाफ देखें <ArrowRight /></Button></div>; }

function Deployment() { const places = [{ name: "Hall 1", count: 18, width: "90%" }, { name: "Hall 2", count: 12, width: "60%" }, { name: "Hall 3", count: 9, width: "45%" }, { name: "बाहर का कार्यक्रम", count: 7, width: "35%" }]; return <div className="glass-panel h-fit rounded-2xl p-5"><h2 className="dev font-bold">आज कौन-सी जगह कितने कर्मचारी?</h2><div className="mt-4 space-y-4">{places.map((place) => <div key={place.name}><div className="mb-1.5 flex justify-between text-sm"><span className="dev font-medium">{place.name}</span><span className="font-bold">{place.count}</span></div><div className="h-2.5 rounded-full bg-ink/5"><div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-deep" style={{ width: place.width }} /></div></div>)}</div></div>; }

function Employees({ selectedWorkerId, setSelectedWorkerId, setWorkerOpen, goToWorker }: { selectedWorkerId: string; setSelectedWorkerId: (id: string) => void; setWorkerOpen: (open: boolean) => void; goToWorker: (id: string) => void }) { const worker = workers.find((item) => item.id === selectedWorkerId) ?? workers[0]; return <><PageHeading title="कर्मचारी" subtitle="अस्थायी और इवेंट-आधारित कर्मचारियों का पूरा हिसाब" action={<Button className="bg-brand text-primary-foreground hover:bg-brand-deep" onClick={() => setWorkerOpen(true)}><Plus /> कर्मचारी जोड़ें</Button>} /><div className="glass-panel overflow-hidden rounded-2xl"><WorkerTable rows={workers} onSelect={(id) => { setSelectedWorkerId(id); goToWorker(id); }} /></div><WorkerProfile worker={worker} /></>; }

function WorkerTable({ rows, onSelect }: { rows: Worker[]; onSelect: (id: string) => void }) { return <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead><tr className="dev border-b border-glass-border text-left text-xs text-ink/50"><th className="px-5 py-3">कर्मचारी</th><th className="px-5 py-3">काम</th><th className="px-5 py-3">रेट</th><th className="px-5 py-3">काम किए दिन</th><th className="px-5 py-3">कमाई</th><th className="px-5 py-3">बाकी</th><th /></tr></thead><tbody className="divide-y divide-glass-border">{rows.map((worker) => <tr key={worker.id} className="transition hover:bg-glass"><td className="px-5 py-3.5"><button className="flex items-center gap-3 text-left font-semibold" onClick={() => onSelect(worker.id)}><span className="grid size-8 place-items-center rounded-full bg-brand/10 text-brand-deep">{worker.name.slice(0, 1)}</span>{worker.name}</button></td><td className="px-5 py-3.5 text-ink/70">{worker.role}</td><td className="px-5 py-3.5">{money(worker.rate)}</td><td className="px-5 py-3.5">{worker.days}</td><td className="px-5 py-3.5 font-medium">{money(worker.earned)}</td><td className="px-5 py-3.5"><span className={`font-bold ${getPending(worker) === 0 ? "text-leaf" : "text-brand-deep"}`}>{money(getPending(worker))}</span></td><td className="px-5 py-3.5 text-right"><Button variant="link" className="text-ink/60" onClick={() => onSelect(worker.id)}>देखें</Button></td></tr>)}</tbody></table></div>; }

function WorkerProfile({ worker }: { worker: Worker }) { return <div className="grid gap-5 lg:grid-cols-3"><div className="glass-panel rounded-2xl p-6 lg:col-span-1"><div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full bg-brand/10 text-xl font-bold text-brand-deep">{worker.name.slice(0, 1)}</span><div><h2 className="dev text-xl font-bold">{worker.name}</h2><p className="text-sm text-ink/50">{worker.role} · रोज {money(worker.rate)}</p></div></div><p className="mt-5 text-sm text-ink/60">मोबाइल: {worker.phone}</p><div className="mt-5 rounded-xl border border-brand/25 bg-brand/10 p-4"><p className="dev text-sm font-semibold text-brand-deep">बाकी भुगतान</p><p className="serif mt-1 text-4xl font-bold text-brand-deep">{money(getPending(worker))}</p></div><div className="mt-5 space-y-3 text-sm"><Line label="काम किए दिन" value={`${worker.days} दिन`} /><Line label="कुल कमाई" value={money(worker.earned)} /><Line label="एडवांस" value={money(worker.advance)} /><Line label="पहले भुगतान" value={money(worker.paid)} /></div></div><div className="glass-panel rounded-2xl p-6 lg:col-span-2"><div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="dev text-lg font-bold">काम का इतिहास</h2><p className="dev text-sm text-ink/50">इस महीने की सभी असाइनमेंट</p></div><div className="flex gap-2"><Button variant="outline" className="bg-glass">सितम्बर <ChevronDown /></Button><Button variant="outline" size="icon" className="bg-glass" aria-label="अधिक विकल्प"><MoreHorizontal /></Button></div></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[560px] text-sm"><thead><tr className="dev border-b border-glass-border text-left text-xs text-ink/50"><th className="py-3">तारीख</th><th className="py-3">कार्यक्रम</th><th className="py-3">जगह</th><th className="py-3">काम दिन</th><th className="py-3">रेट</th><th className="py-3 text-right">कमाई</th></tr></thead><tbody className="divide-y divide-glass-border">{workHistory.map((item) => <tr key={`${item.date}-${item.event}`}><td className="py-3">{item.date}</td><td className="py-3 font-medium">{item.event}</td><td className="py-3 text-ink/60">{item.location}</td><td className="py-3">{item.days}</td><td className="py-3">{money(item.rate)}</td><td className="py-3 text-right font-semibold">{money(item.earned)}</td></tr>)}</tbody></table></div></div></div>; }

function Line({ label, value }: { label: string; value: string }) { return <div className="flex justify-between"><span className="dev text-ink/60">{label}</span><span className="font-semibold">{value}</span></div>; }

function EventsPage({ setSelectedEventId, setView, setEventOpen }: { setSelectedEventId: (id: string) => void; setView: (view: View) => void; setEventOpen: (open: boolean) => void }) { return <><PageHeading title="कार्यक्रम" subtitle="आने वाले और पूरे हो चुके सभी कार्यक्रम" action={<Button className="bg-brand text-primary-foreground hover:bg-brand-deep" onClick={() => setEventOpen(true)}><Plus /> कार्यक्रम जोड़ें</Button>} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{events.map((event) => <div key={event.id} className="glass-panel rounded-2xl p-5"><div className="flex items-start justify-between"><span className="dev rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand-deep">{event.type}</span><span className="text-xs text-ink/50">{event.date}</span></div><h2 className="mt-4 text-lg font-bold">{event.name}</h2><div className="dev mt-3 space-y-2 text-sm text-ink/70"><p>📍 {event.location}</p><p>👥 {event.guests} मेहमान</p><p>👩‍🍳 {event.assigned.length} स्टाफ़ असाइन</p></div><Button className="mt-5 w-full bg-ink text-primary-foreground hover:bg-ink/90" onClick={() => { setSelectedEventId(event.id); setView("attendance"); }}>कार्यक्रम खोलें <ArrowRight /></Button></div>)}</div></>; }

function Attendance({ attendance, setAttendance, selectedEvent, setSelectedEventId }: { attendance: Record<string, AttendanceStatus>; setAttendance: (value: Record<string, AttendanceStatus>) => void; selectedEvent: Event; setSelectedEventId: (id: string) => void }) { return <><PageHeading title="आज की उपस्थिति" subtitle="एक क्लिक में उपस्थित, अनुपस्थित या आधा दिन दर्ज करें" /><div className="glass-panel rounded-2xl p-5"><div className="flex flex-wrap items-end justify-between gap-4 border-b border-glass-border pb-5"><div><p className="dev text-sm text-ink/50">कार्यक्रम चुनें</p><div className="mt-2 flex items-center gap-2"><select value={selectedEvent.id} onChange={(event) => setSelectedEventId(event.target.value)} className="h-11 rounded-xl border border-glass-border bg-glass px-3 text-sm"><option value={events[0].id}>अमित की शादी · Hall 1</option>{events.slice(1, 5).map((item) => <option key={item.id} value={item.id}>{item.name} · {item.location}</option>)}</select><div className="rounded-xl bg-mist px-3 py-2.5 text-sm">12 September</div></div></div><span className="dev rounded-full bg-leaf/10 px-3 py-2 text-sm font-semibold text-leaf">{selectedEvent.assigned.length} कर्मचारी</span></div><div className="mt-5 divide-y divide-glass-border">{selectedEvent.assigned.slice(0, 6).map((id) => { const worker = workers.find((item) => item.id === id); if (!worker) return null; return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 sm:flex" key={id}><div className="flex min-w-0 items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 font-bold text-brand-deep">{worker.name.slice(0, 1)}</span><div className="min-w-0"><p className="truncate font-semibold">{worker.name}</p><p className="text-xs text-ink/50">{worker.role} · {money(worker.rate)}/day</p></div></div><div className="col-start-1 flex gap-1 sm:ml-auto"><StatusButton label="Present" active={attendance[id] === "present"} onClick={() => setAttendance({ ...attendance, [id]: "present" })} tone="present" /><StatusButton label="Absent" active={attendance[id] === "absent"} onClick={() => setAttendance({ ...attendance, [id]: "absent" })} tone="absent" /><StatusButton label="Half Day" active={attendance[id] === "half"} onClick={() => setAttendance({ ...attendance, [id]: "half" })} tone="half" /></div></div>; })}</div><div className="mt-5 flex justify-end"><Button className="bg-brand text-primary-foreground hover:bg-brand-deep" onClick={() => toast.success("आज की उपस्थिति सेव हो गई")}>उपस्थिति सेव करें <Check /></Button></div></div></>; }

function StatusButton({ label, active, onClick, tone }: { label: string; active: boolean; onClick: () => void; tone: AttendanceStatus }) { const toneClass = tone === "present" ? "border-leaf/30 text-leaf bg-leaf/10" : tone === "half" ? "border-amber-500/30 text-amber-700 bg-amber-500/10" : "border-ink/10 text-ink/60 bg-glass"; return <Button variant="outline" size="sm" className={`${active ? toneClass : "bg-glass"} dev`} onClick={onClick}>{active && <Check />}{label}</Button>; }

function AttendanceBadge({ status }: { status: AttendanceStatus }) { return <span className={`dev rounded-full px-2.5 py-1 text-[11px] font-semibold ${status === "present" ? "bg-leaf/10 text-leaf" : status === "half" ? "bg-amber-500/10 text-amber-700" : "bg-ink/10 text-ink/60"}`}>{status === "present" ? "✓ Present" : status === "half" ? "◐ Half Day" : "× Absent"}</span>; }

function Payments({ selectedWorker, setSelectedWorkerId, setPaymentOpen, setAdvanceOpen }: { selectedWorker: Worker; setSelectedWorkerId: (id: string) => void; setPaymentOpen: (open: boolean) => void; setAdvanceOpen: (open: boolean) => void }) { return <><PageHeading title="पेमेंट / पगार" subtitle="काम किए दिनों से बाकी भुगतान तक पूरा हिसाब" /><div className="flex flex-wrap gap-3"><select value={selectedWorker.id} onChange={(event) => setSelectedWorkerId(event.target.value)} className="h-11 rounded-xl border border-glass-border bg-glass px-3 text-sm"><option value="sunita">सुनीता</option>{workers.slice(1).map((worker) => <option key={worker.id} value={worker.id}>{worker.name}</option>)}</select><Button variant="outline" className="bg-glass">September 2026 <ChevronDown /></Button></div><div className="grid gap-5 lg:grid-cols-3"><PaymentCalculation worker={selectedWorker} onPay={() => setPaymentOpen(true)} /><div className="glass-panel rounded-2xl p-6"><div className="flex items-center justify-between"><h2 className="dev text-lg font-bold">एडवांस</h2><span className="font-bold">{money(selectedWorker.advance)}</span></div><div className="mt-4 space-y-3 text-sm">{advances.map((item) => <div className="flex justify-between border-b border-glass-border pb-3" key={`${item.date}-${item.reason}`}><span className="text-ink/60">{item.date} · {item.reason}</span><span className="font-semibold">{money(item.amount)}</span></div>)}</div><Button variant="outline" className="mt-4 w-full bg-glass" onClick={() => setAdvanceOpen(true)}><Plus /> एडवांस दें</Button></div><div className="glass-panel rounded-2xl p-6"><h2 className="dev text-lg font-bold">भुगतान हिसाब</h2><div className="mt-4 space-y-3 text-sm"><Line label="12 Sep · Cash" value="₹2,000" /><Line label="5 Sep · UPI" value="₹3,000" /><div className="border-t border-glass-border pt-3"><Line label="इस माह भुगतान" value={money(selectedWorker.paid)} /></div></div><Button variant="outline" className="mt-4 w-full bg-glass" onClick={() => toast("भुगतान हिसाब खुल रहा है")}>पूरा लेजर देखें <ArrowRight /></Button></div></div></>; }

function PaymentCalculation({ worker, onPay }: { worker: Worker; onPay: () => void }) { const half = worker.halfDays * worker.rate / 2; return <div className="glass-panel rounded-2xl p-6 lg:col-span-2"><div className="flex items-center justify-between gap-3"><div><h2 className="dev text-lg font-bold">{worker.name} — September 2026</h2><p className="text-sm text-ink/50">{worker.role} · रोज का रेट {money(worker.rate)}</p></div><span className="dev rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink/60">Daily Rate</span></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-glass p-4"><p className="dev text-xs text-ink/50">पूरा दिन</p><p className="serif text-2xl font-bold">{worker.days}</p></div><div className="rounded-xl bg-glass p-4"><p className="dev text-xs text-ink/50">आधा दिन</p><p className="serif text-2xl font-bold">{worker.halfDays}</p></div></div><div className="mt-4 space-y-1 text-sm text-ink/60"><p>{worker.days} × {money(worker.rate)} = {money(worker.days * worker.rate)}</p><p>{worker.halfDays} × {money(worker.rate / 2)} = {money(half)}</p></div><div className="mt-5 space-y-2 border-t border-glass-border pt-4 text-sm"><Line label="कुल कमाई" value={money(worker.earned)} /><Line label="− एडवांस" value={money(worker.advance)} /><Line label="− पहले भुगतान" value={money(worker.paid)} /></div><div className="mt-4 rounded-xl border border-brand/25 bg-brand/10 p-4"><div className="flex items-center justify-between"><span className="dev font-semibold text-brand-deep">बाकी भुगतान</span><span className="serif text-3xl font-bold text-brand-deep">{money(getPending(worker))}</span></div></div><Button className="mt-5 w-full bg-brand text-primary-foreground shadow-lg shadow-brand/25 hover:bg-brand-deep" onClick={onPay}>भुगतान दर्ज करें <ArrowRight /></Button></div>; }

function Reports() { return <><PageHeading title="रिपोर्ट" subtitle="सितम्बर 2026 का काम और भुगतान एक नज़र में" action={<div className="flex gap-2"><Button variant="outline" className="bg-glass" onClick={() => toast("PDF डाउनलोड डेमो") }><FileText /> PDF डाउनलोड करें</Button><Button variant="outline" className="bg-glass" onClick={() => toast("Excel डाउनलोड डेमो")}><FileSpreadsheet /> Excel डाउनलोड करें</Button></div>} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><ReportMetric label="कुल कार्यक्रम" value="24" /><ReportMetric label="कुल असाइनमेंट" value="183" /><ReportMetric label="कुल लेबर लागत" value="₹1,42,000" /><ReportMetric label="बाकी भुगतान" value="₹32,000" emphasis /></div><div className="grid gap-5 lg:grid-cols-2"><ReportTable title="कर्मचारी रिपोर्ट" headers={["कर्मचारी", "दिन", "कमाई", "एडवांस", "बाकी"]} rows={workers.slice(0, 6).map((worker) => [worker.name, `${worker.days}`, money(worker.earned), money(worker.advance), money(getPending(worker))])} /><ReportTable title="कार्यक्रम रिपोर्ट" headers={["कार्यक्रम", "जगह", "स्टाफ़", "लेबर लागत"]} rows={events.slice(0, 6).map((event) => [event.name, event.location, `${event.assigned.length}`, money(event.assigned.length * 720)])} /></div><div className="glass-panel rounded-2xl p-6"><h2 className="dev text-lg font-bold">हॉल रिपोर्ट</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{["Hall 1", "Hall 2", "Hall 3"].map((hall, index) => <div key={hall} className="rounded-xl bg-glass p-4"><p className="font-bold">{hall}</p><p className="mt-2 text-sm text-ink/60">कुल कार्यक्रम · {8 - index}</p><p className="text-sm text-ink/60">कुल स्टाफ़ · {48 - index * 9}</p><p className="mt-2 text-lg font-bold text-brand-deep">{money(58000 - index * 13000)}</p></div>)}</div></div></>; }

function ReportMetric({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) { return <div className={`glass-panel rounded-2xl p-5 ${emphasis ? "border-brand/25 bg-brand/10" : ""}`}><p className="dev text-sm text-ink/50">{label}</p><p className={`serif mt-2 text-3xl font-bold ${emphasis ? "text-brand-deep" : ""}`}>{value}</p></div>; }

function ReportTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <div className="glass-panel overflow-hidden rounded-2xl"><h2 className="dev border-b border-glass-border px-5 py-4 text-lg font-bold">{title}</h2><div className="overflow-x-auto"><table className="w-full min-w-[580px] text-sm"><thead><tr className="dev border-b border-glass-border text-left text-xs text-ink/50">{headers.map((header) => <th className="px-5 py-3" key={header}>{header}</th>)}</tr></thead><tbody className="divide-y divide-glass-border">{rows.map((row, index) => <tr key={`${title}-${index}`}>{row.map((cell, cellIndex) => <td className={`px-5 py-3 ${cellIndex === 0 ? "font-semibold" : "text-ink/70"}`} key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div></div>; }

function Locations() { return <><PageHeading title="हॉल / लोकेशन" subtitle="सवालिया कैटरर्स के तीन हॉल और बाहर के कार्यक्रम" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[{ name: "Hall 1", detail: "मुख्य हॉल · 800 मेहमान", events: 8, color: "bg-brand/10" }, { name: "Hall 2", detail: "फैमिली हॉल · 350 मेहमान", events: 6, color: "bg-leaf/10" }, { name: "Hall 3", detail: "गार्डन हॉल · 500 मेहमान", events: 5, color: "bg-mist" }, { name: "बाहर का कार्यक्रम", detail: "ग्राहक का घर / अन्य जगह", events: 5, color: "bg-amber-500/10" }].map((place) => <div className={`glass-panel rounded-2xl p-5 ${place.color}`} key={place.name}><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-glass"><FileText className="size-5" /></span><span className="dev rounded-full bg-glass px-2 py-1 text-xs">{place.events} कार्यक्रम</span></div><h2 className="mt-5 font-bold">{place.name}</h2><p className="dev mt-1 text-sm text-ink/60">{place.detail}</p><Button variant="outline" className="mt-5 w-full bg-glass" onClick={() => toast(`${place.name} की जानकारी खुल रही है`)}>विवरण देखें <ArrowRight /></Button></div>)}</div></>; }
function SettingsPage() { return <><PageHeading title="सेटिंग्स" subtitle="सवालिया कैटरर्स की सामान्य जानकारी" /><div className="glass-panel max-w-2xl rounded-2xl p-6"><div className="grid gap-4 sm:grid-cols-2"><Field label="व्यवसाय का नाम" value="सवालिया कैटरर्स" /><Field label="मालिक का नाम" value="बाबूलाल शर्मा" /><Field label="मोबाइल नंबर" value="98•••••100" /><Field label="डिफ़ॉल्ट पेमेंट" value="Cash" /></div><Button className="mt-5 bg-brand text-primary-foreground hover:bg-brand-deep" onClick={() => toast.success("सेटिंग्स सेव हो गई")}>सेटिंग्स सेव करें <Check /></Button></div></>; }
function PageHeading({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) { return <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="dev text-3xl font-bold tracking-tight">{title}</h1><p className="dev mt-1 text-sm text-ink/50">{subtitle}</p></div>{action}</div>; }
function Field({ label, value }: { label: string; value: string }) { return <label className="dev block text-sm font-medium"><span className="mb-1.5 block text-ink/70">{label}</span><Input defaultValue={value} className="bg-glass" /></label>; }

function MobileNavigation({ view, setView, close }: { view: View; setView: (view: View) => void; close: () => void }) { return <div className="fixed inset-0 z-50 bg-ink/20 lg:hidden"><div className="glass-panel flex h-full w-72 flex-col rounded-none border-y-0 border-l-0"><div className="flex items-center justify-between border-b border-glass-border p-5"><Brand /><Button variant="ghost" size="icon" onClick={close} aria-label="मेन्यू बंद करें"><X /></Button></div><Navigation view={view} setView={setView} /></div></div>; }

function ModalShell({ title, children, close }: { title: string; children: React.ReactNode; close: () => void }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/25 p-4"><div className="glass-panel max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl"><div className="flex items-center justify-between border-b border-glass-border px-5 py-4"><h2 className="dev text-lg font-bold">{title}</h2><Button variant="ghost" size="icon" onClick={close} aria-label="बंद करें"><X /></Button></div><div className="p-5">{children}</div></div></div>; }
function WorkerModal({ close }: { close: () => void }) { return <ModalShell title="नया कर्मचारी" close={close}><div className="grid gap-4 sm:grid-cols-2"><Field label="नाम" value="" /><Field label="मोबाइल नंबर" value="" /><label className="dev text-sm font-medium"><span className="mb-1.5 block">काम / Role</span><select className="h-10 w-full rounded-md border border-glass-border bg-glass px-3"><option>Cook</option><option>Helper</option><option>Waiter</option><option>Cleaner</option></select></label><label className="dev text-sm font-medium"><span className="mb-1.5 block">Employment type</span><select className="h-10 w-full rounded-md border border-glass-border bg-glass px-3"><option>Event-based</option><option>Temporary</option><option>Permanent</option></select></label><Field label="रोज का रेट" value="₹ 800" /><Field label="Joining date" value="12 September 2026" /></div><Button className="mt-5 w-full bg-brand text-primary-foreground hover:bg-brand-deep" onClick={() => { toast.success("कर्मचारी सेव हो गया"); close(); }}>कर्मचारी सेव करें <Check /></Button></ModalShell>; }
function EventModal({ close }: { close: () => void }) { return <ModalShell title="नया कार्यक्रम" close={close}><div className="grid gap-4 sm:grid-cols-2"><Field label="कार्यक्रम का नाम" value="" /><label className="dev text-sm font-medium"><span className="mb-1.5 block">कार्यक्रम का प्रकार</span><select className="h-10 w-full rounded-md border border-glass-border bg-glass px-3"><option>Wedding</option><option>Birthday</option><option>Pooja</option><option>Reception</option><option>Party</option><option>Other</option></select></label><Field label="Customer name" value="" /><Field label="Customer mobile" value="" /><Field label="Date" value="12 September 2026" /><Field label="Start time" value="06:00 PM" /><label className="dev text-sm font-medium sm:col-span-2"><span className="mb-1.5 block">काम की जगह</span><select className="h-10 w-full rounded-md border border-glass-border bg-glass px-3"><option>Savaliya Hall 1</option><option>Savaliya Hall 2</option><option>Savaliya Hall 3</option><option>बाहर का कार्यक्रम</option></select></label></div><Button className="mt-5 w-full bg-brand text-primary-foreground hover:bg-brand-deep" onClick={() => { toast.success("कार्यक्रम सेव हो गया"); close(); }}>कार्यक्रम सेव करें <Check /></Button></ModalShell>; }
function PaymentModal({ amount, setAmount, close, save }: { amount: number; setAmount: (amount: number) => void; close: () => void; save: () => void }) { return <ModalShell title="भुगतान दर्ज करें" close={close}><div className="rounded-xl bg-brand/10 p-4"><div className="flex justify-between"><span className="dev">कर्मचारी</span><strong>सुनीता</strong></div><div className="mt-2 flex justify-between"><span className="dev">बाकी</span><strong className="text-brand-deep">₹3,400</strong></div></div><div className="mt-4 space-y-4"><Field label="भुगतान राशि" value={money(amount)} /><label className="dev text-sm font-medium"><span className="mb-1.5 block">Payment method</span><select className="h-10 w-full rounded-md border border-glass-border bg-glass px-3"><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select></label><Field label="Date" value="12 September 2026" /><Field label="Notes" value="Partial payment" /></div><Button className="mt-5 w-full bg-brand text-primary-foreground hover:bg-brand-deep" onClick={save}>भुगतान सेव करें <Check /></Button></ModalShell>; }
function AdvanceModal({ close, save }: { close: () => void; save: () => void }) { return <ModalShell title="एडवांस दें" close={close}><div className="space-y-4"><Field label="कर्मचारी" value="सुनीता" /><Field label="Amount" value="₹ 1,000" /><Field label="Date" value="12 September 2026" /><Field label="Reason" value="Personal" /><label className="dev text-sm font-medium"><span className="mb-1.5 block">Payment Method</span><select className="h-10 w-full rounded-md border border-glass-border bg-glass px-3"><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select></label></div><Button className="mt-5 w-full bg-brand text-primary-foreground hover:bg-brand-deep" onClick={save}>एडवांस सेव करें <Check /></Button></ModalShell>; }