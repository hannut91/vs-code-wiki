# VS Code Wiki

This is VS Code version of wiki management tool, inspired by 
[vimwiki](https://github.com/vimwiki/vimwiki).

## Features

### Quickly access Wikis from within VS Code.

![open_wiki](https://user-images.githubusercontent.com/14071105/67149284-7de2ed80-f2e4-11e9-8996-90e587a3e5b0.gif)

### Create links quickly and handy.

![go_to_wiki mov](https://user-images.githubusercontent.com/14071105/67149282-7d4a5700-f2e4-11e9-9db5-4c35ef621ea1.gif)

### Quickly search within VS Code.

![search_wiki mov](https://user-images.githubusercontent.com/14071105/67149283-7de2ed80-f2e4-11e9-8119-6b30a0a04fd0.gif)

### Easily export to Jekyll projects.

![export_wiki mov](https://user-images.githubusercontent.com/14071105/67149285-7de2ed80-f2e4-11e9-845e-abc4b4407691.gif)

### Delete wiki file.

![delete_wiki mov](https://user-images.githubusercontent.com/14071105/67836768-d01bde00-fb30-11e9-857f-2f31a997d294.gif)

## Requirements

* [The Silver Searcher](https://github.com/ggreer/the_silver_searcher): `Search Wiki` use this internally.

## Key bindings

* `ctrl+]`: Go to link or create link. If you wanna go back, `ctrl + -` is 
default key shortcut of VS Code.

## Commands

* `Open Wiki` Open the Wiki.
* `Go to Wiki` Go to link. If cursor is in normal text, change text to link. If
  cursor is in link, go to link. default key shortcut is `ctrl+]`.
* `Search Wiki` Search text in Wiki. This command use 
  [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) 
  internally.
* `Export Wiki` Copies wiki files to specific directory. Setting is required.

## ToDo

* Backup before delete
* Rename Wiki
* Go back
* Go to Wiki and scroll to cursor

## Sources

* https://github.com/vimwiki/vimwiki
* https://github.com/ggreer/the_silver_searcher
