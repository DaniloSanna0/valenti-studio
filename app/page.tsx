import Image from "next/image";
import { Reveal, SplitWords } from "@/components/Motion";
import CountUp from "@/components/CountUp";
import PortfolioRail from "@/components/PortfolioRail";

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */

const PHOTO = (id: string, w = 3000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=95`;

// Cinematic hero clip (CC0). If it ever fails to load, the poster image stays.
const HERO_VIDEO =
  "https://cdn.coverr.co/videos/coverr-a-fashion-model-in-the-studio-7203/1080p.mp4";
const HERO_FALLBACK = PHOTO("photo-1515886657613-9f3515b0c78f", 3000);

const PORTFOLIO = [
  { tag: "Editorial", title: "Nocturne — SS26",        img: PHOTO("photo-1524504388940-b1c1722653e1") },
  { tag: "Beauty",    title: "Skin Study 04",          img: PHOTO("photo-1531746020798-e6953c6e8e04") },
  { tag: "Portrait",  title: "Olivia, Milano",         img: PHOTO("photo-1581338834647-b0fb40704e21") },
  { tag: "Fashion",   title: "Maison Rive — Lookbook", img: PHOTO("photo-1630321471563-ccf20765cdd6") },
  { tag: "Backstage", title: "Backstage, Vol. II",     img: PHOTO("photo-1539109136881-3be0616acf4b") },
  { tag: "Editorial", title: "Acqua — Numéro",         img: PHOTO("photo-1621890188758-bdcbcfa95c14") },
  { tag: "Portrait",  title: "Sofia, b/w",             img: PHOTO("photo-1485231183945-fffde7cc051e") },
  { tag: "Beauty",    title: "Glow 11",                img: `https://plus.unsplash.com/premium_photo-1668896123992-43b8b27cf758?auto=format&fit=crop&w=3000&q=95` },
];

const SERVICES = [
  { n: "01", title: "Editorial & Lookbook", body: "Produzioni complete per riviste, brand emergenti e capsule collection. Concept, styling direction, post-produzione inclusa." },
  { n: "02", title: "Portfolio Modelle",    body: "Test e digitals per agenzie milanesi e internazionali. Materiale pronto per casting, comp card e proposta booking." },
  { n: "03", title: "Beauty & Campaign",    body: "Set in studio con luce controllata per skincare, fragranze e capelli. Output pronto stampa e adv su tutti i formati." },
  { n: "04", title: "Backstage & Content",  body: "Reportage di sfilate, shooting e produzioni. Selezione editoriale per stampa e pacchetto verticale per i social." },
];

const NAV = ["Lavori", "Studio", "Servizi", "Contatti"];

const CLIENTS = [
  "VOGUE ADRIA","MAISON RIVE","NUMÉRO BERLIN","ELITE MILANO","L'OFFICIEL",
  "WOMEN MGMT","MARIE CLAIRE IT","IMG MODELS","HARPER'S BAZAAR","NEXT MGMT",
];

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink text-bone overflow-x-clip">
      <Header />
      <Hero />
      <Marquee />
      <Portfolio />
      <Manifesto />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}

/* -------------------------------- HEADER ---------------------------------- */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-ink/40">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#" data-cursor="Home" className="font-serif text-xl tracking-wide">
          Marco<span className="text-ash"> · </span>Valenti
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[12px] uppercase tracking-editorial text-bone/80">
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-bone transition-colors">
              {n}
            </a>
          ))}
        </nav>
        <a
          href="#contatti"
          data-cursor="Booking"
          className="hidden md:inline-block border border-bone/30 px-4 py-2 text-[11px] uppercase tracking-editorial hover:bg-bone hover:text-ink transition-colors"
        >
          Prenota uno shooting
        </a>
        <a href="#contatti" className="md:hidden text-[11px] uppercase tracking-editorial border border-bone/30 px-3 py-2">
          Booking
        </a>
      </div>
      <div className="hairline" />
    </header>
  );
}

/* --------------------------------- HERO ----------------------------------- */

function Hero() {
  // Hero desktop: still editoriale ben composto (landscape)
  const HERO_DESKTOP = PHOTO("photo-1496747611176-843222e1e57c", 3200);
  return (
    <section className="relative h-[100svh] min-h-[700px] w-full overflow-hidden">
      {/* Mobile / tablet: video verticale */}
      <video
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        style={{ objectPosition: "center 15%" }}
        autoPlay muted loop playsInline preload="auto"
        poster={HERO_FALLBACK}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      {/* Desktop: still editoriale */}
      <Image
        src={HERO_DESKTOP}
        alt="Editorial cover"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="hidden md:block object-cover object-[80%_30%] scale-x-[-1]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/15 to-ink" />
      <div className="absolute inset-0 bg-ink/25" />

      <div className="container-x relative z-10 flex h-full flex-col justify-between pt-24 pb-10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-editorial text-bone/70">
          <Reveal y={10}><span>Vol. 07 — MMXXVI</span></Reveal>
          <Reveal y={10} delay={0.1}><span className="hidden sm:block">Milano · Paris · Lisbon</span></Reveal>
        </div>

        <div className="max-w-5xl">
          <Reveal y={20}>
            <p className="eyebrow mb-6 text-bone/80">Fashion & Editorial Photography</p>
          </Reveal>

          <h1 className="font-serif font-light leading-[0.92] tracking-tight">
            <SplitWords
              text="Marco Valenti"
              className="block text-[56px] sm:text-[88px] md:text-[128px] lg:text-[168px]"
              stagger={0.12}
            />
          </h1>

          <Reveal delay={0.6}>
            <p className="mt-8 max-w-xl text-base md:text-lg text-bone/85 leading-relaxed">
              Costruisco immagini per modelle, agenzie e brand che cercano una direzione
              visiva precisa. Set in studio e in location, da Milano in tutta Europa.
            </p>
          </Reveal>

          <Reveal delay={0.75}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contatti" data-cursor="Book" className="group inline-flex items-center gap-3 bg-bone text-ink px-6 py-3 text-[12px] uppercase tracking-editorial hover:bg-bone/90 transition-colors">
                Prenota uno shooting
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#lavori" data-cursor="View" className="inline-flex items-center gap-3 border border-bone/40 px-6 py-3 text-[12px] uppercase tracking-editorial hover:bg-bone hover:text-ink transition-colors">
                Vedi i lavori
              </a>
            </div>
          </Reveal>
        </div>

        <div className="flex items-end justify-between text-[11px] uppercase tracking-editorial text-bone/60">
          <span className="flex items-center gap-3">
            <span className="inline-block h-8 w-px bg-bone/40 animate-pulse" /> Scroll
          </span>
          <span className="hidden md:block">Ultimi lavori — Vogue Adria, Maison Rive, Numéro Berlin</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- MARQUEE --------------------------------- */

function Marquee() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-line bg-ink overflow-hidden">
      <div className="py-6 flex gap-12 marquee-track whitespace-nowrap text-[11px] tracking-editorial text-ash">
        {items.map((i, idx) => (
          <span key={idx} className="flex items-center gap-12">
            {i}
            <span className="inline-block h-1 w-1 rounded-full bg-ash/60" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- PORTFOLIO -------------------------------- */
/*  Horizontal-scroll editorial gallery                                       */

function Portfolio() {
  return (
    <section id="lavori" className="py-24 md:py-32">
      <div className="container-x mb-12 md:mb-16 flex items-end justify-between">
        <div>
          <Reveal><p className="eyebrow mb-4">Selected Work — 2024 / 2026</p></Reveal>
          <h2 className="font-serif font-light text-4xl md:text-7xl tracking-tight overflow-hidden">
            <SplitWords text="In evidenza" />
          </h2>
        </div>
        <Reveal delay={0.2}>
          <a href="#" data-cursor="Open" className="hidden md:inline-block text-[11px] uppercase tracking-editorial text-ash hover:text-bone">
            Archivio completo →
          </a>
        </Reveal>
      </div>

      <PortfolioRail items={PORTFOLIO} />

      <div className="container-x mt-10 flex items-center justify-between text-[11px] uppercase tracking-editorial text-ash">
        <span>↻ Auto · trascina per esplorare</span>
        <a href="#" className="md:hidden">Archivio completo →</a>
      </div>
    </section>
  );
}

/* ------------------------------- MANIFESTO -------------------------------- */

function Manifesto() {
  return (
    <section id="studio" className="py-24 md:py-40 bg-bone text-ink">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <Reveal className="md:col-span-5">
          <div className="hover-img relative aspect-[4/5] overflow-hidden">
            <Image
              src={PHOTO("photo-1521577352947-9bb58764b69a", 2400)}
              alt="Studio"
              fill
              quality={100}
              sizes="(min-width:768px) 40vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7 flex flex-col justify-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-editorial text-ink/60 mb-6">
              Studio — Milano, via Tortona
            </p>
          </Reveal>
          <h2 className="font-serif font-light text-4xl md:text-6xl leading-[1.05] tracking-tight">
            <SplitWords text="Un’estetica costruita" stagger={0.07} />
            <SplitWords text="sulla luce e sul corpo." delay={0.25} stagger={0.07} />
          </h2>

          <Reveal delay={0.4}>
            <div className="mt-10 max-w-xl space-y-5 text-ink/75 text-base md:text-lg leading-relaxed">
              <p>
                Lavoro al confine tra ritratto e moda con un linguaggio riconoscibile:
                composizioni essenziali, palette ridotta, gestione della luce ispirata
                alla tradizione editoriale italiana.
              </p>
              <p>
                Ogni shooting nasce da un brief preciso e da un casting curato.
                Niente set improvvisati: produzione, styling e post sono parte della
                stessa firma visiva.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md">
              <Stat k={<CountUp to={180} suffix="+" />} v="Editoriali" />
              <Stat k={<CountUp to={40} suffix="+" />} v="Brand" />
              <Stat k={<CountUp to={9} />} v="Anni" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: React.ReactNode; v: string }) {
  return (
    <div>
      <p className="font-serif text-3xl md:text-5xl">{k}</p>
      <p className="text-[11px] uppercase tracking-editorial text-ink/60 mt-1">{v}</p>
    </div>
  );
}

/* -------------------------------- SERVICES -------------------------------- */

function Services() {
  return (
    <section id="servizi" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <Reveal><p className="eyebrow mb-4">Servizi</p></Reveal>
            <h2 className="font-serif font-light text-4xl md:text-7xl tracking-tight">
              <SplitWords text="Cosa produco" />
            </h2>
          </div>
          <Reveal delay={0.2} className="md:col-span-6 md:col-start-7 self-end">
            <p className="text-bone/75 text-base md:text-lg leading-relaxed">
              Ogni progetto è preventivato in base a brief, location, team e diritti d’uso.
              Disponibile per produzioni in Italia e all’estero, anche in collaborazione
              con agenzie e art director.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <article
                data-cursor="Open"
                className="group grid grid-cols-12 gap-6 border-b border-line py-8 md:py-10 px-1 md:px-2 hover:bg-line/30 transition-colors cursor-pointer"
              >
                <span className="col-span-2 md:col-span-1 font-serif text-ash text-xl md:text-2xl">{s.n}</span>
                <h3 className="col-span-10 md:col-span-4 font-serif text-2xl md:text-4xl group-hover:translate-x-2 transition-transform duration-500">
                  {s.title}
                </h3>
                <p className="col-span-12 md:col-span-6 md:col-start-7 text-bone/75 leading-relaxed">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- CONTACT --------------------------------- */

function Contact() {
  return (
    <section id="contatti" className="py-24 md:py-40 border-t border-line">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <Reveal><p className="eyebrow mb-6">Booking & Collaborazioni</p></Reveal>
          <h2 className="font-serif font-light text-5xl md:text-8xl lg:text-9xl leading-[1] tracking-tight">
            <SplitWords text="Lavoriamo" stagger={0.1} />
            <SplitWords text="insieme." delay={0.3} stagger={0.1} />
          </h2>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-bone/75 text-base md:text-lg leading-relaxed">
              Per richieste di shooting, test modelle, produzioni editoriali o campagne
              brand: scrivimi con date, riferimento visivo e team coinvolto.
              Rispondo entro 24 ore lavorative.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <a
              href="mailto:studio@marcovalenti.it"
              data-cursor="Email"
              className="mt-10 inline-flex items-center gap-3 bg-bone text-ink px-7 py-4 text-[12px] uppercase tracking-editorial hover:bg-bone/90 transition-colors"
            >
              Richiedi disponibilità
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:col-start-8 flex flex-col justify-end gap-8 text-sm">
          <Info label="Studio"        value="Via Tortona 27, Milano" />
          <Info label="Email"         value="studio@marcovalenti.it" href="mailto:studio@marcovalenti.it" />
          <Info label="Telefono"      value="+39 02 0000 0000" />
          <Info label="Instagram"     value="@marcovalenti.studio" href="https://instagram.com" />
          <Info label="Rappresentanza" value="MGMT Artists — Europe" />
        </div>
      </div>
    </section>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="text-[11px] uppercase tracking-editorial text-ash block mb-2">{label}</span>
      <span className="font-serif text-2xl md:text-3xl">{value}</span>
    </>
  );
  return (
    <Reveal>
      <div className="border-t border-line pt-5">
        {href ? (
          <a href={href} data-cursor="Open" className="hover:opacity-70 transition-opacity block">
            {content}
          </a>
        ) : content}
      </div>
    </Reveal>
  );
}

/* --------------------------------- FOOTER --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-line pt-20 pb-8">
      <div className="container-x">
        <div className="flex items-end justify-between mb-10">
          <span className="text-[11px] uppercase tracking-editorial text-ash">
            Disponibile per assignment — Q2 / Q3 2026
          </span>
          <a href="#" data-cursor="Top" className="text-[11px] uppercase tracking-editorial text-ash hover:text-bone">
            ↑ Torna su
          </a>
        </div>

        <h3 className="font-serif font-light leading-[0.85] tracking-tight text-stroke text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw] select-none">
          VALENTI
        </h3>

        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[11px] uppercase tracking-editorial text-ash">
          <div className="flex items-center gap-6">
            <span className="font-serif text-base text-bone tracking-wide normal-case">Marco · Valenti</span>
            <span>Milano</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" data-cursor="Open" className="hover:text-bone">Instagram</a>
            <a href="mailto:studio@marcovalenti.it" data-cursor="Email" className="hover:text-bone">Email</a>
            <span>© MMXXVI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
