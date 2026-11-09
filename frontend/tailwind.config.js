/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'sans-serif'], // ตั้งค่าให้ทุก text ใช้ฟอนต์ Prompt
      },
      colors: {
        theme: {
          bg: '#FAFAF9',        // สีพื้นหลังขาวครีมอุ่นๆ (Warm Gray/Stone)
          paper: '#FFFFFF',     // การ์ดสีขาวบริสุทธิ์
          border: '#F3F4F6',    // เส้นขอบบางๆ สบายตา
          yellow: {
            soft: '#FEF9C3',    // เหลืองพาสเทลอ่อนสำหรับ Background Highlight
            light: '#FDE047',   // เหลืองสว่างสำหรับ Badge / Highlight
            primary: '#EAB308', // เหลืองเข้มโทนอุ่นสำหรับปุ่มและ Hover
            text: '#713F12',    // สีตัวอักษรบนพื้นเหลือง
          },
          text: {
            main: '#27272A',    // สีข้อความหลัก (ไม่ดำสนิท ช่วยให้อ่านสบายตา)
            muted: '#71717A',   // สีข้อความรอง / วันที่
          }
        }
      }
    },
  },
  plugins: [],
}