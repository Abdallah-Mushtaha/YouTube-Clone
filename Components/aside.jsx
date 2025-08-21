import React from "react";

export default function Aside({ menu }) {
  return (
    <aside
      className={`relative aside w-1/2 bg-gray-500 h-screen ${
        menu ? "left-0 transition-all ease-in-out  " : "left-[-100%]"
      }`}
    >
      <div className="p-5 border-b border-blue-400">
        <h1 className="text-2xl font-bold text-white text-center">
          القائمة الرئيسية
        </h1>
      </div>

      <nav className="mt-6">
        <a
          href="#"
          className="menu-item flex items-center px-6 py-4 text-white text-lg hover:bg-blue-500 transition-colors"
        >
          <i className="fas fa-home ml-3"></i>
          <span>الصفحة الرئيسية</span>
        </a>
        <a
          href="#"
          className="menu-item flex items-center px-6 py-4 text-white text-lg hover:bg-blue-500 transition-colors"
        >
          <i className="fas fa-user ml-3"></i>
          <span>الملف الشخصي</span>
        </a>
        <a
          href="#"
          className="menu-item flex items-center px-6 py-4 text-white text-lg hover:bg-blue-500 transition-colors"
        >
          <i className="fas fa-cog ml-3"></i>
          <span>الإعدادات</span>
        </a>
        <a
          href="#"
          className="menu-item flex items-center px-6 py-4 text-white text-lg hover:bg-blue-500 transition-colors"
        >
          <i className="fas fa-envelope ml-3"></i>
          <span>الرسائل</span>
        </a>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-blue-400">
        <div className="flex items-center justify-center">
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            تسجيل الخروج
          </button>
        </div>
      </div>
    </aside>
  );
}
