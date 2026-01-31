import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  delay?: number;
}

const SocialLink = ({ href, icon: Icon, label, delay = 0 }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-social group flex w-full items-center justify-center gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
      <span>{label}</span>
    </a>
  );
};

export default SocialLink;
