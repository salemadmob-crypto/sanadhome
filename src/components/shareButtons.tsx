'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Facebook, Linkedin, Mail, Share2, Twitter } from "lucide-react";
import { useState } from "react";
import { BiShare } from "react-icons/bi";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function ShareButtons({ title }: { title: string }) {
    const [isSharing, setIsSharing] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = title;
    const shareText = `اقرأ هذا المقال: ${title}`;

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("تم نسخ الرابط بنجاح");
        } catch (error) {
            toast.error("فشل في نسخ الرابط");
        }
    };

    const useNativeShare = async () => {
        if (navigator.share) {
            try {
                setIsSharing(true);
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                });
                toast.success("تم المشاركة بنجاح");
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    toast.error("فشل في المشاركة");
                }
            } finally {
                setIsSharing(false);
            }
        } else {
            // Fallback to copy if native share is not available
            copyToClipboard();
        }
    };

    const openShareLink = (url: string, platform: string) => {
        window.open(url, '_blank', 'width=600,height=400');
        toast.success(`تم فتح ${platform}`);
    };

    return (
        <div className="flex items-center gap-2 p-2 ">
            {/* Native Share Button */}
            <Button
                onClick={useNativeShare}
                disabled={isSharing}
                className="bg-green-600 hover:bg-green-700"
            >
                <Share2 className="h-4 w-4 mr-2" />
                {isSharing ? "جاري المشاركة..." : "مشاركة"}
            </Button>

            {/* Copy Link Button */}
            <Button
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
                title="نسخ الرابط"
            >
                <Copy className="h-4 w-4" />
            </Button>

            {/* Dropdown for more options */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <BiShare className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => openShareLink(shareLinks.facebook, "فيسبوك")}>
                        <Facebook className="h-4 w-4 mr-2" />
                        مشاركة على فيسبوك
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openShareLink(shareLinks.twitter, "تويتر")}>
                        <Twitter className="h-4 w-4 mr-2" />
                        مشاركة على تويتر
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openShareLink(shareLinks.linkedin, "لينكد إن")}>
                        <Linkedin className="h-4 w-4 mr-2" />
                        مشاركة على لينكد إن
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openShareLink(shareLinks.whatsapp, "واتساب")}>
                        <BsWhatsapp className="h-4 w-4 mr-2" />
                        مشاركة على واتساب
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openShareLink(shareLinks.telegram, "تليجرام")}>
                        <BsTelegram className="h-4 w-4 mr-2" />
                        مشاركة على تليجرام
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openShareLink(shareLinks.email, "البريد الإلكتروني")}>
                        <Mail className="h-4 w-4 mr-2" />
                        مشاركة عبر البريد
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

