{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.openssl
  ];
  idx.extensions = [
    
  
 "PulkitGangwar.nextjs-app-directory-commands"
 "PulkitGangwar.nextjs-snippets"
 "formulahendry.auto-close-tag"
 "formulahendry.auto-rename-tag"
 "redwan-hossain.auto-rename-tag-clone"];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}