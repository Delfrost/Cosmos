'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white pt-20 pb-10 overflow-hidden">
      
      {/* 1. TOP SECTION: CTA & LINKS */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          
          {/* Brand & Mission */}
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Ready to scale?
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We build digital products that define the future. From immersive 3D web experiences to enterprise AI agents, we turn complexity into competitive advantage.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="mailto:hello@cosmos.agency" icon={<Mail className="w-5 h-5" />} />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><FooterLink href="/gaming">Gaming & VR</FooterLink></li>
                <li><FooterLink href="/ai">AI Automation</FooterLink></li>
                <li><FooterLink href="/fullstack">Fullstack Dev</FooterLink></li>
                <li><FooterLink href="/consulting">Tech Consulting</FooterLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><FooterLink href="/about">About Us</FooterLink></li>
                <li><FooterLink href="/careers">Careers</FooterLink></li>
                <li><FooterLink href="/blog">Blog</FooterLink></li>
                <li><FooterLink href="/contact">Contact</FooterLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
                <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM SECTION: COPYRIGHT */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} Cosmos Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Vadodara, India</span>
            <span>Designed by Anant & Team</span>
          </div>
        </div>
      </div>

      {/* 3. BIG WATERMARK TEXT (Background) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-10 select-none">
        <h1 className="text-[15vw] font-bold text-white leading-none tracking-tighter text-center whitespace-nowrap opacity-20">
          COSMOS
        </h1>
      </div>

    </footer>
  );
}

// Helper Components for cleaner code
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-white transition-colors flex items-center gap-1 group">
      {children}
      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 transition-all" />
    </Link>
  );
}