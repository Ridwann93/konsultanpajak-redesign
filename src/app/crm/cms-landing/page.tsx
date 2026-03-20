"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { LayoutDashboard, Type, AlertCircle } from "lucide-react";

export default function CMSLanding() {
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState("");
    const [content, setContent] = useState<any>({
        hero_title: "",
        hero_subtitle: "",

        services_header: "",
        services_title: "",
        services_item1_title: "", services_item1_desc: "",
        services_item2_title: "", services_item2_desc: "",
        services_item3_title: "", services_item3_desc: "",
        services_item4_title: "", services_item4_desc: "",
        services_item5_title: "", services_item5_desc: "",
        services_item6_title: "", services_item6_desc: "",

        about_header: "",
        about_title: "",
        about_desc: "",
        about_card_title: "",
        about_card_desc: "",
        about_visi_title: "",
        about_visi_desc: "",
        about_misi_title: "",
        about_misi_desc: "",

        contact_header: "",
        contact_header2: "",
        contact_phone: "",
        contact_email: "",
        contact_address: "",
        contact_hours: "",
    });

    useEffect(() => {
        async function fetchContent() {
            const { data } = await supabase.from("landing_contents").select("*");
            if (data) {
                const formatted = data.reduce((acc: any, item: any) => {
                    const key = `${item.section_name.toLowerCase()}_${item.content_key.toLowerCase()}`;
                    acc[key] = item.content_value;
                    return acc;
                }, {});
                setContent((prev: any) => ({ ...prev, ...formatted }));
            }
        }
        fetchContent();
    }, []);

    const handleUpdate = async (section: string, key: string, value: string) => {
        setLoading(true);
        setSaveStatus("Menyimpan...");

        const { error } = await supabase
            .from("landing_contents")
            .upsert({
                section_name: section,
                content_key: key,
                content_value: value
            }, { onConflict: "section_name,content_key" });

        if (error) {
            setSaveStatus("Gagal!");
            alert("Error: " + error.message);
        } else {
            setSaveStatus("Tersimpan!");
            setTimeout(() => setSaveStatus(""), 2000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 text-slate-800">
            <div className="max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                            <LayoutDashboard className="text-teal-600" /> Pengelola Konten Web
                        </h1>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-teal-500'}`}></div>
                        <span className="text-sm font-medium text-slate-600">{saveStatus || "Sistem Siap"}</span>
                    </div>
                </div>

                <div className="grid gap-8">

                    {/* Section HERO */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
                        <div className="bg-teal-700 p-4 text-white font-bold">Section: Hero</div>
                        <div className="p-8 space-y-6">
                            <p className="font-bold text-teal-700">Title</p>
                            <textarea
                                className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                value={content.hero_title}
                                onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                                onBlur={() => handleUpdate("hero", "title", content.hero_title)}
                                placeholder="Judul Hero"
                            />
                            <p className="font-bold text-teal-700">Subtitle</p>
                            <textarea
                                className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                value={content.hero_subtitle}
                                onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
                                onBlur={() => handleUpdate("hero", "subtitle", content.hero_subtitle)}
                                placeholder="Subtitle Hero"
                            />
                        </div>
                    </div>

                    {/* Section SERVICES */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
                        <div className="bg-teal-700 p-4 text-white font-bold">Section: Services</div>
                        <div className="p-8 space-y-8">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Header</p>
                                    <input
                                    className="p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                    value={content.services_header}
                                    onChange={(e) => setContent({ ...content, services_header: e.target.value })}
                                    onBlur={() => handleUpdate("services", "header", content.services_header)}
                                    placeholder="Header (Layanan Kami)"
                                />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Header 2</p>
                                    <input
                                    className="p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                    value={content.services_title}
                                    onChange={(e) => setContent({ ...content, services_title: e.target.value })}
                                    onBlur={() => handleUpdate("services", "title", content.services_title)}
                                    placeholder="Judul Utama Services"
                                />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div key={num} className="p-4 bg-slate-50 rounded-xl border">
                                        <p className="text-xs font-bold text-teal-600 mb-2">ITEM {num}</p>
                                        <input
                                            className="w-full mb-2 p-2 border rounded-lg outline-none"
                                            value={content[`services_item${num}_title`] || ""}
                                            onChange={(e) => setContent({ ...content, [`services_item${num}_title`]: e.target.value })}
                                            onBlur={() => handleUpdate("services", `item${num}_title`, content[`services_item${num}_title`])}
                                            placeholder="Judul Layanan"
                                        />
                                        <textarea
                                            className="w-full p-2 border rounded-lg outline-none h-20"
                                            value={content[`services_item${num}_desc`] || ""}
                                            onChange={(e) => setContent({ ...content, [`services_item${num}_desc`]: e.target.value })}
                                            onBlur={() => handleUpdate("services", `item${num}_desc`, content[`services_item${num}_desc`])}
                                            placeholder="Deskripsi"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section ABOUT */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden mt-8">
                        <div className="bg-teal-700 p-4 text-white font-bold">Section: About</div>
                        <div className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Header</p>
                                    <input
                                    className="p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                                    value={content.about_header || ""}
                                    onChange={(e) => setContent({ ...content, about_header: e.target.value })}
                                    onBlur={() => handleUpdate("about", "header", content.about_header)}
                                    placeholder="Header (Tentang Kami)"
                                />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Header 2</p>
                                    <input
                                    className="p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                                    value={content.about_title || ""}
                                    onChange={(e) => setContent({ ...content, about_title: e.target.value })}
                                    onBlur={() => handleUpdate("about", "title", content.about_title)}
                                    placeholder="Judul Utama About"
                                />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="font-bold text-teal-700">Deskripsi About</p>
                                <textarea
                                className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-sky-500 h-24"
                                value={content.about_desc || ""}
                                onChange={(e) => setContent({ ...content, about_desc: e.target.value })}
                                onBlur={() => handleUpdate("about", "desc", content.about_desc)}
                                placeholder="Deskripsi Singkat About"
                            />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                                {/* Kolom Kiri - Card Info */}
                                <div className="space-y-4">
                                    <p className="font-bold text-teal-700">Info Card (Kiri)</p>
                                    <input
                                        className="w-full p-3 bg-slate-50 border rounded-lg"
                                        value={content.about_card_title || ""}
                                        onChange={(e) => setContent({ ...content, about_card_title: e.target.value })}
                                        onBlur={() => handleUpdate("about", "card_title", content.about_card_title)}
                                        placeholder="Judul Card"
                                    />
                                    <textarea
                                        className="w-full p-3 bg-slate-50 border rounded-lg h-20"
                                        value={content.about_card_desc || ""}
                                        onChange={(e) => setContent({ ...content, about_card_desc: e.target.value })}
                                        onBlur={() => handleUpdate("about", "card_desc", content.about_card_desc)}
                                        placeholder="Deskripsi Card"
                                    />
                                </div>

                                {/* Kolom Kanan - Visi Misi */}
                                <div className="space-y-4">
                                    <p className="font-bold text-teal-700">Visi</p>
                                    <input
                                        className="w-full p-2 bg-slate-50 border rounded-lg mb-4"
                                        value={content.about_visi_title || ""}
                                        onChange={(e) => setContent({ ...content, about_visi_title: e.target.value })}
                                        onBlur={() => handleUpdate("about", "visi_title", content.about_visi_title)}
                                        placeholder="Judul Visi"
                                    />
                                    <textarea
                                        className="w-full p-2 border rounded-lg h-16 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                                        value={content.about_visi_desc || ""}
                                        onChange={(e) => setContent({ ...content, about_visi_desc: e.target.value })}
                                        onBlur={() => handleUpdate("about", "visi_desc", content.about_visi_desc)}
                                        placeholder="Deskripsi Visi"
                                    />
                                    <p className="font-bold text-teal-700">Misi</p>
                                    <input
                                        className="w-full p-2 bg-slate-50 border rounded-lg mb-4"
                                        value={content.about_misi_title || ""}
                                        onChange={(e) => setContent({ ...content, about_misi_title: e.target.value })}
                                        onBlur={() => handleUpdate("about", "misi_title", content.about_misi_title)}
                                        placeholder="Judul Misi"
                                    />
                                    <textarea
                                        className="w-full p-2 border rounded-lg h-16 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                                        value={content.about_misi_desc || ""}
                                        onChange={(e) => setContent({ ...content, about_misi_desc: e.target.value })}
                                        onBlur={() => handleUpdate("about", "misi_desc", content.about_misi_desc)}
                                        placeholder="Deskripsi Misi"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section CONTACT */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden mt-8">
                        <div className="bg-teal-700 p-4 text-white font-bold">Section: Contact Info</div>
                        <div className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Header 1</p>
                                    <input
                                        className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                        value={content.contact_header || ""}
                                        onChange={(e) => setContent({ ...content, contact_header: e.target.value })}
                                        onBlur={() => handleUpdate("contact", "header", content.contact_header)}
                                        placeholder="Header 1 (Hubungi Kami)"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Header 2</p>
                                    <input
                                        className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                        value={content.contact_header2 || ""}
                                        onChange={(e) => setContent({ ...content, contact_header2: e.target.value })}
                                        onBlur={() => handleUpdate("contact", "header2", content.contact_header2)}
                                        placeholder="Header 2 (Siap Membantu Bisnis Anda Bertumbuh)"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Nomor Whatsapp</p>
                                    <input
                                        className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                        value={content.contact_phone || ""}
                                        onChange={(e) => setContent({ ...content, contact_phone: e.target.value })}
                                        onBlur={() => handleUpdate("contact", "phone", content.contact_phone)}
                                        placeholder="(+62) 853-xxxx"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-teal-700">Email Resmi</p>
                                    <input
                                        className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                                        value={content.contact_email || ""}
                                        onChange={(e) => setContent({ ...content, contact_email: e.target.value })}
                                        onBlur={() => handleUpdate("contact", "email", content.contact_email)}
                                        placeholder="hallo@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="font-bold text-teal-700">jam Operasional</p>
                                <textarea
                                    className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500 h-20"
                                    value={content.contact_hours || ""}
                                    onChange={(e) => setContent({ ...content, contact_hours: e.target.value })}
                                    onBlur={() => handleUpdate("contact", "hours", content.contact_hours)}
                                    placeholder="Senin - Jumat | 08:00 - 17:00"
                                />
                            </div>

                            <div className="space-y-2">
                                <p className="font-bold text-teal-700">Lokasi Kantor (Gunakan baris baru untuk kantor berbeda)</p>
                                <textarea
                                    className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500 h-24"
                                    value={content.contact_address || ""}
                                    onChange={(e) => setContent({ ...content, contact_address: e.target.value })}
                                    onBlur={() => handleUpdate("contact", "address", content.contact_address)}
                                    placeholder="Alamat kantor..."
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}