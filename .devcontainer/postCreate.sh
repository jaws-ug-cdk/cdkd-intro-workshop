#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
. /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh

# postStartCommand also starts the daemon on every subsequent start, but
# postCreateCommand runs before postStartCommand on the very first boot,
# so start it here too.
if [ ! -S /nix/var/nix/daemon-socket/socket ]; then
  sudo bash -c 'setsid nohup /nix/var/nix/profiles/default/bin/nix-daemon >/var/log/nix-daemon.log 2>&1 < /dev/null &'
  for _ in $(seq 1 30); do
    [ -S /nix/var/nix/daemon-socket/socket ] && break
    sleep 1
  done
fi

cd "$(dirname "$0")/.."
# bind-mounted workspace may be owned by a different uid than this user
git config --global --add safe.directory "$(pwd)"
direnv allow
eval "$(direnv hook bash)"
direnv exec . npm ci --prefix code
