import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Capsule, CapsuleDraft, CapsuleFilters, CapsuleSortOptions } from '@/types/capsule';

interface CapsuleStore {
  // State
  capsules: Capsule[];
  loading: boolean;
  error: string | null;
  selectedCapsule: Capsule | null;
  currentDraft: CapsuleDraft | null;
  filters: CapsuleFilters;
  sortOptions: CapsuleSortOptions;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };

  // Actions
  setCapsules: (capsules: Capsule[]) => void;
  addCapsule: (capsule: Capsule) => void;
  updateCapsule: (id: string, updates: Partial<Capsule>) => void;
  removeCapsule: (id: string) => void;
  setSelectedCapsule: (capsule: Capsule | null) => void;
  
  // Loading states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Draft management
  setCurrentDraft: (draft: CapsuleDraft | null) => void;
  updateDraft: (updates: Partial<CapsuleDraft>) => void;
  saveDraft: () => void;
  clearDraft: () => void;
  autoSaveDraft: () => void;
  
  // Filtering and sorting
  setFilters: (filters: Partial<CapsuleFilters>) => void;
  clearFilters: () => void;
  setSortOptions: (sort: CapsuleSortOptions) => void;
  
  // Pagination
  setPagination: (pagination: Partial<typeof initialState.pagination>) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
  
  // Utility actions
  getFilteredCapsules: () => Capsule[];
  getCapsuleById: (id: string) => Capsule | undefined;
  getCapsulesByStatus: (status: Capsule['status']) => Capsule[];
  getUpcomingCapsules: () => Capsule[];
  getRecentCapsules: (limit?: number) => Capsule[];
  
  // Statistics
  getStats: () => {
    total: number;
    byStatus: Record<Capsule['status'], number>;
    totalRecipients: number;
    averageWaitTime: number;
  };
  
  // Bulk actions
  bulkUpdateStatus: (ids: string[], status: Capsule['status']) => void;
  bulkDelete: (ids: string[]) => void;
  
  // Reset
  reset: () => void;
}

const initialFilters: CapsuleFilters = {
  status: 'all',
  search: '',
};

const initialSortOptions: CapsuleSortOptions = {
  field: 'createdAt',
  direction: 'desc',
};

const initialState = {
  capsules: [] as Capsule[],
  loading: false,
  error: null,
  selectedCapsule: null,
  currentDraft: null,
  filters: initialFilters,
  sortOptions: initialSortOptions,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
  },
};

export const useCapsuleStore = create<CapsuleStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Basic state setters
      setCapsules: (capsules) =>
        set({ capsules, error: null }),

      addCapsule: (capsule) =>
        set((state) => ({
          capsules: [capsule, ...state.capsules],
          error: null,
        })),

      updateCapsule: (id, updates) =>
        set((state) => ({
          capsules: state.capsules.map((capsule) =>
            capsule.id === id ? { ...capsule, ...updates, updatedAt: new Date() } : capsule
          ),
          selectedCapsule:
            state.selectedCapsule?.id === id
              ? { ...state.selectedCapsule, ...updates, updatedAt: new Date() }
              : state.selectedCapsule,
          error: null,
        })),

      removeCapsule: (id) =>
        set((state) => ({
          capsules: state.capsules.filter((capsule) => capsule.id !== id),
          selectedCapsule:
            state.selectedCapsule?.id === id ? null : state.selectedCapsule,
          error: null,
        })),

      setSelectedCapsule: (capsule) =>
        set({ selectedCapsule: capsule }),

      setLoading: (loading) =>
        set({ loading }),

      setError: (error) =>
        set({ error, loading: false }),

      // Draft management
      setCurrentDraft: (draft) =>
        set({ currentDraft: draft }),

      updateDraft: (updates) =>
        set((state) => ({
          currentDraft: state.currentDraft
            ? { ...state.currentDraft, ...updates, lastSaved: new Date() }
            : null,
        })),

      saveDraft: () => {
        const { currentDraft } = get();
        if (currentDraft) {
          set({
            currentDraft: {
              ...currentDraft,
              lastSaved: new Date(),
            },
          });
          
          // Here you would typically save to localStorage or API
          localStorage.setItem('capsuleDraft', JSON.stringify(currentDraft));
        }
      },

      clearDraft: () => {
        set({ currentDraft: null });
        localStorage.removeItem('capsuleDraft');
      },

      autoSaveDraft: () => {
        const { currentDraft } = get();
        if (currentDraft && currentDraft.autoSaveEnabled !== false) {
          get().saveDraft();
        }
      },

      // Filtering and sorting
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      clearFilters: () =>
        set({ filters: initialFilters }),

      setSortOptions: (sortOptions) =>
        set({ sortOptions }),

      // Pagination
      setPagination: (newPagination) =>
        set((state) => ({
          pagination: { ...state.pagination, ...newPagination },
        })),

      nextPage: () =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            page: state.pagination.page + 1,
          },
        })),

      prevPage: () =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            page: Math.max(1, state.pagination.page - 1),
          },
        })),

      resetPagination: () =>
        set((state) => ({
          pagination: { ...state.pagination, page: 1 },
        })),

      // Utility functions
      getFilteredCapsules: () => {
        const { capsules, filters, sortOptions } = get();
        
        let filtered = [...capsules];

        // Apply filters
        if (filters.status && filters.status !== 'all') {
          filtered = filtered.filter((capsule) => capsule.status === filters.status);
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter((capsule) =>
            capsule.title.toLowerCase().includes(searchLower) ||
            capsule.content.text.toLowerCase().includes(searchLower)
          );
        }

        if (filters.dateFrom) {
          filtered = filtered.filter((capsule) =>
            capsule.createdAt >= filters.dateFrom!
          );
        }

        if (filters.dateTo) {
          filtered = filtered.filter((capsule) =>
            capsule.createdAt <= filters.dateTo!
          );
        }

        if (filters.isPublic !== undefined) {
          filtered = filtered.filter((capsule) => capsule.isPublic === filters.isPublic);
        }

        if (filters.hasMedia) {
          filtered = filtered.filter((capsule) =>
            capsule.content.media && capsule.content.media.length > 0
          );
        }

        if (filters.aiReflectionEnabled !== undefined) {
          filtered = filtered.filter(
            (capsule) => capsule.aiReflectionEnabled === filters.aiReflectionEnabled
          );
        }

        if (filters.recipients === 'self') {
          filtered = filtered.filter((capsule) => capsule.recipients.length === 0);
        } else if (filters.recipients === 'others') {
          filtered = filtered.filter((capsule) => capsule.recipients.length > 0);
        }

        // Apply sorting
        filtered.sort((a, b) => {
          const { field, direction } = sortOptions;
          let aValue: any = a[field];
          let bValue: any = b[field];

          if (field === 'createdAt' || field === 'deliveryDate') {
            aValue = aValue ? new Date(aValue).getTime() : 0;
            bValue = bValue ? new Date(bValue).getTime() : 0;
          } else if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }

          if (aValue < bValue) return direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return direction === 'asc' ? 1 : -1;
          return 0;
        });

        return filtered;
      },

      getCapsuleById: (id) => {
        return get().capsules.find((capsule) => capsule.id === id);
      },

      getCapsulesByStatus: (status) => {
        return get().capsules.filter((capsule) => capsule.status === status);
      },

      getUpcomingCapsules: () => {
        const now = new Date();
        return get()
          .capsules.filter(
            (capsule) =>
              capsule.status === 'scheduled' &&
              capsule.deliveryDate &&
              capsule.deliveryDate > now
          )
          .sort((a, b) => {
            if (!a.deliveryDate || !b.deliveryDate) return 0;
            return a.deliveryDate.getTime() - b.deliveryDate.getTime();
          });
      },

      getRecentCapsules: (limit = 10) => {
        return get()
          .capsules.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          )
          .slice(0, limit);
      },

      getStats: () => {
        const { capsules } = get();
        
        const stats = {
          total: capsules.length,
          byStatus: {
            draft: 0,
            scheduled: 0,
            delivered: 0,
          } as Record<Capsule['status'], number>,
          totalRecipients: 0,
          averageWaitTime: 0,
        };

        let totalWaitTime = 0;
        let capsulesWithWaitTime = 0;

        capsules.forEach((capsule) => {
          stats.byStatus[capsule.status]++;
          stats.totalRecipients += capsule.recipients.length;

          if (capsule.deliveryDate) {
            const waitTime = capsule.deliveryDate.getTime() - capsule.createdAt.getTime();
            const waitDays = waitTime / (1000 * 60 * 60 * 24);
            
            if (waitDays > 0) {
              totalWaitTime += waitDays;
              capsulesWithWaitTime++;
            }
          }
        });

        if (capsulesWithWaitTime > 0) {
          stats.averageWaitTime = totalWaitTime / capsulesWithWaitTime;
        }

        return stats;
      },

      // Bulk actions
      bulkUpdateStatus: (ids, status) =>
        set((state) => ({
          capsules: state.capsules.map((capsule) =>
            ids.includes(capsule.id)
              ? { ...capsule, status, updatedAt: new Date() }
              : capsule
          ),
        })),

      bulkDelete: (ids) =>
        set((state) => ({
          capsules: state.capsules.filter((capsule) => !ids.includes(capsule.id)),
          selectedCapsule: ids.includes(state.selectedCapsule?.id || '')
            ? null
            : state.selectedCapsule,
        })),

      reset: () =>
        set(initialState),
    }),
    {
      name: 'capsule-store',
      partialize: (state) => ({
        currentDraft: state.currentDraft,
        filters: state.filters,
        sortOptions: state.sortOptions,
        pagination: state.pagination,
      }),
    }
  )
);

// Auto-save draft every 30 seconds
if (typeof window !== 'undefined') {
  setInterval(() => {
    useCapsuleStore.getState().autoSaveDraft();
  }, 30000);
}

export default useCapsuleStore;
