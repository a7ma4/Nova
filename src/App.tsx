import { useEffect, useRef, useState } from "react";
import novaLogo from "/novaLogo.webp";
import creativityIcon from "./assets/05_creativity_icon.webp";
import designIcon from "./assets/06_design_icon.webp";
import resultsIcon from "./assets/05_paid_advertising.webp";
import speedIcon from "./assets/08_speed_icon.png";
import growthIcon from "./assets/06_growth_chart.webp";
import partnershipIcon from "./assets/10_partnership_icon.png";
import bottomGraphic from "./assets/12_quote_banner.webp";

// ─── Fade-up hook ────────────────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}

// ─── NM Logo Mark ────────────────────────────────────────────────────────────
function NMLogo({ size = 70 }: { size?: number }) {
  return (
    // <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    //   <rect width="40" height="40" rx="6" fill="#1A6CFF" fillOpacity="0.15" />
    //   <path d="M6 32V8l12 16V8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    //   <path d="M21 8v24l8-12 5 12" stroke="#1A6CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    // </svg>
    <img src={ novaLogo} width={size} height={size} style={{borderRadius:"50%"}}  />
  );
}

function IntroPage() {
  return (
    <main className="intro-page" dir="ltr">
      <div className="intro-glow intro-glow-top" />
      <div className="intro-glow intro-glow-bottom" />
      <div className="intro-dots intro-dots-top" />
      <div className="intro-dots intro-dots-bottom" />
      <div className="intro-line intro-line-left" />
      <div className="intro-line intro-line-right" />

      <div className="intro-content w-full">
        <div className="intro-logo-lockup">
          {/* <img src={novaLogo} alt="Nova Media" className="intro-logo-mark" />
          <div className="intro-wordmark">NOVA <span>MEDIA</span></div>
          <div className="intro-tagline">CREATIVE MARKETING AGENCY</div> */}


<img src="/first.webp" />



        </div>

        <div className="intro-message">
          <h1>WE BUILD BRANDS<br /><span>THAT GROW</span></h1>
          <div className="intro-rule" />
          <p>Creative Solutions. Strategic Marketing. <span>Real Results.</span></p>
        </div>

      
      </div>

      <div className="intro-contact-bar w-[70%]">
        <a href="tel:01069214165" className="intro-contact-item">
          <img src="/14_phone_icon.webp" alt="" />
          <span><b>PHONE</b><strong>010 6921 4165</strong></span>
        </a>
        <div className="intro-contact-divider" />
        <a href="mailto:team.1novamedia@gmail.com" className="intro-contact-item">
          <img src="/15_email_icon.webp" alt="" />
          <span><b>EMAIL</b><strong>team.1novamedia@gmail.com</strong></span>
        </a>
      </div>
    </main>
  );
}




function CountUp({ target, suffix = "", prefix = "", duration = 2000 }: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}


// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "الخدمات" },
    { href: "#work", label: "أعمالنا" },
    { href: "#packages", label: "الباقات" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 navbar-blur transition-all duration-300 ${
        scrolled ? "bg-[#050D1A]/90 border-b border-white/5" : "bg-transparent"
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <NMLogo size={56} />
          <div className="leading-tight">
            <div className="font-inter font-black text-white text-sm tracking-widest">NOVA MEDIA</div>
            <div className="text-[9px] text-white/40 tracking-[0.2em] font-inter">CREATIVE MARKETING AGENCY</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/65 hover:text-white text-sm font-cairo font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 bg-[#1A6CFF] hover:bg-[#1255CC] text-white text-sm font-cairo font-bold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(26,108,255,0.4)]"
          >
            ابدأ معنا
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A1628]/95 border-t border-white/5 px-6 py-4 flex flex-col gap-4" dir="rtl">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white font-cairo text-base"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 bg-[#1A6CFF] text-white font-cairo font-bold rounded-lg text-center"
            onClick={() => setMenuOpen(false)}
          >
            ابدأ معنا
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden dot-grid diagonal-streak px-5"
      style={{ background: "linear-gradient(135deg, #050D1A 0%, #071022 60%, #0A1628 100%)" }}
    >
      {/* Right glow */}
      <div className="absolute inset-0 blue-glow pointer-events-none" />
      {/* Corner accent */}
      <div className="geo-corner" />

      {/* Bottom-right dot cluster */}
      <div
        className="absolute bottom-16 right-8 w-32 h-32 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,108,255,0.6) 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full" dir="rtl">
        <div className="max-w-3xl">
          <FadeUp delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#1A6CFF]" />
              <span className="text-[#1A6CFF] font-inter text-xs tracking-[0.3em] font-semibold uppercase">
                Creative Marketing Agency
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <h1 className="font-cairo font-black text-4xl md:text-6xl xl:text-7xl text-white leading-tight mb-6">
              نبني علامات تجارية
              <br />
              <span className="text-[#1A6CFF]">تنمو وتستمر</span>
            </h1>
          </FadeUp>

          <FadeUp delay={300}>
            <p className="text-white/60 text-lg md:text-xl font-inter mb-10 leading-relaxed">
              Creative Solutions.{" "}
              <span className="text-white/80">Strategic Marketing.</span>{" "}
              <span className="text-[#1A6CFF]">Real Results.</span>
            </p>
          </FadeUp>

          <FadeUp delay={450}>
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-[#1A6CFF] hover:bg-[#1255CC] text-white font-cairo font-bold text-lg rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.5)]"
              >
                استشارة مجانية
              </a>
              <a
                href="#work"
                className="px-8 py-3.5 border border-white/20 hover:border-[#1A6CFF] text-white font-cairo font-bold text-lg rounded-xl transition-all duration-200 hover:bg-[#1A6CFF]/10"
              >
                شاهد أعمالنا
              </a>
            </div>
          </FadeUp>

          {/* Stats */}
          <FadeUp delay={600}>
            <div className="w-full grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
         {[
  { target: 50,  prefix: "+", suffix: "",  label: "عميل سعيد",         delay: 0   },
  { target: 200, prefix: "+", suffix: "",  label: "مشروع مكتمل",       delay: 200 },
  { target: 300, prefix: "+", suffix: "%", label: "نمو وتحقيق نتائج",  delay: 400 },
].map((s) => (
  <div key={s.label} className="text-center md:text-right">
    <div className="font-inter font-black text-xl md:text-4xl text-[#1A6CFF] mb-1">
      <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} duration={2000} />
    </div>
    <div className="text-white/50 font-cairo text-sm md:text-base">{s.label}</div>
  </div>
))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const items = [
    { icon: "eye", title: "رؤيتنا", body: "أن نكون الشريك التسويقي الأول للشركات في العالم العربي، ومصدراً للإبداع والنتائج." },
    { icon: "target", title: "رسالتنا", body: "تقديم حلول تسويقية متكاملة تجمع بين الإبداع والتحليل لتحقيق نمو مستدام ونجاح لعملائنا." },
    { icon: "diamond", title: "قيمنا", body: "إبداع  |  احترافية  |  نتائج  |  شراكة  |     تطوير مستمر" },
  ];

  const Icon = ({ name }: { name: "eye" | "target" | "diamond" | "users" | "nodes" | "growth" }) => {
    const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    if (name === "eye") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="M3 16s4.8-7 13-7 13 7 13 7-4.8 7-13 7S3 16 3 16Z" /><circle {...common} cx="16" cy="16" r="3.5" /></svg>;
    if (name === "target") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...common} cx="16" cy="16" r="10" /><circle {...common} cx="16" cy="16" r="5" /><path {...common} d="m16 16 10-10M22 6h4v4" /></svg>;
    if (name === "diamond") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="m4 11 5-6h14l5 6-12 16L4 11Z" /><path {...common} d="M4 11h24M9 5l7 22 7-22M4 11l12 16 12-16" /></svg>;
    if (name === "users") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...common} cx="12" cy="11" r="4" /><circle {...common} cx="22" cy="13" r="3" /><path {...common} d="M4 26c.8-5 3.5-7 8-7s7.2 2 8 7M20 20c4-.3 6.5 1.5 7 5" /></svg>;
    if (name === "nodes") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...common} cx="7" cy="23" r="3" /><circle {...common} cx="25" cy="23" r="3" /><circle {...common} cx="16" cy="7" r="3" /><path {...common} d="m9 21 5-11M23 21 18 10M10 23h12" /></svg>;
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="M5 25V18M13 25V13M21 25V8M29 25V5M3 25h27M19 12l5-5 4 2" /></svg>;
  };

  return (
    <section id="about" className="about-section relative overflow-hidden" style={{ background: "#030B1B" }} dir="rtl">
      <div className="about-frame max-w-7xl mx-auto relative">
        <div className="about-copy text-end">
            <FadeUp className="">
              <div className="about-kicker">ABOUT</div>
              <h2 className="font-inter font-black text-3xl md:text-5xl text-white mb-2">
                <span className="text-[#1A6CFF]">NOVA</span> MEDIA
              </h2>
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px w-10 bg-[#1A6CFF]" />
                <span className="text-white/50 font-cairo text-base">من نحن</span>
              </div>
            </FadeUp>

            <FadeUp delay={150}>
              <p className="text-white/65 font-cairo text-lg leading-loose mb-8">
                نحن في{" "}
                <span className="text-[#1A6CFF] font-bold">Nova Media</span>{" "}
                وكالة تسويق إبداعية نساعد الشركات والعلامات التجارية على النمو والانتشار من خلال استراتيجيات تسويقية مبتكرة وحلول إبداعية تترك أثراً وتحقق نتائج حقيقية.
              </p>
            </FadeUp>

            <div className="about-values space-y-4 max-w-xl  ">
              {items.map((item, i) => (
                <FadeUp key={item.title} delay={200 + i * 120}>
                  <div className="about-value flex gap-4 items-center p-3 border-b border-white/[0.08] card-hover justify-end ">
                    
                    <div>
                      <h3 className="font-cairo font-bold text-[#1A6CFF] text-lg mb-1">{item.title}</h3>
                      <p className="text-white/60 font-cairo text-sm leading-relaxed">{item.body}</p>
                    </div>
                    <div className="about-value-icon w-14 h-14 rounded-full border border-[#1A6CFF]/70 bg-[#040d1f] flex items-center justify-center text-white shrink-0">
                      <Icon name={item.icon as "eye" | "target" | "diamond"} />
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
        </div>

        <div className="about-visual" dir="rtl">
          <FadeUp delay={100} className="w-full h-full">
              <div className="about-panel relative overflow-hidden border border-[#1A6CFF]/60 bg-[#03102A]">
                <div className="about-city absolute inset-x-0 top-0 overflow-hidden">
                  <img
                    src="/city-skyline.webp"
                    alt="City skyline representing Nova Media's market reach"
                    className="w-full h-full object-cover opacity-90 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#07152D]/10 via-[#07152D]/10 to-[#03102A]/80" />
                </div>
                <div className="about-panel-line absolute inset-x-0 top-[41%] md:top-[55%] h-px bg-[#1A6CFF]/70 -rotate-[8deg] origin-right" />
                <div className="absolute top-8 right-10 font-inter text-xs tracking-[0.4em] text-white/60">02 <span className="text-[#1A6CFF]">━━━━</span></div>
                <div className="about-quote absolute top-[54%] right-10 left-8 flex flex-col gap-3">
                  <div className="text-[#1A6CFF] font-inter font-black text-4xl md:text-7xl leading-none opacity-80">“</div>
                  <p className="font-cairo font-bold text-xl  text-white leading-relaxed">
                    نحول أفكارك إلى<br /><span className="text-[#1A6CFF]">نتائج حقيقية.</span>
                  </p>
                  <div className="h-px w-12 bg-[#1A6CFF] md:mt-5" />
                </div>
                <div className="about-stats absolute bottom-8 right-8 left-8">
                  <div className="space-y-4 border-r border-[#1A6CFF]/30 pr-5">
               {[
  { target: 50,  prefix: "+", suffix: "",  label: "عميل سعيد",        icon: "users"  as const },
  { target: 200, prefix: "+", suffix: "",  label: "مشروع مكتمل",      icon: "nodes"  as const },
  { target: 300, prefix: "+", suffix: "%", label: "نمو وتحقيق نتائج", icon: "growth" as const },
].map((s) => (
  <div key={s.label} className="flex items-center gap-3">
    <div className="about-stat-icon w-8 h-8 rounded-full border border-[#1A6CFF]/60 flex items-center justify-center text-[#DCE8FF] shrink-0">
      <Icon name={s.icon} />
    </div>
    <div>
      <div className="font-inter font-black text-xl text-[#1A6CFF]">
        <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
      </div>
      <div className="text-white/50 font-cairo text-xs">{s.label}</div>
    </div>
  </div>
))}
                  </div>
                </div>
              </div>
            </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
const services = [
  {
    num: "01",
    en: ["SOCIAL MEDIA", "MANAGEMENT"],
    icon: "/01_social_media.webp", // ← مسار الصورة هنا
    items: ["إدارة صفحات التواصل الاجتماعي", "إنشاء جداول محتوى احترافية", "التفاعل مع الجمهور وبناء مجتمع", "تحليل الأداء وتقديم تقارير دورية"],
  },
  {
    num: "02",
    en: ["GRAPHIC", "DESIGN"],
    icon: "/02_graphic_design.webp",
    items: ["تصميم منشورات ومواد دعائية", "تصميم هويات بصرية (شعارات)", "تصميم كتيبات، بروشورات، وفلايرز", "تصميمات إبداعية تعكس هوية علامتك"],
  },
  {
    num: "03",
    en: ["VIDEO", "EDITING"],
    icon: "/03_video_editing.webp",
    items: ["مونتاج احترافي للفيديوهات", "إضافة مؤثرات وحركة نصوص", "تصميم فيديوهات دعائية وإعلانية", "تعديل الألوان ورفع جودة الفيديو"],
  },
  {
    num: "04",
    en: ["CONTENT", "CREATION"],
    icon: "/04_content_creation.webp",
    items: ["كتابة محتوى إبداعي وجذاب", "تصوير منتجات وخدمات احترافية", "إنتاج ريلز وفيديوهات قصيرة", "فهم الجمهور وصناعة رسائل مؤثرة"],
  },
  {
    num: "05",
    en: ["PAID", "ADVERTISING"],
    icon: "/05_paid_advertising.webp",
    items: ["إدارة حملات إعلانية على منصات متعددة", "استهداف الجمهور المناسب بدقة", "تحسين الأداء وتقليل تكلفة الإعلان", "تقارير مفصلة وشفافة للنتائج"],
  },
];

const ServiceIcon = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}

  
  />
);

  return (
    <section
      id="services"
      className="services-section relative overflow-hidden"
      style={{ background: "#050D1A" }}
      dir=""
    >
      <div className="services-corner services-corner-top" />
      <div className="services-corner services-corner-bottom" />
      <div className="services-dots" />
      <div className="services-inner max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="services-heading">
            <span className="services-eyebrow">OUR SERVICES</span>
            <h2>OUR <span>SERVICES</span></h2>
            <div className="services-rule" />
          </div>
          <p className="services-intro">
            خدماتنا المتكاملة لدعم علامتك التجارية وتحقيق نتائج ملموسة.
          </p>
        </FadeUp>

        <div className="services-grid">
          {services.map((svc, i) => (
            <FadeUp key={svc.num} delay={i * 100} className={`service-fade service-fade-${i + 1}`}>
              <div className="service-card card-hover">
                <span className="service-number">{svc.num}</span>
                <div className="service-card-content">
                  <div className="service-icon"><ServiceIcon src={svc.icon} alt={svc.en.join(" ")} /></div>
                  <div className="service-copy">
                    <h3>{svc.en[0]}<span>{svc.en[1]}</span></h3>
                    <div className="service-rule " />
                    <ul>
                      {svc.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Bottom banner */}
        <FadeUp delay={500}>
          <div className="services-banner">
            <div className="banner-icon"><ServiceIcon src="/06_growth_chart.webp" alt="growth" /></div>
            <p>
              <span className="text-[#1A6CFF] font-bold">نحول رؤيتك إلى نجاح حقيقي</span> — في نوفا ميديا، ندمج الإبداع بالاستراتيجية لنحقق نمواً مستداماً لعلامتك التجارية.
            </p>
            <div className="banner-chart" aria-hidden="true">
              {/* <svg viewBox="0 0 260 100" preserveAspectRatio="none">
                <path className="chart-grid" d="M4 84h252M4 58h252M4 32h252" />
                <path className="chart-area" d="M4 84 42 76 78 79 112 57 145 65 179 40 211 47 256 10V84H4Z" />
                <path className="chart-line" d="M4 84 42 76 78 79 112 57 145 65 179 40 211 47 256 10" />
                <path className="chart-bars" d="M28 84V68M61 84V55M95 84V71M128 84V48M162 84V61M196 84V34M230 84V21" />
              </svg> */}
              <img src="/growth.webp" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Why Nova ────────────────────────────────────────────────────────────────
function WhyNova() {
  const cards = [
    { icon: creativityIcon, title: "أفكار إبداعية", body: "نبتكر أفكاراً فريدة ومحتوى إبداعي يجذب الانتباه ويعبر عن هوية علامتك بطريقة مميزة." },
    { icon: designIcon, title: "تصميمات احترافية", body: "نقدم تصاميم عالية الجودة تعكس الاحترافية وتساعد علامتك على التميز بين المنافسين." },
    { icon: resultsIcon, title: "تسويق قائم على النتائج", body: "كل استراتيجية نضعها تهدف إلى تحقيق نتائج حقيقية قابلة للقياس ونمو واضح لأعمالك." },
    { icon: speedIcon, title: "سرعة في التنفيذ", body: "نلتزم بالمواعيد ونعمل بكفاءة عالية لتسليم العمل في الوقت المحدد وبأعلى جودة." },
    { icon: growthIcon, title: "متابعة وتحسين مستمر", body: "نراقب الأداء بشكل مستمر ونحلل البيانات لتحسين الحملات وتحقيق أفضل النتائج." },
    { icon: partnershipIcon, title: "حلول تناسب كل نشاط", body: "نقدم حلول تسويقية مخصصة تناسب طبيعة عملك واحتياجات جمهورك لتحقيق أقصى استفادة." },
  ];

  return (
    <section id="why" className="why-section" dir="ltr">
      <div className="why-geometry" aria-hidden="true" />
      <div className="why-mountain" aria-hidden="true">
        <img src="/04_mountain_diamond.webp" alt="" />
        {/* <div className="why-mountain-peak" /> */}
      </div>
      <div className="why-dots" aria-hidden="true" />

      <div className="why-inner">
        <FadeUp>
          <div className="why-heading">
            <span className="why-eyebrow">WHY NOVA MEDIA?</span>
            <h2 className="py-6">WHY <br></br><span>NOVA MEDIA?</span></h2>
            <div className="why-rule" />
          </div>
          <p className="why-subtitle py-3">ما الذي يجعلنا خيارك الأفضل؟</p>
          <p className="why-intro ">
            نحن لا نقدم خدمات تسويقية فقط، بل نبني شراكات حقيقية مع عملائنا ونعمل بشغف لتحقيق أهدافهم وتجاوز توقعاتهم.
          </p>
        </FadeUp>

        <div className="why-grid">
          {cards.map((c, i) => (
            <FadeUp key={c.title} delay={i * 80}>
              <div className="why-card card-hover">
                <img className="why-icon" src={c.icon} alt="" />
                <div className="why-card-copy" dir="rtl">
                  <h3>{c.title}</h3>
                  <div className="why-card-rule" />
                  <p>{c.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={400}>
          <div className="why-quote">
            <img src={bottomGraphic} alt="" />
            <span className="why-quote-mark">“</span>
            <p>
              نحن هنا لنكون امتداداً لفريقك، ونسعى دائماً لتحويل رؤيتك إلى{" "}
              <span>نجاح حقيقي ومستدام.</span>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Work Portfolio ──────────────────────────────────────────────────────────
// ─── Our Work ────────────────────────────────────────────────────────────────
function OurWork() {
  const workItems = [
    { label: "Creative Product Campaign",      icon: "💡", src: "/work.webp" },
    { label: "Social Media Advertising",       icon: "📢", src: "/work1.webp" },
    { label: "Premium Product Visual",         icon: "⭐", src: "/work3.webp" },
    { label: "Commercial Creative Design",     icon: "☕", src: "/work4.webp" },
    { label: "Strategic Marketing Campaign",   icon: "🎯", src: "/work5.webp" },
    { label: "High-Impact Product Ad",         icon: "🔥", src: "/work6.webp" },
    { label: "Creative Brand Storytelling",    icon: "✨", src: "/work7.webp" },
    { label: "Performance-Driven Advertising", icon: "⚡", src: "/work8.webp" },
    { label: "Brand Promotion Design",         icon: "🏷️", src: "/work9.webp" },
        { label: "Creative Product Campaign",      icon: "💡", src: "/work10.webp" },
    { label: "Social Media Advertising",       icon: "📢", src: "/work11.webp" },
    { label: "Brand Promotion Design",         icon: "🏷️", src: "/work12.webp" },
    { label: "Premium Product Visual",         icon: "⭐", src: "/work13.webp" },
    { label: "Commercial Creative Design",     icon: "☕", src: "/work14.webp" },
    { label: "Strategic Marketing Campaign",   icon: "🎯", src: "/work15.webp" },

  ];

  return (
    <section
      id="work"
      className="py-24 relative overflow-hidden"
      style={{ background: "#050D1A" }}
      dir="ltr"
    >
       <div className="geo-corner" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Blue glow top-left */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle at 0% 0%, rgba(26,108,255,0.08), transparent 60%)" }}
      />

      {/* Page number — top right (matches the image "05 ——") */}
      <div
        className="absolute top-6 right-6 flex items-center gap-2"
        style={{ direction: "ltr" }}
      >
        <span className="font-inter font-bold text-sm" style={{ color: "#1A6CFF" }}>05</span>
        <div className="h-px w-16" style={{ background: "rgba(26,108,255,0.45)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <FadeUp>
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
            
          >
            {/* Right side: big title */}
            <div>

  <div className="services-heading">
            <span className="services-eyebrow">OUR WORK</span>
            <h2>OUR <span>WORK</span></h2>
            {/* <div className="services-rule" /> */}
          </div>


              
              <div className="h-[3px] w-14 mt-5 mb-3" style={{ background: "#1A6CFF" }} />
              <p className="font-cairo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                نماذج من أعمالنا الإبداعية
              </p>
            </div>

            {/* Left side: description */}
            <p
              className="font-cairo text-base leading-loose max-w-xs text-right"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              نفخر بمجموعة من المشاريع الناجحة التي نفذناها لعلامات تجارية
              متنوعة في مختلف المجالات.
            </p>
          </div>
        </FadeUp>

        {/* ── 3×3 Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {workItems.map((item, i) => (
            <FadeUp key={item.label} delay={i * 70}>
              <div
                className="group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(26,108,255,0.2)]"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#0A1628",
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/3", background: "linear-gradient(135deg,#0D2040,#050D1A)" }}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  {/* Blue overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(26,108,255,0.08)" }}
                  />
                </div>

                {/* Label */}
                <div
                  className="flex items-center gap-2.5 px-4 py-3"
                  style={{ background: "#07111F", borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {item.label}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── Case Studies ─────────────────────────────────────────────────────────────
function CaseStudies() {
  const cases = [
    {
      client: "NEBRAS ACADEMY",
      subtitle: "هوية بصرية متكاملة لأكاديمية قرآنية",
      goal: "تصميم هوية بصرية احترافية تعكس رسالة الأكاديمية وبناء حضور قوي وموثوق في المجال التعليمي.",
      strategy: [
        "تصميم شعار وهوية بصرية مستوحاة من القيم الإسلامية",
        "تطبيق الهوية على جميع المواد المطبوعة والرقمية",
        "سلاسة للهوية وضمان الاتساق في كل نقطة تواصل",
      ],
      results: [
        { num: "+280%", label: "زيادة في الطلبات", icon: "trend" },
        { num: "+210%", label: "زيادة في المتابعين", icon: "users" },
        { num: "+180%", label: "عائد على الاستثمار", icon: "coin" },
      ],
      img: "/cases.webp",
      imgAlt: "Islamic academy representing Nebras Academy",
    },
    {
      client: "FAHD ADVERTISING",
      subtitle: "هوية بصرية وتصميمات مطبعية متكاملة",
      goal: "بناء هوية قوية ومتميزة تعكس احترافية الشركة في مجال الطباعة والتركيب.",
      strategy: [
        "تصميم شعار يعبر عن القوة والسرعة والإحترافية",
        "تطبيق الهوية على السيارات، اللوحات، والكروت",
        "تصميمات مطبوعة متكاملة تعزز الإحترافية والثقة",
      ],
      results: [
        { num: "+340%", label: "زيادة في العملاء المحتملين", icon: "users" },
        { num: "+260%", label: "زيادة في المبيعات", icon: "handshake" },
        { num: "-42%", label: "انخفاض تكلفة العميل", icon: "trend" },
      ],
      img: "/case1.webp",
      imgAlt: "Advertising agency work representing Fahd Advertising",
    },
    {
      client: "النور أستور",
      subtitle: "هوية بصرية وتسويق شامل لمتجر أجهزة كهربائية",
      goal: "زيادة الوعي بالعلامة التجارية وتوسيع قاعدة العملاء عبر هوية بصرية موحدة وحملات تسويقية فعالة.",
      strategy: [
        "تصميم هوية بصرية عصرية تعبر عن الثقة والجودة",
        "تنفيذ حملات إعلانية مستهدفة على منصات متعددة",
        "تصميم محتوى مرئي جذاب يعرض المنتجات والمزايا",
      ],
      results: [
        { num: "+320%", label: "زيادة في المبيعات", icon: "cart" },
        { num: "+190%", label: "زيادة في التفاعل", icon: "social" },
        { num: "+250%", label: "زيادة في تقييم العملاء", icon: "star" },
      ],
      img: "/case.webp",
      imgAlt: "Electronics store representing Al-Nour Astor",
    },
  ];

  const ResultIcon = ({ type }: { type: string }) => {
    const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    if (type === "users") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...common} cx="12" cy="11" r="4" /><circle {...common} cx="22" cy="13" r="3" /><path {...common} d="M4 26c.8-5 3.5-7 8-7s7.2 2 8 7M20 20c4-.3 6.5 1.5 7 5" /></svg>;
    if (type === "coin") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...common} cx="16" cy="16" r="10" /><path {...common} d="M19 12.5c-.7-.7-1.7-1-3-1-1.8 0-3 .9-3 2.1 0 3.1 6 1.5 6 4.6 0 1.3-1.2 2.2-3 2.2-1.3 0-2.4-.4-3.1-1.1" /><path {...common} d="M16 10v12" /></svg>;
    if (type === "handshake") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="m4 14 5-5 6 2 3-2 6 5-3 4-4-3-3 3-4-4" /><path {...common} d="m11 18 3 3 2-2 2 2 2-2M7 20l3 3 2-2M22 18l3-3 3 3" /></svg>;
    if (type === "cart") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="M5 7h3l3 14h12l3-10H9" /><circle {...common} cx="13" cy="25" r="1.5" /><circle {...common} cx="23" cy="25" r="1.5" /></svg>;
    if (type === "social") return <svg viewBox="0 0 32 32" aria-hidden="true"><rect {...common} x="7" y="7" width="18" height="18" rx="4" /><circle {...common} cx="16" cy="16" r="4" /><circle cx="22" cy="10" r="1" fill="currentColor" /></svg>;
    if (type === "star") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="m16 5 3.4 7 7.6 1.1-5.5 5.4 1.3 7.5-6.8-3.6-6.8 3.6 1.3-7.5L5 13.1l7.6-1.1L16 5Z" /></svg>;
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="M5 24V18M12 24v-7M19 24v-9M26 24V8M4 24h24M20 12l4-4 3 2" /></svg>;
  };

  return (
    <section id="cases" className="case-studies-section relative overflow-hidden" style={{ background: "#050D1A" }} dir="ltr">
      <div className="case-studies-inner max-w-7xl mx-auto px-6">
        <FadeUp>
         <div className="services-heading">
            <span className="services-eyebrow">CASE<br></br> STUDIES</span>
            <h2>CASE<br></br><span>STUDIES</span></h2>
            {/* <div className="services-rule" /> */}
          </div>
          <div className="h-px w-16 bg-[#1A6CFF] mb-4" />
          <p className="case-studies-label text-white/50 font-cairo text-sm mb-2">نماذج من نجاحاتنا</p>
          <p className="case-studies-lead text-white/60 font-cairo max-w-2xl mb-14 text-xl">
            كل مشروع هو قصة نجاح نكتبها مع عملائنا بشغف، ونحول أهدافهم إلى نتائج حقيقية وملموسة.
          </p>
        </FadeUp>

        <div className="case-studies-list space-y-6">
          {cases.map((c, i) => (
            <FadeUp key={c.client} delay={i * 120}>
              <div className={`case-study-card case-study-card-${i + 1} rounded-2xl border border-white/[0.08] bg-[#050D1A]/60 card-hover overflow-hidden`}>
                <div className="grid md:grid-cols-[minmax(320px,1.25fr)_minmax(360px,1fr)_220px]">
                  {/* Image */}
                  <div
                    className="relative hidden md:block "
                    style={{ minHeight: 200, background: "#071022" }}
                  >
                    <img
                      src={c.img}
                      alt={c.imgAlt}
                      className="w-full h-full object-contain  "
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-l from-[#050D1A]/80 to-transparent" /> */}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-inter font-black text-[20px] text-white mb-1">{c.client}</h3>
                    <p className="text-[#1A6CFF] font-cairo font-bold mb-4">{c.subtitle}</p>
                    <p className="text-white/50 font-cairo text-sm mb-4 leading-relaxed">
                    <p className="text-[#1A6CFF] font-cairo font-bold mb-1">الهدف:</p>
                       {c.goal}
                    </p>
                    <div>
                                          <p className="text-[#1A6CFF] font-cairo font-bold mb-1">استراجيتنا</p>

                      <ul className="space-y-1.5">
                        {c.strategy.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-white/50 font-cairo text-sm">
                            <span className="text-[#1A6CFF] shrink-0 mt-0.5">✓</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="case-study-results w-full flex flex-row md:flex-col justify-around text-start gap-2 p-6 bg-[#1A6CFF]/5 border-t md:border-t-0 md:border-r border-[#1A6CFF]/15">
                    <div className="text-white/40 font-inter font-bold text-[25px] tracking-wider mb-0 md:mb-2 hidden md:block">النتائج</div>
                    {c.results.map((r) => (
                      <div key={r.label} className="case-result-item text-center w-full flex items-center justify-start ">
                        <div className="case-result-icon"><ResultIcon type={r.icon} /></div>
                        <div> 


                        <div className="case-result-number font-inter font-black text-xs md:text-2xl">
  {(() => {
    const prefix = r.num.startsWith("-") ? "-" : r.num.startsWith("+") ? "+" : "";
    const suffix = r.num.endsWith("%") ? "%" : "";
    const target = parseInt(r.num.replace(/[^0-9]/g, ""));
    return <CountUp target={target} prefix={prefix} suffix={suffix} />;
  })()}
</div>
                        <div className="text-white/45 font-cairo text-[12px] md:text-xs mt-0.5">{r.label}</div>

                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={400}>
          <div className="why-quote mt-7">
            <img src="/banner.webp" alt=""  />
            {/* <img src="/banner.webp" alt="" className="case-quote-mountain" /> */}
            <span className="why-quote-mark">“</span>
            <p>نفخر بثقة عملائنا ونسعى دائماً لتقديم نتائج<br /><span>تفوق التوقعات ونبني شراكات طويلة الأمد.</span></p>
          </div>


        
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Packages ────────────────────────────────────────────────────────────────
function Packages() {
const plans = [
  {
    name: "PREMIUM",
    sub: "باقة النمو المتكامل ⭐",
    price: "2,000 ﷼",
    featured: false,
    tone: "premium",
    cta: "الأفضل للنمو والتوسع",
    items: [
      "إدارة كاملة للسوشيال ميديا",
      "20 منشور شهريًا",
      "كتابة المحتوى + تصاميم احترافية",
      "🎬 مونتاج 8 فيديوهات شهريًا",
      "إدارة وتحسين الإعلانات الممولة",
      "إعداد حملات بأهداف مختلفة",
      "تحليل الجمهور والمنافسين",
      "خطة محتوى وتسويق شهرية",
      "تحسين الحملات بناءً على النتائج",
      "تقرير أداء وتحليل شامل",
      "استشارات تسويقية مستمرة",
    ],
  },
  {
    name: "STANDARD",
    sub: "باقة النمو",
    price: "1,000 ﷼",
    featured: true,
    tone: "standard",
    badge: "الأكثر اختياراً",
    cta: "اختر الباقة الأمثل",
    items: [
      "إدارة حسابات السوشيال ميديا",
      "15 منشور شهريًا",
      "كتابة المحتوى والتصميم",
      "🎬 مونتاج 4 فيديوهات شهريًا",
      "إدارة وتحسين الإعلانات الممولة",
      "تحليل المنافسين",
      "تقرير أداء شهري",
    ],
  },
  {
    name: "BASIC",
    sub: "باقة البداية",
    price: "700 ﷼",
    featured: false,
    tone: "basic",
    cta: "بداية قوية لعلامتك التجارية",
    items: [
      "إدارة حسابات السوشيال ميديا",
      "8 منشورات شهريًا",
      "كتابة المحتوى",
      "تصميم المنشورات",
      "إدارة الإعلانات الممولة",
      "تقرير أداء شهري",
    ],
  },
];

const clients = [
  { name: "BURGER\nHOUSE",   logo: "/burger.webp" },
  { name: "GLOW\nSKINCARE",  logo: "/glow.png" },
  { name: "LIFE\nCARE",      logo: "/care.webp" },
  { name: "HOME STYLE",      logo: "/home.webp" },
  { name: "URBAN\nWEAR",     logo: "/wear.webp" },
  { name: "BRBAW\nPOINT",    logo: "/point.webp" },
];
  return (
    <section id="packages" className="packages-section relative overflow-hidden" dir="ltr">
      <div className="packages-inner max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="packages-header">
            <div>
            
                   <div className="services-heading">
            <span className="services-eyebrow">OUR<br></br> PACKAGES</span>
            <h2>OUR<br></br><span>PACKAGES</span></h2>
            <div className="services-rule" />
          </div>
              <p className="packages-label">باقات مصممة لتناسب أهدافك وميزانيتك</p>
            </div>
            <p className="packages-lead">اختر الباقة المناسبة لاحتياجاتك،<br /> ونحن نضمن لك نتائج حقيقية<br /> تدفع أعمالك للأمام.</p>
          </div>
        </FadeUp>

        <div className="packages-grid">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 100}>
              <div className={`package-card package-${plan.tone} ${plan.featured ? "package-featured" : ""}`}>
                <div className="package-card-top">
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.sub}</p>
                  </div>
                  <div className="package-symbol" aria-hidden="true"> <img src={plan.tone === "premium" ? "/premuim.webp" : plan.tone === "standard" ? "/standard.png" : "/basic.webp"} /> </div>
                </div>
                <div className="package-divider" />
                <div className="package-price"><strong>{plan.price}</strong><span>﷼ / شهرياً</span></div>
                <ul className="package-features">
                    {plan.items.map((item) => (
                      <li key={item}><span className="package-check">✓</span>{item}
                      </li>
                    ))}
                </ul>
                <a href="https://wa.me/201069214165" className="package-cta">{plan.cta}</a>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp><h3 className="process-title">خطتنا في العمل</h3></FadeUp>
        <div className=" w-full">
\
          <div className="w-full">
            <img src="/workflow.webp" className="w-full"/>
          </div>
        </div>

<FadeUp>
  <div className=" w-full flex ">
    <div className="clients-strip ">
         <h3>ثقة عملائنا</h3>
    <div className="client-logos w-full">
      {clients.map((client) => (
        <div key={client.name} className="client-logo">
          <img
            src={client.logo}
            alt={client.name.replace("\n", " ")}
            className="client-logo-img h-10 md:h-22"
            onError={(e) => {
              // fallback للنص لو الصورة مش موجودة
              (e.currentTarget as HTMLImageElement).style.display = "none";
              (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
            }}
          />
          {/* <span className="client-logo-fallback">
            {client.name.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span> */}
        </div>
      ))}
    </div>
     <FadeUp delay={200}>
          <div className="w-full banner1-strip ">
            <img src="/banner1.webp" alt="" />
           
           </div>
           </FadeUp>
    </div>

        
    <div className=" together-strip" >
      <img className="h-full w-full " src="/together.webp" />
    </div>


    

  </div>
      <FadeUp delay={200}>
          <div className="w-full banner2-strip ">
            <img src="/banner1.webp" alt="" />
           
           </div>
           </FadeUp>
</FadeUp>




      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{  background: "#00091C"
 }} >
      <div className="geo-corner" />
      <div className="absolute inset-0 blue-glow pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-40 h-40 opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,108,255,0.5) 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center">
         <FadeUp delay={150}>
           <div className="intro-logo-lockup mb-10"><img src="/first.webp" /></div>
         </FadeUp>
        
        <FadeUp>
          <h2 className="font-cairo font-black text-3xl md:text-5xl text-white leading-tight mb-4">
            مستعد تحول رؤيتك إلى{" "}
            <span className="text-[#1A6CFF]">نجاح حقيقي ومستدام؟</span>
          </h2>
          <p className="text-white/55 font-cairo text-lg mb-10">
            فريقنا جاهز للرد على استفساراتك وتقديم الاستشارة المجانية.
          </p>
        </FadeUp>

        {/* <FadeUp delay={150}>
          <a
            href="mailto:team.1novamedia@gmail.com"
            className="inline-block px-10 py-4 bg-[#1A6CFF] hover:bg-[#1255CC] text-white font-cairo font-bold text-lg rounded-xl transition-all duration-200 hover:shadow-[0_0_40px_rgba(26,108,255,0.5)] mb-14"
          >
            ابدأ رحلتك معنا اليوم
          </a>
        </FadeUp> */}

        <FadeUp delay={250}>
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-10 mb-10">
            <a
              href="tel:01069214165"
              className="flex items-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1A6CFF]/20 border border-[#1A6CFF]/30 flex items-center justify-center group-hover:bg-[#1A6CFF]/30 transition-colors">
                <img src="/14_phone_icon.webp" />
              </div>
              <div className="text-left">
                <div className="text-white/40 font-inter text-xs tracking-widest">PHONE</div>
                <div className="text-white font-inter font-bold">010 6921 4165</div>
              </div>
            </a>

            <div className="hidden md:block w-px bg-white/10 self-stretch" />

            <a
              href="mailto:team.1novamedia@gmail.com"
              className="flex items-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1A6CFF]/20 border border-[#1A6CFF]/30 flex items-center justify-center group-hover:bg-[#1A6CFF]/30 transition-colors">
                                <img src="/15_email_icon.webp" />

              </div>
              <div className="text-left">
                <div className="text-white/40 font-inter text-xs tracking-widest">EMAIL</div>
                <div className="text-white font-inter font-bold text-sm">team.1novamedia@gmail.com</div>
              </div>
            </a>
          </div>
        </FadeUp>

        {/* Social */}
        <FadeUp delay={350}>
          <div className="flex justify-center gap-4">
            {[
           { label: "Facebook",  icon: "/16_facebook_icon.webp",  href: "#" },
      { label: "Instagram", icon: "/17_instagram_icon.webp", href: "#" },
      { label: "WhatsApp",  icon: "/14_phone_icon.webp",     href:"https://wa.me/201069214165" },
            ].map((s) => (
              <a
                 key={s.label}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-17 h-17 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:border-[#1A6CFF]/50 hover:bg-[#1A6CFF]/10 hover:scale-105 flex items-center justify-center transition-all duration-200"
        aria-label={s.label}
      >
        <img
          src={s.icon}
          alt={s.label}
          className="w-10 h-10 object-contain"
        />
      </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="border-t border-white/[0.06]"
      style={{ background: "#050D1A" }}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <NMLogo size={32} />
          <div>
            <div className="font-inter font-black text-white text-xs tracking-widest">NOVA MEDIA</div>
            <div className="text-[8px] text-white/30 tracking-[0.2em] font-inter">CREATIVE MARKETING AGENCY</div>
          </div>
        </div>

        <p className="text-white/30 font-inter text-xs text-center">
          © 2025 Nova Media. All rights reserved.
        </p>

        <div className="flex gap-3">
         <a href="https://www.instagram.com/easysystem2026?igsi=NjB2MzlwYW04eW4x" target="_blank" rel="noopener noreferrer" style={{fontWeight:"bold" , color:"#1268ee"}}>EASY-SYSTEM</a>powered by
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  // const [showIntro, setShowIntro] = useState(() => {
  //   try {
  //     return sessionStorage.getItem("nova-intro-seen") !== "true";
  //   } catch {
  //     return true;
  //   }
  // });

  // const enterHome = () => {
  //   try {
  //     sessionStorage.setItem("nova-intro-seen", "true");
  //   } catch {
  //     // Continue when storage is unavailable.
  //   }
  //   setShowIntro(false);
  // };

  // if (showIntro) return <IntroPage onEnter={enterHome} />;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Cairo', 'Inter', sans-serif" }}>
      <Navbar />
      <IntroPage />
      <Hero />
      <About />
      <Services />
      <WhyNova />
      <OurWork />
      {/* <OurWorkT /> */}
      <CaseStudies />
      <Packages />
      <Contact />
      <Footer />
      {/* WhatsApp Float Button */}
<a
  href="https://wa.me/201069214165"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
  style={{ background: "#25D366" }}
  aria-label="تواصل معنا على واتساب"
>
  <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.797 1.85 6.785L2 30l7.44-1.82A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm7.07 19.29c-.295.83-1.73 1.59-2.38 1.65-.614.057-1.19.29-4.01-.84-3.39-1.37-5.57-4.82-5.74-5.04-.17-.22-1.38-1.84-1.38-3.51s.87-2.49 1.18-2.83c.31-.34.68-.43.9-.43l.65.012c.21.01.49-.08.77.587l1.1 2.73c.09.22.045.48-.07.67l-.4.52-.43.46c-.14.14-.29.3-.12.58.17.28.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.28.14.45.12.61-.07l.83-.98c.21-.27.42-.22.7-.13l2.2.87c.82.32.82.32.82.96Z"/>
  </svg>
</a>
    </div>
  );
}
