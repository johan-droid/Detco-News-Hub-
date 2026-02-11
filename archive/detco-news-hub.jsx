import { useState, useEffect, useRef } from "react";

const detectiveQuotes = [
  "There is always only one truth.",
  "A detective who gets scared by danger is no detective at all.",
  "The darker the night, the brighter the stars.",
  "Every lie leaves a trace. You just have to find it.",
];

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Anime" },
  { id: "characters", label: "Characters" },
  { id: "author", label: "Author" },
  { id: "news", label: "Latest News" },
];

const characters = [
  {
    name: "Conan Edogawa",
    real: "Shinichi Kudo",
    role: "The Great Detective",
    color: "#4A90D9",
    emoji: "🔍",
    desc: "A teenage detective shrunk into a child's body by the Black Organization. Armed with wit, science gadgets, and an unbreakable will to expose the truth.",
    badge: "Main Hero",
  },
  {
    name: "Ran Mouri",
    real: "Ran Mouri",
    role: "Karate Champion",
    color: "#E85D9A",
    emoji: "🥋",
    desc: "Shinichi's childhood love and Conan's primary guardian. Her karate skills have saved the day more times than people give her credit for.",
    badge: "Fan Favorite",
  },
  {
    name: "Ai Haibara",
    real: "Shiho Miyano",
    role: "Scientist & Ally",
    color: "#9B59B6",
    emoji: "🧬",
    desc: "Former Black Organization scientist who created APTX 4869. Sarcastic, brilliant, and fiercely protective of those she's chosen to trust.",
    badge: "Mystery",
  },
  {
    name: "Inspector Megure",
    real: "Juzo Megure",
    role: "Police Inspector",
    color: "#2ECC71",
    emoji: "👮",
    desc: "Tokyo Metropolitan Police's finest. Always in his trademark hat, always skeptical, and somehow always at the right crime scene.",
    badge: "Classic",
  },
];

const newsItems = [
  {
    tag: "BREAKING",
    title: "Detective Conan Movie 28 Surpasses Box Office Records",
    date: "March 2024",
    color: "#FF4757",
    desc: "The latest film crosses all-time records in Japan, cementing Conan's legacy as the king of anime detective thrillers.",
  },
  {
    tag: "MANGA",
    title: "Volume 107 Chapter Drops a Major Black Org Revelation",
    date: "Feb 2024",
    color: "#FFA502",
    desc: "Gosho Aoyama teases a stunning plot twist that has the fandom spiraling into theory overdrive. We've got the breakdown.",
  },
  {
    tag: "ANNIVERSARY",
    title: "30 Years of Detective Conan — A Legacy Celebrated",
    date: "Jan 2024",
    color: "#2ED573",
    desc: "From 1994 to today, we trace the incredible journey of Shinichi Kudo through every arc, villain, and unforgettable mystery.",
  },
  {
    tag: "THEORY",
    title: "Is Rum's Identity Finally Confirmed? Fan Analysis",
    date: "Dec 2023",
    color: "#7FDBFF",
    desc: "The internet has been buzzing with frame-by-frame analysis. Our writers dig deep into the most compelling evidence yet.",
  },
];

const stats = [
  { label: "Episodes", value: "1100+", icon: "📺" },
  { label: "Manga Volumes", value: "107+", icon: "📚" },
  { label: "Movies", value: "28", icon: "🎬" },
  { label: "Years Running", value: "30+", icon: "⏳" },
  { label: "Cases Solved", value: "1000+", icon: "🔍" },
];

export default function DetcoNewsHub() {
  const [activeSection, setActiveSection] = useState("home");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((i) => (i + 1) % detectiveQuotes.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((v) => ({ ...v, [e.target.id]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navInner}>
          <div style={styles.logo} onClick={() => scrollTo("home")}>
            <span style={styles.logoIcon}>🔍</span>
            <span style={styles.logoText}>
              DETCO<span style={styles.logoAccent}>NEWS</span>HUB
            </span>
          </div>
          <div style={styles.navLinks}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={styles.navBtn}
                className="nav-btn"
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={styles.mobileBtn}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroGrid} />
        <div style={styles.heroOrbs}>
          <div style={{ ...styles.orb, ...styles.orb1 }} />
          <div style={{ ...styles.orb, ...styles.orb2 }} />
          <div style={{ ...styles.orb, ...styles.orb3 }} />
        </div>
        <div style={styles.heroContent} className="hero-content">
          <div style={styles.heroEyebrow} className="fade-in-up delay-1">
            🔍 THE ULTIMATE DETECTIVE CONAN DESTINATION
          </div>
          <h1 style={styles.heroTitle} className="fade-in-up delay-2">
            <span style={styles.heroTitleLine1}>DETCO</span>
            <span style={styles.heroTitleLine2}>NEWS HUB</span>
          </h1>
          <p style={styles.heroQuote} className="fade-in-up delay-3">
            <span key={quoteIdx} className="quote-fade">
              "{detectiveQuotes[quoteIdx]}"
            </span>
          </p>
          <p style={styles.heroSub} className="fade-in-up delay-4">
            Your premier source for Detective Conan news, theories, episode
            recaps, movie coverage, and the latest from the world of Shinichi
            Kudo.
          </p>
          <div style={styles.heroBtns} className="fade-in-up delay-5">
            <button
              className="btn-primary"
              style={styles.btnPrimary}
              onClick={() => scrollTo("about")}
            >
              Explore the Series
            </button>
            <button
              className="btn-ghost"
              style={styles.btnGhost}
              onClick={() => scrollTo("news")}
            >
              Latest News →
            </button>
          </div>
        </div>
        <div style={styles.heroDecor} className="fade-in-up delay-3">
          <div style={styles.magnifyRing}>
            <div style={styles.magnifyInner}>
              <span style={styles.magnifyEmoji}>🔎</span>
            </div>
          </div>
          <div style={styles.floatBadge1} className="float-anim">ONE TRUTH</div>
          <div style={styles.floatBadge2} className="float-anim-r">
            MANGA 1994
          </div>
        </div>
        <div style={styles.scrollHint} className="scroll-hint">
          ↓ Scroll to investigate
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={styles.statsStrip}>
        <div style={styles.statsInner}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statItem} className="stat-item">
              <span style={styles.statIcon}>{s.icon}</span>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={styles.section}>
        <div
          id="about-reveal"
          data-reveal
          style={{
            ...styles.sectionInner,
            ...styles.aboutGrid,
            ...(visible["about-reveal"] ? styles.revealed : styles.hidden),
          }}
        >
          <div style={styles.aboutLeft}>
            <div style={styles.sectionEyebrow}>🎌 ABOUT THE ANIME</div>
            <h2 style={styles.sectionTitle}>
              The World's Greatest
              <br />
              <span style={styles.accent}>Little Detective</span>
            </h2>
            <p style={styles.bodyText}>
              <strong style={{ color: "#e0c97a" }}>
                Detective Conan (Case Closed)
              </strong>{" "}
              is a Japanese manga series written and illustrated by{" "}
              <strong style={{ color: "#e0c97a" }}>Gosho Aoyama</strong>,
              serialized in{" "}
              <em>Weekly Shōnen Sunday</em> since January 19,{" "}
              <strong>1994</strong>. The anime adaptation by TMS Entertainment
              premiered in January 1996 and has been airing ever since.
            </p>
            <p style={styles.bodyText}>
              The story follows{" "}
              <strong style={{ color: "#4A90D9" }}>Shinichi Kudo</strong>, a
              brilliant high school detective who is shrunk into the body of a
              child after being poisoned by the mysterious{" "}
              <strong style={{ color: "#c0392b" }}>Black Organization</strong>.
              Adopting the alias{" "}
              <strong style={{ color: "#4A90D9" }}>Conan Edogawa</strong>, he
              solves cases while seeking a cure — and hunting the criminals who
              did this to him.
            </p>
            <p style={styles.bodyText}>
              Over <strong style={{ color: "#e0c97a" }}>30 years</strong> and
              1,100+ episodes, Detective Conan has captivated generations with
              intricate locked-room mysteries, emotional storylines, and a
              sprawling cast of unforgettable characters. Its motto:{" "}
              <em style={{ color: "#e0c97a" }}>
                "There is always only one truth."
              </em>
            </p>
            <div style={styles.aboutTags}>
              {[
                "Mystery",
                "Thriller",
                "Shōnen",
                "Adventure",
                "Romance",
                "Crime",
              ].map((t) => (
                <span key={t} style={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={styles.aboutRight}>
            <div style={styles.aboutCard}>
              <div style={styles.aboutCardHeader}>📋 SERIES AT A GLANCE</div>
              {[
                ["Original Title", "名探偵コナン"],
                ["Genre", "Mystery, Thriller"],
                ["Author", "Gosho Aoyama"],
                ["Serialized In", "Weekly Shōnen Sunday"],
                ["Manga Since", "January 19, 1994"],
                ["Anime Since", "January 8, 1996"],
                ["Studio", "TMS Entertainment"],
                ["Episodes", "1,100+"],
                ["Volumes", "107+"],
                ["Movies", "28 theatrical films"],
                ["Status", "🟢 Ongoing"],
              ].map(([k, v]) => (
                <div key={k} style={styles.infoRow}>
                  <span style={styles.infoKey}>{k}</span>
                  <span style={styles.infoVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHARACTERS ── */}
      <section id="characters" style={{ ...styles.section, background: "#0a0c14" }}>
        <div style={styles.sectionInner}>
          <div
            id="chars-reveal"
            data-reveal
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              ...(visible["chars-reveal"] ? styles.revealed : styles.hidden),
            }}
          >
            <div style={styles.sectionEyebrow}>👥 THE CAST</div>
            <h2 style={styles.sectionTitle}>
              Iconic <span style={styles.accent}>Characters</span>
            </h2>
            <p style={{ ...styles.bodyText, maxWidth: 560, margin: "0 auto" }}>
              From genius detectives to cunning villains, Detective Conan's cast
              is one of anime's most beloved and enduring.
            </p>
          </div>
          <div style={styles.charGrid}>
            {characters.map((c, i) => (
              <div
                key={i}
                id={`char-${i}`}
                data-reveal
                className="char-card"
                style={{
                  ...styles.charCard,
                  borderColor: c.color + "55",
                  ...(visible[`char-${i}`] ? styles.revealed : styles.hidden),
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                <div
                  style={{
                    ...styles.charEmoji,
                    background: c.color + "22",
                    border: `2px solid ${c.color}55`,
                  }}
                >
                  {c.emoji}
                </div>
                <span
                  style={{
                    ...styles.charBadge,
                    background: c.color + "22",
                    color: c.color,
                    border: `1px solid ${c.color}44`,
                  }}
                >
                  {c.badge}
                </span>
                <h3 style={{ ...styles.charName, color: c.color }}>{c.name}</h3>
                {c.real !== c.name && (
                  <p style={styles.charReal}>aka {c.real}</p>
                )}
                <p style={styles.charRole}>{c.role}</p>
                <p style={styles.charDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHOR ── */}
      <section id="author" style={styles.section}>
        <div
          id="author-reveal"
          data-reveal
          style={{
            ...styles.sectionInner,
            ...(visible["author-reveal"] ? styles.revealed : styles.hidden),
          }}
        >
          <div style={styles.authorWrap}>
            <div style={styles.authorLeft}>
              <div style={styles.authorImageWrap}>
                <div style={styles.authorImageRing}>
                  <div style={styles.authorImageInner}>
                    <span style={{ fontSize: 72 }}>✍️</span>
                  </div>
                </div>
                <div style={styles.authorGlow} />
              </div>
            </div>
            <div style={styles.authorRight}>
              <div style={styles.sectionEyebrow}>🎨 THE CREATOR</div>
              <h2 style={styles.sectionTitle}>
                Gosho <span style={styles.accent}>Aoyama</span>
              </h2>
              <p style={styles.authorSubtitle}>
                青山 剛昌 — The Mastermind Behind Every Mystery
              </p>
              <p style={styles.bodyText}>
                Born on <strong style={{ color: "#e0c97a" }}>June 21, 1963</strong>{" "}
                in Hokuei, Tottori, Japan, Gosho Aoyama is one of Japan's most
                celebrated manga artists. He studied at Nihon University College
                of Art and debuted professionally in 1987.
              </p>
              <p style={styles.bodyText}>
                Aoyama is best known for launching{" "}
                <strong style={{ color: "#4A90D9" }}>Detective Conan</strong> in
                1994 — a series that would become a cultural institution. His
                storytelling weaves intricate mysteries with heartfelt character
                development, creating a universe that has kept readers hooked for
                three decades.
              </p>
              <p style={styles.bodyText}>
                He was awarded the{" "}
                <strong style={{ color: "#e0c97a" }}>
                  Shogakukan Manga Award
                </strong>{" "}
                and his hometown even built the{" "}
                <strong style={{ color: "#e0c97a" }}>
                  Gosho Aoyama Manga Factory
                </strong>{" "}
                museum in his honor. His dedication to every panel, every clue,
                and every twist is what makes Detective Conan a timeless
                masterpiece.
              </p>
              <div style={styles.thankYouBox}>
                <div style={styles.thankYouInner}>
                  <span style={{ fontSize: 28 }}>🙏</span>
                  <div>
                    <strong
                      style={{
                        color: "#e0c97a",
                        display: "block",
                        marginBottom: 6,
                        fontSize: "1.05rem",
                      }}
                    >
                      A Heartfelt Thank You, Aoyama-sensei
                    </strong>
                    <p style={{ ...styles.bodyText, margin: 0, fontSize: "0.92rem" }}>
                      Thank you for 30+ years of mysteries, emotions, and the
                      unforgettable reminder that no matter how complex the
                      world gets —{" "}
                      <em style={{ color: "#e0c97a" }}>
                        there is always only one truth
                      </em>
                      . Detective Conan didn't just give us an anime. It gave us
                      a way of thinking. From every fan around the world —
                      ありがとう, sensei. 💙
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section
        id="news"
        style={{ ...styles.section, background: "#080a12" }}
      >
        <div style={styles.sectionInner}>
          <div
            id="news-reveal"
            data-reveal
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              ...(visible["news-reveal"] ? styles.revealed : styles.hidden),
            }}
          >
            <div style={styles.sectionEyebrow}>📰 LATEST</div>
            <h2 style={styles.sectionTitle}>
              Breaking <span style={styles.accent}>News & Updates</span>
            </h2>
          </div>
          <div style={styles.newsGrid}>
            {newsItems.map((n, i) => (
              <div
                key={i}
                id={`news-${i}`}
                data-reveal
                className="news-card"
                style={{
                  ...styles.newsCard,
                  ...(visible[`news-${i}`] ? styles.revealed : styles.hidden),
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <span
                  style={{
                    ...styles.newsBadge,
                    background: n.color + "22",
                    color: n.color,
                    border: `1px solid ${n.color}55`,
                  }}
                >
                  {n.tag}
                </span>
                <h3 style={styles.newsTitle}>{n.title}</h3>
                <p style={styles.newsDate}>{n.date}</p>
                <p style={styles.newsDesc}>{n.desc}</p>
                <button
                  className="read-more"
                  style={{ ...styles.readMore, color: n.color }}
                >
                  Read Full Story →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <span style={styles.logoIcon}>🔍</span>
            <span style={styles.logoText}>
              DETCO<span style={styles.logoAccent}>NEWS</span>HUB
            </span>
          </div>
          <p style={styles.footerTagline}>
            "There is always only one truth." — Shinichi Kudo
          </p>
          <div style={styles.footerLinks}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={styles.footerBtn}
                className="footer-btn"
              >
                {s.label}
              </button>
            ))}
          </div>
          <div style={styles.footerDivider} />
          <p style={styles.footerCredit}>
            Detective Conan © 1994 Gosho Aoyama / Shogakukan · TMS
            Entertainment · All rights to original creators. This is a fan
            tribute website.
          </p>
          <p style={styles.footerCredit}>
            Built with 💙 by a devoted fan — Detco News Hub {new Date().getFullYear()}
          </p>
          <div style={styles.footerImages}>
            <div style={styles.footerImageNote}>
              📸 Images sourced from Shogakukan, TMS Entertainment official
              releases, and Gosho Aoyama's official promotional artwork.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ──────────────────── STYLES ──────────────────── */
const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#060810",
    color: "#e8e0d5",
    minHeight: "100vh",
    overflowX: "hidden",
    scrollBehavior: "smooth",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "1rem 2rem",
    transition: "all 0.4s ease",
    borderBottom: "1px solid transparent",
  },
  navScrolled: {
    background: "rgba(6,8,16,0.95)",
    backdropFilter: "blur(20px)",
    borderBottomColor: "rgba(224,201,122,0.15)",
    padding: "0.75rem 2rem",
  },
  navInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    userSelect: "none",
  },
  logoIcon: { fontSize: "1.4rem" },
  logoText: {
    fontSize: "1.15rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#e8e0d5",
    fontFamily: "'Georgia', serif",
  },
  logoAccent: { color: "#e0c97a" },
  navLinks: {
    display: "flex",
    gap: "0.25rem",
  },
  navBtn: {
    background: "none",
    border: "none",
    color: "#c0b89a",
    fontSize: "0.88rem",
    letterSpacing: "0.08em",
    cursor: "pointer",
    padding: "0.5rem 1rem",
    fontFamily: "'Georgia', serif",
    textTransform: "uppercase",
    transition: "color 0.2s",
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    color: "#e0c97a",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    background: "rgba(6,8,16,0.98)",
    padding: "1rem",
    gap: "0.5rem",
  },
  mobileBtn: {
    background: "none",
    border: "none",
    color: "#c0b89a",
    fontSize: "1rem",
    cursor: "pointer",
    padding: "0.75rem",
    textAlign: "left",
    fontFamily: "'Georgia', serif",
    borderBottom: "1px solid rgba(224,201,122,0.1)",
  },

  /* HERO */
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "8rem 2rem 4rem",
    flexWrap: "wrap",
    gap: "3rem",
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(224,201,122,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(224,201,122,0.04) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    zIndex: 0,
  },
  heroOrbs: { position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.18,
  },
  orb1: {
    width: 500,
    height: 500,
    background: "#4A90D9",
    top: "-10%",
    right: "-5%",
  },
  orb2: {
    width: 400,
    height: 400,
    background: "#e0c97a",
    bottom: "-5%",
    left: "-5%",
  },
  orb3: {
    width: 300,
    height: 300,
    background: "#9B59B6",
    top: "40%",
    left: "40%",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 640,
    flex: "1 1 320px",
  },
  heroEyebrow: {
    fontSize: "0.78rem",
    letterSpacing: "0.18em",
    color: "#e0c97a",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    fontFamily: "'Georgia', serif",
  },
  heroTitle: {
    margin: "0 0 1.5rem",
    lineHeight: 1,
  },
  heroTitleLine1: {
    display: "block",
    fontSize: "clamp(4rem, 12vw, 8rem)",
    fontWeight: 900,
    color: "#e8e0d5",
    letterSpacing: "-0.02em",
    fontFamily: "'Georgia', serif",
    textShadow: "0 0 60px rgba(224,201,122,0.15)",
  },
  heroTitleLine2: {
    display: "block",
    fontSize: "clamp(2.2rem, 6vw, 4rem)",
    fontWeight: 400,
    color: "#e0c97a",
    letterSpacing: "0.25em",
    fontStyle: "italic",
    fontFamily: "'Georgia', serif",
  },
  heroQuote: {
    fontSize: "1.15rem",
    fontStyle: "italic",
    color: "#a09278",
    borderLeft: "3px solid #e0c97a",
    paddingLeft: "1rem",
    marginBottom: "1.5rem",
    minHeight: "2.5rem",
    transition: "opacity 0.4s",
  },
  heroSub: {
    fontSize: "1rem",
    color: "#9a9280",
    lineHeight: 1.75,
    marginBottom: "2.5rem",
  },
  heroBtns: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  btnPrimary: {
    background: "#e0c97a",
    color: "#060810",
    border: "none",
    padding: "0.85rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    transition: "all 0.25s",
  },
  btnGhost: {
    background: "transparent",
    color: "#e0c97a",
    border: "1px solid rgba(224,201,122,0.4)",
    padding: "0.85rem 2rem",
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    transition: "all 0.25s",
  },
  heroDecor: {
    position: "relative",
    zIndex: 2,
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  magnifyRing: {
    width: 220,
    height: 220,
    borderRadius: "50%",
    border: "2px solid rgba(224,201,122,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 60px rgba(74,144,217,0.12), inset 0 0 60px rgba(224,201,122,0.04)",
    animation: "spin-ring 20s linear infinite",
    background: "radial-gradient(circle, rgba(74,144,217,0.06) 0%, transparent 70%)",
  },
  magnifyInner: {
    width: 160,
    height: 160,
    borderRadius: "50%",
    background: "rgba(224,201,122,0.06)",
    border: "1px solid rgba(224,201,122,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  magnifyEmoji: { fontSize: 72 },
  floatBadge1: {
    position: "absolute",
    top: "10%",
    right: "-20%",
    background: "rgba(224,201,122,0.1)",
    border: "1px solid rgba(224,201,122,0.3)",
    color: "#e0c97a",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    padding: "0.4rem 0.8rem",
  },
  floatBadge2: {
    position: "absolute",
    bottom: "15%",
    left: "-20%",
    background: "rgba(74,144,217,0.1)",
    border: "1px solid rgba(74,144,217,0.3)",
    color: "#4A90D9",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    padding: "0.4rem 0.8rem",
  },
  scrollHint: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    color: "rgba(224,201,122,0.4)",
    fontSize: "0.78rem",
    letterSpacing: "0.15em",
    zIndex: 2,
  },

  /* STATS */
  statsStrip: {
    background: "rgba(224,201,122,0.06)",
    borderTop: "1px solid rgba(224,201,122,0.12)",
    borderBottom: "1px solid rgba(224,201,122,0.12)",
    padding: "2rem 2rem",
  },
  statsInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "2rem 3rem",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    minWidth: 100,
  },
  statIcon: { fontSize: "1.8rem" },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#e0c97a",
    fontFamily: "'Georgia', serif",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#8a8070",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  /* SECTIONS */
  section: {
    padding: "6rem 2rem",
    background: "#060810",
  },
  sectionInner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  sectionEyebrow: {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    color: "#e0c97a",
    textTransform: "uppercase",
    marginBottom: "1rem",
    fontFamily: "'Georgia', serif",
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 700,
    margin: "0 0 1.5rem",
    lineHeight: 1.2,
    color: "#e8e0d5",
    fontFamily: "'Georgia', serif",
  },
  accent: { color: "#e0c97a" },

  /* ABOUT */
  aboutGrid: {
    display: "flex",
    gap: "4rem",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  aboutLeft: { flex: "1 1 380px" },
  aboutRight: { flex: "0 1 360px" },
  bodyText: {
    fontSize: "1rem",
    lineHeight: 1.85,
    color: "#a09280",
    marginBottom: "1.25rem",
  },
  aboutTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.5rem",
  },
  tag: {
    background: "rgba(224,201,122,0.08)",
    border: "1px solid rgba(224,201,122,0.2)",
    color: "#e0c97a",
    padding: "0.3rem 0.8rem",
    fontSize: "0.78rem",
    letterSpacing: "0.1em",
  },
  aboutCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(224,201,122,0.12)",
    padding: "1.5rem",
  },
  aboutCardHeader: {
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    color: "#e0c97a",
    textTransform: "uppercase",
    marginBottom: "1rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid rgba(224,201,122,0.1)",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
    padding: "0.5rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    fontSize: "0.88rem",
  },
  infoKey: { color: "#6a6258", flex: "0 0 auto", letterSpacing: "0.04em" },
  infoVal: { color: "#c0b89a", textAlign: "right", fontStyle: "italic" },

  /* CHARACTERS */
  charGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  charCard: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid",
    padding: "2rem 1.5rem",
    transition: "transform 0.3s, box-shadow 0.3s, opacity 0.5s, translate 0.5s",
  },
  charEmoji: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  charBadge: {
    display: "inline-block",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    padding: "0.25rem 0.6rem",
    marginBottom: "0.75rem",
    textTransform: "uppercase",
  },
  charName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    margin: "0 0 0.25rem",
    fontFamily: "'Georgia', serif",
  },
  charReal: {
    fontSize: "0.8rem",
    color: "#6a6258",
    fontStyle: "italic",
    margin: "0 0 0.3rem",
  },
  charRole: {
    fontSize: "0.78rem",
    color: "#8a8070",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "0 0 1rem",
  },
  charDesc: {
    fontSize: "0.9rem",
    color: "#8a8070",
    lineHeight: 1.7,
    margin: 0,
  },

  /* AUTHOR */
  authorWrap: {
    display: "flex",
    gap: "4rem",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  authorLeft: {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  authorRight: { flex: "1 1 380px" },
  authorImageWrap: { position: "relative", width: 200, height: 200 },
  authorImageRing: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "2px solid rgba(224,201,122,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "spin-ring 25s linear infinite",
  },
  authorImageInner: {
    width: 160,
    height: 160,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(224,201,122,0.08), rgba(74,144,217,0.06))",
    border: "1px solid rgba(224,201,122,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  authorGlow: {
    position: "absolute",
    inset: "-20px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(224,201,122,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  authorSubtitle: {
    fontSize: "0.9rem",
    color: "#6a6258",
    fontStyle: "italic",
    margin: "-0.5rem 0 1.5rem",
    letterSpacing: "0.06em",
  },
  thankYouBox: {
    background: "linear-gradient(135deg, rgba(224,201,122,0.07), rgba(74,144,217,0.05))",
    border: "1px solid rgba(224,201,122,0.2)",
    padding: "1.5rem",
    marginTop: "2rem",
  },
  thankYouInner: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },

  /* NEWS */
  newsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.5rem",
  },
  newsCard: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "1.75rem",
    transition: "all 0.3s",
  },
  newsBadge: {
    display: "inline-block",
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    padding: "0.25rem 0.6rem",
    marginBottom: "1rem",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  newsTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#e8e0d5",
    margin: "0 0 0.5rem",
    lineHeight: 1.4,
    fontFamily: "'Georgia', serif",
  },
  newsDate: {
    fontSize: "0.75rem",
    color: "#5a5248",
    margin: "0 0 0.75rem",
    letterSpacing: "0.08em",
  },
  newsDesc: {
    fontSize: "0.88rem",
    color: "#7a7268",
    lineHeight: 1.7,
    margin: "0 0 1.25rem",
  },
  readMore: {
    background: "none",
    border: "none",
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    cursor: "pointer",
    padding: 0,
    fontFamily: "'Georgia', serif",
    transition: "opacity 0.2s",
  },

  /* FOOTER */
  footer: {
    background: "#030507",
    borderTop: "1px solid rgba(224,201,122,0.1)",
    padding: "4rem 2rem 2rem",
  },
  footerInner: {
    maxWidth: 900,
    margin: "0 auto",
    textAlign: "center",
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  footerTagline: {
    fontStyle: "italic",
    color: "#6a6258",
    marginBottom: "2rem",
    fontSize: "0.95rem",
  },
  footerLinks: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.25rem",
    marginBottom: "2rem",
  },
  footerBtn: {
    background: "none",
    border: "none",
    color: "#6a6258",
    fontSize: "0.82rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    padding: "0.4rem 0.8rem",
    fontFamily: "'Georgia', serif",
    transition: "color 0.2s",
  },
  footerDivider: {
    height: 1,
    background: "rgba(224,201,122,0.08)",
    margin: "2rem 0",
  },
  footerCredit: {
    fontSize: "0.78rem",
    color: "#4a4840",
    margin: "0.5rem 0",
    letterSpacing: "0.04em",
  },
  footerImages: { marginTop: "1.5rem" },
  footerImageNote: {
    fontSize: "0.72rem",
    color: "#3a3830",
    fontStyle: "italic",
    letterSpacing: "0.04em",
  },

  /* REVEAL ANIMATION STATES */
  hidden: { opacity: 0, transform: "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" },
  revealed: { opacity: 1, transform: "translateY(0)", transition: "opacity 0.7s ease, transform 0.7s ease" },
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #060810; }

  @keyframes spin-ring {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes float-r {
    0%, 100% { transform: translateY(-6px) rotate(-2deg); }
    50% { transform: translateY(6px) rotate(2deg); }
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.9; }
  }

  @keyframes quoteFade {
    from { opacity: 0; transform: translateX(8px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .fade-in-up { animation: fadeInUp 0.8s ease both; }
  .delay-1 { animation-delay: 0.15s; }
  .delay-2 { animation-delay: 0.35s; }
  .delay-3 { animation-delay: 0.55s; }
  .delay-4 { animation-delay: 0.7s; }
  .delay-5 { animation-delay: 0.85s; }

  .quote-fade { animation: quoteFade 0.5s ease both; }
  .float-anim { animation: float 4s ease-in-out infinite; }
  .float-anim-r { animation: float-r 5s ease-in-out infinite; }
  .scroll-hint { animation: scrollPulse 2.5s ease-in-out infinite; }

  .nav-btn:hover { color: #e0c97a !important; }
  .footer-btn:hover { color: #e0c97a !important; }

  .btn-primary:hover {
    background: #f0d98a !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(224,201,122,0.25);
  }
  .btn-ghost:hover {
    background: rgba(224,201,122,0.08) !important;
    transform: translateY(-2px);
  }

  .char-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  }

  .news-card:hover {
    transform: translateY(-4px);
    border-color: rgba(224,201,122,0.15) !important;
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
  }

  .read-more:hover { opacity: 0.7; }

  @media (max-width: 768px) {
    nav .navLinks { display: none !important; }
    .hamburger { display: block !important; }
    .heroDecor { display: none !important; }
  }
`;
