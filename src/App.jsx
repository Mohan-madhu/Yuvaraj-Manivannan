import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { FaLinkedinIn } from 'react-icons/fa6'
import { ArrowDownToLine, ArrowUpRight, BarChart3, Check, ChevronRight, ClipboardCheck, Code2, Database, FileText, Mail, MapPin, Menu, Phone, Send, X } from 'lucide-react'
import headshot from './assets/headshot.jpg'
import healthcareDashboard from './assets/healthcare-dashboard.png'
import powerBiOne from './assets/powerbi-marketing-1.jpeg'
import powerBiTwo from './assets/powerbi-marketing-2.jpeg'
import powerBiThree from './assets/powerbi-marketing-3.jpeg'
import powerBiFour from './assets/powerbi-marketing-4.jpeg'
import iotSepsis from './assets/iot-sepsis.svg'

gsap.registerPlugin(ScrollTrigger)

const email = 'yuvarajmanivannan01@gmail.com'
const navigation = ['Home', 'About', 'Services', 'Skills', 'Experience', 'Projects', 'Contact']

function SplitText({ children, className = '' }) {
  return <span className={`split-text ${className}`} aria-label={children}>{[...children].map((letter, index) => <span aria-hidden="true" className="split-letter" key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>)}</span>
}

function RoleTyper() {
  const roles = ['Data Analyst', 'Business Analyst', 'Digital Marketing Analyst', 'Digital Marketing Performance Analyst']
  const [roleIndex, setRoleIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const finishedTyping = visibleText === currentRole
    const clearedText = visibleText === ''
    const delay = !isDeleting && finishedTyping ? 1550 : isDeleting ? 48 : 90
    const timer = window.setTimeout(() => {
      if (isDeleting && clearedText) {
        setIsDeleting(false)
        setRoleIndex((roleIndex + 1) % roles.length)
      } else if (isDeleting) setVisibleText(currentRole.slice(0, visibleText.length - 1))
      else if (finishedTyping) setIsDeleting(true)
      else setVisibleText(currentRole.slice(0, visibleText.length + 1))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [visibleText, isDeleting, roleIndex])

  return <span className="typing-role" aria-label={roles[roleIndex]}>{visibleText}<span className="typing-caret" aria-hidden="true">|</span></span>
}

function Button({ children, href = `mailto:${email}`, outline = false, className = '' }) {
  return <a href={href} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${outline ? 'border border-slate-200 bg-white text-ink hover:border-orange' : 'bg-orange text-white shadow-[0_6px_15px_rgba(255,116,67,.25)]'} ${className}`}>{children}</a>
}

function SectionTitle({ eyebrow, title, text, staticReveal = false }) {
  return <div className={`reveal-block ${staticReveal ? 'static-block' : ''} mb-10 max-w-3xl`}><p className="eyebrow mb-3">{eyebrow}</p><h2 className="display text-3xl leading-[.95] text-ink md:text-5xl">{title}</h2>{text && <p className="mt-5 text-sm leading-6 text-slate-600 md:text-base">{text}</p>}</div>
}

export default function App() {
  const app = useRef(null)
  const [menu, setMenu] = useState(false)
  const [projectCategory, setProjectCategory] = useState('All Projects')
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', { y: 28, opacity: 0, duration: .65, stagger: .1, ease: 'power3.out', delay: .12 })
      gsap.from('.hero-photo', { scale: .88, opacity: 0, duration: .85, ease: 'back.out(1.3)', delay: .24 })
      document.querySelectorAll('.split-text').forEach((element) => {
        gsap.from(element.querySelectorAll('.split-letter'), { yPercent: 115, duration: .5, stagger: .026, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%' } })
      })
      gsap.utils.toArray('.reveal-block:not(.static-block)').forEach((element) => {
        gsap.from(element, { y: 28, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%' } })
      })
      ScrollTrigger.batch('.soft-card, .stat-card, .future-panel, .future-education-card, .future-cert-card', {
        start: 'top 88%',
        once: true,
        onEnter: (cards) => gsap.from(cards, { y: 24, scale: .98, duration: .55, stagger: .08, ease: 'power3.out', overwrite: 'auto' }),
      })
      ScrollTrigger.batch('.skill-chip', {
        start: 'top 91%',
        once: true,
        onEnter: (chips) => gsap.from(chips, { y: 10, scale: .9, duration: .35, stagger: .03, ease: 'power2.out', overwrite: 'auto' }),
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
    ['Data Analytics', ['SQL', 'Python', 'Pandas', 'NumPy', 'Excel', 'Power BI', 'Tableau', 'Data Cleaning', 'EDA', 'Data Visualization', 'KPI Calculation']],
    ['Business Analysis', ['KPI Tracking', 'Business Reporting', 'Process Analysis', 'Trend Analysis', 'Market Research', 'Competitor Analysis', 'Performance Analysis', 'Stakeholder Communication']],
    ['BI, Reporting & Marketing Analytics', ['Plotly', 'Streamlit', 'Dashboard Reporting', 'Lead Generation', 'Prospect Research', 'Campaign Performance', 'CTR', 'CPC', 'Conversion Rate', 'Trend Analysis']],
    ['Excel & IoT Tools', ['PivotTables', 'VLOOKUP', 'Apollo.io', 'ESP32', 'Arduino IDE', 'IoT Prototyping']],
  ]
  const jobs = [
    ['Marketing Data Analyst Intern (Part-Time)', 'Aug 2025 - May 2026', 'QSynaptiX - Coimbatore', ['Analysed prospect and market data in Apollo.io and Excel for US State, Local Government & Education (SLED) and non-profit segments to support lead generation and outreach strategy.', 'Reviewed lead and outreach data to identify opportunities to improve marketing lead quality.', 'Prepared reports and dashboards tracking outreach performance to inform marketing decisions.', 'Collaborated cross-functionally to streamline communication workflows.']],
    ['Business Development Intern', '4 Months', 'Twintaz - Coimbatore', ['Analysed product performance, customer behaviour, and sales trends in Excel to support merchandising and business decisions.', 'Delivered data-backed recommendations for listings, promotions, and customer engagement strategies.', 'Maintained accurate product and performance records while supporting reporting and website initiatives.']],
    ['Sales & Business Operations Intern', '4 Months', 'Metatroncube - Coimbatore', ['Supported sales operations and customer interaction analysis, coordinating accurate operational reporting between teams.', 'Contributed to workflow documentation and process management in a fast-paced startup environment.']],
  ]
  const projects = [
    { category: 'Python Analysis', role: 'Data Analyst | Live Demo', title: 'Healthcare Analytical Dashboard', image: healthcareDashboard, description: 'Interactive Streamlit dashboard exploring healthcare billing, admission, hospital-stay, and test-result patterns.', tags: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'ReportLab', 'PM2'], liveUrl: 'http://187.127.189.231:37001/', highlights: ['Built four filters driving four KPIs and six interactive Plotly charts.', 'Standardised column names, parsed dates, converted billing values, and derived length-of-stay and age-group fields.', 'Added downloadable PDF summary reports with ReportLab.', 'Deployed the Streamlit app on a VPS managed with PM2.'] },
    { category: 'Power BI Analysis', role: 'Marketing & Business Analytics | Jan - Mar 2025', title: 'Marketing Campaign Performance Dashboard', image: powerBiOne, gallery: [powerBiOne, powerBiTwo, powerBiThree, powerBiFour], description: 'Power BI dashboard measuring Facebook, Google, and LinkedIn advertising performance with platform and date slicers.', tags: ['Power BI', 'CTR', 'CPC', 'Conversion Rate', 'Marketing KPIs'], downloadUrl: '/marketing-campaign-analysis-dashboard.pbix.zip', highlights: ['Tracked $39.0K spend, 289.5K clicks, and 26.7K conversions using custom KPI measures.', 'Compared platform CTR (3.4% - 4.1%), CPC ($0.10 - $0.17), and conversion rate (8.4% - 10.3%).', 'Found Google used about 45% of spend but generated about 33% of conversions.', 'Identified a budget-allocation test opportunity: about $1.99 per Google conversion versus $1.01 on LinkedIn.'] },
    { category: 'IoT & Hardware', role: 'Team Project', title: 'IoT Sepsis Vital-Signs Monitoring Prototype', image: iotSepsis, description: 'Early-sepsis monitoring prototype combining real-time sensor capture, a web dashboard, and machine-learning risk prediction.', tags: ['ESP32', 'MAX30100', 'LM35', 'Arduino IDE', 'IoT'], highlights: ['Built the hardware module with ESP32, MAX30100 heart-rate/SpO2 sensor, LM35 temperature sensor, and OLED display.', 'Captured real-time vital-sign data for monitoring and analysis.', 'Contributed to the team system that pairs sensor monitoring with a web dashboard and machine-learning risk prediction.'] },
  ]
  const visibleProjects = projectCategory === 'All Projects' ? projects : projects.filter(project => project.category === projectCategory)

  return <div ref={app}>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur"><div className="container flex h-16 items-center justify-between px-5"><a className="display text-lg" href="#home">Yuvaraj<span className="text-orange">M.</span></a><nav className="hidden gap-6 text-xs font-bold text-slate-500 lg:flex">{navigation.map(n => <a className="hover:text-orange" href={`#${n.toLowerCase()}`} key={n}>{n}</a>)}</nav><Button className="hidden sm:inline-flex">Hire Me <ArrowUpRight size={15}/></Button><button className="lg:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button></div>{menu && <nav className="border-t border-orange-100 bg-white px-5 py-4 lg:hidden">{navigation.map(n => <a onClick={() => setMenu(false)} className="block py-2 text-sm font-semibold" href={`#${n.toLowerCase()}`} key={n}>{n}</a>)}</nav>}</header>

    <main>
      <section id="home" className="relative overflow-hidden bg-[linear-gradient(135deg,#fff_0%,#fff8f4_62%,#f4f1ff_100%)] pt-28"><div className="container grid min-h-[690px] items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_.95fr]"><div className="hero-content"><p className="eyebrow mb-4">Analytics Professional</p><h1 className="display max-w-2xl text-5xl leading-[.87] text-ink sm:text-7xl"><span className="block">I am a</span><span className="mt-2 block text-orange"><RoleTyper /></span></h1><p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">Data Analyst with hands-on experience in data analysis, reporting, and visualisation through internships and an academic machine-learning project. Skilled in SQL, Python, Power BI, Tableau, and Excel for transforming raw data into actionable business insights.</p><div className="mt-7 flex flex-wrap gap-3"><Button>Hire Me <ArrowUpRight size={15}/></Button><Button outline href="#projects"><ArrowDownToLine size={15}/> View Projects</Button></div><div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-500"><a className="flex gap-1 hover:text-orange" href="tel:+919360324294"><Phone size={13}/> +91 93603 24294</a><a className="flex gap-1 hover:text-orange" href={`mailto:${email}`}><Mail size={13}/> {email}</a><a className="flex gap-1 hover:text-orange" href="https://www.linkedin.com/in/yuvarajmanivannan01/"><FaLinkedinIn size={13}/> linkedin.com/in/yuvarajmanivannan01</a><span className="flex gap-1"><MapPin size={13}/> Coimbatore, Tamil Nadu</span></div></div><div className="hero-photo relative mx-auto w-full max-w-md"><div className="absolute inset-8 rounded-[2.6rem] bg-orange/15 blur-2xl"/><img className="relative mx-auto h-[390px] w-[290px] rounded-[2rem] object-cover object-top shadow-2xl" src={headshot} alt="Yuvaraj Manivannan"/><div className="soft-card absolute left-0 top-16 flex items-center gap-2 px-3 py-2 text-xs font-bold"><span className="rounded-full bg-orange/15 p-2 text-orange"><BarChart3 size={14}/></span><span>Power BI<br/><em className="not-italic text-slate-400">Dashboards & KPIs</em></span></div><div className="soft-card absolute bottom-12 right-0 flex items-center gap-2 px-3 py-2 text-xs font-bold"><span className="rounded-full bg-purple/15 p-2 text-purple"><Code2 size={14}/></span><span>SQL + Python<br/><em className="not-italic text-slate-400">Clean, structured data</em></span></div></div></div><div className="container grid gap-2 px-5 pb-10 sm:grid-cols-2 lg:grid-cols-4">{[['1.5+','Years hands-on experience'],['8.1','CGPA - M.Sc. Data Science'],['4','Target analytics roles'],['3','Portfolio projects']].map(([n,l])=><div className="stat-card rounded-xl bg-orange-50 px-5 py-4 text-center" key={n}><b className="display text-2xl text-orange">{n}</b><p className="mt-1 text-[11px] text-slate-500">{l}</p></div>)}</div></section>

      <section id="about" className="section"><div className="container"><SectionTitle eyebrow="Profile" title={<>Turning <span className="text-orange"><SplitText>Data Into Decisions</SplitText></span></>} text="Analytics professional and MSc Data Science candidate with experience in SQL, Python, Excel, Power BI, Tableau, market research, KPI reporting, lead generation, and business analysis. I focus on accurate data, practical reporting, and recommendations teams can act on."/><div className="grid gap-4 md:grid-cols-3">{[['Data Analyst','Clean, explore, validate, and visualise data to produce reliable reporting and useful insights.'],['Business Analyst','Analyse business performance, processes, KPIs, and trends to support better operational decisions.'],['Digital Marketing Analyst','Evaluate campaign performance, lead quality, customer segments, conversion activity, and marketing ROI.']].map(([t,d],i)=><div className="soft-card p-5" key={t}><span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange/15 text-xs font-bold text-orange">0{i+1}</span><h3 className="mt-3 font-bold">{t}</h3><p className="mt-2 text-sm leading-5 text-slate-500">{d}</p></div>)}</div></div></section>

      <section id="services" className="section bg-paper"><div className="container"><SectionTitle eyebrow="Capabilities" title={<>What I Do <span className="text-orange">For Teams</span></>} text="From raw exports to a dashboard leadership trusts - I work across data preparation, business analysis, performance reporting, and actionable recommendations."/><div className="grid gap-4 md:grid-cols-2">{services.map(([t,d,Icon],i)=><div className="soft-card flex gap-4 p-5" key={t}><div className="h-10 shrink-0 rounded-full bg-orange/15 p-3 text-orange"><Icon size={16}/></div><div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm leading-5 text-slate-500">{d}</p></div></div>)}</div></div></section>

      <section id="skills" className="section"><div className="container"><SectionTitle eyebrow="Skills" title={<>The <span className="text-orange"><SplitText>Analytics Toolkit</SplitText></span></>}/><div className="grid gap-4 sm:grid-cols-2">{skills.map(([t,items],i)=><div className="soft-card p-5" key={t}><h3 className="text-sm font-bold">{t}</h3><div className="mt-4 flex flex-wrap gap-2">{items.map(x=><span className="skill-chip rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600" key={x}>{x}</span>)}</div></div>)}</div><p className="mt-6 text-xs text-slate-400">Currently strengthening: advanced SQL, GA4, Looker Studio, Jira/Confluence, business process mapping, and Git/GitHub.</p></div></section>

      <section id="experience" className="section bg-peach"><div className="container"><SectionTitle eyebrow="Experience" title={<>Where I've <span className="text-orange">Created Impact</span></>}/><div className="relative max-w-4xl border-l-2 border-dotted border-orange-300 pl-7">{jobs.map(([role,time,company,points],i)=><article className="soft-card relative mb-5 p-5" key={role}><span className="absolute -left-[2.25rem] top-7 h-3 w-3 rounded-full border-2 border-white bg-orange shadow"/><div className="mb-3 flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-bold">{role}</h3><p className="mt-1 text-xs text-slate-500">{company}</p></div><span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange">{time}</span></div><ul className="space-y-2">{points.map(p=><li className="flex gap-2 text-sm leading-5 text-slate-500" key={p}><Check className="mt-0.5 shrink-0 text-emerald-500" size={14}/>{p}</li>)}</ul></article>)}</div></div></section>

      <section id="projects" className="section bg-[linear-gradient(180deg,#fff_0%,#fff8f3_100%)]"><div className="container"><SectionTitle staticReveal eyebrow="Selected work" title={<>Explore My <span className="text-orange"><SplitText>Projects</SplitText></span></>} text="Projects are organised by analysis type. Select a category to explore the dashboards, methodology, tools, and available project files."/><div className="mb-8 flex flex-wrap gap-2">{['All Projects', 'Python Analysis', 'Power BI Analysis', 'IoT & Hardware'].map(category => <button onClick={() => setProjectCategory(category)} key={category} className={`project-filter rounded-full px-4 py-2 text-xs font-bold transition ${projectCategory === category ? 'bg-ink text-white shadow-lg' : 'border border-orange-100 bg-white text-slate-500 hover:border-orange hover:text-orange'}`}>{category}</button>)}</div><div className="grid gap-7 lg:grid-cols-2">{visibleProjects.map((project, index) => <article className="project-card group overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-[0_15px_35px_rgba(33,29,77,.1)]" key={project.title}><div className="relative aspect-[16/9] overflow-hidden bg-slate-900"><img className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={project.image} alt={`${project.title} dashboard`} /><div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"/><span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-ink">{project.category}</span><button onClick={() => setSelectedImage(project.image)} className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-2 text-xs font-bold text-ink opacity-100 shadow transition hover:bg-orange hover:text-white sm:opacity-0 sm:group-hover:opacity-100">View preview</button></div><div className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-orange">{project.role}</p><h3 className="display mt-2 text-2xl leading-6 text-ink">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{project.description}</p><ul className="mt-5 grid gap-2">{project.highlights.map(highlight => <li className="flex gap-2 text-xs leading-5 text-slate-600" key={highlight}><Check className="mt-0.5 shrink-0 text-orange" size={14}/>{highlight}</li>)}</ul><div className="mt-5 flex flex-wrap gap-1.5">{project.tags.map(tag => <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600" key={tag}>{tag}</span>)}</div>{project.gallery && <div className="mt-5 grid grid-cols-4 gap-2">{project.gallery.map((image, imageIndex) => <button className="aspect-[16/10] overflow-hidden rounded-lg border border-orange-100" onClick={() => setSelectedImage(image)} key={image}><img className="h-full w-full object-cover transition hover:scale-110" src={image} alt={`Marketing dashboard view ${imageIndex + 1}`} /></button>)}</div>}<div className="mt-6 flex flex-wrap gap-3">{project.liveUrl && <Button href={project.liveUrl}>Open live dashboard <ArrowUpRight size={14}/></Button>}{project.downloadUrl && <Button outline href={project.downloadUrl}><ArrowDownToLine size={14}/> Download Power BI file</Button>}</div></div></article>)}</div></div></section>

      <section className="future-academics section"><div className="container"><div className="future-header reveal-block"><p className="eyebrow">Academic journey</p><h2 className="display text-3xl leading-[.95] text-white md:text-5xl">Credentials that <span className="text-orange"><SplitText>power my analysis.</SplitText></span></h2><p>Education and certifications that support my work across data, business, and digital marketing analytics.</p></div><div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><div className="future-panel"><div className="future-panel-label"><span className="future-orb"/><span>Education timeline</span></div><div className="future-timeline">{[['01','M.Sc. Data Science','Bharathiar University - Nehru Arts and Science College','2024 - 2026','CGPA 8.1'],['02','BCA','Bharathiar University - Sri Ramakrishna College of Arts and Science','2021 - 2024','CGPA 7.3'],['03','Higher Secondary (12th)','Nirmala Matha Convent Matriculation Higher Secondary School - State Board of Tamil Nadu','2019 - 2021','CGPA 8.4'],['04','SSLC (10th)','Nirmala Matha Convent Matriculation Higher Secondary School - State Board of Tamil Nadu','2018 - 2019','CGPA 7.4']].map(([number,title,institute,period,score])=><article className="future-education-card" key={title}><div className="future-node"><span>{number}</span></div><div className="future-card-content"><div className="future-card-top"><span className="future-period">{period}</span><span className="future-score">{score}</span></div><h3>{title}</h3><p>{institute}</p><div className="future-scan-line"/></div></article>)}</div></div><div className="future-panel future-cert-panel"><div className="future-panel-label"><span className="future-orb"/><span>Verified credentials</span></div><div className="space-y-4">{[['DA','Data Analytics Professional Certificate','Prajai Technologies','Jul 2025'],['DS','Data Analytics Job Simulation','Deloitte Australia','Jun 2025'],['IoT','Internet of Things','NPTEL, IIT Kharagpur','Jan - Apr 2025']].map(([code,title,issuer,year])=><article className="future-cert-card" key={title}><div className="future-cert-icon">{code}</div><div><p className="future-cert-year">{year}</p><h3>{title}</h3><p>{issuer}</p></div><Check className="ml-auto text-orange" size={18}/></article>)}</div><div className="future-status"><span className="future-status-dot"/>Continuously learning and applying analytics tools</div><div className="future-achievements"><p className="future-panel-label">Achievements</p><p>Winner, South Zone Badminton Tournament - Tamil Nadu (2016)</p><p>Participant, National-Level Badminton Tournament (2016)</p></div></div></div></div></section>      <section id="contact" className="section"><div className="container text-center"><p className="eyebrow">Contact</p><h2 className="display mx-auto mt-3 max-w-xl text-4xl leading-[.95] md:text-6xl">Let's Talk About<br/><span className="text-orange"><SplitText>Data That Delivers.</SplitText></span></h2><p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-slate-500">Open to Data Analyst, Business Analyst, Digital Marketing Analyst, and Digital Marketing Performance Analyst opportunities. Send a message and I'll get back to you.</p><Button className="mt-7">Shoot Message <Send size={15}/></Button><div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500"><a className="flex items-center gap-1 hover:text-orange" href="tel:+919360324294"><Phone size={13}/> +91 93603 24294</a><a className="flex items-center gap-1 hover:text-orange" href={`mailto:${email}`}><Mail size={13}/> {email}</a><a className="flex items-center gap-1 hover:text-orange" href="https://www.linkedin.com/in/yuvarajmanivannan01/"><FaLinkedinIn size={13}/> linkedin.com/in/yuvarajmanivannan01</a><span className="flex items-center gap-1"><MapPin size={13}/> Coimbatore, Tamil Nadu</span></div></div></section>
    </main><footer className="border-t border-slate-100 px-5 py-7 text-center text-[10px] text-slate-400"><div className="container flex flex-col justify-between gap-2 sm:flex-row"><span>(c) 2026 Yuvaraj Manivannan</span><span>Analytics Professional | Coimbatore, Tamil Nadu</span></div></footer>
    {selectedImage && <div onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-5"><button className="absolute right-6 top-6 rounded-full bg-white p-2 text-ink" aria-label="Close preview"><X size={20}/></button><img onClick={event => event.stopPropagation()} className="max-h-[88vh] max-w-[94vw] rounded-xl object-contain shadow-2xl" src={selectedImage} alt="Expanded project dashboard preview" /></div>}
  </div>
}
