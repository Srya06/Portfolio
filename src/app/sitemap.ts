import { MetadataRoute } from "next";
import { site } from "@/content/site";
import { doors } from "@/content/doors";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const now = new Date();

  // Root homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Category pages from doors
  doors.forEach((door) => {
    routes.push({
      url: `${baseUrl}/work/${door.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // Project case study pages
  projects.forEach((proj) => {
    routes.push({
      url: `${baseUrl}/work/${proj.category}/${proj.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  });

  return routes;
}
