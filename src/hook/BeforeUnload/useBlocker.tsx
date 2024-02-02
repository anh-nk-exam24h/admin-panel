import * as React from 'react';
// eslint-disable-next-line camelcase
import { UNSAFE_NavigationContext } from 'react-router-dom';
import type { Blocker, History, Transition } from 'history';

export function useBlocker(blocker: Blocker, when = true): void {
  const navigator = React.useContext(UNSAFE_NavigationContext).navigator as History;

  React.useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
