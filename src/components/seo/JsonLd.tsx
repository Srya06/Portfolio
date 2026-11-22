import { site } from "@/content/site";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.shortName,
    jobTitle: site.role,
    description: site.tagline,
    url: site.url,
    sameAs: [site.github, site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mysuru",
      addressRegion: "Karnataka",
      addressCountry: "India",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Maharaja Institute of Technology Mysore",
    },
    knowsAbout: [
      "Machine Learning",
      "Artificial Intelligence",
      "Agentic Systems",
      "Full-Stack Web Development",
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "Computer Vision",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — ${site.role}`,
    url: site.url,
    description: site.tagline,
    author: {
      "@type": "Person",
      name: site.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
