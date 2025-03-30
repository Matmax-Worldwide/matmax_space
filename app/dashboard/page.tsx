"use client";

import { Activity, ArrowUp, CreditCard, DollarSign, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dashboard cards/widgets would go here */}
        <div className="bg-card border border-border p-4 rounded-lg shadow-sm">
          <h2 className="font-medium mb-2">Active Countries</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        
        <div className="bg-card border border-border p-4 rounded-lg shadow-sm">
          <h2 className="font-medium mb-2">Supported Currencies</h2>
          <p className="text-3xl font-bold">8</p>
        </div>
        
        <div className="bg-card border border-border p-4 rounded-lg shadow-sm">
          <h2 className="font-medium mb-2">Blockchain Transactions</h2>
          <p className="text-3xl font-bold">156</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="font-medium">New country added: Canada</p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
          <div className="p-4 border-b border-border">
            <p className="font-medium">Currency rate updated: EUR/USD</p>
            <p className="text-sm text-muted-foreground">5 hours ago</p>
          </div>
          <div className="p-4">
            <p className="font-medium">New blockchain wallet connected</p>
            <p className="text-sm text-muted-foreground">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
} 