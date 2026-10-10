FROM mcr.microsoft.com/devcontainers/base:noble

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      direnv && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# --init none: Codespaces has no systemd, so nothing manages the daemon for us.
# --enable-flakes: off by default otherwise.
RUN curl -sSfL https://artifacts.nixos.org/nix-installer \
      | sh -s -- install linux --init none --no-confirm --enable-flakes

# Baked into the image at build time, so it's present before any container
# shell starts (avoids the race where a shell forks before this is set up).
RUN for pair in "/etc/bash.bashrc:bash" "/etc/zsh/zshrc:zsh"; do \
      rc="${pair%%:*}"; shell_name="${pair##*:}"; \
      if [ -f "$rc" ] && ! grep -q "direnv hook" "$rc"; then \
        echo "eval \"\$(direnv hook ${shell_name})\"" | sudo tee -a "$rc" > /dev/null; \
      fi; \
    done
