import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`}></div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-8 w-3/4" />
    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b border-slate-50">
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <Skeleton className="h-4 w-16" />
  </div>
);

export default Skeleton;
