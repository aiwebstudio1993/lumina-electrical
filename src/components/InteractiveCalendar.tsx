import React, { useState } from 'react';
import { Calendar, Clock, RefreshCw, Radio, Check, Lock } from 'lucide-react';
import { Booking } from '../types';

interface InteractiveCalendarProps {
  bookings: Booking[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  bookings,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}) => {
  const [currentMonth, setCurrentMonth] = useState('July 2026');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing'>('idle');

  // Hardcoded busy dates and slots to simulate an active, busy expert electrician calendar
  const busySlotsMap: Record<string, string[]> = {
    '2026-07-20': ['09:00 - 11:00', '11:00 - 13:00'],
    '2026-07-21': ['13:00 - 15:00', '15:00 - 17:00'],
    '2026-07-22': ['09:00 - 11:00', '15:00 - 17:00'],
    '2026-07-23': ['11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00'],
  };

  const timeSlots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '13:00 - 15:00',
    '15:00 - 17:00'
  ];

  const handleSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('idle');
    }, 800);
  };

  // Generate days in month: July 2026 (starts on a Wednesday)
  // Length 31
  const daysInJuly = Array.from({ length: 31 }, (_, i) => i + 1);
  const startingDayOffset = 3; // Wednesday (Sunday is 0, Mon is 1, Tue is 2, Wed is 3)

  const handleDaySelect = (dayNum: number) => {
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    onSelectDate(`2026-07-${formattedDay}`);
  };

  // Check if a specific slot is busy (either hardcoded or booked by the client in this session)
  const isSlotBusy = (date: string, slot: string) => {
    // 1. Check hardcoded busy slots
    if (busySlotsMap[date] && busySlotsMap[date].includes(slot)) {
      return true;
    }
    // 2. Check bookings made in this session
    return bookings.some(b => b.date === date && b.timeSlot === slot);
  };

  return (
    <div className="bg-[#080808] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* GOOGLE CALENDAR BRANDED HEADER */}
      <div className="bg-zinc-950 border-b border-zinc-900 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Branded Golden Calendar Icon wrapper */}
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Calendar className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">LIVE GOOGLE CALENDAR SYNC</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h4 className="text-sm font-bold text-white font-display tracking-wide uppercase">
              Calendar ID: jb-electrics-api
            </h4>
          </div>
        </div>

        <button
          onClick={handleSync}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 rounded-lg hover:text-white hover:border-zinc-700 transition-all font-mono"
        >
          <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin text-amber-500' : ''}`} />
          {syncStatus === 'syncing' ? 'Syncing API...' : 'Fetch Live Slots'}
        </button>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* MONTH VIEW CALENDAR GRID (Left Columns) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="flex justify-between items-center px-1">
            <span className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {currentMonth}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              TIMEZONE: Europe/London (GMT+1)
            </span>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-[10px] font-mono text-zinc-500 font-semibold uppercase tracking-wider py-1 border-b border-zinc-900">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {/* Empty Offset Days */}
            {Array.from({ length: startingDayOffset }).map((_, idx) => (
              <div key={`offset-${idx}`} className="h-9" />
            ))}

            {/* Days in Month */}
            {daysInJuly.map((dayNum) => {
              const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
              const thisDateStr = `2026-07-${formattedDay}`;
              const isSelected = selectedDate === thisDateStr;
              
              // Calculate day status colors
              const totalSlots = timeSlots.length;
              let busyCount = 0;
              timeSlots.forEach(s => {
                if (isSlotBusy(thisDateStr, s)) busyCount++;
              });

              let indicatorColor = 'bg-zinc-800'; // Fully open
              if (busyCount === totalSlots) {
                indicatorColor = 'bg-red-500/50'; // Fully booked
              } else if (busyCount > 0) {
                indicatorColor = 'bg-amber-500/50'; // Partially booked
              }

              return (
                <button
                  key={dayNum}
                  onClick={() => handleDaySelect(dayNum)}
                  className={`h-9 flex flex-col items-center justify-between p-1 rounded-lg transition-all border ${
                    isSelected
                      ? 'bg-amber-500 border-transparent text-black font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 text-zinc-300'
                  }`}
                >
                  <span className="text-xs">{dayNum}</span>
                  {/* Busy Level Indicator Dot */}
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-black' : indicatorColor}`} />
                </button>
              );
            })}
          </div>

          {/* Calendar Status Legend */}
          <div className="flex gap-4 text-[10px] text-zinc-500 font-mono mt-2 justify-center border-t border-zinc-900 pt-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              100% Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
              Busy Grid slots
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
              Fully Booked
            </span>
          </div>
        </div>

        {/* TIME SLOTS DETAILED VIEW (Right Columns) */}
        <div className="md:col-span-5 flex flex-col justify-between border-l border-zinc-900 md:pl-6 pt-4 md:pt-0">
          <div>
            <h5 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Availability Matrix
            </h5>
            <span className="text-[10px] text-zinc-500 font-mono block mb-3">
              Selected: {new Date(selectedDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>

            <div className="space-y-2.5">
              {timeSlots.map((slot) => {
                const isBusy = isSlotBusy(selectedDate, slot);
                const isSelected = selectedTime === slot;
                
                // Find if this is the client's current newly booked session slot
                const isSessionBooked = bookings.some(b => b.date === selectedDate && b.timeSlot === slot);

                return (
                  <button
                    key={slot}
                    disabled={isBusy && !isSessionBooked}
                    onClick={() => onSelectTime(slot)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSessionBooked
                        ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400'
                        : isSelected
                        ? 'bg-amber-950/20 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                        : isBusy
                        ? 'bg-zinc-900/30 border-zinc-950 text-zinc-600 cursor-not-allowed'
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {isSessionBooked ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isBusy ? (
                        <Lock className="w-3.5 h-3.5 text-zinc-600" />
                      ) : (
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      )}
                      <span>{slot}</span>
                    </div>

                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">
                      {isSessionBooked ? 'Your Slot' : isBusy ? 'Busy (Sync)' : 'Select'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl">
            <p className="text-[10px] text-zinc-400 leading-normal font-sans">
              <span className="text-amber-500 font-mono font-bold mr-1">Google Cal Sync Notice:</span>
              Once submitted, we verify your appointment coordinates and lock down the node live inside Google Calendar API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
