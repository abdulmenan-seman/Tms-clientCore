import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  patchState,
  withState,
} from '@ngrx/signals';
import {
  withEntities,
  setAllEntities,
  updateEntity,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, concatMap, tap, catchError, EMPTY } from 'rxjs';
import { EnrollmentService } from '../services/enrollment.service';
import { Enrollment } from '../models/enrollment.model';

export const EnrollmentStore = signalStore(
  { providedIn: 'root' }, // Registers singleton store in application root injector

  // Add primitive tracking flags
  withState({ isLoading: false, error: null as string | null }),

  // Add O(1) entity dictionary support ({ ids: [], entityMap: {} })
  withEntities<Enrollment>(),

  // Add derived memoized signals
  withComputed((store) => ({
    pendingCount: computed(
      () => store.entities().filter((e) => e.status === 'Pending').length
    ),
  })),

  // Add reactive execution pipelines
  withMethods((store, api = inject(EnrollmentService)) => ({
    /**
     * Loads enrollment entities using sequential concatMap processing.
     */
    loadEnrollments: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        concatMap(() =>
          api.getAll().pipe(
            tap((rows) =>
              patchState(store, setAllEntities(rows), { isLoading: false })
            ),
            catchError((err) => {
              patchState(store, { isLoading: false, error: err.message });
              return EMPTY; // Completes gracefully to keep rxMethod stream active
            })
          )
        )
      )
    ),

    /**
     * Executes Optimistic Approval mutation with automatic error rollback[cite: 5].
     */
    approveEnrollment: rxMethod<string>(
      pipe(
        tap((id) => {
          // STEP 1: Optimistic Update — Update screen immediately before network call[cite: 5]
          patchState(
            store,
            updateEntity({ id, changes: { status: 'Approved' } })
          );
        }),
        concatMap((id) =>
          api.approve(id).pipe(
            catchError((err) => {
              // STEP 2: Rollback State — Restore 'Pending' state if server rejects request[cite: 5]
              patchState(
                store,
                updateEntity({ id, changes: { status: 'Pending' } })
              );
              patchState(store, {
                error: 'Server rejected the approval. Check enrollment constraints.',
              });
              return EMPTY;
            })
          )
        )
      )
    ),
  }))
);