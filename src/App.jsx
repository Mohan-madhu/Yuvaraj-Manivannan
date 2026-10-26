import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { ArrowDownToLine, ArrowUpRight, BarChart3, Check, ChevronRight, ClipboardCheck, Code2, Database, FileText, Globe2, Mail, MapPin, Menu, Phone, Send, X } from 'lucide-react'
import headshot from './assets/headshot.jpg'

gsap.registerPlugin(ScrollTrigger)

const email = 'yuvarajmanivannan01@gmail.com'
const navigation = ['Home', 'About', 'Services', 'Skills', 'Experience', 'Projects', 'Contact']
const reveal = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .18 }, transition: { duration: .55 } }

function SplitText({ children, className = '' }) {
  return <span className={`split-text ${className}`} aria-label={children}>{[...children].map((letter, index) => <span aria-hidden="true" className="split-letter" key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>)}</span>
}

function Button({ children, href = `mailto:${email}`, outline = false, className = '' }) {
  return <a href={href} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${outline ? 'border border-slate-200 bg-white text-ink hover:border-orange' : 'bg-orange text-white shadow-[0_6px_15px_rgba(255,116,67,.25)]'} ${className}`}>{children}</a>
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="reveal-block mb-10 max-w-3xl"><p className="eyebrow mb-3">{eyebrow}</p><h2 className="display text-3xl leading-[.95] text-ink md:text-5xl">{title}</h2>{text && <p className="mt-5 text-sm leading-6 text-slate-600 md:text-base">{text}</p>}</div>
}

export default function App() {
  const app = useRef(null)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', { y: 28, opacity: 0, duration: .65, stagger: .1, ease: 'power3.out', delay: .12 })
      gsap.from('.hero-photo', { scale: .88, opacity: 0, duration: .85, ease: 'back.out(1.3)', delay: .24 })
      document.querySelectorAll('.split-text').forEach((element) => {
        gsap.from(element.querySelectorAll('.split-letter'), { yPercent: 115, opacity: 0, duration: .5, stagger: .026, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%' } })
      })
      gsap.utils.toArray('.reveal-block').forEach((element) => {
        gsap.from(element, { y: 28, opacity: 0, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%' } })
      })
    }, app)
    return () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy() }
  }, [])

  const services = [
    ['Data Cleaning & Validation', 'Ensure data accuracy, consistency, and decision-ready datasets before analysis begins.', Database],
    ['Dashboards & Reporting', 'Build business, marketing, and operational dashboards that focus on useful KPIs.', BarChart3],
    ['SQL & Python Analysis', 'Query, structure, explore, and analyse data using SQL, Pandas, and NumPy.', Code2],
    ['Business Process Analysis', 'Document workflows, identify gaps, and turn reporting findings into recommendations.', FileText],
  ]
  const skills = [
    ['Data Analytics', ['SQL', 'Python', 'Pandas', 'NumPy', 'Excel', 'Power BI', 'Tableau', 'Qlik Sense', 'Data Cleaning', 'EDA', 'Data Visualization', 'Statistical Analysis']],
    ['Business Analysis', ['KPI Tracking', 'Business Reporting', 'Process Analysis', 'Trend Analysis', 'Market Research', 'Competitor Analysis', 'Performance Analysis', 'Stakeholder Communication']],
    ['Digital Marketing Analytics', ['Lead Generation Analytics', 'Campaign Performance', 'Conversion Analysis', 'Customer Segmentation', 'Marketing Funnel', 'Marketing KPIs', 'ROI Analysis', 'A/B Testing Basics']],
    ['Excel & Reporting', ['PivotTables', 'XLOOKUP', 'VLOOKUP', 'Power Query', 'Conditional Formatting', 'Charts', 'Dashboard Creation']],
  ]
  const jobs = [
    ['Demand Generation Executive', '10 Months', 'QSynaptiX · Coimbatore', ['Analysed prospect and market data in Apollo.io and Excel to segment leads by industry, location, and engagement level for targeted outreach.', 'Prepared outreach KPI reports and dashboards for sales and leadership, helping teams monitor campaign performance and prioritise follow-up.', 'Validated client outreach data, resolved reporting discrepancies, and clarified metric definitions for consistent decision-making.', 'Worked with cross-functional teams to improve reporting and communication workflows.']],
    ['Business Development Intern', '4 Months', 'Twintaz · Coimbatore', ['Analysed product performance, customer behaviour, and sales trends in Excel to support merchandising and business decisions.', 'Delivered data-backed recommendations for listings, promotions, and customer engagement strategies.', 'Maintained accurate product and performance records while supporting reporting and website initiatives.']],
    ['Sales & Business Operations Intern', '4 Months', 'Metatroncube · Coimbatore', ['Supported sales operations and customer interaction analysis, coordinating accurate operational reporting between teams.', 'Contributed to workflow documentation and process management in a fast-paced startup environment.']],
  ]
  const projects = [
    ['Data Analyst', 'Healthcare Analytical Dashboard', 'Interactive Streamlit dashboard for healthcare records with data cleaning, KPI tracking, Plotly charts, dynamic filters, and PDF report exports.', ['Python', 'Pandas', 'Streamlit', 'Plotly', 'ReportLab', 'PM2'], 'http://187.127.189.231:37001'],
    ['Business Analyst', 'Sales & Business Performance Analysis', 'Business analysis project covering monthly revenue, regional sales, product performance, customer segments, KPIs, and management recommendations.', ['SQL', 'Excel', 'Power BI', 'Business KPIs'], '#contact'],
    ['Digital Marketing Analyst', 'Digital Marketing Campaign Analysis', 'Marketing performance analysis focused on impressions, clicks, CTR, conversion rate, CPA, campaign ROI, and the customer acquisition funnel.', ['Excel', 'SQL', 'Power BI', 'Python'], '#contact'],
  ]

  return <div ref={app}>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur"><div className="container flex h-16 items-center justify-between px-5"><a className="display text-lg" href="#home">Yuvaraj<span className="text-orange">M.</span></a><nav className="hidden gap-6 text-xs font-bold text-slate-500 lg:flex">{navigation.map(n => <a className="hover:text-orange" href={`#${n.toLowerCase()}`} key={n}>{n}</a>)}</nav><Button className="hidden sm:inline-flex">Hire Me <ArrowUpRight size={15}/></Button><button className="lg:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button></div>{menu && <nav className="border-t border-orange-100 bg-white px-5 py-4 lg:hidden">{navigation.map(n => <a onClick={() => setMenu(false)} className="block py-2 text-sm font-semibold" href={`#${n.toLowerCase()}`} key={n}>{n}</a>)}</nav>}</header>

    <main>
      <section id="home" className="relative overflow-hidden bg-[linear-gradient(135deg,#fff_0%,#fff8f4_62%,#f4f1ff_100%)] pt-28"><div className="container grid min-h-[690px] items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_.95fr]"><div className="hero-content"><p className="eyebrow mb-4">Analytics Professional</p><h1 className="display max-w-2xl text-5xl leading-[.87] text-ink sm:text-7xl">Data Analyst<br/><span className="text-orange">Business Analyst</span><br/>Digital Marketing Analyst</h1><p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">MSc Data Science candidate skilled in transforming business and marketing data into actionable insights through dashboards, trend analysis, segmentation, and performance reporting.</p><div className="mt-7 flex flex-wrap gap-3"><Button>Hire Me <ArrowUpRight size={15}/></Button><Button outline href="#projects"><ArrowDownToLine size={15}/> View Projects</Button></div><div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-500"><a className="flex gap-1 hover:text-orange" href="tel:+919360324294"><Phone size={13}/> +91 93603 24294</a><a className="flex gap-1 hover:text-orange" href={`mailto:${email}`}><Mail size={13}/> {email}</a><a className="flex gap-1 hover:text-orange" href="https://linkedin.com/in/myuvaraj"><Globe2 size={13}/> linkedin.com/in/myuvaraj</a><span className="flex gap-1"><MapPin size={13}/> Coimbatore, Tamil Nadu</span></div></div><div className="hero-photo relative mx-auto w-full max-w-md"><div className="absolute inset-8 rounded-[2.6rem] bg-orange/15 blur-2xl"/><img className="relative mx-auto h-[390px] w-[290px] rounded-[2rem] object-cover object-top shadow-2xl" src={headshot} alt="Yuvaraj Manivannan"/><div className="soft-card absolute left-0 top-16 flex items-center gap-2 px-3 py-2 text-xs font-bold"><span className="rounded-full bg-orange/15 p-2 text-orange"><BarChart3 size={14}/></span><span>Power BI<br/><em className="not-italic text-slate-400">Dashboards & KPIs</em></span></div><div className="soft-card absolute bottom-12 right-0 flex items-center gap-2 px-3 py-2 text-xs font-bold"><span className="rounded-full bg-purple/15 p-2 text-purple"><Code2 size={14}/></span><span>SQL + Python<br/><em className="not-italic text-slate-400">Clean, structured data</em></span></div></div></div><div className="container grid gap-2 px-5 pb-10 sm:grid-cols-2 lg:grid-cols-4">{[['1.5+','Years hands-on experience'],['8.1','CGPA — M.Sc. Data Science'],['3','Target analytics roles'],['3','Portfolio projects']].map(([n,l])=><div className="rounded-xl bg-orange-50 px-5 py-4 text-center" key={n}><b className="display text-2xl text-orange">{n}</b><p className="mt-1 text-[11px] text-slate-500">{l}</p></div>)}</div></section>

      <section id="about" className="section"><div className="container"><SectionTitle eyebrow="Profile" title={<>Turning <span className="text-orange"><SplitText>Data Into Decisions</SplitText></span></>} text="Analytics professional and MSc Data Science candidate with experience in SQL, Python, Excel, Power BI, Tableau, market research, KPI reporting, lead generation, and business analysis. I focus on accurate data, practical reporting, and recommendations teams can act on."/><div className="grid gap-4 md:grid-cols-3">{[['Data Analyst','Clean, explore, validate, and visualise data to produce reliable reporting and useful insights.'],['Business Analyst','Analyse business performance, processes, KPIs, and trends to support better operational decisions.'],['Digital Marketing Analyst','Evaluate campaign performance, lead quality, customer segments, conversion activity, and marketing ROI.']].map(([t,d],i)=><motion.div {...reveal} transition={{duration:.45,delay:i*.09}} className="soft-card p-5" key={t}><span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange/15 text-xs font-bold text-orange">0{i+1}</span><h3 className="mt-3 font-bold">{t}</h3><p className="mt-2 text-sm leading-5 text-slate-500">{d}</p></motion.div>)}</div></div></section>

      <section id="services" className="section bg-paper"><div className="container"><SectionTitle eyebrow="Capabilities" title={<>What I Do <span className="text-orange">For Teams</span></>} text="From raw exports to a dashboard leadership trusts — I work across data preparation, business analysis, performance reporting, and actionable recommendations."/><div className="grid gap-4 md:grid-cols-2">{services.map(([t,d,Icon],i)=><motion.div {...reveal} transition={{duration:.45,delay:i*.08}} className="soft-card flex gap-4 p-5" key={t}><div className="h-10 shrink-0 rounded-full bg-orange/15 p-3 text-orange"><Icon size={16}/></div><div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm leading-5 text-slate-500">{d}</p></div></motion.div>)}</div></div></section>

      <section id="skills" className="section"><div className="container"><SectionTitle eyebrow="Skills" title={<>The <span className="text-orange"><SplitText>Analytics Toolkit</SplitText></span></>}/><div className="grid gap-4 sm:grid-cols-2">{skills.map(([t,items],i)=><motion.div {...reveal} transition={{duration:.45,delay:i*.06}} className="soft-card p-5" key={t}><h3 className="text-sm font-bold">{t}</h3><div className="mt-4 flex flex-wrap gap-2">{items.map(x=><span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600" key={x}>{x}</span>)}</div></motion.div>)}</div><p className="mt-6 text-xs text-slate-400">Currently strengthening: advanced SQL, GA4, Looker Studio, Jira/Confluence, business process mapping, and Git/GitHub.</p></div></section>

      <section id="experience" className="section bg-peach"><div className="container"><SectionTitle eyebrow="Experience" title={<>Where I've <span className="text-orange">Created Impact</span></>}/><div className="relative max-w-4xl border-l-2 border-dotted border-orange-300 pl-7">{jobs.map(([role,time,company,points],i)=><motion.article {...reveal} transition={{duration:.45,delay:i*.1}} className="soft-card relative mb-5 p-5" key={role}><span className="absolute -left-[2.25rem] top-7 h-3 w-3 rounded-full border-2 border-white bg-orange shadow"/><div className="mb-3 flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-bold">{role}</h3><p className="mt-1 text-xs text-slate-500">{company}</p></div><span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange">{time}</span></div><ul className="space-y-2">{points.map(p=><li className="flex gap-2 text-sm leading-5 text-slate-500" key={p}><Check className="mt-0.5 shrink-0 text-emerald-500" size={14}/>{p}</li>)}</ul></motion.article>)}</div></div></section>

      <section id="projects" className="section"><div className="container"><SectionTitle eyebrow="Role-specific portfolio" title={<>Recent <span className="text-orange"><SplitText>Projects</SplitText></span></>} text="Projects selected to demonstrate data, business, and digital marketing analytics capabilities."/><div className="grid gap-5 md:grid-cols-3">{projects.map(([label,title,desc,tags,link],i)=><motion.article {...reveal} transition={{duration:.45,delay:i*.1}} className="rounded-2xl bg-[linear-gradient(140deg,#342878,#783ecd)] p-6 text-white shadow-lg" key={title}><p className="text-[10px] font-bold uppercase tracking-wider text-white/70">{label}</p><h3 className="display mt-5 text-xl leading-5">{title}</h3><p className="mt-4 text-sm leading-5 text-white/75">{desc}</p><div className="mt-5 flex flex-wrap gap-1.5">{tags.map(t=><span className="rounded-full border border-white/20 px-2 py-1 text-[9px]" key={t}>{t}</span>)}</div><a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-6 inline-flex items-center gap-1 rounded-full bg-orange px-3 py-2 text-xs font-bold">{label === 'Data Analyst' ? 'Open live dashboard' : 'View project details'} <ChevronRight size={13}/></a></motion.article>)}</div></div></section>

      <section className="section bg-paper"><div className="container grid gap-10 md:grid-cols-2"><div><SectionTitle eyebrow="Education" title="Education"/>{[['M.Sc. Data Science','Bharathiar University — Nehru Arts and Science College','2024 – 2026','CGPA 8.1'],['BCA','Bharathiar University — Sri Ramakrishna College of Arts and Science','2021 – 2024','CGPA 7.3'],['Higher Secondary (12th)','Nirmala Matha Convent Matriculation Higher Secondary School','2019 – 2021','CGPA 8.4']].map(x=><div className="soft-card mb-3 flex gap-3 p-4" key={x[0]}><span className="rounded-full bg-orange-100 p-2 text-orange"><ClipboardCheck size={15}/></span><div><h3 className="text-sm font-bold">{x[0]}</h3><p className="text-xs text-slate-500">{x[1]}</p><p className="mt-1 text-xs font-semibold text-orange">{x[2]} · {x[3]}</p></div></div>)}</div><div><SectionTitle eyebrow="Credentials" title="Certifications"/>{[['Internet of Things','IIT Kharagpur, NPTEL · 2025'],['Data Analytics Job Simulation','Deloitte Australia · 2025']].map(x=><div className="soft-card mb-3 flex gap-3 p-4" key={x[0]}><span className="rounded-full bg-orange-100 p-2 text-orange"><Check size={15}/></span><div><h3 className="text-sm font-bold">{x[0]}</h3><p className="text-xs text-slate-500">{x[1]}</p></div></div>)}</div></div></section>
      <section id="contact" className="section"><div className="container text-center"><p className="eyebrow">Contact</p><h2 className="display mx-auto mt-3 max-w-xl text-4xl leading-[.95] md:text-6xl">Let's Talk About<br/><span className="text-orange"><SplitText>Data That Delivers.</SplitText></span></h2><p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-slate-500">Open to Data Analyst, Business Analyst, and Digital Marketing Analyst opportunities. Send a message and I’ll get back to you.</p><Button className="mt-7">Shoot Message <Send size={15}/></Button><div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500"><a className="flex items-center gap-1 hover:text-orange" href="tel:+919360324294"><Phone size={13}/> +91 93603 24294</a><a className="flex items-center gap-1 hover:text-orange" href={`mailto:${email}`}><Mail size={13}/> {email}</a><a className="flex items-center gap-1 hover:text-orange" href="https://linkedin.com/in/myuvaraj"><Globe2 size={13}/> linkedin.com/in/myuvaraj</a><span className="flex items-center gap-1"><MapPin size={13}/> Coimbatore, Tamil Nadu</span></div></div></section>
    </main><footer className="border-t border-slate-100 px-5 py-7 text-center text-[10px] text-slate-400"><div className="container flex flex-col justify-between gap-2 sm:flex-row"><span>© 2026 Yuvaraj Manivannan</span><span>Analytics Professional · Coimbatore, Tamil Nadu</span></div></footer>
  </div>
}
