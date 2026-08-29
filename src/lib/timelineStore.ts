import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_MEMORIES, DEFAULT_BUCKET_LIST, CoupleMemory, BucketListItem } from '@/lib/dateApis';

interface TimelineStoreState {
  memories: CoupleMemory[];
  bucketList: BucketListItem[];
  addMemory: (memory: CoupleMemory) => void;
  deleteMemory: (id: string) => void;
  toggleBucketItem: (id: string) => void;
  addBucketItem: (title: string, category?: string) => void;
  deleteBucketItem: (id: string) => void;
  resetToDefaults: () => void;
}

export const useTimelineStore = create<TimelineStoreState>()(
  persist(
    (set) => ({
      memories: DEFAULT_MEMORIES,
      bucketList: DEFAULT_BUCKET_LIST,

      addMemory: (memory) =>
        set((state) => ({
          memories: [memory, ...state.memories],
        })),

      deleteMemory: (id) =>
        set((state) => ({
          memories: state.memories.filter((m) => m.id !== id),
        })),

      toggleBucketItem: (id) =>
        set((state) => ({
          bucketList: state.bucketList.map((item) =>
            item.id === id
              ? {
                  ...item,
                  isCompleted: !item.isCompleted,
                  completedAt: !item.isCompleted ? new Date().toISOString().split('T')[0] : undefined,
                }
              : item
          ),
        })),

      addBucketItem: (title, category = 'Kỷ Niệm') =>
        set((state) => ({
          bucketList: [
            ...state.bucketList,
            {
              id: `bucket-${Date.now()}`,
              title: title.trim(),
              category,
              isCompleted: false,
            },
          ],
        })),

      deleteBucketItem: (id) =>
        set((state) => ({
          bucketList: state.bucketList.filter((item) => item.id !== id),
        })),

      resetToDefaults: () =>
        set({
          memories: DEFAULT_MEMORIES,
          bucketList: DEFAULT_BUCKET_LIST,
        }),
    }),
    {
      name: 'our-date-night-timeline-storage',
    }
  )
);
