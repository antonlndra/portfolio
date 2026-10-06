import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Anto",
  initials: "A",
  url: "https://x.com/antongzx",
  location: "España",
  description:
    "Diseñador. Ayudo a negocios a mejorar su funnel, su web y el contenido que vende.",
  summary:
    "Soy diseñador. Ayudo a infoproductores, servicios y agencias a escalar su marca: adquisición, webs y piezas que se notan en el negocio. Llevo diseñando desde los 12 años. Me importa lo que se ve y lo que no se ve: el recorrido, el mensaje y la forma en que alguien decide escribirte.",
  avatarUrl: "",
  skills: [
    { name: "Diseño web" },
    { name: "Funnels" },
    { name: "Branding" },
    { name: "Contenido" },
    { name: "Estrategia creativa" },
    { name: "UI" },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Inicio" }],
  contact: {
    email: "",
    tel: "",
    social: {
      X: {
        name: "X",
        url: "https://x.com/antongzx",
        icon: Icons.x,
        navbar: true,
      },
      Kairo: {
        name: "Kairo",
        url: "https://getkairo.es",
        icon: Icons.globe,
        navbar: true,
      },
    },
  },
  education: [
    {
      school: "Cambridge English",
      href: "https://www.cambridgeenglish.org/",
      degree: "B2 First Certificate",
      logoUrl: "",
      start: "",
      end: "",
    },
  ],
  projects: [
    {
      title: "Kairo",
      href: "https://getkairo.es",
      dates: "2026",
      active: true,
      description:
        "Lo más reciente que sigue publicado. Una web pensada para que el producto se vea claro, preciso y a la altura de lo que ofrece.",
      technologies: ["Web", "Producto", "Diseño"],
      links: [
        {
          type: "Website",
          href: "https://getkairo.es",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/kairo/hero-v2.png",
      video: "",
    },
    {
      title: "Cunina",
      href: "https://cunina.es/",
      dates: "2026",
      active: true,
      description:
        "Web para Cunina: claridad en el mensaje y un recorrido que invita a conocer el proyecto.",
      technologies: ["Web", "Diseño", "UI"],
      links: [
        {
          type: "Website",
          href: "https://cunina.es/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/cunina/hero-v2.png",
      video: "",
    },
    {
      title: "Grabit",
      href: "#",
      dates: "2026",
      active: true,
      description:
        "App y marca para reservar taquillas: identidad, pantallas y flujo de uso en un solo sistema.",
      technologies: ["App", "Branding", "UI"],
      links: [],
      image: "/projects/grabit/home.png",
      video: "",
      gallery: [
        {
          src: "/projects/grabit/home.png",
          alt: "Grabit — pantalla de inicio",
        },
        {
          src: "/projects/grabit/locker.png",
          alt: "Grabit — vista de taquilla en directo",
        },
        {
          src: "/projects/grabit/order.png",
          alt: "Grabit — taquilla reservada",
        },
        {
          src: "/projects/grabit/wordmark.jpg",
          alt: "Grabit — wordmark",
        },
        {
          src: "/projects/grabit/mark.jpg",
          alt: "Grabit — marca it",
        },
      ],
    },
    {
      title: "Fintols",
      href: "#",
      dates: "2026",
      active: true,
      description:
        "Producto financiero con hero y piezas de informe pensadas para explicar sin jerga.",
      technologies: ["Producto", "Web", "UI"],
      links: [],
      image: "/projects/fintols/hero.png",
      video: "",
      gallery: [
        {
          src: "/projects/fintols/hero.png",
          alt: "Fintols — hero con cielo y mockups de producto",
        },
        {
          src: "/projects/fintols/informe.png",
          alt: "Fintols — informe de empresa explicado sin jerga",
        },
      ],
    },
  ],
  gallery: [
    {
      type: "bento" as const,
      title: "Grabit",
      items: [
        {
          src: "/projects/grabit/wordmark.jpg",
          alt: "Grabit — wordmark",
          span: "wide" as const,
        },
        {
          src: "/projects/grabit/mark.jpg",
          alt: "Grabit — marca it",
          span: "square" as const,
        },
        {
          src: "/projects/grabit/home.png",
          alt: "Grabit — pantalla de inicio",
          span: "tall" as const,
        },
        {
          src: "/projects/grabit/locker.png",
          alt: "Grabit — vista de taquilla en directo",
          span: "tall" as const,
        },
        {
          src: "/projects/grabit/order.png",
          alt: "Grabit — taquilla reservada",
          span: "tall" as const,
        },
      ],
    },
    {
      type: "shot" as const,
      title: "Cunina",
      src: "/projects/cunina/hero-v2.png",
      alt: "Cunina — hero del centro socioeducativo",
    },
    {
      type: "shot" as const,
      title: "Kairo",
      src: "/projects/kairo/hero-v2.png",
      alt: "Kairo — hero waitlist",
    },
    {
      type: "shot" as const,
      title: "Fintols",
      src: "/projects/fintols/hero.png",
      alt: "Fintols — hero con cielo y mockups de producto",
    },
    {
      type: "shot" as const,
      title: "Fintols",
      src: "/projects/fintols/informe.png",
      alt: "Fintols — informe de empresa explicado sin jerga",
    },
  ],
} as const;
