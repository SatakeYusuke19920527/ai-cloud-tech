// "use client";
// import { useEffect, useState } from "react";

// type TocItem = {
//   id: string;
//   text: string;
//   level: number;
// };

// export default function TableOfContents({ toc }: { toc: TocItem[] }) {
//   const [activeId, setActiveId] = useState("");

//   useEffect(() => {
//     const handler = () => {
//       let current = "";
//       toc.forEach((item: TocItem) => {
//         const el = document.getElementById(item.id);
//         if (!el) return;
//         const rect = el.getBoundingClientRect();
//         if (rect.top < 150) current = item.id;
//       });
//       setActiveId(current);
//     };

//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, [toc]);

//   return (
//     <nav className="text-sm">
//       <p className="font-bold mb-2">目次</p>
//       <ul className="space-y-1">
//         {toc.map((item: TocItem) => (
//           <li
//             key={item.id}
//             className={`transition-all ${
//               item.id === activeId
//                 ? "text-blue-600 font-bold"
//                 : "text-muted-foreground"
//             }`}
//             style={{ marginLeft: item.level === 3 ? 16 : 0 }}
//           >
//             <a href={`#${item.id}`}>{item.text}</a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }



// components/table/TableOfContents.tsx
"use client";
import React, { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  toc: TOCItem[];
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      toc.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100) current = item.id;
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初期表示

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <nav className="space-y-2">
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-sm hover:underline ${
            activeId === item.id ? "font-bold text-blue-600" : "text-gray-600"
          }`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
