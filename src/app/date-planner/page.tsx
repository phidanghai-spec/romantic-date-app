'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DatePlannerFlow } from '@/components/planner/DatePlannerFlow';

function DatePlannerContent() {
  const searchParams = useSearchParams();
  const partnerId = searchParams.get('partnerId') || undefined;
  const partnerName = searchParams.get('partnerName') || 'người ấy';
  const initialCuisine = searchParams.get('cuisine') || undefined;
  const initialLocation = searchParams.get('location') || undefined;

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 md:pb-8">
      <main className="relative z-10 flex-1 max-w-2xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center">
        <DatePlannerFlow
          partnerId={partnerId}
          partnerName={partnerName}
          initialCuisine={initialCuisine}
          initialLocation={initialLocation}
        />
      </main>
    </div>
  );
}

export default function DatePlannerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
          <div className="font-serif-italic text-2xl text-rose-500 animate-pulse">
            Đang tải kế hoạch hẹn hò... ✨
          </div>
        </div>
      }
    >
      <DatePlannerContent />
    </Suspense>
  );
}
