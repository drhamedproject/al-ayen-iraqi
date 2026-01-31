import logo from "@/assets/logo.png";
import TelegramIcon from "@/components/icons/TelegramIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import TikTokIcon from "@/components/icons/TikTokIcon";
import NewsFeed from "@/components/NewsFeed";

const socialLinks = [
  {
    href: "https://t.me/alayen_T",
    icon: TelegramIcon,
    label: "Telegram",
  },
  {
    href: "https://m.facebook.com/alayen.almushriqa/",
    icon: FacebookIcon,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/alayen_ufi?igsh=bWRnaHhzMWVzNWNj",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@alayen_ufi",
    icon: TikTokIcon,
    label: "TikTok",
  },
];

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Logo - Circular */}
        <div className="animate-float mb-8 flex items-center justify-center">
          <div className="glow-gold relative overflow-hidden rounded-full border-4 border-primary bg-card p-2 shadow-lg">
            <img
              src={logo}
              alt="جامعة العين العراقية"
              className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-gradient-gold mb-2 text-center font-cairo text-2xl font-bold tracking-wide sm:text-3xl">
          مؤسسة جامعة العين العراقية الانسانية
        </h1>
        <p className="mb-10 text-center font-cairo text-lg text-foreground">
          Al-Ayen Iraqi University Humanitarian Foundation
        </p>

        {/* Social Links */}
        <div className="glass-card w-full space-y-4 p-6 sm:p-8">
          {socialLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social group flex w-full items-center justify-center gap-3"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <link.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-cairo font-semibold">{link.label}</span>
            </a>
          ))}
        </div>

        {/* News Feed */}
        <div className="mt-8 w-full">
          <NewsFeed />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} مؤسسة جامعة العين العراقية. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  );
};

export default Index;
