import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  image?: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const extractImageFromDescription = (description: string): string | undefined => {
    const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
    return imgMatch ? imgMatch[1] : undefined;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const rssUrl = "https://fetchrss.com/feed/1vm8Zr4o2F9O1vm8ZP5T74bC.rss";
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.contents) {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data.contents, "text/xml");
          const items = xml.querySelectorAll("item");
          
          const newsItems: NewsItem[] = [];
          items.forEach((item, index) => {
            if (index < 5) {
              const description = item.querySelector("description")?.textContent || "";
              
              // Try to get image from enclosure, media:content, or description
              let image = item.querySelector("enclosure")?.getAttribute("url") ||
                          item.querySelector("media\\:content, content")?.getAttribute("url") ||
                          item.querySelector("media\\:thumbnail, thumbnail")?.getAttribute("url") ||
                          extractImageFromDescription(description);
              
              newsItems.push({
                title: item.querySelector("title")?.textContent || "",
                link: item.querySelector("link")?.textContent || "",
                pubDate: item.querySelector("pubDate")?.textContent || "",
                description,
                image,
              });
            }
          });
          
          setNews(newsItems);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("حدث خطأ في تحميل الأخبار");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("ar-IQ", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-3">
        <h2 className="text-gradient-gold mb-4 text-center font-cairo text-xl font-bold">
          آخر الأخبار
        </h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card flex flex-col gap-3 p-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center text-muted-foreground">
        <p>{error}</p>
      </div>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-gradient-gold mb-4 text-center font-cairo text-xl font-bold">
        آخر الأخبار
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card group flex flex-col overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-md"
          >
            {/* News Image */}
            <div className="h-40 w-full overflow-hidden bg-muted">
              <img
                src={item.image || logo}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = logo;
                }}
              />
            </div>
            
            {/* News Content */}
            <div className="flex flex-1 flex-col justify-between p-4 text-right">
              <h3 className="line-clamp-2 font-cairo text-sm font-semibold leading-relaxed text-foreground group-hover:text-primary">
                {item.title}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <p className="text-xs text-muted-foreground">
                  {formatDate(item.pubDate)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
