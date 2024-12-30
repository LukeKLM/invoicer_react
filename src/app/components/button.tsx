"use client";
export default function Button({ children, onClick }: { children: React.ReactNode, onClick: () => Promise<void> | void }) {
    return (
      <button 
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }