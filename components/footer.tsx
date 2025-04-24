'use client';
import { useState, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"
import {Phone, Mail, MapPin} from "lucide-react"
import React from "react";
import { BASE_URL } from '@/const';

// Define interface for contact info data from API
interface ContactInfoData {
    address: string;
    email: string;
    phone: string;
    // Add other fields if needed later
}

// Define default values
const defaultContactInfo: ContactInfoData = {
    phone: "+49 1521 3000777", // Default phone
    email: "info@bakubau.de",   // Default email
    address: "50321 Bruhl Burg straße 3" // Default address
};

export function Footer() {
    // Add state for contact info, loading, error
    const [contactInfo, setContactInfo] = useState<ContactInfoData>(defaultContactInfo);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data on mount
    useEffect(() => {
        const fetchContactInfo = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BASE_URL}/contact-info`);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                const result = await response.json();
                if (result.success && result.data) {
                    setContactInfo({
                        address: result.data.address || defaultContactInfo.address,
                        email: result.data.email || defaultContactInfo.email,
                        phone: result.data.phone || defaultContactInfo.phone,
                    });
                } else {
                    console.warn("Failed to fetch valid contact info, using defaults.");
                    setContactInfo(defaultContactInfo); // Use defaults if success is false or data missing
                }
            } catch (err) {
                console.error("Error fetching footer contact info:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
                setContactInfo(defaultContactInfo); // Use defaults on error
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, []);

    return (
        <footer className="bg-brand-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div>
                        <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trans0-cJO3yeHpjY1mhnSWkzby8c1fMNpA6v.png"
                            alt="Baku Bau GmbH"
                            width={150}
                            height={50}
                            className="mb-4"
                        />
                        <p className="text-gray-400">Ihr zuverlässiger Partner für Bau- und Infrastrukturprojekte</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg capitalize font-bold mb-4">Kontakt</h3>
                        {loading ? (
                            <div className="space-y-3 animate-pulse">
                                <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-5 bg-gray-700 rounded w-1/2"></div>
                                <div className="h-5 bg-gray-700 rounded w-2/3"></div>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <Phone className="h-5 w-5 mr-2 text-brand-yellow flex-shrink-0"/>
                                    <span>{contactInfo.phone}</span>
                                </li>
                                <li className="flex  items-center">
                                    <Mail className="h-5 w-5 mr-2 text-brand-yellow flex-shrink-0"/>
                                    <span>{contactInfo.email}</span>
                                </li>
                                <li className="flex items-start">
                                    <MapPin className="h-5 w-5 mr-2 text-brand-yellow flex-shrink-0 mt-1"/>
                                    <span className="whitespace-pre-line">{contactInfo.address}</span>
                                </li>
                            </ul>
                        )}
                        {error && <p className="text-red-500 text-xs mt-2">Kontaktinfos konnten nicht geladen werden.</p>}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg capitalize font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:text-brand-yellow capitalize transition-colors">
                                    Über Uns
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-brand-yellow capitalize transition-colors">
                                    Leistungen
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="hover:text-brand-yellow capitalize transition-colors">
                                    Projekte
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-brand-yellow capitalize transition-colors">
                                    Kontakt
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    {/*<div>*/}
                    {/*    <h3 className="text-lg capitalize font-bold mb-4">Rechtliches</h3>*/}
                    {/*    <ul className="space-y-2">*/}
                    {/*        <li>*/}
                    {/*            <Link href="/privacy" className="hover:text-brand-yellow transition-colors">*/}
                    {/*                Datenschutz*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link href="/imprint" className="hover:text-brand-yellow transition-colors">*/}
                    {/*                Impressum*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link href="/terms" className="hover:text-brand-yellow transition-colors">*/}
                    {/*                AGB*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>

                <div
                    className="border-t flex sm:justify-between justify-center flex-col sm:flex-row border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Baku Bau GmbH. Alle Rechte vorbehalten.</p>
                    <div className={'flex sm:mt-0 mt-4 justify-center sm:justify-end'}>
                        <div className={"mr-3"}> Site by</div>
                        <Link target={"_blank"} href={"http://four.az/"}>
                            <Image src={'/four.png'} alt={"four.png"} height={30} width={100}/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

