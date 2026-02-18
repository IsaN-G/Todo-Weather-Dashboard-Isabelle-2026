"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Info, Trash2, Plus } from "lucide-react";

type Category = "hobby" | "beruf" | "privat";

interface CalendarEvent {
  _id: string;
  title: string;
  date: string;
  category: Category;
}

const categoryStyles = {
  hobby: {
    bg: "bg-green-200",
    text: "text-green-900",
    border: "border-green-400",
    label: "Hobby",
  },
  beruf: {
    bg: "bg-blue-200",
    text: "text-blue-900",
    border: "border-blue-400",
    label: "Beruf",
  },
  privat: {
    bg: "bg-purple-200",
    text: "text-purple-900",
    border: "border-purple-400",
    label: "Privat",
  },
} as const;

export default function ClassicGoogleCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    date: string;
    category: Category;
  }>({
    title: "",
    date: "",
    category: "privat",
  });

  const [currentMonth, setCurrentMonth] = useState(1);
  const [currentYear, setCurrentYear] = useState(2026);

 
  const tailwindSafeguard = (
    <div className="hidden">
      bg-green-200 text-green-900 border-green-400
      bg-blue-200 text-blue-900 border-blue-400
      bg-purple-200 text-purple-900 border-purple-400
      scale-110 shadow-md border-blue-600 bg-white/70
    </div>
  );

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Events konnten nicht geladen werden:", err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const changeMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const openNewModal = (dateStr: string) => {
    setEditId(null);
    setFormData({ title: "", date: dateStr, category: "privat" });
    setIsModalOpen(true);
  };

  const openEditModal = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setEditId(event._id);
    setFormData({
      title: event.title,
      date: event.date,
      category: event.category,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...formData, _id: editId } : formData;

    try {
      const res = await fetch("/api/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        closeModal();
        fetchEvents();
      } else {
        console.error("Speichern fehlgeschlagen", await res.text());
      }
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  };

  const handleDelete = async (e: React.MouseEvent | React.FormEvent, id: string) => {
    if ("stopPropagation" in e) e.stopPropagation();
    closeModal();

    try {
      await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      fetchEvents();
    } catch (err) {
      console.error("Löschen fehlgeschlagen:", err);
    }
  };



  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: offset }, (_, i) => i);

  const todayStr = "2026-02-17";
  const isTodayMonth = currentMonth === 1 && currentYear === 2026;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      {tailwindSafeguard}

      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-4">
          <div className="flex border border-gray-300 rounded shadow-sm">
            <button
              onClick={() => changeMonth(-1)}
              type="button"
              className="p-1.5 hover:bg-gray-100 border-r border-gray-300"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => changeMonth(1)}
              type="button"
              className="p-1.5 hover:bg-gray-100"
            >
              <ChevronRight size={14} />
            </button>
          </div>
          <button
            onClick={() => {
              setCurrentMonth(1);
              setCurrentYear(2026);
            }}
            type="button"
            className="px-4 py-1.5 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50"
          >
            Heute
          </button>
          <h1 className="text-xl font-medium ml-4">
            {monthNames[currentMonth]} {currentYear}
          </h1>
        </div>
        <button
          onClick={() => openNewModal(todayStr)}
          type="button"
          className="bg-blue-600 text-white p-2 rounded shadow hover:bg-blue-700 transition-all"
        >
          <Plus size={20} />
        </button>
      </header>

     
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa.", "So."].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-bold text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          backgroundColor: "#e5e7eb",
          gap: "1px",
          overflow: "hidden",
        }}
      >
        {emptyCells.map((c) => (
          <div key={`empty-${c}`} className="bg-gray-50/50" />
        ))}

        {daysArray.map((day) => {
          const dateStr = `${currentYear}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          const dayEvents = events.filter((e) => e.date === dateStr);
          const isToday = isTodayMonth && day === 17;

          return (
            <div
              key={day}
              onClick={() => openNewModal(dateStr)}
              className="bg-white p-1 flex flex-col cursor-pointer hover:bg-slate-50 relative"
              style={{ backgroundColor: isToday ? "#fffdeb" : "#fff" }}
            >
              <div className="flex justify-end mb-1">
                <span
                  className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday ? "bg-black text-white" : "text-gray-500"
                  }`}
                >
                  {day}
                </span>
              </div>

              <div className="space-y-1 overflow-y-auto no-scrollbar">
                {dayEvents.map((ev) => {
                 
                  const normalizedCategory =
                    (ev.category?.toLowerCase().trim() as Category) ?? "privat";

                  return (
                    <div
                      key={ev._id}
                      onClick={(e) => openEditModal(e, ev)}
                      className={`text-[10px] p-1 rounded border truncate flex items-center justify-between group/item
                        ${categoryStyles[normalizedCategory].bg}
                        ${categoryStyles[normalizedCategory].text}
                        ${categoryStyles[normalizedCategory].border}
                      `}
                    >
                      <span className="truncate flex items-center gap-1 font-medium">
                        <Info size={10} />
                        {ev.title}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, ev._id)}
                        className="hidden group-hover/item:block text-red-600"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-[320px] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                {editId ? "Termin bearbeiten" : "Termin hinzufügen"}
              </h2>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <input
                required
                placeholder="Titel des Termins"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              
              <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                {(["hobby", "beruf", "privat"] as const).map((cat) => {
                  const s = categoryStyles[cat];
                  const isSelected = formData.category === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      title={s.label}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`
                        flex flex-col items-center gap-1.5 
                        p-2.5 rounded-xl transition-all duration-150
                        cursor-pointer select-none
                        ${isSelected
                          ? "bg-white shadow-md scale-105 border-2 border-blue-600"
                          : "hover:bg-white/60 hover:shadow-sm border-2 border-transparent"
                        }
                      `}
                    >
                      <div
                        className={`
                          w-12 h-12 rounded-full ${s.bg}
                          border-2 ${isSelected ? "border-blue-600" : s.border}
                          flex items-center justify-center text-lg font-bold ${s.text}
                          shadow-sm
                        `}
                      >
                        {s.label.charAt(0).toUpperCase()}
                      </div>
                      <span
                        className={`
                          text-xs font-medium
                          ${isSelected ? "text-blue-700 font-semibold" : "text-gray-700"}
                        `}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Speichern
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, editId)}
                    className="w-full text-red-600 py-2 text-sm font-medium hover:text-red-800 transition-colors"
                  >
                    Termin löschen
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
