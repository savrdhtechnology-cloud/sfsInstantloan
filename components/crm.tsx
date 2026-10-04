"use client";
import { useEffect, useRef, useState, useMemo, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Columns3,
  CalendarClock,
  ChartNoAxesCombined,
  Users,
  Settings,
  ArrowUpRight,
  Plus,
  Search,
  Download,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Clock3,
  CheckCircle2,
  Inbox,
  Phone,
  Mail,
  MessageCircle,
  X,
  Menu,
  LogOut,
  Globe,
  AlertCircle,
  Activity as ActivityIcon,
  ChevronRight,
} from "lucide-react";
import { Brand } from "./brand";
import { m, Reveal } from "./motion";
import {
  Application,
  Activity,
  Staff,
  LoanStatus,
  statuses,
  money,
  compactMoney,
} from "@/lib/finance";
import { signOut } from "@/app/login/actions";
const views = [
  { id: "overview", name: "Overview", icon: LayoutDashboard },
  { id: "applications", name: "Applications", icon: FileText },
  { id: "pipeline", name: "Loan pipeline", icon: Columns3 },
  { id: "follow-ups", name: "Follow-ups", icon: CalendarClock },
  { id: "reports", name: "Reports", icon: ChartNoAxesCombined },
  { id: "team", name: "Team", icon: Users },
  { id: "settings", name: "Settings", icon: Settings },
];
const titles: Record<string, [string, string]> = {
  overview: [
    "A clearer view. A better day.",
    "Your applications, conversations and next steps. All together.",
  ],
  applications: [
    "Every possibility, in one place.",
    "Manage applications from first contact to final outcome.",
  ],
  pipeline: [
    "Keep things moving.",
    "A stage-by-stage view of your lending workflow.",
  ],
  "follow-ups": [
    "The next conversation matters.",
    "Stay close to every application with scheduled follow-ups.",
  ],
  reports: [
    "Understand your progress.",
    "A clear picture of the applications in this workspace.",
  ],
  team: [
    "The people behind the progress.",
    "Your authorized Instant Loan team.",
  ],
  settings: ["Make it yours.", "Brand details and the workspace connection."],
};
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
export function CRM({
  connected,
  user,
  view: requestedView,
}: {
  connected: boolean;
  user: Staff | null;
  view: string;
}) {
  const view = views.some((v) => v.id === requestedView)
    ? requestedView
    : "overview";
  const [apps, setApps] = useState<Application[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(connected);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All stages");
  const [mobile, setMobile] = useState(false);
  const [selected, setSelected] = useState<Application | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [refresh, setRefresh] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!connected) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch("/api/crm", { signal: controller.signal, cache: "no-store" })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        return d;
      })
      .then((d) => {
        setApps(d.applications);
        setStaff(d.staff);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(e.message || "Unable to load records.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [connected, refresh]);
  useEffect(() => {
    setSearch("");
    setFilter("All stages");
    setMobile(false);
    setSelectedIds(new Set());
  }, [view]);
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );
  function notify(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 4500);
  }
  const filtered = useMemo(
    () =>
      apps.filter(
        (a) =>
          (filter === "All stages" || a.status === filter) &&
          `${a.full_name} ${a.reference} ${a.phone} ${a.email} ${a.city}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [apps, search, filter],
  );
  const followups = useMemo(
    () =>
      apps
        .filter(
          (a) =>
            a.follow_up_at && a.status !== "Closed" && a.status !== "Disbursed",
        )
        .sort((a, b) => a.follow_up_at!.localeCompare(b.follow_up_at!)),
    [apps],
  );
  const active = apps.filter(
    (a) => !["Closed", "Disbursed"].includes(a.status),
  );
  const disbursed = apps.filter((a) => a.status === "Disbursed");
  const total = apps.reduce((sum, a) => sum + Number(a.amount), 0);
  const stages = statuses.filter((s) => s !== "Closed");
  function exportCsv() {
    const rows = selectedIds.size
      ? filtered.filter((a) => selectedIds.has(a.id))
      : filtered;
    if (!rows.length) {
      notify("No applications to export yet.");
      return;
    }
    const cell = (x: unknown) => {
      let s = String(x ?? "");
      if (/^[=+@\-\t\r]/.test(s)) s = "'" + s;
      return '"' + s.replace(/"/g, '""') + '"';
    };
    const csv = [
      [
        "Reference",
        "Name",
        "Phone",
        "Email",
        "Product",
        "Requested amount",
        "Status",
        "City",
        "Created",
      ],
      ...rows.map((a) => [
        a.reference,
        a.full_name,
        a.phone,
        a.email,
        a.product,
        a.amount,
        a.status,
        a.city,
        a.created_at,
      ]),
    ]
      .map((row) => row.map(cell).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "savrdh-applications.csv";
    a.click();
    URL.revokeObjectURL(url);
    notify(`${rows.length} applications exported.`);
  }
  const toggle = (id: string) =>
    setSelectedIds((old) => {
      const next = new Set(old);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  function refreshData() {
    if (!connected) {
      notify("Connect the Financial Services database to load applications.");
      return;
    }
    setRefresh((v) => v + 1);
  }
  return (
    <div className="crm-layout">
      <aside className={`crm-sidebar ${mobile ? "mobile-open" : ""}`}>
        <button
          className="icon-button mobile-crm-menu mobile-crm-close"
          onClick={() => setMobile(false)}
          aria-label="Close navigation"
        >
          <X size={16} />
        </button>
        <Brand light />
        <span className="sidebar-label">YOUR WORKSPACE</span>
        <nav className="crm-nav" aria-label="CRM navigation">
          {views.map((v) => (
            <Link
              key={v.id}
              href={`/crm?view=${v.id}`}
              className={view === v.id ? "active" : ""}
              onClick={() => setMobile(false)}
            >
              <v.icon />
              {v.name}
              {v.id === "applications" && apps.length > 0 ? (
                <span className="nav-count">{apps.length}</span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="sidebar-help">
          <h4>A little guidance?</h4>
          <p>Your next conversation is one call away.</p>
          <a href="tel:+918109995906">
            <Phone size={12} /> 8109995906
          </a>
        </div>
        <div className="crm-profile">
          <span className="avatar">
            {user ? initials(user.full_name) : "S"}
          </span>
          <div>
            <strong>{user?.full_name || "Savrdh workspace"}</strong>
            <small>{user?.role || "Design preview"}</small>
          </div>
          {user ? (
            <form action={signOut}>
              <button title="Sign out" aria-label="Sign out">
                <LogOut size={16} />
              </button>
            </form>
          ) : (
            <Link href="/login" aria-label="Sign in">
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </aside>
      <div className="crm-content">
        <header className="crm-header">
          <div>
            <button
              className="icon-button mobile-crm-menu"
              aria-label="Open CRM navigation"
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              <Menu size={17} />
            </button>
            <small>Workspace</small>
            <ChevronRight size={12} />
            <strong>{views.find((v) => v.id === view)?.name}</strong>
          </div>
          <div className="header-right">
            <span className="connection-pill">
              <i />
              {connected ? "Connected workspace" : "Preview workspace"}
            </span>
            <Link href="/" target="_blank">
              View website <ArrowUpRight size={13} />
            </Link>
            <span className="avatar">
              {user ? initials(user.full_name) : "S"}
            </span>
          </div>
        </header>
        <main className="crm-main">
          <m.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="crm-page-heading">
              <div>
                <span
                  className="eyebrow"
                  style={{ fontSize: 8, marginBottom: 8 }}
                >
                  SAVRDH INSTANT LOAN /{" "}
                  {views.find((v) => v.id === view)?.name.toUpperCase()}
                </span>
                <h1>{titles[view][0]}</h1>
                <p>{titles[view][1]}</p>
              </div>
              <Link href="/apply" className="button button-dark button-small">
                <Plus size={15} />
                New application
              </Link>
            </div>
            {!connected ? (
              <div className="setup-banner">
                <AlertCircle size={16} />
                <p>
                  <strong>Workspace preview.</strong> The Financial Services
                  database is not connected yet. No customer records or sample
                  metrics are shown.
                </p>
                <Link href="/crm?view=settings">Setup details</Link>
              </div>
            ) : null}
            {error ? (
              <div role="alert" className="notice error">
                {error}{" "}
                <button
                  onClick={refreshData}
                  className="text-link"
                  style={{ border: 0, background: "none" }}
                >
                  Retry
                </button>
              </div>
            ) : null}
            {["overview", "reports"].includes(view) ? (
              <div className="crm-stats">
                {[
                  {
                    label: "Total applications",
                    value: apps.length,
                    foot: "Applications received",
                    icon: FileText,
                  },
                  {
                    label: "Requested loan value",
                    value: compactMoney(total),
                    foot: "Total amount requested",
                    icon: IndianRupee,
                  },
                  {
                    label: "In progress",
                    value: active.length,
                    foot: "Applications being assisted",
                    icon: Clock3,
                  },
                  {
                    label: "Verified disbursals",
                    value: disbursed.length,
                    foot:
                      compactMoney(
                        disbursed.reduce(
                          (s, a) => s + Number(a.disbursed_amount || 0),
                          0,
                        ),
                      ) + " verified",
                    icon: CheckCircle2,
                  },
                ].map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.04} className="stat-card">
                    <div>
                      {s.label}
                      <s.icon />
                    </div>
                    <strong>{loading ? "—" : s.value}</strong>
                    <small>{s.foot}</small>
                  </Reveal>
                ))}
              </div>
            ) : null}
            {view === "overview" ? (
              <div className="crm-panels">
                <section className="panel">
                  <div className="panel-heading">
                    <h3>Every stage. One clear picture.</h3>
                    <Link href="/crm?view=pipeline">View pipeline ↗</Link>
                  </div>
                  <div className="pipeline-summary">
                    {[
                      "New",
                      "Contacted",
                      "Under Review",
                      "Approved",
                      "Disbursed",
                    ].map((s) => (
                      <div key={s}>
                        <strong>
                          {loading
                            ? "—"
                            : apps.filter((a) => a.status === s).length}
                        </strong>
                        <div className="bar">
                          <span
                            style={{
                              width: `${apps.length ? (apps.filter((a) => a.status === s).length / apps.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <small>{s}</small>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="panel">
                  <div className="panel-heading">
                    <h3>Your next conversations</h3>
                    <Link href="/crm?view=follow-ups">View all ↗</Link>
                  </div>
                  <div className="follow-summary">
                    {followups.length ? (
                      followups.slice(0, 3).map((a) => (
                        <button
                          className="mini-follow"
                          key={a.id}
                          onClick={() => setSelected(a)}
                          style={{
                            border: 0,
                            background: "none",
                            width: "100%",
                            cursor: "pointer",
                          }}
                        >
                          <strong>{a.full_name}</strong>
                          <span>{formatDate(a.follow_up_at!)}</span>
                        </button>
                      ))
                    ) : (
                      <div className="empty-mini">
                        <CalendarClock size={22} />
                        Follow-ups will appear here when scheduled.
                      </div>
                    )}
                  </div>
                </section>
              </div>
            ) : null}
            {["overview", "applications"].includes(view) ? (
              <section className="panel">
                <div className="panel-heading">
                  <h3>
                    {view === "overview"
                      ? "Recent applications"
                      : "Application directory"}{" "}
                    <span
                      className="muted"
                      style={{ fontSize: 10, fontWeight: 400 }}
                    >
                      ({filtered.length})
                    </span>
                  </h3>
                  <button onClick={exportCsv} disabled={!filtered.length}>
                    <Download size={12} />{" "}
                    {selectedIds.size
                      ? `Export selected (${selectedIds.size})`
                      : "Export CSV"}
                  </button>
                </div>
                <div className="table-toolbar">
                  <label className="search-box">
                    <Search />
                    <input
                      aria-label="Search applications"
                      placeholder="Search name, mobile or application ID…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                  <div className="table-filters">
                    <select
                      aria-label="Filter by stage"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option>All stages</option>
                      {statuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      className="icon-button"
                      onClick={refreshData}
                      disabled={loading}
                      aria-label="Refresh applications"
                    >
                      <RefreshCw size={13} />
                    </button>
                  </div>
                </div>
                {loading ? (
                  <div className="empty-state" role="status">
                    <span>
                      <RefreshCw />
                    </span>
                    <p>Loading your applications…</p>
                  </div>
                ) : filtered.length ? (
                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              aria-label="Select all visible applications"
                              checked={
                                filtered.length > 0 &&
                                filtered.every((a) => selectedIds.has(a.id))
                              }
                              onChange={(e) =>
                                setSelectedIds(
                                  e.target.checked
                                    ? new Set(filtered.map((a) => a.id))
                                    : new Set(),
                                )
                              }
                            />
                          </th>
                          <th>APPLICANT</th>
                          <th>LOAN SOLUTION</th>
                          <th>AMOUNT</th>
                          <th>STAGE</th>
                          <th>RECEIVED</th>
                          <th>
                            <span className="muted">VIEW</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered
                          .slice(0, view === "overview" ? 6 : 1000)
                          .map((a) => (
                            <tr key={a.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  aria-label={`Select ${a.full_name}`}
                                  checked={selectedIds.has(a.id)}
                                  onChange={() => toggle(a.id)}
                                />
                              </td>
                              <td>
                                <div className="applicant-cell">
                                  <span className="avatar">
                                    {initials(a.full_name)}
                                  </span>
                                  <div>
                                    <strong>{a.full_name}</strong>
                                    <small>{a.reference}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{a.product}</td>
                              <td>
                                <strong>{money(a.amount)}</strong>
                              </td>
                              <td>
                                <Status status={a.status} />
                              </td>
                              <td>{formatDate(a.created_at)}</td>
                              <td>
                                <button
                                  className="row-action"
                                  onClick={() => setSelected(a)}
                                  aria-label={`Open ${a.full_name}`}
                                >
                                  <ArrowUpRight size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Empty
                    icon="applications"
                    title={
                      search || filter !== "All stages"
                        ? "No matching applications."
                        : "Your next possibility starts here."
                    }
                    description={
                      search || filter !== "All stages"
                        ? "Try another search or stage filter."
                        : "Applications from your website will appear in this workspace once the database is connected."
                    }
                    action={!search && filter === "All stages"}
                  />
                )}
              </section>
            ) : null}
            {view === "pipeline" ? (
              <>
                <div
                  className="table-toolbar"
                  style={{ marginBottom: 22, border: 0, padding: 0 }}
                >
                  <span className="muted" style={{ fontSize: 11 }}>
                    Open a card to update its stage.
                  </span>
                  <button
                    className="button button-outline button-small"
                    onClick={refreshData}
                  >
                    <RefreshCw size={13} />
                    Refresh
                  </button>
                </div>
                <div className="pipeline-board">
                  {statuses.map((s) => (
                    <section className="pipeline-column" key={s}>
                      <h3>
                        {s}
                        <span>{apps.filter((a) => a.status === s).length}</span>
                      </h3>
                      {apps
                        .filter((a) => a.status === s)
                        .map((a) => (
                          <button
                            className="pipeline-card"
                            key={a.id}
                            onClick={() => setSelected(a)}
                          >
                            <strong>{a.full_name}</strong>
                            <p>{a.product}</p>
                            <span>{money(a.amount)}</span>
                            <p>{a.reference}</p>
                          </button>
                        ))}
                      {!apps.some((a) => a.status === s) ? (
                        <p className="pipeline-empty">
                          No applications at this stage.
                        </p>
                      ) : null}
                    </section>
                  ))}
                </div>
              </>
            ) : null}
            {view === "follow-ups" ? (
              <section className="panel">
                <div className="panel-heading">
                  <h3>Scheduled follow-ups</h3>
                  <span>{followups.length} open</span>
                </div>
                {followups.length ? (
                  <div className="crm-follow-list">
                    {followups.map((a) => (
                      <div className="follow-row" key={a.id}>
                        <span className="avatar">
                          <CalendarClock size={17} />
                        </span>
                        <div>
                          <strong>{a.full_name}</strong>
                          <p>
                            {a.reference} · {a.product}
                          </p>
                        </div>
                        <span className="follow-date">
                          {formatDate(a.follow_up_at!)}
                        </span>
                        <a
                          className="icon-button"
                          href={`tel:+91${a.phone}`}
                          aria-label={`Call ${a.full_name}`}
                        >
                          <Phone size={14} />
                        </a>
                        <button
                          className="row-action"
                          onClick={() => setSelected(a)}
                          aria-label={`Open ${a.full_name}`}
                        >
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty
                    icon="follow-ups"
                    title="A little breathing room."
                    description="Schedule a follow-up from any application. Your upcoming conversations will appear here."
                  />
                )}
              </section>
            ) : null}
            {view === "reports" ? (
              <div className="settings-grid">
                <section className="panel">
                  <div className="panel-heading">
                    <h3>Application stages</h3>
                    <span>Current records</span>
                  </div>
                  <div className="report-bars">
                    {statuses.map((s) => (
                      <div className="report-row" key={s}>
                        <span>{s}</span>
                        <div className="report-track">
                          <div
                            style={{
                              width: `${apps.length ? (apps.filter((a) => a.status === s).length / apps.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <strong>
                          {apps.filter((a) => a.status === s).length}
                        </strong>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="panel">
                  <div className="panel-heading">
                    <h3>Loan solutions</h3>
                    <span>Requested value</span>
                  </div>
                  <div className="report-bars">
                    {[
                      "Personal Loan",
                      "Business Loan",
                      "Professional Loan",
                      "Loan Against Property",
                    ].map((p) => (
                      <div className="settings-row" key={p}>
                        <span>{p}</span>
                        <strong>
                          {compactMoney(
                            apps
                              .filter((a) => a.product === p)
                              .reduce((s, a) => s + Number(a.amount), 0),
                          )}
                        </strong>
                      </div>
                    ))}
                    <p className="micro-note" style={{ marginTop: 20 }}>
                      Figures reflect received requests, not sanctioned or paid
                      amounts. Verified disbursals require transaction evidence.
                    </p>
                  </div>
                </section>
              </div>
            ) : null}
            {view === "team" ? (
              <section className="panel">
                <div className="panel-heading">
                  <h3>Authorized team members</h3>
                  <span>{staff.length} active</span>
                </div>
                {staff.length ? (
                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>TEAM MEMBER</th>
                          <th>ROLE</th>
                          <th>ASSIGNED</th>
                          <th>ACCESS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staff.map((s) => (
                          <tr key={s.id}>
                            <td>
                              <div className="applicant-cell">
                                <span className="avatar">
                                  {initials(s.full_name)}
                                </span>
                                <strong>{s.full_name}</strong>
                              </div>
                            </td>
                            <td>{s.role}</td>
                            <td>
                              {apps.filter((a) => a.assignee === s.id).length}
                            </td>
                            <td>
                              <span className="status-badge">Active</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Empty
                    icon="team"
                    title="Good work starts with a good team."
                    description="Team members appear after authorized accounts are enrolled in the Financial Services database."
                  />
                )}
                <p className="micro-note" style={{ padding: "0 23px 23px" }}>
                  Staff access is assigned by a database administrator. Signing
                  up alone never grants CRM access.
                </p>
              </section>
            ) : null}
            {view === "settings" ? (
              <div className="settings-grid">
                <section className="panel settings-card">
                  <h3>Brand identity</h3>
                  <Brand />
                  <div style={{ marginTop: 20 }}>
                    {[
                      ["Product", "Savrdh Instant Loan"],
                      ["Company", "Savrdh Financial Services Private Limited"],
                      ["Contact number", "+91 8109995906"],
                      ["Website", "Public loan assistance website"],
                      ["Technology", "Next.js · TypeScript · Framer Motion"],
                    ].map(([k, v]) => (
                      <div className="settings-row" key={k}>
                        <span className="muted">{k}</span>
                        <strong>{v}</strong>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="panel settings-card">
                  <h3>Workspace connection</h3>
                  <div className={`notice ${connected ? "success" : ""}`}>
                    <strong>
                      {connected
                        ? "Database connected"
                        : "Awaiting Financial Services database"}
                    </strong>
                    <br />
                    {connected
                      ? "Staff access and application records are protected by database policies."
                      : "The website and workspace are ready. Online submission and secure staff login activate after the dedicated Supabase project is connected."}
                  </div>
                  <div className="settings-row">
                    <span>Database isolation</span>
                    <strong>Dedicated project required</strong>
                  </div>
                  <div className="settings-row">
                    <span>Customer records</span>
                    <strong>
                      {connected ? "Live data" : "No records loaded"}
                    </strong>
                  </div>
                  <div className="settings-row">
                    <span>Staff authorization</span>
                    <strong>Role-based access</strong>
                  </div>
                  <div className="settings-row">
                    <span>Finance controls</span>
                    <strong>Verified disbursals only</strong>
                  </div>
                  <p className="micro-note" style={{ marginTop: 22 }}>
                    Production configuration is maintained securely on the
                    hosting platform. No keys are displayed or stored in this
                    interface.
                  </p>
                </section>
              </div>
            ) : null}
            <div className="crm-bottom-note">
              <span>
                <ShieldCheck size={12} />
                SAVRDH FINANCIAL SERVICES PRIVATE LIMITED
              </span>
              <span>
                {apps.length >= 1000
                  ? "Latest 1,000 applications loaded"
                  : "A little clarity. A lot of possibility."}
              </span>
            </div>
          </m.div>
        </main>
      </div>
      {selected ? (
        <ApplicationDrawer
          application={selected}
          staff={staff}
          user={user}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setRefresh((x) => x + 1);
            notify("Application updated.");
            setSelected(null);
          }}
        />
      ) : null}
      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
function Status({ status }: { status: string }) {
  return (
    <span
      className={`status-badge ${status.toLowerCase().replaceAll(" ", "-")}`}
    >
      {status}
    </span>
  );
}
function Empty({
  icon,
  title,
  description,
  action = false,
}: {
  icon: string;
  title: string;
  description: string;
  action?: boolean;
}) {
  const Icon =
    icon === "team" ? Users : icon === "follow-ups" ? CalendarClock : Inbox;
  return (
    <div className="empty-state">
      <span>
        <Icon size={25} strokeWidth={1.2} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action ? (
        <Link href="/apply" className="button button-outline button-small">
          Start an application <ArrowUpRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}
function ApplicationDrawer({
  application: a,
  staff,
  user,
  onClose,
  onSaved,
}: {
  application: Application;
  staff: Staff[];
  user: Staff | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [status, setStatus] = useState<LoanStatus>(a.status);
  const [assignee, setAssignee] = useState(a.assignee || "");
  const [due, setDue] = useState(
    a.follow_up_at
      ? new Date(
          new Date(a.follow_up_at).getTime() -
            new Date(a.follow_up_at).getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 16)
      : "",
  );
  const [reference, setReference] = useState(a.disbursement_reference || "");
  const [paid, setPaid] = useState(
    a.disbursed_amount ? String(a.disbursed_amount) : "",
  );
  const [note, setNote] = useState("");
  const [activity, setActivity] = useState<Activity[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [activityRefresh, setActivityRefresh] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      dialog?.close();
    };
  }, []);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`/api/crm?id=${a.id}`, { signal: ctrl.signal })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        setActivity(d.activity);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError("Unable to load activity. Please reopen this application.");
      });
    return () => ctrl.abort();
  }, [a.id, activityRefresh]);
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/crm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: a.id,
          status,
          assignee: assignee || null,
          follow_up_at: due ? new Date(due).toISOString() : null,
          disbursement_reference: reference || null,
          disbursed_amount: paid ? Number(paid) : null,
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save.");
    } finally {
      setBusy(false);
    }
  }
  async function addNote(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ application_id: a.id, body: note }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setNote("");
      setActivityRefresh((v) => v + 1);
      setNotice("Note saved.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save.");
    } finally {
      setBusy(false);
    }
  }
  const canFinance = user && ["admin", "finance"].includes(user.role);
  const canAssign = user && ["admin", "manager"].includes(user.role);
  const locked = a.status === "Disbursed";
  return (
    <dialog
      ref={dialogRef}
      className="crm-dialog"
      aria-labelledby="drawer-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer">
        <div className="drawer-top">
          <div>
            <small>{a.reference}</small>
            <h2 id="drawer-title">{a.full_name}</h2>
          </div>
          <button
            onClick={onClose}
            className="icon-button"
            aria-label="Close application"
          >
            <X size={18} />
          </button>
        </div>
        <Status status={a.status} />
        <div className="contact-actions">
          <a href={`tel:+91${a.phone}`}>
            <Phone size={13} />
            Call
          </a>
          <a
            href={`https://wa.me/91${a.phone}?text=${encodeURIComponent(`Namaste ${a.full_name}, this is Savrdh Instant Loan, a brand of Savrdh Financial Services Private Limited. We are following up on your ${a.product} application ${a.reference}. Please let us know a convenient time to discuss. Helpline: 8109995906.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>
          <a
            href={`mailto:${a.email}?subject=${encodeURIComponent("Your Savrdh Instant Loan application " + a.reference)}`}
          >
            <Mail size={13} />
            Email
          </a>
        </div>
        <dl className="review-grid">
          {[
            ["Requested amount", money(a.amount)],
            ["Product", a.product],
            ["Phone", a.phone],
            ["Email", a.email],
            ["City", a.city],
            ["Employment", a.employment],
            ["Monthly income", money(a.monthly_income)],
            ["Preferred tenure", a.tenure + " months"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        {a.purpose ? (
          <p
            className="notice"
            style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
          >
            {a.purpose}
          </p>
        ) : null}
        <form onSubmit={save} className="drawer-section">
          <h3>The next step</h3>
          <div className="form-grid">
            <label className="field">
              Application stage
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as LoanStatus)}
                disabled={locked}
              >
                {statuses
                  .filter((s) => s !== "Disbursed" || canFinance || locked)
                  .map((s) => (
                    <option key={s}>{s}</option>
                  ))}
              </select>
            </label>
            <label className="field">
              Assigned to
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                disabled={!canAssign}
              >
                <option value="">Unassigned</option>
                {staff.map((s) => (
                  <option value={s.id} key={s.id}>
                    {s.full_name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field full">
              Next follow-up (your local time)
              <input
                type="datetime-local"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </label>
            {status === "Disbursed" ? (
              <>
                <label className="field">
                  Verified transaction reference
                  <input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    required
                    disabled={locked || !canFinance}
                  />
                </label>
                <label className="field">
                  Actual disbursed amount (₹)
                  <input
                    type="number"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    min={1}
                    required
                    disabled={locked || !canFinance}
                  />
                </label>
              </>
            ) : null}
          </div>
          {locked ? (
            <p className="micro-note" style={{ marginTop: 12 }}>
              Verified disbursement details are locked.
            </p>
          ) : null}
          <button className="button button-dark" disabled={busy}>
            {busy ? "Saving…" : "Save changes"}
            <CheckCircle2 size={16} />
          </button>
        </form>
        <form onSubmit={addNote} className="drawer-section">
          <h3>Add a conversation note</h3>
          <label className="field">
            <span className="micro-note">
              Record the outcome and agreed next step.
            </span>
            <textarea
              required
              minLength={1}
              maxLength={2000}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What did you discuss?"
            />
          </label>
          <button
            className="button button-outline"
            disabled={busy || !note.trim()}
          >
            Save note <Plus size={16} />
          </button>
        </form>
        {error ? (
          <div role="alert" className="notice error" style={{ marginTop: 18 }}>
            {error}
          </div>
        ) : null}
        {notice ? (
          <div
            role="status"
            className="notice success"
            style={{ marginTop: 18 }}
          >
            {notice}
          </div>
        ) : null}
        <section className="drawer-section">
          <h3>Application timeline</h3>
          {activity.length ? (
            activity.map((x) => (
              <div key={x.id} className="activity-item">
                <p>{x.body}</p>
                <small>
                  {new Date(x.created_at).toLocaleString("en-IN")} ·{" "}
                  {staff.find((s) => s.id === x.actor_id)?.full_name ||
                    (x.actor_id ? "Staff member" : "System")}
                </small>
              </div>
            ))
          ) : (
            <p className="micro-note">Activity will appear here.</p>
          )}
        </section>
      </div>
    </dialog>
  );
}
