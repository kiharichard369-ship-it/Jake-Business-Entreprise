import React, { useState } from 'react';
import { Truck, MapPin, AlertCircle, Package, DollarSign, Clock, CheckCircle, Plus } from 'lucide-react';
import { StatCard } from '../../components/shared/StatCard';

const todayDeliveries = [
  { id: 'DLV-001', customer: 'Kamau Peter', location: 'Milimani Estate', product: '6 x 20L', amount: 900, status: 'delivered', dispatch: '08:30', delivery: '09:15', payment: 'paid' },
  { id: 'DLV-002', customer: 'Grace Njeri', location: 'Section 58', product: '5 x 20L', amount: 750, status: 'delivered', dispatch: '09:45', delivery: '10:30', payment: 'unpaid' },
  { id: 'DLV-003', customer: 'David Ochieng', location: 'Pipeline', product: '10 x 20L', amount: 1500, status: 'dispatched', dispatch: '11:00', delivery: '-', payment: 'pending' },
  { id: 'DLV-004', customer: 'Mary Achieng', location: 'Kaptembwo', product: '4 x 20L', amount: 600, status: 'pending', dispatch: '-', delivery: '-', payment: 'pending' },
];

const statusColors: Record<string, string> = {
  delivered: 'badge-paid',
  dispatched: 'badge-pending',
  pending: 'bg-gray-100 text-gray-600 badge',
  returned: 'badge-active',
};

export default function DriverDashboard() {
  const [dayOpen, setDayOpen] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 hero-delivery rounded-xl flex items-center justify-center">
              <Truck size={20} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Water Delivery</h1>
          </div>
          <p className="text-gray-500">Driver Dashboard · {new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        {!dayOpen ? (
          <button onClick={() => setDayOpen(true)} className="btn bg-green-600 text-white hover:bg-green-700 text-base py-3 px-6 shadow-lg">
            🚛 Open Day
          </button>
        ) : (
          <button className="btn-ghost text-red-600 border-red-200 hover:bg-red-50">Close Day</button>
        )}
      </div>

      {/* Day not open warning */}
      {!dayOpen && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-amber-800">Day Not Opened</p>
            <p className="text-sm text-amber-600">Please open the business day before recording deliveries.</p>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-36 hero-delivery">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop"
          alt="Water delivery"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative p-6 text-white grid grid-cols-4 gap-4">
          {[
            { label: 'Opening Load', value: dayOpen ? '6,600L' : '—' },
            { label: 'Delivered', value: dayOpen ? '4,200L' : '—' },
            { label: 'Remaining', value: dayOpen ? '2,400L' : '—' },
            { label: 'Deliveries', value: dayOpen ? '2/4' : '—' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-white/60 text-xs uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-black mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Revenue Today" value="KES 900" icon={<DollarSign size={20} className="text-green-600" />} iconBg="bg-green-50" accent="border-green-500" />
        <StatCard label="Unpaid Deliveries" value="1" icon={<AlertCircle size={20} className="text-red-500" />} iconBg="bg-red-50" accent="border-red-400" sub="KES 750 owed" />
        <StatCard label="Distance Today" value="42 km" icon={<MapPin size={20} className="text-blue-600" />} iconBg="bg-blue-50" accent="border-blue-500" />
        <StatCard label="GPS Status" value="Connected" icon={<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />} iconBg="bg-green-50" accent="border-green-400" />
      </div>

      {/* Delivery list & quick actions */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Deliveries */}
        <div className="md:col-span-2 card">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-black text-gray-900">Today's Deliveries</h3>
            <button className="btn bg-green-600 text-white hover:bg-green-700 text-sm py-1.5">
              <Plus size={14} /> New Delivery
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {todayDeliveries.map((del) => (
              <div key={del.id} className="px-5 py-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package size={18} className="text-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{del.customer}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{del.location}</p>
                      </div>
                      <span className={statusColors[del.status]}>{del.status}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-400 mt-1">
                      <span>📦 {del.product}</span>
                      <span>💰 KES {del.amount.toLocaleString()}</span>
                      {del.dispatch !== '-' && <span><Clock size={10} className="inline" /> {del.dispatch}</span>}
                    </div>
                    {/* Action buttons per status */}
                    {del.status === 'pending' && (
                      <button className="mt-2 btn bg-blue-600 text-white hover:bg-blue-700 text-xs py-1">
                        Mark as Dispatched
                      </button>
                    )}
                    {del.status === 'dispatched' && (
                      <div className="flex gap-2 mt-2">
                        <button className="btn bg-green-600 text-white hover:bg-green-700 text-xs py-1">Mark Delivered</button>
                      </div>
                    )}
                    {del.status === 'delivered' && del.payment === 'unpaid' && (
                      <span className="mt-1 inline-block badge badge-unpaid">Debt recorded</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="card p-4 space-y-2">
            <h3 className="font-black text-gray-900 text-sm mb-3">Quick Actions</h3>
            {[
              { icon: '📍', label: 'View GPS Map', path: '/water/driver/gps', color: 'bg-blue-50 hover:bg-blue-100 text-blue-800' },
              { icon: '⚠️', label: 'Record Debt', path: '/water/driver/debts', color: 'bg-red-50 hover:bg-red-100 text-red-800' },
              { icon: '💸', label: 'Log Expense', path: '/water/driver/expenses', color: 'bg-amber-50 hover:bg-amber-100 text-amber-800' },
              { icon: '📋', label: 'All Deliveries', path: '/water/driver/deliveries', color: 'bg-green-50 hover:bg-green-100 text-green-800' },
            ].map((a) => (
              <button key={a.label} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-colors ${a.color}`}>
                <span className="text-lg">{a.icon}</span>{a.label}
              </button>
            ))}
          </div>

          {/* Debt alert */}
          <div className="card p-4 bg-red-50 border-red-200">
            <h3 className="font-black text-red-800 text-sm mb-2">⚠️ Open Debts (Today)</h3>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl border border-red-100">
                <p className="font-bold text-sm text-gray-900">Grace Njeri</p>
                <p className="text-xs text-gray-500">5 x 20L Water · Section 58</p>
                <p className="font-black text-red-700 mt-1">KES 750</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
