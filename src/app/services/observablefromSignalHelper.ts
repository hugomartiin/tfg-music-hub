import { Observable } from 'rxjs';
import { effect, runInInjectionContext, EnvironmentInjector } from '@angular/core';

export function observableFromSignal<T>(
  signalGetter: () => T,
  injector: EnvironmentInjector
): Observable<T> {
  return new Observable<T>(subscriber => {
    // Ejecutamos effect dentro del contexto de inyección
    const cleanup = runInInjectionContext(injector, () => {
      // Emitimos valor inicial
      subscriber.next(signalGetter());

      // Creamos effect para emitir cuando cambie el signal
      return effect(() => {
        subscriber.next(signalGetter());
      });
    });

    return () => cleanup.destroy();
  });
}
