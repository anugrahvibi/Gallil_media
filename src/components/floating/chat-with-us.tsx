"use client";

import { motion } from "framer-motion";
import { Announcement, AnnouncementTitle } from "@/components/ui/announcement";
import { ArrowUpRight } from "lucide-react";

export default function ChatWithUs() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-[9999]"
            onClick={() => window.open("https://wa.me/919061944416", "_blank")}
        >
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
            >
                <Announcement className="bg-background text-foreground border-black/10 shadow-sm hover:shadow-md pr-4 pl-4 py-1.5 md:py-2">
                    <AnnouncementTitle className="flex items-center gap-1.5 text-sm font-medium">
                        <span>Chat with us</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                    </AnnouncementTitle>
                </Announcement>
            </motion.div>
        </motion.div>
    );
}
