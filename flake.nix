{
  description = "cdkd Intro Workshop - dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.hugo
            pkgs.nodejs_24
            pkgs.git
            pkgs.awscli2
          ];

          shellHook = ''
            # Node は Nix のストア（読み取り専用）にあるため、npm i -g の行き先をホームに向ける
            export NPM_CONFIG_PREFIX="$HOME/.npm-global"
            export PATH="$NPM_CONFIG_PREFIX/bin:$PATH"

            echo "cdkd Intro Workshop dev shell"
            echo "  node : $(node --version)"
            echo "  aws  : $(aws --version)"
          '';
        };
      });
}
