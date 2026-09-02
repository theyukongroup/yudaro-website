import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react';
import './globals.css';
import './extended.css';
const sans=Geist({variable:'--font-sans',subsets:['latin']}); const mono=Geist_Mono({variable:'--font-mono',subsets:['latin']});
export const metadata:Metadata={title:{default:'Nexavoris | AI & ERP Systems',template:'%s | Nexavoris'},description:'Private enterprise AI, ERP implementation, and intelligent business automation for growing companies.',metadataBase:new URL('https://nexavoris.com'),icons:{icon:'/favicon.svg'},openGraph:{title:'Nexavoris AI & ERP Systems',description:'One integrated operating system for your business.',type:'website',images:[{url:'/og.png',width:1200,height:630,alt:'Nexavoris AI & ERP Systems'}]},twitter:{card:'summary_large_image',title:'Nexavoris AI & ERP Systems',description:'Private AI, ERP, and automation for operational businesses.',images:['/og.png']}};
const nav=[['AI Solutions','/ai-solutions'],['ERP Solutions','/erp-solutions'],['AI + ERP','/ai-erp'],['Industries','/industries'],['How It Works','/#process'],['About','/about']];
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className="dark"><body className={`${sans.variable} ${mono.variable}`}><header><Link className="brand" href="/"><b>N</b><span>NEXAVORIS<small>AI & ERP SYSTEMS</small></span></Link><nav>{nav.map(([l,h])=><Link key={l} href={h}>{l}</Link>)}</nav><Link className="nav-cta" href="/contact">Schedule a Consultation <ArrowUpRight size={16}/></Link></header>{children}<footer><div className="brand"><b>N</b><span>NEXAVORIS<small>AI & ERP SYSTEMS</small></span></div><p>AI that understands your business. ERP that runs it.</p><span>© 2026 Nexavoris. All rights reserved.</span></footer></body></html>}
