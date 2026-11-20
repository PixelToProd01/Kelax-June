import React from "react";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  UserRound,
  ArrowRight,
  Headset,
  ShieldCheck,
  Download,
  ShoppingBag,
} from "lucide-react";

const customerLinks = [
  {
    title: "Dashboard",
    description: "View your customer account overview.",
    path: "/customer/dashboard",
    icon: LayoutDashboard,
    primary: true,
  },
  {
    title: "My Profile",
    description: "Manage your personal and company details.",
    path: "/customer/profile",
    icon: UserRound,
  },
  {
    title: "Downloads Drivers",
    description: "Download drivers and software for your products.",
    path: "/support/downloads",
    icon: Download,
  },
  {
    title: "Check Warranty",
    description: "Enter your product serial number to check warranty status.",
    path: "/support/warranty-check",
    icon: ShieldCheck,
  },
  {
    title: "Support",
    description: "Get assistance for your products and services.",
    path: "/support/warranty-call-log",
    icon: Headset,
  },
];

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <ShoppingBag size={24} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
              Customer Portal
            </h1>

            <p className="text-xs text-slate-500 sm:text-sm">
              Manage your products and customer account
            </p>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* ================= WELCOME SECTION ================= */}

        <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 px-5 py-8 shadow-lg sm:mb-10 sm:px-8 sm:py-10 lg:px-12">
          <div className="relative z-10 max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Customer Workspace
            </span>

            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Welcome to Your Customer Portal
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base sm:leading-7">
              Access your profile, check product warranty, download drivers, and
              get support for your products — all in one place.
            </p>
          </div>

          {/* Decorative Background */}

          <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full border-[28px] border-white/5 sm:-right-8 sm:h-72 sm:w-72" />

          <div className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl" />
        </section>

        {/* ================= SECTION HEADING ================= */}

        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Quick Access
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Select an option to continue.
          </p>
        </div>

        {/* ================= NAVIGATION CARDS ================= */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {customerLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.path}
                aria-label={`Open ${item.title}`}
                className={`group flex min-w-0 items-start gap-4 rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:p-6 ${
                  item.primary
                    ? "border-blue-200 bg-blue-50/70 hover:border-blue-300"
                    : "border-slate-200 bg-white hover:border-blue-200"
                }`}
              >
                {/* ICON */}

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    item.primary
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                  }`}
                >
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1">
                  <h4 className="break-words text-base font-semibold text-slate-900 sm:text-lg">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Open
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        {/* ================= FOOTER NOTE ================= */}

        <div className="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:mt-10 sm:px-5">
          <p className="text-center text-xs leading-5 text-slate-500 sm:text-sm">
            Need assistance with your products or customer account? Please
            contact our support team for assistance.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
